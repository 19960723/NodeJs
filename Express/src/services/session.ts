/**
 * Redis 会话管理服务
 * 提供用户会话的创建、验证、刷新和销毁功能
 */

import jwt from 'jsonwebtoken';
import { redisService } from './redis';
import logger from '../utils/logger';

// 会话配置
const SESSION_CONFIG = {
  // JWT 配置
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || '15m', // 访问令牌15分钟
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || '7d',  // 刷新令牌7天
  
  // Redis 键前缀
  SESSION_PREFIX: 'session:',
  REFRESH_TOKEN_PREFIX: 'refresh:',
  USER_SESSIONS_PREFIX: 'user_sessions:',
  BLACKLIST_PREFIX: 'blacklist:',
  
  // 会话配置
  MAX_SESSIONS_PER_USER: parseInt(process.env.MAX_SESSIONS_PER_USER || '5'), // 每个用户最大会话数
  SESSION_TIMEOUT: 7 * 24 * 60 * 60, // 7天（秒）
};

// 用户信息接口
export interface UserPayload {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  role?: string;
}

// 会话信息接口
export interface SessionInfo {
  sessionId: string;
  userId: number;
  username: string;
  createdAt: Date;
  lastAccessAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
}

// 令牌对接口
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class SessionService {
  /**
   * 创建用户会话
   * @param user 用户信息
   * @param ipAddress 客户端IP
   * @param userAgent 用户代理
   * @returns 令牌对和会话信息
   */
  async createSession(
    user: UserPayload,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ tokens: TokenPair; session: SessionInfo }> {
    try {
      // 生成唯一会话ID
      const sessionId = this.generateSessionId();
      const now = new Date();

      // 创建会话信息
      const sessionInfo: SessionInfo = {
        sessionId,
        userId: user.id,
        username: user.username,
        createdAt: now,
        lastAccessAt: now,
        ipAddress,
        userAgent,
        deviceInfo: this.parseDeviceInfo(userAgent),
      };

      // 生成访问令牌
      const accessToken = jwt.sign(
        {
          sessionId,
          userId: user.id,
          username: user.username,
          type: 'access',
        },
        SESSION_CONFIG.JWT_SECRET,
        { expiresIn: SESSION_CONFIG.ACCESS_TOKEN_EXPIRES }
      );

      // 生成刷新令牌
      const refreshToken = jwt.sign(
        {
          sessionId,
          userId: user.id,
          username: user.username,
          type: 'refresh',
        },
        SESSION_CONFIG.JWT_SECRET,
        { expiresIn: SESSION_CONFIG.REFRESH_TOKEN_EXPIRES }
      );

      // 计算过期时间
      const expiresIn = this.parseExpiresIn(SESSION_CONFIG.ACCESS_TOKEN_EXPIRES);

      // 存储会话信息到 Redis
      const sessionKey = `${SESSION_CONFIG.SESSION_PREFIX}${sessionId}`;
      await redisService.set(sessionKey, sessionInfo, SESSION_CONFIG.SESSION_TIMEOUT);

      // 存储刷新令牌
      const refreshKey = `${SESSION_CONFIG.REFRESH_TOKEN_PREFIX}${sessionId}`;
      await redisService.set(refreshKey, refreshToken, SESSION_CONFIG.SESSION_TIMEOUT);

      // 管理用户会话列表
      await this.manageUserSessions(user.id, sessionId);

      logger.info(`用户会话创建成功: userId=${user.id}, sessionId=${sessionId}`);

      return {
        tokens: {
          accessToken,
          refreshToken,
          expiresIn,
        },
        session: sessionInfo,
      };
    } catch (error) {
      logger.error('创建用户会话失败:', error);
      throw new Error('会话创建失败');
    }
  }

  /**
   * 验证访问令牌
   * @param token 访问令牌
   * @returns 用户信息和会话信息
   */
  async validateAccessToken(token: string): Promise<{ user: UserPayload; session: SessionInfo } | null> {
    try {
      // 检查令牌是否在黑名单中
      if (await this.isTokenBlacklisted(token)) {
        logger.warn('访问被拒绝：令牌在黑名单中');
        return null;
      }

      // 验证 JWT
      const decoded = jwt.verify(token, SESSION_CONFIG.JWT_SECRET) as any;
      
      if (decoded.type !== 'access') {
        logger.warn('访问被拒绝：令牌类型错误');
        return null;
      }

      // 获取会话信息
      const sessionKey = `${SESSION_CONFIG.SESSION_PREFIX}${decoded.sessionId}`;
      const sessionInfo = await redisService.get<SessionInfo>(sessionKey);

      if (!sessionInfo) {
        logger.warn(`访问被拒绝：会话不存在 sessionId=${decoded.sessionId}`);
        return null;
      }

      // 更新最后访问时间
      sessionInfo.lastAccessAt = new Date();
      await redisService.set(sessionKey, sessionInfo, SESSION_CONFIG.SESSION_TIMEOUT);

      const user: UserPayload = {
        id: decoded.userId,
        username: decoded.username,
      };

      logger.debug(`访问令牌验证成功: userId=${user.id}, sessionId=${decoded.sessionId}`);

      return { user, session: sessionInfo };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        logger.warn('访问被拒绝：令牌已过期');
      } else if (error.name === 'JsonWebTokenError') {
        logger.warn('访问被拒绝：令牌无效');
      } else {
        logger.error('验证访问令牌失败:', error);
      }
      return null;
    }
  }

  /**
   * 刷新访问令牌
   * @param refreshToken 刷新令牌
   * @returns 新的令牌对
   */
  async refreshAccessToken(refreshToken: string): Promise<TokenPair | null> {
    try {
      // 检查刷新令牌是否在黑名单中
      if (await this.isTokenBlacklisted(refreshToken)) {
        logger.warn('刷新被拒绝：刷新令牌在黑名单中');
        return null;
      }

      // 验证刷新令牌
      const decoded = jwt.verify(refreshToken, SESSION_CONFIG.JWT_SECRET) as any;
      
      if (decoded.type !== 'refresh') {
        logger.warn('刷新被拒绝：令牌类型错误');
        return null;
      }

      // 验证存储的刷新令牌
      const refreshKey = `${SESSION_CONFIG.REFRESH_TOKEN_PREFIX}${decoded.sessionId}`;
      const storedRefreshToken = await redisService.get<string>(refreshKey);

      if (storedRefreshToken !== refreshToken) {
        logger.warn(`刷新被拒绝：刷新令牌不匹配 sessionId=${decoded.sessionId}`);
        return null;
      }

      // 获取会话信息
      const sessionKey = `${SESSION_CONFIG.SESSION_PREFIX}${decoded.sessionId}`;
      const sessionInfo = await redisService.get<SessionInfo>(sessionKey);

      if (!sessionInfo) {
        logger.warn(`刷新被拒绝：会话不存在 sessionId=${decoded.sessionId}`);
        return null;
      }

      // 生成新的访问令牌
      const newAccessToken = jwt.sign(
        {
          sessionId: decoded.sessionId,
          userId: decoded.userId,
          username: decoded.username,
          type: 'access',
        },
        SESSION_CONFIG.JWT_SECRET,
        { expiresIn: SESSION_CONFIG.ACCESS_TOKEN_EXPIRES }
      );

      // 生成新的刷新令牌
      const newRefreshToken = jwt.sign(
        {
          sessionId: decoded.sessionId,
          userId: decoded.userId,
          username: decoded.username,
          type: 'refresh',
        },
        SESSION_CONFIG.JWT_SECRET,
        { expiresIn: SESSION_CONFIG.REFRESH_TOKEN_EXPIRES }
      );

      // 更新存储的刷新令牌
      await redisService.set(refreshKey, newRefreshToken, SESSION_CONFIG.SESSION_TIMEOUT);

      // 更新会话最后访问时间
      sessionInfo.lastAccessAt = new Date();
      await redisService.set(sessionKey, sessionInfo, SESSION_CONFIG.SESSION_TIMEOUT);

      const expiresIn = this.parseExpiresIn(SESSION_CONFIG.ACCESS_TOKEN_EXPIRES);

      logger.info(`访问令牌刷新成功: userId=${decoded.userId}, sessionId=${decoded.sessionId}`);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        logger.warn('刷新被拒绝：刷新令牌已过期');
      } else if (error.name === 'JsonWebTokenError') {
        logger.warn('刷新被拒绝：刷新令牌无效');
      } else {
        logger.error('刷新访问令牌失败:', error);
      }
      return null;
    }
  }

  /**
   * 销毁会话
   * @param sessionId 会话ID
   */
  async destroySession(sessionId: string): Promise<void> {
    try {
      // 获取会话信息
      const sessionKey = `${SESSION_CONFIG.SESSION_PREFIX}${sessionId}`;
      const sessionInfo = await redisService.get<SessionInfo>(sessionKey);

      if (sessionInfo) {
        // 从用户会话列表中移除
        const userSessionsKey = `${SESSION_CONFIG.USER_SESSIONS_PREFIX}${sessionInfo.userId}`;
        await redisService.sRem(userSessionsKey, sessionId);
      }

      // 删除会话信息
      await redisService.del(sessionKey);

      // 删除刷新令牌
      const refreshKey = `${SESSION_CONFIG.REFRESH_TOKEN_PREFIX}${sessionId}`;
      await redisService.del(refreshKey);

      logger.info(`会话销毁成功: sessionId=${sessionId}`);
    } catch (error) {
      logger.error(`销毁会话失败: sessionId=${sessionId}`, error);
      throw error;
    }
  }

  /**
   * 销毁用户所有会话
   * @param userId 用户ID
   */
  async destroyUserSessions(userId: number): Promise<void> {
    try {
      // 获取用户所有会话
      const userSessionsKey = `${SESSION_CONFIG.USER_SESSIONS_PREFIX}${userId}`;
      const sessionIds = await redisService.sMembers<string>(userSessionsKey);

      // 销毁所有会话
      for (const sessionId of sessionIds) {
        await this.destroySession(sessionId);
      }

      // 清空用户会话列表
      await redisService.del(userSessionsKey);

      logger.info(`用户所有会话销毁成功: userId=${userId}, 会话数量=${sessionIds.length}`);
    } catch (error) {
      logger.error(`销毁用户所有会话失败: userId=${userId}`, error);
      throw error;
    }
  }

  /**
   * 将令牌加入黑名单
   * @param token 令牌
   * @param expiresIn 过期时间（秒）
   */
  async blacklistToken(token: string, expiresIn?: number): Promise<void> {
    try {
      const blacklistKey = `${SESSION_CONFIG.BLACKLIST_PREFIX}${this.hashToken(token)}`;
      const ttl = expiresIn || SESSION_CONFIG.SESSION_TIMEOUT;
      
      await redisService.set(blacklistKey, true, ttl);
      logger.debug('令牌已加入黑名单');
    } catch (error) {
      logger.error('将令牌加入黑名单失败:', error);
      throw error;
    }
  }

  /**
   * 检查令牌是否在黑名单中
   * @param token 令牌
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    try {
      const blacklistKey = `${SESSION_CONFIG.BLACKLIST_PREFIX}${this.hashToken(token)}`;
      return await redisService.exists(blacklistKey);
    } catch (error) {
      logger.error('检查令牌黑名单状态失败:', error);
      return false;
    }
  }

  /**
   * 获取用户活跃会话列表
   * @param userId 用户ID
   */
  async getUserSessions(userId: number): Promise<SessionInfo[]> {
    try {
      const userSessionsKey = `${SESSION_CONFIG.USER_SESSIONS_PREFIX}${userId}`;
      const sessionIds = await redisService.sMembers<string>(userSessionsKey);

      const sessions: SessionInfo[] = [];
      
      for (const sessionId of sessionIds) {
        const sessionKey = `${SESSION_CONFIG.SESSION_PREFIX}${sessionId}`;
        const sessionInfo = await redisService.get<SessionInfo>(sessionKey);
        
        if (sessionInfo) {
          sessions.push(sessionInfo);
        } else {
          // 清理无效的会话ID
          await redisService.sRem(userSessionsKey, sessionId);
        }
      }

      return sessions.sort((a, b) => 
        new Date(b.lastAccessAt).getTime() - new Date(a.lastAccessAt).getTime()
      );
    } catch (error) {
      logger.error(`获取用户会话列表失败: userId=${userId}`, error);
      return [];
    }
  }

  /**
   * 管理用户会话数量
   * @param userId 用户ID
   * @param newSessionId 新会话ID
   */
  private async manageUserSessions(userId: number, newSessionId: string): Promise<void> {
    const userSessionsKey = `${SESSION_CONFIG.USER_SESSIONS_PREFIX}${userId}`;
    
    // 添加新会话
    await redisService.sAdd(userSessionsKey, newSessionId);
    await redisService.expire(userSessionsKey, SESSION_CONFIG.SESSION_TIMEOUT);

    // 检查会话数量
    const sessionIds = await redisService.sMembers<string>(userSessionsKey);
    
    if (sessionIds.length > SESSION_CONFIG.MAX_SESSIONS_PER_USER) {
      // 获取所有会话的最后访问时间，删除最旧的会话
      const sessionsWithTime: Array<{ sessionId: string; lastAccessAt: Date }> = [];
      
      for (const sessionId of sessionIds) {
        const sessionKey = `${SESSION_CONFIG.SESSION_PREFIX}${sessionId}`;
        const sessionInfo = await redisService.get<SessionInfo>(sessionKey);
        
        if (sessionInfo) {
          sessionsWithTime.push({
            sessionId,
            lastAccessAt: new Date(sessionInfo.lastAccessAt),
          });
        } else {
          // 清理无效的会话ID
          await redisService.sRem(userSessionsKey, sessionId);
        }
      }

      // 按最后访问时间排序，删除最旧的会话
      sessionsWithTime.sort((a, b) => a.lastAccessAt.getTime() - b.lastAccessAt.getTime());
      
      const sessionsToRemove = sessionsWithTime.slice(0, sessionsWithTime.length - SESSION_CONFIG.MAX_SESSIONS_PER_USER);
      
      for (const { sessionId } of sessionsToRemove) {
        await this.destroySession(sessionId);
        logger.info(`已删除用户最旧会话: userId=${userId}, sessionId=${sessionId}`);
      }
    }
  }

  /**
   * 生成会话ID
   */
  private generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}_${random}`;
  }

  /**
   * 解析设备信息
   * @param userAgent 用户代理字符串
   */
  private parseDeviceInfo(userAgent?: string): string {
    if (!userAgent) return 'Unknown';
    
    // 简单的设备信息解析
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Macintosh')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    
    return 'Desktop';
  }

  /**
   * 解析过期时间字符串为秒数
   * @param expiresIn 过期时间字符串（如 '15m', '7d'）
   */
  private parseExpiresIn(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 60 * 60;
      case 'd': return value * 24 * 60 * 60;
      default: return 3600; // 默认1小时
    }
  }

  /**
   * 对令牌进行哈希处理（用于黑名单）
   * @param token 令牌
   */
  private hashToken(token: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(token).digest('hex').substring(0, 16);
  }
}

// 导出单例实例
export const sessionService = new SessionService();
export default sessionService;
