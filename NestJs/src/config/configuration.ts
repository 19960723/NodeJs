import * as Joi from 'joi';

/**
 * 环境变量验证 Schema
 */
export const configValidationSchema = Joi.object({
  // 应用配置
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('NestJS Enterprise App'),

  // 数据库配置
  DATABASE_URL: Joi.string().required().messages({
    'any.required': 'DATABASE_URL 是必需的，请配置数据库连接字符串',
    'string.empty': 'DATABASE_URL 不能为空',
  }),

  // JWT 配置
  JWT_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_SECRET 是必需的，请配置 JWT 密钥',
    'string.min': 'JWT_SECRET 长度至少为 32 个字符',
  }),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),

  // Swagger 配置
  SWAGGER_ENABLE: Joi.boolean().default(true),
  SWAGGER_PATH: Joi.string().default('api/docs'),

  // 日志配置
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('debug'),
  LOG_CONSOLE: Joi.boolean().default(true),
  LOG_FILE: Joi.boolean().default(true),
  LOG_DIR: Joi.string().default('logs'),

  // Redis 配置（可选）
  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().optional(),
  REDIS_PASSWORD: Joi.string().optional().allow(''),
  REDIS_DB: Joi.number().default(0),
  REDIS_KEY_PREFIX: Joi.string().default('nestjs:'),

  // 限流配置
  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(10),

  // CORS 配置
  CORS_ORIGIN: Joi.string().default('*'),

  // 其他配置
  TZ: Joi.string().default('Asia/Shanghai'),
  ENABLE_REQUEST_LOG: Joi.boolean().default(true),
  ENABLE_ERROR_STACK: Joi.boolean().default(true),
});

/**
 * 配置加载函数
 */
export const configuration = () => ({
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  swagger: {
    enable: process.env.SWAGGER_ENABLE !== 'false',
    path: process.env.SWAGGER_PATH,
  },
  logging: {
    level: process.env.LOG_LEVEL,
    console: process.env.LOG_CONSOLE !== 'false',
    file: process.env.LOG_FILE !== 'false',
    dir: process.env.LOG_DIR,
  },
  redis: process.env.REDIS_HOST
    ? {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0', 10),
        keyPrefix: process.env.REDIS_KEY_PREFIX,
      }
    : undefined,
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL || '60000', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});
