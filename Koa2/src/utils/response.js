/**
 * 统一的API响应格式工具
 * 匹配前端 request.ts 期望的响应格式
 */

/**
 * 成功响应
 * @param {Object} ctx - Koa上下文
 * @param {*} data - 响应数据
 * @param {string} message - 响应消息
 * @param {number} code - 响应代码，默认200
 */
const success = (ctx, data = null, message = '操作成功', code = 200) => {
  ctx.status = 200;
  ctx.body = {
    code,
    message,
    data
  };
};

/**
 * 错误响应
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 * @param {number} code - 错误代码
 * @param {number} status - HTTP状态码
 * @param {*} data - 额外数据
 */
const error = (
  ctx,
  message = '操作失败',
  code = 500,
  status = 500,
  data = null
) => {
  ctx.status = status;
  ctx.body = {
    code,
    message,
    ...(data && { data })
  };
};

/**
 * 未授权响应 (401)
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 */
const unauthorized = (ctx, message = '未授权，请重新登录') => {
  error(ctx, message, 401, 401);
};

/**
 * 权限不足响应 (403)
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 */
const forbidden = (ctx, message = '权限不足') => {
  error(ctx, message, 403, 403);
};

/**
 * 资源不存在响应 (404)
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 */
const notFound = (ctx, message = '请求的资源不存在') => {
  error(ctx, message, 404, 404);
};

/**
 * 参数错误响应 (400)
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 * @param {*} data - 验证错误详情
 */
const badRequest = (ctx, message = '请求参数错误', data = null) => {
  error(ctx, message, 400, 400, data);
};

/**
 * 冲突响应 (409)
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 */
const conflict = (ctx, message = '资源冲突') => {
  error(ctx, message, 409, 409);
};

/**
 * 服务器内部错误响应 (500)
 * @param {Object} ctx - Koa上下文
 * @param {string} message - 错误消息
 */
const serverError = (ctx, message = '服务器内部错误') => {
  error(ctx, message, 500, 500);
};

/**
 * 分页数据响应
 * @param {Object} ctx - Koa上下文
 * @param {Array} list - 数据列表
 * @param {Object} pagination - 分页信息
 * @param {string} message - 响应消息
 */
const paginated = (ctx, list, pagination, message = '获取数据成功') => {
  success(
    ctx,
    {
      list,
      pagination
    },
    message
  );
};

module.exports = {
  success,
  error,
  unauthorized,
  forbidden,
  notFound,
  badRequest,
  conflict,
  serverError,
  paginated
};
