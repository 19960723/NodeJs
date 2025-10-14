/**
 * Redis 分布式限流中间件
 * 支持多种限流策略：固定窗口、滑动窗口、令牌桶等
 */

import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redis';
import logger from '../utils/logger';
import { error } from '../utils/result';

// 限流策略枚举
export enum RateLimitStrategy {
  FIXED_WINDOW = 'fixed_window',      // 固定窗口
  SLIDING_WINDOW = 'sliding_window',  // 滑动窗口
  TOKEN_BUCKET = 'token_bucket',      // 令牌桶
}

// 限流配置接口
export interface RateLimitConfig {
  strategy: RateLimitStrategy;        // 限流策略
  windowMs: number;                   // 时间窗口（毫秒）
  max: number;                        // 最大请求数
  keyGenerator?: (req: Request) => string; // 自定义键生成器
  skipSuccessfulRequests?: boolean;   // 是否跳过成功请求
  skipFailedRequests?: boolean;       // 是否跳过失败请求
  message?: string;                   // 限流消息
  headers?: boolean;                  // 是否返回限流头信息
  onLimitReached?: (req: Request, res: Response) => void; // 限流回调
}

// 限流结果接口
interface RateLimitResult {
  allowed: boolean;      // 是否允许请求
  remaining: number;     // 剩余请求数
  resetTime: number;     // 重置时间戳
  totalRequests: number; // 总请求数
}

/**
 * Redis 分布式限流器
 */
export class RedisRateLimiter {
  private config: Required<RateLimitConfig>;

  constructor(config: RateLimitConfig) {
    this.config = {
      strategy: config.strategy,
      windowMs: config.windowMs,
      max: config.max,
      keyGenerator: config.keyGenerator || this.defaultKeyGenerator,
      skipSuccessfulRequests: config.skipSuccessfulRequests || false,
      skipFailedRequests: config.skipFailedRequests || false,
      message: config.message || '请求过于频繁，请稍后再试',
      headers: config.headers !== false,
      onLimitReached: config.onLimitReached || (() => {}),
    };
  }

  /**
   * 创建限流中间件
   */
  middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const key = this.config.keyGenerator(req);
        const result = await this.checkRateLimit(key);

        // 设置响应头
        if (this.config.headers) {
          res.set({
            'X-RateLimit-Limit': this.config.max.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
          });
        }

        if (!result.allowed) {
          // 触发限流回调
          this.config.onLimitReached(req, res);
          
          logger.warn(`请求被限流: ${key}, 当前请求数: ${result.totalRequests}, 限制: ${this.config.max}`);
          
          return res.status(429).json(error(this.config.message, 429, {
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
          }));
        }

        // 请求成功后的处理
        const originalSend = res.json;
        res.json = function(body: any) {
          const statusCode = res.statusCode;
          
          // 根据配置决定是否计入限流
          const shouldSkip = 
            (statusCode >= 200 && statusCode < 300 && this.config.skipSuccessfulRequests) ||
            (statusCode >= 400 && this.config.skipFailedRequests);
          
          if (shouldSkip) {
            // 回滚计数
            this.rollbackRateLimit(key).catch(err => 
              logger.error('回滚限流计数失败:', err)
            );
          }
          
          return originalSend.call(this, body);
        }.bind(this);

