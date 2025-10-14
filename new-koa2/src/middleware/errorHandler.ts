import { Context, Next } from 'koa';
import logger from '../utils/logger';
import {
  badRequest,
  conflict,
  unauthorized,
  notFound,
  serverError
} from '../utils/response';

/**
 * 全局错误处理中间件
 */
const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error: any) {
    // 记录错误日志
    logger.error('应用错误:', {
      message: error.message,
      stack: error.stack,
      url: ctx.url,
      method: ctx.method,
      headers: ctx.headers,
      body: ctx.request.body
    });

    // 设置错误状态码
    ctx.status = error.status || error.statusCode || 500;

    // 根据错误类型设置响应
    if (error.name === 'ValidationError') {
      // Sequelize 验证错误
      const errors = error.errors?.map((err: any) => ({
        field: err.path,
        message: err.message
      }));
      badRequest(ctx, '数据验证失败', errors);
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // 唯一性约束错误
      const errors = error.errors?.map((err: any) => ({
        field: err.path,
        message: err.message
      }));
      conflict(ctx, '数据冲突');
    } else if (error.name === 'JsonWebTokenError') {
      // JWT 错误
      unauthorized(ctx, '认证失败');
    } else if (error.name === 'TokenExpiredError') {
      // JWT 过期错误
      unauthorized(ctx, '令牌已过期');
    } else if (ctx.status === 404) {
      // 404 错误
      notFound(ctx, '请求的资源不存在');
    } else if (ctx.status >= 400 && ctx.status < 500) {
      // 4xx 客户端错误
      badRequest(ctx, error.message || '客户端请求错误');
    } else {
      // 5xx 服务器错误
      const message =
        process.env.NODE_ENV === 'production'
          ? '服务器内部错误'
          : error.message;
      serverError(ctx, message);
    }

    // 在开发环境下添加错误堆栈信息
    if (process.env.NODE_ENV === 'development' && ctx.body) {
      (ctx.body as any).stack = error.stack;
    }
  }
};

export default errorHandler;
