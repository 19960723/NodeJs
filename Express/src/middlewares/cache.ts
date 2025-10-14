/**
 * Redis 缓存中间件
 * 自动缓存 API 响应，支持多种缓存策略和失效机制
 */

import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redis';
import logger from '../utils/logger';

// 缓存策略枚举
export enum CacheStrategy {
  SIMPLE = 'simple',           // 简单缓存
  CONDITIONAL = 'conditional', // 条件缓存
  TAGGED = 'tagged',          // 标签缓存
  HIERARCHICAL = 'hierarchical', // 层级缓存
}

// 缓存配置接口
export interface CacheConfig {
  strategy?: CacheStrategy;    // 缓存策略
  ttl?: number;               // 缓存时间（秒），默认300秒
  keyGenerator?: (req: Request) => string; // 自定义键生成器
  condition?: (req: Request, res: Response) => boolean; // 缓存条件
  tags?: string[] | ((req: Request) => string[]); // 缓存标签
  prefix?: string;            // 缓存键前缀
  skipCache?: (req: Request) => boolean; // 跳过缓存条件
  onHit?: (req: Request, data: any) => void; // 缓存命中回调
  onMiss?: (req: Request) => void; // 缓存未命中回调
  serialize?: (data: any) => string; // 自定义序列化
  deserialize?: (data: string) => any; // 自定义反序列化
}

// 缓存统计信息
interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  totalRequests: number;
}

/**
 * Redis 缓存中间件类
 */
export class RedisCacheMiddleware {
  private config: Required<CacheConfig>;
  private stats: Map<string, CacheStats> = new Map();

  constructor(config: CacheConfig = {}) {
    this.config = {
      strategy: config.strategy || CacheStrategy.SIMPLE,
      ttl: config.ttl || 300,
      keyGenerator: config.keyGenerator || this.defaultKeyGenerator,
      condition: config.condition || (() => true),
      tags: config.tags || [],
      prefix: config.prefix || 'cache',
      skipCache: config.skipCache || (() => false),
      onHit: config.onHit || (() => {}),
      onMiss: config.onMiss || (() => {}),
      serialize: config.serialize || JSON.stringify,
      deserialize: config.deserialize || JSON.parse,
    };
  }

  /**
   * 创建缓存中间件
   */
  middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // 检查是否跳过缓存
        if (this.config.skipCache(req) || req.method !== 'GET') {
          return next();
        }

        const cacheKey = this.generateCacheKey(req);
        const route = `${req.method} ${req.route?.path || req.path}`;

        // 尝试从缓存获取数据
        const cachedData = await this.getCachedData(cacheKey);
        
        if (cachedData) {
          // 缓存命中
          this.updateStats(route, true);
          this.config.onHit(req, cachedData);
          
          logger.debug(`缓存命中: ${cacheKey}`);
          
          // 设置缓存头
          res.set({
            'X-Cache': 'HIT',
            'X-Cache-Key': cacheKey,
          });
          
          return res.json(cachedData);
        }

        // 缓存未命中
        this.updateStats(route, false);
        this.config.onMiss(req);
        
        logger.debug(`缓存未命中: ${cacheKey}`);

        // 拦截响应
        const originalJson = res.json;
        res.json = async function(data: any) {
          try {
            // 检查缓存条件
            if (this.config.condition(req, res) && res.statusCode === 200) {
              await this.setCachedData(cacheKey, data, req);
              
              // 设置缓存头
              res.set({
                'X-Cache': 'MISS',
                'X-Cache-Key': cacheKey,
              });
            }
          } catch (error) {
            logger.error('设置缓存失败:', error);
          }
          
          return originalJson.call(this, data);
        }.bind(this);

