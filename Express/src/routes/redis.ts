/**
 * Redis 管理路由
 * 提供缓存管理、会话管理和限流统计等功能
 */

import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest, roleMiddleware } from '../middlewares/authMiddleware';
import { redisService } from '../services/redis';
import { sessionService } from '../services/session';
import { cacheManager } from '../middlewares/cache';
import { getRedisInfo, isRedisConnected } from '../config/redis';
import { success, error } from '../utils/result';
import logger from '../utils/logger';

const router = Router();

/**
 * 获取 Redis 状态信息
 */
router.get('/status', authMiddleware, roleMiddleware(['admin']), async (_req: Request, res: Response) => {
  try {
    const connected = isRedisConnected();
    const info = await getRedisInfo();
    const dbSize = connected ? await redisService.dbSize() : 0;

    res.json(success({
      connected,
      dbSize,
      info
    }));
  } catch (err) {
    logger.error('获取 Redis 状态失败:', err);
    res.status(500).json(error('获取 Redis 状态失败'));
  }
});

/**
 * 缓存管理相关路由
 */

// 获取缓存信息
router.get('/cache/:key/info', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const info = await cacheManager.getInfo(key);
    
    res.json(success(info));
  } catch (err) {
    logger.error(`获取缓存信息失败: ${req.params.key}`, err);
    res.status(500).json(error('获取缓存信息失败'));
  }
});

// 获取缓存内容
router.get('/cache/:key', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const data = await cacheManager.get(key);
    
    if (data === null) {
      return res.status(404).json(error('缓存不存在'));
    }
    
    res.json(success(data));
  } catch (err) {
    logger.error(`获取缓存失败: ${req.params.key}`, err);
    res.status(500).json(error('获取缓存失败'));
  }
});

// 设置缓存
router.post('/cache/:key', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const { data, ttl = 300 } = req.body;
    
    await cacheManager.set(key, data, ttl);
    
    res.json(success({ message: '缓存设置成功' }));
  } catch (err) {
    logger.error(`设置缓存失败: ${req.params.key}`, err);
    res.status(500).json(error('设置缓存失败'));
  }
});

// 删除缓存
router.delete('/cache/:key', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    await cacheManager.del(key);
    
    res.json(success({ message: '缓存删除成功' }));
  } catch (err) {
    logger.error(`删除缓存失败: ${req.params.key}`, err);
    res.status(500).json(error('删除缓存失败'));
  }
});

// 按模式删除缓存
router.delete('/cache/pattern/:pattern', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { pattern } = req.params;
    await cacheManager.delByPattern(pattern);
    
    res.json(success({ message: '缓存删除成功' }));
  } catch (err) {
    logger.error(`按模式删除缓存失败: ${req.params.pattern}`, err);
    res.status(500).json(error('删除缓存失败'));
  }
});

// 按标签删除缓存
router.delete('/cache/tag/:tag', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;
    await cacheManager.delByTag(tag);
    
    res.json(success({ message: '缓存删除成功' }));
  } catch (err) {
    logger.error(`按标签删除缓存失败: ${req.params.tag}`, err);
    res.status(500).json(error('删除缓存失败'));
  }
});

/**
 * 会话管理相关路由
 */

// 获取当前用户会话列表
router.get('/sessions/my', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(error('未授权'));
    }

    const sessions = await sessionService.getUserSessions(req.user.id);
    
    res.json(success(sessions));
  } catch (err) {
    logger.error('获取用户会话列表失败:', err);
    res.status(500).json(error('获取会话列表失败'));
  }
});

// 获取指定用户会话列表（管理员）
router.get('/sessions/user/:userId', authMiddleware, roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const sessions = await sessionService.getUserSessions(userId);
    
    res.json(success(sessions));
  } catch (err) {
    logger.error(`获取用户会话列表失败: userId=${req.params.userId}`, err);
    res.status(500).json(error('获取会话列表失败'));
  }
});