        next();
      } catch (error) {
        logger.error('限流中间件执行失败:', error);
        next(); // 限流失败时允许请求通过，避免影响正常服务
      }
    };
  }

  /**
   * 检查限流状态
   * @param key 限流键
   */
  private async checkRateLimit(key: string): Promise<RateLimitResult> {
    switch (this.config.strategy) {
      case RateLimitStrategy.FIXED_WINDOW:
        return await this.fixedWindowRateLimit(key);
      case RateLimitStrategy.SLIDING_WINDOW:
        return await this.slidingWindowRateLimit(key);
      case RateLimitStrategy.TOKEN_BUCKET:
        return await this.tokenBucketRateLimit(key);
      default:
        throw new Error(`不支持的限流策略: ${this.config.strategy}`);
    }
  }

  /**
   * 固定窗口限流
   * @param key 限流键
   */
  private async fixedWindowRateLimit(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = Math.floor(now / this.config.windowMs) * this.config.windowMs;
    const windowKey = `rate_limit:fixed:${key}:${windowStart}`;

    // 获取当前窗口的请求数
    const currentRequests = await redisService.get<number>(windowKey) || 0;
    const newRequests = currentRequests + 1;

    // 检查是否超过限制
    const allowed = newRequests <= this.config.max;
    
    if (allowed) {
      // 增加计数并设置过期时间
      await redisService.set(windowKey, newRequests, Math.ceil(this.config.windowMs / 1000) + 1);
    }

    return {
      allowed,
      remaining: Math.max(0, this.config.max - newRequests),
      resetTime: windowStart + this.config.windowMs,
      totalRequests: newRequests,
    };
  }

  /**
   * 滑动窗口限流
   * @param key 限流键
   */
  private async slidingWindowRateLimit(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowKey = `rate_limit:sliding:${key}`;
    
    // 清理过期的请求记录
    const cutoff = now - this.config.windowMs;
    await redisService.lPush(windowKey, now);
    
    // 获取窗口内的所有请求时间戳
    const requests = await redisService.lRange<number>(windowKey, 0, -1);
    const validRequests = requests.filter(timestamp => timestamp > cutoff);
    
    // 更新列表，只保留有效的请求
    if (validRequests.length !== requests.length) {
      await redisService.del(windowKey);
      if (validRequests.length > 0) {
        await redisService.lPush(windowKey, ...validRequests);
        await redisService.expire(windowKey, Math.ceil(this.config.windowMs / 1000) + 1);
      }
    } else {
      await redisService.expire(windowKey, Math.ceil(this.config.windowMs / 1000) + 1);
    }

    const allowed = validRequests.length <= this.config.max;
    
    if (!allowed) {
      // 如果超限，移除刚添加的请求
      await redisService.rPop(windowKey);
    }

    return {
      allowed,
      remaining: Math.max(0, this.config.max - validRequests.length),
      resetTime: now + this.config.windowMs,
      totalRequests: validRequests.length,
    };
  }

  /**
   * 令牌桶限流
   * @param key 限流键
   */
  private async tokenBucketRateLimit(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const bucketKey = `rate_limit:bucket:${key}`;
    
    // 获取桶状态
    const bucketData = await redisService.hGetAll<any>(bucketKey) || {};
    
    let tokens = parseInt(bucketData.tokens) || this.config.max;
    let lastRefill = parseInt(bucketData.lastRefill) || now;
    
    // 计算需要添加的令牌数
    const timePassed = now - lastRefill;
    const tokensToAdd = Math.floor(timePassed / this.config.windowMs * this.config.max);
    tokens = Math.min(this.config.max, tokens + tokensToAdd);
    
    const allowed = tokens > 0;
    
    if (allowed) {
      tokens -= 1;
    }
    
    // 更新桶状态
    await redisService.hSet(bucketKey, 'tokens', tokens);
    await redisService.hSet(bucketKey, 'lastRefill', now);
    await redisService.expire(bucketKey, Math.ceil(this.config.windowMs / 1000) * 2);

    return {
      allowed,
      remaining: tokens,
      resetTime: now + (this.config.max - tokens) * this.config.windowMs / this.config.max,
      totalRequests: this.config.max - tokens,
    };
  }

  /**
   * 回滚限流计数（用于跳过某些请求）
   * @param key 限流键
   */
  private async rollbackRateLimit(key: string): Promise<void> {
    switch (this.config.strategy) {
      case RateLimitStrategy.FIXED_WINDOW:
        await this.rollbackFixedWindow(key);
        break;
      case RateLimitStrategy.SLIDING_WINDOW:
        await this.rollbackSlidingWindow(key);
        break;
      case RateLimitStrategy.TOKEN_BUCKET:
        await this.rollbackTokenBucket(key);
        break;
    }
  }

  /**
   * 回滚固定窗口计数
   * @param key 限流键
   */
  private async rollbackFixedWindow(key: string): Promise<void> {
    const now = Date.now();
    const windowStart = Math.floor(now / this.config.windowMs) * this.config.windowMs;
    const windowKey = `rate_limit:fixed:${key}:${windowStart}`;
    
    await redisService.decr(windowKey, 1);
  }

  /**
   * 回滚滑动窗口计数
   * @param key 限流键
   */
  private async rollbackSlidingWindow(key: string): Promise<void> {
    const windowKey = `rate_limit:sliding:${key}`;
    await redisService.rPop(windowKey);
  }

  /**
   * 回滚令牌桶计数
   * @param key 限流键
   */
  private async rollbackTokenBucket(key: string): Promise<void> {
    const bucketKey = `rate_limit:bucket:${key}`;
    await redisService.hSet(bucketKey, 'tokens', 
      Math.min(this.config.max, (await redisService.hGet<number>(bucketKey, 'tokens') || 0) + 1)
    );
  }

  /**
   * 默认键生成器（基于IP地址）
   * @param req 请求对象
   */
  private defaultKeyGenerator(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? (forwarded as string).split(',')[0] : req.connection.remoteAddress;
    return `ip:${ip}`;
  }
}

