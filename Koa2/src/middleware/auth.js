const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');
const logger = require('../utils/logger');

/**
 * JWT 认证中间件
 */
const authenticate = async (ctx, next) => {
  try {
    const authHeader = ctx.headers.authorization;

    if (!authHeader) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '缺少认证令牌'
      };
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer token

    if (!token) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '令牌格式错误'
      };
      return;
    }

    // 验证令牌
    const decoded = verifyToken(token);

    // 查找用户
    const user = await User.findByPk(decoded.id);

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '用户不存在'
      };
      return;
    }

    if (user.status !== 'active') {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '用户账户已被禁用'
      };
      return;
    }

    // 将用户信息添加到 ctx.state
    ctx.state.user = user;

    await next();
  } catch (error) {
    logger.error('认证中间件错误:', error);

    if (error.name === 'JsonWebTokenError') {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '无效的令牌'
      };
    } else if (error.name === 'TokenExpiredError') {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '令牌已过期'
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: '认证失败'
      };
    }
  }
};

/**
 * 可选认证中间件（不强制要求认证）
 */
const optionalAuth = async (ctx, next) => {
  try {
    const authHeader = ctx.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      if (token) {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id);

        if (user && user.status === 'active') {
          ctx.state.user = user;
        }
      }
    }

    await next();
  } catch (error) {
    // 可选认证失败时不阻止请求继续
    logger.warn('可选认证失败:', error.message);
    await next();
  }
};

module.exports = {
  authenticate,
  optionalAuth
};