// 销毁指定会话
router.delete('/sessions/:sessionId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    // 检查权限：用户只能销毁自己的会话，管理员可以销毁任何会话
    if (req.user?.role !== 'admin' && req.session?.sessionId !== sessionId) {
      return res.status(403).json(error('无权限销毁此会话'));
    }
    
    await sessionService.destroySession(sessionId);
    
    res.json(success({ message: '会话销毁成功' }));
  } catch (err) {
    logger.error(`销毁会话失败: sessionId=${req.params.sessionId}`, err);
    res.status(500).json(error('销毁会话失败'));
  }
});

// 销毁用户所有会话
router.delete('/sessions/user/:userId/all', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    
    // 检查权限：用户只能销毁自己的会话，管理员可以销毁任何用户的会话
    if (req.user?.role !== 'admin' && req.user?.id !== userId) {
      return res.status(403).json(error('无权限销毁此用户的会话'));
    }
    
    await sessionService.destroyUserSessions(userId);
    
    res.json(success({ message: '用户所有会话销毁成功' }));
  } catch (err) {
    logger.error(`销毁用户所有会话失败: userId=${req.params.userId}`, err);
    res.status(500).json(error('销毁会话失败'));
  }
});

/**
 * 系统管理相关路由
 */

// 清空所有缓存（危险操作）
router.delete('/flush-all', authMiddleware, roleMiddleware(['admin']), async (_req: Request, res: Response) => {
  try {
    await redisService.flushAll();
    
    logger.warn('管理员清空了所有 Redis 缓存');
    res.json(success({ message: '所有缓存已清空' }));
  } catch (err) {
    logger.error('清空缓存失败:', err);
    res.status(500).json(error('清空缓存失败'));
  }
});

// 获取 Redis 统计信息
router.get('/stats', authMiddleware, roleMiddleware(['admin']), async (_req: Request, res: Response) => {
  try {
    const info = await redisService.info();
    const dbSize = await redisService.dbSize();
    
    // 解析 Redis INFO 命令的输出
    const stats = {
      dbSize,
      memory: {},
      clients: {},
      stats: {},
      replication: {},
    };

    const lines = info.split('\r\n');
    for (const line of lines) {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        
        if (key.startsWith('used_memory')) {
          stats.memory[key] = value;
        } else if (key.startsWith('connected_clients') || key.startsWith('client_')) {
          stats.clients[key] = value;
        } else if (key.includes('_stats') || key.includes('keyspace_')) {
          stats.stats[key] = value;
        } else if (key.startsWith('role') || key.startsWith('master_') || key.startsWith('slave_')) {
          stats.replication[key] = value;
        }
      }
    }
    
    res.json(success(stats));
  } catch (err) {
    logger.error('获取 Redis 统计信息失败:', err);
    res.status(500).json(error('获取统计信息失败'));
  }
});

// 执行 Redis 命令（超级管理员功能，谨慎使用）
router.post('/command', authMiddleware, roleMiddleware(['superadmin']), async (req: Request, res: Response) => {
  try {
    const { command, args = [] } = req.body;
    
    if (!command) {
      return res.status(400).json(error('缺少命令参数'));
    }
    
    // 禁止危险命令
    const dangerousCommands = ['FLUSHALL', 'FLUSHDB', 'CONFIG', 'EVAL', 'EVALSHA', 'SCRIPT'];
    if (dangerousCommands.includes(command.toUpperCase())) {
      return res.status(403).json(error('禁止执行危险命令'));
    }
    
    // 这里需要根据具体的 Redis 客户端实现
    // const result = await redisClient.sendCommand([command, ...args]);
    
    logger.warn(`管理员执行 Redis 命令: ${command} ${args.join(' ')}`);
    res.json(success({ message: '命令执行完成（功能待实现）' }));
  } catch (err) {
    logger.error('执行 Redis 命令失败:', err);
    res.status(500).json(error('命令执行失败'));
  }
});

export default router;
