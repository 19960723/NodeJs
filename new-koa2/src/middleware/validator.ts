import { Context, Next } from 'koa';
const Joi: any = require('joi');
import { badRequest } from '../utils/response';
import { BusinessError } from '../types';

/**
 * 验证中间件工厂
 */
export const validate = (schema: {
  body?: any;
  query?: any;
  params?: any;
  headers?: any;
}) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      const errors: any[] = [];

      // 验证请求体
      if (schema.body) {
        const { error, value } = schema.body.validate(ctx.request.body, {
          abortEarly: false,
          stripUnknown: true
        });

        if (error) {
          errors.push(
            ...error.details.map((detail: any) => ({
              field: detail.path.join('.'),
              message: detail.message,
              type: 'body'
            }))
          );
        } else {
          ctx.request.body = value;
        }
      }

      // 验证查询参数
      if (schema.query) {
        const { error, value } = schema.query.validate(ctx.query, {
          abortEarly: false,
          stripUnknown: true
        });

        if (error) {
          errors.push(
            ...error.details.map((detail: any) => ({
              field: detail.path.join('.'),
              message: detail.message,
              type: 'query'
            }))
          );
        } else {
          ctx.query = value;
        }
      }

      // 验证路径参数
      if (schema.params) {
        const { error, value } = schema.params.validate(ctx['params'], {
          abortEarly: false,
          stripUnknown: true
        });

        if (error) {
          errors.push(
            ...error.details.map((detail: any) => ({
              field: detail.path.join('.'),
              message: detail.message,
              type: 'params'
            }))
          );
        } else {
          ctx['params'] = value;
        }
      }

      // 验证请求头
      if (schema.headers) {
        const { error } = schema.headers.validate(ctx.headers, {
          abortEarly: false,
          stripUnknown: true
        });

        if (error) {
          errors.push(
            ...error.details.map((detail: any) => ({
              field: detail.path.join('.'),
              message: detail.message,
              type: 'headers'
            }))
          );
        }
      }

      if (errors.length > 0) {
        return badRequest(ctx, '数据验证失败', errors);
      }

      await next();
    } catch (error) {
      // 记录详细的错误信息用于调试
      console.error('验证中间件错误详情:', {
        error: error,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        requestInfo: {
          method: ctx.method,
          url: ctx.url,
          query: ctx.query,
          body: ctx.request.body,
          headers: ctx.headers
        }
      });

      // 如果是Joi验证错误，直接抛出
      if (error && typeof error === 'object' && 'isJoi' in error) {
        throw error;
      }

      // 如果是其他类型的错误，包装后抛出
      throw new BusinessError(
        400,
        `验证过程中发生错误: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };
};

/**
 * 常用验证规则
 */
export const commonSchemas = {
  // 分页查询
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid('ASC', 'DESC').default('DESC')
  }),

  // ID参数
  id: Joi.object({
    id: Joi.number().integer().positive().required()
  }),

  // 示例创建
  createExample: Joi.object({
    name: Joi.string().trim().min(1).max(100).required().messages({
      'string.empty': '名称不能为空',
      'string.min': '名称至少1个字符',
      'string.max': '名称不能超过100个字符'
    }),
    description: Joi.string().trim().max(500).optional(),
    status: Joi.string().valid('active', 'inactive').default('active')
  }),

  // 示例更新
  updateExample: Joi.object({
    name: Joi.string().trim().min(1).max(100).optional(),
    description: Joi.string().trim().max(500).optional().allow(null),
    status: Joi.string().valid('active', 'inactive').optional()
  }).min(1), // 至少有一个字段
  // 登录
  login: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
  }),

  // 刷新令牌
  refresh: Joi.object({
    refreshToken: Joi.string().trim().required()
  })
};
