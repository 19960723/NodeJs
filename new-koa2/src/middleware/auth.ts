import { Context, Next } from 'koa';
import { getConfig } from '../config';
const jwt = require('jsonwebtoken');

/**
 * JWT认证中间件
 * 验证请求头中的token，并将解码后的用户信息存储到ctx.state中
 */
export const auth = async (ctx: Context, next: Next): Promise<void> => {
  try {
    // 从请求头中获取token
    const authHeader = ctx.headers['authorization'];

    if (!authHeader) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '未提供认证令牌'
      };
      return;
    }

    // 检查格式是否为 "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '认证令牌格式错误，正确格式为: Bearer <token>'
      };
      return;
    }

    const token = parts[1];
    const config = getConfig();
    const secret = config.security.jwtSecret || 'dev-secret';

    try {
      // 验证token
      const payload = jwt.verify(token, secret) as any;

      // 检查token类型（确保是访问令牌而不是刷新令牌）
      if (payload.type !== 'access') {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '令牌类型错误'
        };
        return;
      }

      // 将用户信息存储到ctx.state中，供后续中间件和控制器使用
      ctx.state.user = {
        id: payload.sub,
        username: payload.username
      };

      await next();
    } catch (error: any) {
      // JWT验证失败
      if (error.name === 'TokenExpiredError') {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '令牌已过期'
        };
      } else if (error.name === 'JsonWebTokenError') {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '无效的令牌'
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '令牌验证失败'
        };
      }
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: '服务器内部错误'
    };
  }
};

/**
 * 可选认证中间件
 * 如果提供了token则验证，但不强制要求token
 */
export const optionalAuth = async (ctx: Context, next: Next): Promise<void> => {
  const authHeader = ctx.headers['authorization'];

  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      const token = parts[1];
      const config = getConfig();
      const secret = config.security.jwtSecret || 'dev-secret';

      try {
        const payload = jwt.verify(token, secret) as any;
        if (payload.type === 'access') {
          ctx.state.user = {
            id: payload.sub,
            username: payload.username
          };
        }
      } catch (error) {
        // 可选认证，验证失败不影响后续流程
      }
    }
  }

  await next();
};