/**
 * 创建基于IP的限流中间件
 * @param config 限流配置
 */
export function createIPRateLimiter(config: Omit<RateLimitConfig, 'keyGenerator'>) {
  return new RedisRateLimiter({
    ...config,
    keyGenerator: (req: Request) => {
      const forwarded = req.headers['x-forwarded-for'];
      const ip = forwarded ? (forwarded as string).split(',')[0] : req.connection.remoteAddress;
      return `ip:${ip}`;
    },
  });
}

/**
 * 创建基于用户的限流中间件
 * @param config 限流配置
 */
export function createUserRateLimiter(config: Omit<RateLimitConfig, 'keyGenerator'>) {
  return new RedisRateLimiter({
    ...config,
    keyGenerator: (req: any) => {
      const userId = req.user?.id || req.headers['x-user-id'];
      if (!userId) {
        // 如果没有用户信息，降级为IP限流
        const forwarded = req.headers['x-forwarded-for'];
        const ip = forwarded ? (forwarded as string).split(',')[0] : req.connection.remoteAddress;
        return `ip:${ip}`;
      }
      return `user:${userId}`;
    },
  });
}

/**
 * 创建基于API端点的限流中间件
 * @param config 限流配置
 */
export function createEndpointRateLimiter(config: Omit<RateLimitConfig, 'keyGenerator'>) {
  return new RedisRateLimiter({
    ...config,
    keyGenerator: (req: Request) => {
      return `endpoint:${req.method}:${req.route?.path || req.path}`;
    },
  });
}

/**
 * 预定义的限流配置
 */
export const RateLimitPresets = {
  // 严格限流：每分钟10个请求
  STRICT: {
    strategy: RateLimitStrategy.SLIDING_WINDOW,
    windowMs: 60 * 1000,
    max: 10,
    message: '请求过于频繁，请稍后再试',
  },
  
  // 普通限流：每分钟30个请求
  NORMAL: {
    strategy: RateLimitStrategy.SLIDING_WINDOW,
    windowMs: 60 * 1000,
    max: 30,
    message: '请求过于频繁，请稍后再试',
  },
  
  // 宽松限流：每分钟100个请求
  LOOSE: {
    strategy: RateLimitStrategy.SLIDING_WINDOW,
    windowMs: 60 * 1000,
    max: 100,
    message: '请求过于频繁，请稍后再试',
  },
  
  // 登录限流：每15分钟5次尝试
  LOGIN: {
    strategy: RateLimitStrategy.FIXED_WINDOW,
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: '登录尝试过于频繁，请15分钟后再试',
  },
  
  // 注册限流：每小时3次注册
  REGISTER: {
    strategy: RateLimitStrategy.FIXED_WINDOW,
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: '注册过于频繁，请1小时后再试',
  },
  
  // API限流：每秒10个请求（令牌桶）
  API: {
    strategy: RateLimitStrategy.TOKEN_BUCKET,
    windowMs: 1000,
    max: 10,
    message: 'API请求过于频繁，请稍后再试',
  },
};

/**
 * 快速创建限流中间件的辅助函数
 */
export function rateLimiter(preset: keyof typeof RateLimitPresets, type: 'ip' | 'user' | 'endpoint' = 'ip') {
  const config = RateLimitPresets[preset];
  
  switch (type) {
    case 'ip':
      return createIPRateLimiter(config);
    case 'user':
      return createUserRateLimiter(config);
    case 'endpoint':
      return createEndpointRateLimiter(config);
    default:
      return createIPRateLimiter(config);
  }
}

export default RedisRateLimiter;
