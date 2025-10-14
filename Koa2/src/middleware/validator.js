const Joi = require('joi');
const { badRequest, serverError } = require('../utils/response');

/**
 * 验证中间件工厂函数
 * @param {Object} schema - Joi 验证模式
 * @param {string} property - 要验证的属性 (body, query, params)
 */
const validate = (schema, property = 'body') => {
  return async (ctx, next) => {
    try {
      const { error, value } = schema.validate(ctx.request[property], {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }));
        return badRequest(ctx, '数据验证失败', errors);
      }

      // 将验证后的数据替换原数据
      ctx.request[property] = value;
      await next();
    } catch (err) {
      return serverError(ctx, '验证过程中发生错误');
    }
  };
};

// 用户相关验证模式
const userSchemas = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(50).required().messages({
      'string.alphanum': '用户名只能包含字母和数字',
      'string.min': '用户名至少3个字符',
      'string.max': '用户名最多50个字符',
      'any.required': '用户名是必填项'
    }),
    email: Joi.string().email().required().messages({
      'string.email': '请输入有效的邮箱地址',
      'any.required': '邮箱是必填项'
    }),
    password: Joi.string().min(6).max(50).required().messages({
      'string.min': '密码至少6个字符',
      'string.max': '密码最多50个字符',
      'any.required': '密码是必填项'
    })
  }),

  login: Joi.object({
    username: Joi.string().required().messages({
      'any.required': '用户名是必填项'
    }),
    password: Joi.string().required().messages({
      'any.required': '密码是必填项'
    }),
    sessionId: Joi.string().required().messages({
      'any.required': '验证码会话ID是必填项'
    }),
    answer: Joi.string().required().messages({
      'any.required': '验证码答案是必填项'
    })
  }),

  updateProfile: Joi.object({
    username: Joi.string().alphanum().min(3).max(50).messages({
      'string.alphanum': '用户名只能包含字母和数字',
      'string.min': '用户名至少3个字符',
      'string.max': '用户名最多50个字符'
    }),
    email: Joi.string().email().messages({
      'string.email': '请输入有效的邮箱地址'
    }),
    avatar: Joi.string().uri().messages({
      'string.uri': '头像必须是有效的URL'
    })
  }),

  changePassword: Joi.object({
    oldPassword: Joi.string().required().messages({
      'any.required': '旧密码是必填项'
    }),
    newPassword: Joi.string().min(6).max(50).required().messages({
      'string.min': '新密码至少6个字符',
      'string.max': '新密码最多50个字符',
      'any.required': '新密码是必填项'
    })
  })
};

module.exports = {
  validate,
  userSchemas
};
