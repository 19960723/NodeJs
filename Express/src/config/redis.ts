/**
 * Redis 客户端配置
 * 包含连接池、重连机制和错误处理
 */

import { createClient, RedisClientType } from 'redis';
import logger from '../utils/logger';

// Redis 配置选项
const redisConfig = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD,
  database: parseInt(process.env.REDIS_DB || '0'),
  
  // 连接池配置
  socket: {
    connectTimeout: 10000, // 连接超时 10秒
    commandTimeout: 5000,  // 命令超时 5秒
    reconnectDelay: Math.min, // 重连延迟策略
    keepAlive: 30000,      // 保活间隔 30秒
  },
  
  // 重连配置
  retryDelayOnFailover: 100,
  enableAutoPipelining: true,
  maxRetriesPerRequest: 3,
};

// 创建 Redis 客户端
const redisClient: RedisClientType = createClient(redisConfig);

// 连接状态管理
let isConnected = false;
let isConnecting = false;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;

// 事件监听器
redisClient.on('connect', () => {
  logger.info('Redis 客户端正在连接...');
  isConnecting = true;
});

redisClient.on('ready', () => {
  logger.info('Redis 客户端连接成功并准备就绪');
  isConnected = true;
  isConnecting = false;
  reconnectAttempts = 0;
});

redisClient.on('error', (err) => {
  logger.error('Redis 客户端错误:', err);
  isConnected = false;
});

redisClient.on('end', () => {
  logger.warn('Redis 客户端连接已断开');
  isConnected = false;
});

redisClient.on('reconnecting', () => {
  reconnectAttempts++;
  logger.info(`Redis 客户端正在重连... (第 ${reconnectAttempts} 次尝试)`);
  
  if (reconnectAttempts >= maxReconnectAttempts) {
    logger.error(`Redis 重连失败，已达到最大重连次数 (${maxReconnectAttempts})`);
    redisClient.disconnect();
  }
});

/**
 * 初始化 Redis 连接
 */
export const initRedis = async (): Promise<boolean> => {
  if (isConnected || isConnecting) {
    logger.info('Redis 已连接或正在连接中');
    return isConnected;
  }

  try {
    logger.info('正在初始化 Redis 连接...');
    await redisClient.connect();
    
    // 测试连接
    const pong = await redisClient.ping();
    if (pong === 'PONG') {
      logger.info('Redis 连接测试成功');
      return true;
    } else {
      throw new Error('Redis ping 测试失败');
    }
  } catch (error) {
    logger.error('Redis 连接初始化失败:', error);
    isConnected = false;
    isConnecting = false;
    return false;
  }
};

/**
 * 关闭 Redis 连接
 */
export const closeRedis = async (): Promise<void> => {
  try {
    if (isConnected) {
      await redisClient.quit();
      logger.info('Redis 连接已正常关闭');
    }
  } catch (error) {
    logger.error('关闭 Redis 连接时发生错误:', error);
  } finally {
    isConnected = false;
    isConnecting = false;
  }
};

/**
 * 检查 Redis 连接状态
 */
export const isRedisConnected = (): boolean => {
  return isConnected && redisClient.isOpen;
};

/**
 * 获取 Redis 连接信息
 */
export const getRedisInfo = async () => {
  try {
    if (!isConnected) {
      return { status: 'disconnected', info: null };
    }
    
    const info = await redisClient.info();
    const dbSize = await redisClient.dbSize();
    const memory = await redisClient.info('memory');
    
    return {
      status: 'connected',
      dbSize,
      info: {
        server: info.split('\r\n').find(line => line.startsWith('redis_version'))?.split(':')[1],
        memory: memory.split('\r\n').find(line => line.startsWith('used_memory_human'))?.split(':')[1],
        connectedClients: info.split('\r\n').find(line => line.startsWith('connected_clients'))?.split(':')[1],
        uptimeInSeconds: info.split('\r\n').find(line => line.startsWith('uptime_in_seconds'))?.split(':')[1],
      }
    };
  } catch (error) {
    logger.error('获取 Redis 信息失败:', error);
    return { status: 'error', error: error.message };
  }
};

/**
 * 健康检查
 */
export const redisHealthCheck = async (): Promise<boolean> => {
  try {
    if (!isConnected || !redisClient.isOpen) {
      return false;
    }
    
    const pong = await redisClient.ping();
    return pong === 'PONG';
  } catch (error) {
    logger.error('Redis 健康检查失败:', error);
    return false;
  }
};

// 优雅关闭处理
process.on('SIGTERM', closeRedis);
process.on('SIGINT', closeRedis);

export default redisClient;