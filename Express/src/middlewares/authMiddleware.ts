import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error } from "../utils/result";
import { sessionService, UserPayload, SessionInfo } from "../services/session";
import logger from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  user?: UserPayload;
  session?: SessionInfo;
}

/**
 * 基于 Redis 会话的认证中间件
 * 验证访问令牌并检查会话状态
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(error("未授權，請先登入", 401));
    }

    const token = authHeader.split(" ")[1];

    // 使用会话服务验证令牌
    const result = await sessionService.validateAccessToken(token);

    if (!result) {
      return res.status(401).json(error("Token 無效或已過期", 401));
    }

    // 将用户信息和会话信息附加到请求对象
    req.user = result.user;
    req.session = result.session;

    next();
  } catch (err) {
    logger.error('认证中间件执行失败:', err);
    return res.status(401).json(error("認證失敗", 401));
  }
};

/**
 * 可选认证中间件
 * 如果提供了令牌则验证，否则继续执行（用于可选登录的接口）
 */
export const optionalAuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // 没有提供令牌，继续执行
      return next();
    }

    const token = authHeader.split(" ")[1];

    // 尝试验证令牌
    const result = await sessionService.validateAccessToken(token);

    if (result) {
      req.user = result.user;
      req.session = result.session;
    }

    next();
  } catch (err) {
    logger.error('可选认证中间件执行失败:', err);
    // 即使验证失败也继续执行
    next();
  }
};

/**
 * 角色验证中间件工厂
 * @param allowedRoles 允许的角色列表
 */
export const roleMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json(error("未授權，請先登入", 401));
    }

    const userRole = req.user.role || 'user';

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json(error("權限不足", 403));
    }

    next();
  };
};

/**
 * 会话验证中间件
 * 检查会话是否仍然有效
 */
export const sessionValidationMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) {
      return res.status(401).json(error("會話無效", 401));
    }

    // 检查会话是否过期（可选的额外检查）
    const now = new Date();
    const lastAccess = new Date(req.session.lastAccessAt);
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24小时

    if (now.getTime() - lastAccess.getTime() > sessionTimeout) {
      // 会话超时，销毁会话
      await sessionService.destroySession(req.session.sessionId);
      return res.status(401).json(error("會話已過期", 401));
    }

    next();
  } catch (err) {
    logger.error('会话验证中间件执行失败:', err);
    return res.status(401).json(error("會話驗證失敗", 401));
  }
};

/**
 * 刷新令牌中间件
 * 处理刷新令牌请求
 */
export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json(error("缺少刷新令牌", 400));
    }

    // 验证并刷新令牌
    const tokens = await sessionService.refreshAccessToken(refreshToken);

    if (!tokens) {
      return res.status(401).json(error("刷新令牌無效或已過期", 401));
    }

    // 将新令牌附加到响应中
    res.locals.tokens = tokens;
    next();
  } catch (err) {
    logger.error('刷新令牌中间件执行失败:', err);
    return res.status(401).json(error("刷新令牌失敗", 401));
  }
};

/**
 * 登出中间件
 * 处理登出请求
 */
export const logoutMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session) {
      await sessionService.destroySession(req.session.sessionId);
      logger.info(`用户登出: sessionId=${req.session.sessionId}`);
    }

    // 如果提供了访问令牌，将其加入黑名单
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      await sessionService.blacklistToken(token, 60 * 60); // 黑名单1小时
    }

    next();
  } catch (err) {
    logger.error('登出中间件执行失败:', err);
    // 即使登出失败也继续执行
    next();
  }
};
