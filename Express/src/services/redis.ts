/**
 * Redis 缓存服务
 * 提供统一的缓存操作接口，支持各种数据类型的缓存
 */

import redisClient from '../config/redis';
import logger from '../utils/logger';

export class RedisService {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param value 缓存值
   * @param ttl 过期时间（秒），默认3600秒（1小时）
   */
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await redisClient.setEx(key, ttl, serializedValue);
      logger.debug(`缓存设置成功: ${key}, TTL: ${ttl}s`);
    } catch (error) {
      logger.error(`缓存设置失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @returns 缓存值或null
   */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.get(key);
      if (!value) return null;
      
      const parsed = JSON.parse(value);
      logger.debug(`缓存命中: ${key}`);
      return parsed as T;
    } catch (error) {
      logger.error(`缓存获取失败: ${key}`, error);
      return null;
    }
  }

  /**
   * 删除缓存
   * @param key 缓存键
   */
  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
      logger.debug(`缓存删除成功: ${key}`);
    } catch (error) {
      logger.error(`缓存删除失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 批量删除缓存（支持模式匹配）
   * @param pattern 匹配模式，如 "user:*"
   */
  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
        logger.debug(`批量删除缓存成功: ${pattern}, 删除了 ${keys.length} 个键`);
      }
    } catch (error) {
      logger.error(`批量删除缓存失败: ${pattern}`, error);
      throw error;
    }
  }

  /**
   * 检查缓存是否存在
   * @param key 缓存键
   */
  async exists(key: string): Promise<boolean> {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`检查缓存存在性失败: ${key}`, error);
      return false;
    }
  }

  /**
   * 设置缓存过期时间
   * @param key 缓存键
   * @param ttl 过期时间（秒）
   */
  async expire(key: string, ttl: number): Promise<void> {
    try {
      await redisClient.expire(key, ttl);
      logger.debug(`设置缓存过期时间: ${key}, TTL: ${ttl}s`);
    } catch (error) {
      logger.error(`设置缓存过期时间失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 获取缓存剩余过期时间
   * @param key 缓存键
   * @returns 剩余时间（秒），-1表示永不过期，-2表示键不存在
   */
  async ttl(key: string): Promise<number> {
    try {
      return await redisClient.ttl(key);
    } catch (error) {
      logger.error(`获取缓存过期时间失败: ${key}`, error);
      return -2;
    }
  }

  /**
   * 原子递增
   * @param key 缓存键
   * @param increment 递增值，默认为1
   */
  async incr(key: string, increment: number = 1): Promise<number> {
    try {
      const result = await redisClient.incrBy(key, increment);
      logger.debug(`缓存递增: ${key}, 增量: ${increment}, 结果: ${result}`);
      return result;
    } catch (error) {
      logger.error(`缓存递增失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 原子递减
   * @param key 缓存键
   * @param decrement 递减值，默认为1
   */
  async decr(key: string, decrement: number = 1): Promise<number> {
    try {
      const result = await redisClient.decrBy(key, decrement);
      logger.debug(`缓存递减: ${key}, 减量: ${decrement}, 结果: ${result}`);
      return result;
    } catch (error) {
      logger.error(`缓存递减失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 哈希表操作 - 设置字段
   * @param key 哈希表键
   * @param field 字段名
   * @param value 字段值
   */
  async hSet(key: string, field: string, value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await redisClient.hSet(key, field, serializedValue);
      logger.debug(`哈希表设置成功: ${key}.${field}`);
    } catch (error) {
      logger.error(`哈希表设置失败: ${key}.${field}`, error);
      throw error;
    }
  }

  /**
   * 哈希表操作 - 获取字段
   * @param key 哈希表键
   * @param field 字段名
   */
  async hGet<T = any>(key: string, field: string): Promise<T | null> {
    try {
      const value = await redisClient.hGet(key, field);
      if (!value) return null;
      
      const parsed = JSON.parse(value);
      logger.debug(`哈希表获取成功: ${key}.${field}`);
      return parsed as T;
    } catch (error) {
      logger.error(`哈希表获取失败: ${key}.${field}`, error);
      return null;
    }
  }

  /**
   * 哈希表操作 - 获取所有字段
   * @param key 哈希表键
   */
  async hGetAll<T = any>(key: string): Promise<Record<string, T>> {
    try {
      const values = await redisClient.hGetAll(key);
      const result: Record<string, T> = {};
      
      for (const [field, value] of Object.entries(values)) {
        try {
          result[field] = JSON.parse(value) as T;
        } catch {
          result[field] = value as T;
        }
      }
      
      logger.debug(`哈希表获取所有字段成功: ${key}`);
      return result;
    } catch (error) {
      logger.error(`哈希表获取所有字段失败: ${key}`, error);
      return {};
    }
  }

  /**
   * 哈希表操作 - 删除字段
   * @param key 哈希表键
   * @param field 字段名
   */
  async hDel(key: string, field: string): Promise<void> {
    try {
      await redisClient.hDel(key, field);
      logger.debug(`哈希表删除字段成功: ${key}.${field}`);
    } catch (error) {
      logger.error(`哈希表删除字段失败: ${key}.${field}`, error);
      throw error;
    }
  }

  /**
   * 列表操作 - 左推入
   * @param key 列表键
   * @param values 要推入的值
   */
  async lPush(key: string, ...values: any[]): Promise<number> {
    try {
      const serializedValues = values.map(v => JSON.stringify(v));
      const result = await redisClient.lPush(key, serializedValues);
      logger.debug(`列表左推入成功: ${key}, 数量: ${values.length}`);
      return result;
    } catch (error) {
      logger.error(`列表左推入失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 列表操作 - 右推入
   * @param key 列表键
   * @param values 要推入的值
   */
  async rPush(key: string, ...values: any[]): Promise<number> {
    try {
      const serializedValues = values.map(v => JSON.stringify(v));
      const result = await redisClient.rPush(key, serializedValues);
      logger.debug(`列表右推入成功: ${key}, 数量: ${values.length}`);
      return result;
    } catch (error) {
      logger.error(`列表右推入失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 列表操作 - 左弹出
   * @param key 列表键
   */
  async lPop<T = any>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.lPop(key);
      if (!value) return null;
      
      const parsed = JSON.parse(value);
      logger.debug(`列表左弹出成功: ${key}`);
      return parsed as T;
    } catch (error) {
      logger.error(`列表左弹出失败: ${key}`, error);
      return null;
    }
  }

  /**
   * 列表操作 - 右弹出
   * @param key 列表键
   */
  async rPop<T = any>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.rPop(key);
      if (!value) return null;
      
      const parsed = JSON.parse(value);
      logger.debug(`列表右弹出成功: ${key}`);
      return parsed as T;
    } catch (error) {
      logger.error(`列表右弹出失败: ${key}`, error);
      return null;
    }
  }

  /**
   * 列表操作 - 获取范围内的元素
   * @param key 列表键
   * @param start 开始索引
   * @param stop 结束索引
   */
  async lRange<T = any>(key: string, start: number, stop: number): Promise<T[]> {
    try {
      const values = await redisClient.lRange(key, start, stop);
      const result = values.map(value => {
        try {
          return JSON.parse(value) as T;
        } catch {
          return value as T;
        }
      });
      logger.debug(`列表范围获取成功: ${key}, 范围: ${start}-${stop}`);
      return result;
    } catch (error) {
      logger.error(`列表范围获取失败: ${key}`, error);
      return [];
    }
  }

  /**
   * 集合操作 - 添加成员
   * @param key 集合键
   * @param members 成员
   */
  async sAdd(key: string, ...members: any[]): Promise<number> {
    try {
      const serializedMembers = members.map(m => JSON.stringify(m));
      const result = await redisClient.sAdd(key, serializedMembers);
      logger.debug(`集合添加成员成功: ${key}, 数量: ${members.length}`);
      return result;
    } catch (error) {
      logger.error(`集合添加成员失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 集合操作 - 获取所有成员
   * @param key 集合键
   */
  async sMembers<T = any>(key: string): Promise<T[]> {
    try {
      const members = await redisClient.sMembers(key);
      const result = members.map(member => {
        try {
          return JSON.parse(member) as T;
        } catch {
          return member as T;
        }
      });
      logger.debug(`集合获取所有成员成功: ${key}`);
      return result;
    } catch (error) {
      logger.error(`集合获取所有成员失败: ${key}`, error);
      return [];
    }
  }

  /**
   * 集合操作 - 检查成员是否存在
   * @param key 集合键
   * @param member 成员
   */
  async sIsMember(key: string, member: any): Promise<boolean> {
    try {
      const serializedMember = JSON.stringify(member);
      const result = await redisClient.sIsMember(key, serializedMember);
      logger.debug(`集合成员检查: ${key}, 存在: ${result}`);
      return Boolean(result);
    } catch (error) {
      logger.error(`集合成员检查失败: ${key}`, error);
      return false;
    }
  }

  /**
   * 集合操作 - 移除成员
   * @param key 集合键
   * @param members 要移除的成员
   */
  async sRem(key: string, ...members: any[]): Promise<number> {
    try {
      const serializedMembers = members.map(m => JSON.stringify(m));
      const result = await redisClient.sRem(key, serializedMembers);
      logger.debug(`集合移除成员成功: ${key}, 数量: ${members.length}`);
      return result;
    } catch (error) {
      logger.error(`集合移除成员失败: ${key}`, error);
      throw error;
    }
  }

  /**
   * 发布消息到频道
   * @param channel 频道名
   * @param message 消息内容
   */
  async publish(channel: string, message: any): Promise<number> {
    try {
      const serializedMessage = JSON.stringify(message);
      const result = await redisClient.publish(channel, serializedMessage);
      logger.debug(`发布消息成功: ${channel}`);
      return result;
    } catch (error) {
      logger.error(`发布消息失败: ${channel}`, error);
      throw error;
    }
  }

  /**
   * 订阅频道
   * @param channel 频道名
   * @param callback 回调函数
   */
  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    try {
      const subscriber = redisClient.duplicate();
      await subscriber.connect();
      
      await subscriber.subscribe(channel, (message) => {
        try {
          const parsed = JSON.parse(message);
          callback(parsed);
        } catch {
          callback(message);
        }
      });
      
      logger.debug(`订阅频道成功: ${channel}`);
    } catch (error) {
      logger.error(`订阅频道失败: ${channel}`, error);
      throw error;
    }
  }

  /**
   * 清空所有缓存（慎用！）
   */
  async flushAll(): Promise<void> {
    try {
      await redisClient.flushAll();
      logger.warn('已清空所有Redis缓存');
    } catch (error) {
      logger.error('清空Redis缓存失败', error);
      throw error;
    }
  }

  /**
   * 获取Redis信息
   */
  async info(): Promise<string> {
    try {
      return await redisClient.info();
    } catch (error) {
      logger.error('获取Redis信息失败', error);
      throw error;
    }
  }

  /**
   * 获取数据库大小
   */
  async dbSize(): Promise<number> {
    try {
      return await redisClient.dbSize();
    } catch (error) {
      logger.error('获取数据库大小失败', error);
      throw error;
    }
  }
}

// 导出单例实例
export const redisService = new RedisService();
export default redisService;