        next();
      } catch (error) {
        logger.error('缓存中间件执行失败:', error);
        next(); // 缓存失败时继续执行，不影响正常流程
      }
    };
  }

  /**
   * 生成缓存键
   * @param req 请求对象
   */
  private generateCacheKey(req: Request): string {
    const baseKey = this.config.keyGenerator(req);
    
    switch (this.config.strategy) {
      case CacheStrategy.SIMPLE:
        return `${this.config.prefix}:${baseKey}`;
        
      case CacheStrategy.CONDITIONAL:
        const conditions = this.extractConditions(req);
        return `${this.config.prefix}:${baseKey}:${conditions}`;
        
      case CacheStrategy.TAGGED:
        return `${this.config.prefix}:${baseKey}`;
        
      case CacheStrategy.HIERARCHICAL:
        const hierarchy = this.extractHierarchy(req);
        return `${this.config.prefix}:${hierarchy}:${baseKey}`;
        
      default:
        return `${this.config.prefix}:${baseKey}`;
    }
  }

  /**
   * 获取缓存数据
   * @param key 缓存键
   */
  private async getCachedData(key: string): Promise<any | null> {
    try {
      const data = await redisService.get(key);
      return data ? this.config.deserialize(data) : null;
    } catch (error) {
      logger.error(`获取缓存数据失败: ${key}`, error);
      return null;
    }
  }

  /**
   * 设置缓存数据
   * @param key 缓存键
   * @param data 缓存数据
   * @param req 请求对象
   */
  private async setCachedData(key: string, data: any, req: Request): Promise<void> {
    try {
      const serializedData = this.config.serialize(data);
      await redisService.set(key, serializedData, this.config.ttl);
      
      // 处理标签缓存
      if (this.config.strategy === CacheStrategy.TAGGED) {
        await this.handleTaggedCache(key, req);
      }
      
      logger.debug(`缓存数据设置成功: ${key}, TTL: ${this.config.ttl}s`);
    } catch (error) {
      logger.error(`设置缓存数据失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 处理标签缓存
   * @param key 缓存键
   * @param req 请求对象
   */
  private async handleTaggedCache(key: string, req: Request): Promise<void> {
    const tags = Array.isArray(this.config.tags) 
      ? this.config.tags 
      : this.config.tags(req);

    for (const tag of tags) {
      const tagKey = `${this.config.prefix}:tag:${tag}`;
      await redisService.sAdd(tagKey, key);
      await redisService.expire(tagKey, this.config.ttl + 60); // 标签比数据多存60秒
    }
  }

  /**
   * 提取请求条件（用于条件缓存）
   * @param req 请求对象
   */
  private extractConditions(req: Request): string {
    const conditions: string[] = [];
    
    // 查询参数
    if (Object.keys(req.query).length > 0) {
      const sortedQuery = Object.keys(req.query)
        .sort()
        .map(key => `${key}=${req.query[key]}`)
        .join('&');
      conditions.push(`query:${Buffer.from(sortedQuery).toString('base64')}`);
    }
    
    // 用户信息
    if ((req as any).user) {
      conditions.push(`user:${(req as any).user.id}`);
    }
    
    // 自定义头
    const customHeaders = ['x-api-version', 'x-client-type'];
    for (const header of customHeaders) {
      if (req.headers[header]) {
        conditions.push(`${header}:${req.headers[header]}`);
      }
    }
    
    return conditions.join('|') || 'default';
  }

  /**
   * 提取层级信息（用于层级缓存）
   * @param req 请求对象
   */
  private extractHierarchy(req: Request): string {
    const pathParts = req.path.split('/').filter(Boolean);
    return pathParts.slice(0, -1).join(':') || 'root';
  }

  /**
   * 默认键生成器
   * @param req 请求对象
   */
  private defaultKeyGenerator(req: Request): string {
    const url = req.originalUrl || req.url;
    return Buffer.from(url).toString('base64').replace(/[+/=]/g, '');
  }

  /**
   * 更新统计信息
   * @param route 路由
   * @param isHit 是否命中
   */
  private updateStats(route: string, isHit: boolean): void {
    if (!this.stats.has(route)) {
      this.stats.set(route, { hits: 0, misses: 0, hitRate: 0, totalRequests: 0 });
    }
    
    const stats = this.stats.get(route)!;
    stats.totalRequests++;
    
    if (isHit) {
      stats.hits++;
    } else {
      stats.misses++;
    }
    
    stats.hitRate = stats.hits / stats.totalRequests;
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): Map<string, CacheStats> {
    return new Map(this.stats);
  }

  /**
   * 清除指定路由的统计信息
   * @param route 路由
   */
  clearStats(route?: string): void {
    if (route) {
      this.stats.delete(route);
    } else {
      this.stats.clear();
    }
  }
}

/**
 * 缓存管理器
 */
export class CacheManager {
  private prefix: string;

  constructor(prefix: string = 'cache') {
    this.prefix = prefix;
  }

  /**
   * 手动设置缓存
   * @param key 缓存键
   * @param data 缓存数据
   * @param ttl 过期时间（秒）
   */
  async set(key: string, data: any, ttl: number = 300): Promise<void> {
    const fullKey = `${this.prefix}:${key}`;
    await redisService.set(fullKey, data, ttl);
    logger.debug(`手动设置缓存: ${fullKey}, TTL: ${ttl}s`);
  }

  /**
   * 手动获取缓存
   * @param key 缓存键
   */
  async get<T = any>(key: string): Promise<T | null> {
    const fullKey = `${this.prefix}:${key}`;
    const data = await redisService.get<T>(fullKey);
    logger.debug(`手动获取缓存: ${fullKey}, 命中: ${data !== null}`);
    return data;
  }

  /**
   * 删除缓存
   * @param key 缓存键
   */
  async del(key: string): Promise<void> {
    const fullKey = `${this.prefix}:${key}`;
    await redisService.del(fullKey);
    logger.debug(`删除缓存: ${fullKey}`);
  }

  /**
   * 按模式删除缓存
   * @param pattern 匹配模式
   */
  async delByPattern(pattern: string): Promise<void> {
    const fullPattern = `${this.prefix}:${pattern}`;
    await redisService.delPattern(fullPattern);
    logger.info(`按模式删除缓存: ${fullPattern}`);
  }

  /**
   * 按标签删除缓存
   * @param tag 标签
   */
  async delByTag(tag: string): Promise<void> {
    const tagKey = `${this.prefix}:tag:${tag}`;
    const keys = await redisService.sMembers<string>(tagKey);
    
    if (keys.length > 0) {
      for (const key of keys) {
        await redisService.del(key);
      }
      await redisService.del(tagKey);
      logger.info(`按标签删除缓存: ${tag}, 删除了 ${keys.length} 个键`);
    }
  }

  /**
   * 刷新缓存（先删除后重新获取）
   * @param key 缓存键
   * @param dataFetcher 数据获取函数
   * @param ttl 过期时间（秒）
   */
  async refresh<T = any>(
    key: string, 
    dataFetcher: () => Promise<T>, 
    ttl: number = 300
  ): Promise<T> {
    await this.del(key);
    const data = await dataFetcher();
    await this.set(key, data, ttl);
    logger.info(`刷新缓存: ${key}`);
    return data;
  }

  /**
   * 获取或设置缓存
   * @param key 缓存键
   * @param dataFetcher 数据获取函数
   * @param ttl 过期时间（秒）
   */
  async getOrSet<T = any>(
    key: string,
    dataFetcher: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    let data = await this.get<T>(key);
    
    if (data === null) {
      data = await dataFetcher();
      await this.set(key, data, ttl);
      logger.debug(`缓存未命中，设置新缓存: ${key}`);
    } else {
      logger.debug(`缓存命中: ${key}`);
    }
    
    return data;
  }

  /**
   * 获取缓存信息
   * @param key 缓存键
   */
  async getInfo(key: string): Promise<{ exists: boolean; ttl: number }> {
    const fullKey = `${this.prefix}:${key}`;
    const exists = await redisService.exists(fullKey);
    const ttl = exists ? await redisService.ttl(fullKey) : -2;
    
    return { exists, ttl };
  }
}

/**
 * 预定义的缓存配置
 */
export const CachePresets = {
  // 短期缓存：5分钟
  SHORT: {
    ttl: 5 * 60,
    strategy: CacheStrategy.SIMPLE,
  },
  
  // 中期缓存：30分钟
  MEDIUM: {
    ttl: 30 * 60,
    strategy: CacheStrategy.CONDITIONAL,
  },
  
  // 长期缓存：2小时
  LONG: {
    ttl: 2 * 60 * 60,
    strategy: CacheStrategy.TAGGED,
  },
  
  // 用户相关缓存：10分钟，基于用户ID
  USER: {
    ttl: 10 * 60,
    strategy: CacheStrategy.CONDITIONAL,
    condition: (req: Request) => !!(req as any).user,
    keyGenerator: (req: Request) => {
      const userId = (req as any).user?.id || 'anonymous';
      return `${req.method}:${req.path}:user:${userId}`;
    },
  },
  
  // API数据缓存：15分钟，带标签
  API_DATA: {
    ttl: 15 * 60,
    strategy: CacheStrategy.TAGGED,
    tags: ['api', 'data'],
  },
  
  // 静态内容缓存：1小时
  STATIC: {
    ttl: 60 * 60,
    strategy: CacheStrategy.SIMPLE,
    condition: (req: Request, res: Response) => res.statusCode === 200,
  },
};

/**
 * 快速创建缓存中间件的辅助函数
 */
export function cache(preset: keyof typeof CachePresets | CacheConfig) {
  const config = typeof preset === 'string' ? CachePresets[preset] : preset;
  return new RedisCacheMiddleware(config);
}

// 导出默认缓存管理器实例
export const cacheManager = new CacheManager();

export default RedisCacheMiddleware;
