import { Context } from 'koa';

/**
 * 统一的API响应格式工具
 * 匹配前端 request.ts 期望的响应格式
 */

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * 成功响应
 */
export const success = <T = any>(
  ctx: Context,
  data: T | null = null,
  message: string = '操作成功',
  statusCode: number = 200
): void => {
  ctx.status = statusCode;
  ctx.body = {
    code: 200, // 业务状态码始终为200表示成功
    message,
    data
  } as ApiResponse<T>;
};

/**
 * 错误响应
 */
export const error = (
  ctx: Context,
  message: string = '操作失败',
  businessCode: number = 500,
  httpStatus: number = 500,
  data: any = null
): void => {
  ctx.status = httpStatus;
  ctx.body = {
    code: businessCode,
    message,
    ...(data && { data })
  } as ApiResponse;
};

/**
 * 未授权响应 (401)
 */
export const unauthorized = (
  ctx: Context,
  message: string = '未授权，请重新登录'
): void => {
  error(ctx, message, 401, 401);
};

/**
 * 权限不足响应 (403)
 */
export const forbidden = (ctx: Context, message: string = '权限不足'): void => {
  error(ctx, message, 403, 403);
};

/**
 * 资源不存在响应 (404)
 */
export const notFound = (
  ctx: Context,
  message: string = '请求的资源不存在'
): void => {
  error(ctx, message, 404, 404);
};

/**
 * 参数错误响应 (400)
 */
export const badRequest = (
  ctx: Context,
  message: string = '请求参数错误',
  data: any = null
): void => {
  error(ctx, message, 400, 400, data);
};

/**
 * 冲突响应 (409)
 */
export const conflict = (ctx: Context, message: string = '资源冲突'): void => {
  error(ctx, message, 409, 409);
};

/**
 * 服务器内部错误响应 (500)
 */
export const serverError = (
  ctx: Context,
  message: string = '服务器内部错误'
): void => {
  error(ctx, message, 500, 500);
};

/**
 * 统一错误处理函数
 * 根据错误类型自动处理响应
 */
export const handleError = (ctx: Context, err: any): void => {
  // 如果是业务错误（有 statusCode 和 code 属性）
  if (err && typeof err === 'object' && 'statusCode' in err && 'code' in err) {
    ctx.status = err.statusCode;
    ctx.body = {
      code: err.code,
      message: err.message || '操作失败'
    };
  } else {
    // 未知错误，返回500
    serverError(ctx, err?.message || '服务器内部错误');
  }
};

/**
 * 分页数据响应
 */
export const paginated = <T>(
  ctx: Context,
  list: T[],
  pagination: PaginationInfo,
  message: string = '获取数据成功'
): void => {
  success(
    ctx,
    {
      list,
      pagination
    },
    message
  );
};
