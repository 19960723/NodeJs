import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';

/**
 * 请求ID中间件 - 为每个请求生成唯一ID
 */
export const requestId = async (ctx: Context, next: Next): Promise<void> => {
  // 从请求头获取或生成新的请求ID
  const requestId = ctx.get('X-Request-ID') || uuidv4();
  
  // 设置到响应头
  ctx.set('X-Request-ID', requestId);
  
  // 添加到上下文
  ctx.state.requestId = requestId;
  
  await next();
};
