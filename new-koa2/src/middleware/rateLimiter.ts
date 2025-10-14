import { Context, Next } from 'koa';
import { getConfig } from '../config';
import { BusinessError } from '../types';

// 简单的内存限流器（生产环境建议使用Redis）
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * 限流中间件
 */
export const rateLimiter = (options: {
  windowMs: number; // 时间窗口（毫秒）
  max: number; // 最大请求数
  keyGenerator?: (ctx: Context) => string; // 自定义key生成器
  skipSuccessfulRequests?: boolean; // 是否跳过成功请求
  skipFailedRequests?: boolean; // 是否跳过失败请求
}) => {
  const {
    windowMs,
    max,
    keyGenerator = (ctx: Context) => ctx.ip,
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = options;

  return async (ctx: Context, next: Next): Promise<void> => {
    const key = keyGenerator(ctx);
    const now = Date.now();
    const windowStart = now - windowMs;

    // 清理过期的记录
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k);
      }
    }

    const current = rateLimitStore.get(key);
    
    if (!current || current.resetTime < now) {
      // 创建新的限流记录
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
    } else if (current.count >= max) {
      // 超过限制
      ctx.set('Retry-After', Math.ceil((current.resetTime - now) / 1000).toString());
      throw new BusinessError(429, '请求过于频繁，请稍后再试');
    } else {
      // 增加计数
      current.count++;
    }

    await next();

    // 根据请求结果决定是否计数
    const shouldSkip = 
      (skipSuccessfulRequests && ctx.status < 400) ||
      (skipFailedRequests && ctx.status >= 400);

    if (shouldSkip && current) {
      current.count = Math.max(0, current.count - 1);
    }
  };
};

/**
 * API限流中间件
 */
export const apiRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 最多100个请求
  keyGenerator: (ctx: Context) => `api:${ctx.ip}`,
  skipSuccessfulRequests: false
});

/**
 * 登录限流中间件
 */
export const loginRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 5, // 最多5次登录尝试
  keyGenerator: (ctx: Context) => `login:${ctx.ip}`,
  skipSuccessfulRequests: true
});
