import { Context, Next } from 'koa';
import logger from '../utils/logger';

/**
 * 请求日志中间件
 */
const requestLogger = async (ctx: Context, next: Next): Promise<void> => {
  const start = Date.now();

  // 记录请求开始
  logger.info(`请求开始: ${ctx.method} ${ctx.url}`, {
    method: ctx.method,
    url: ctx.url,
    userAgent: ctx.headers['user-agent'],
    ip: ctx.ip,
    userId: (ctx.state as any).user?.id
  });

  try {
    await next();
  } finally {
    const duration = Date.now() - start;

    // 记录请求结束
    const logData = {
      method: ctx.method,
      url: ctx.url,
      status: ctx.status,
      duration: `${duration}ms`,
      ip: ctx.ip,
      userId: (ctx.state as any).user?.id
    };

    if (ctx.status >= 400) {
      logger.warn(
        `请求失败: ${ctx.method} ${ctx.url} - ${ctx.status}`,
        logData
      );
    } else {
      logger.info(
        `请求完成: ${ctx.method} ${ctx.url} - ${ctx.status}`,
        logData
      );
    }
  }
};

export default requestLogger;
