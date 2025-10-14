import 'dotenv/config';

export interface AppConfig {
  // 应用配置
  app: {
    name: string;
    version: string;
    port: number;
    host: string;
    env: string;
  };

  // 日志配置
  logging: {
    level: string;
    enableConsole: boolean;
    enableFile: boolean;
  };

  // 安全配置
  security: {
    corsOrigin: string;
    jwtSecret?: string;
    jwtExpiresIn: string;
  };

  // Redis配置
  redis?: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };
}

/**
 * 获取应用配置
 */
export const getConfig = (): AppConfig => {
  const env = process.env['NODE_ENV'] || 'development';

  return {
    app: {
      name: process.env['APP_NAME'] || 'Koa2 Backend',
      version: process.env['APP_VERSION'] || '1.0.0',
      port: Number(process.env['PORT']) || 3000,
      host: process.env['HOST'] || '0.0.0.0',
      env
    },

    logging: {
      level:
        process.env['LOG_LEVEL'] || (env === 'production' ? 'info' : 'debug'),
      enableConsole: process.env['LOG_CONSOLE'] !== 'false',
      enableFile: process.env['LOG_FILE'] !== 'false'
    },

    security: {
      corsOrigin: process.env['CORS_ORIGIN'] || '*',
      ...(process.env['JWT_SECRET'] && {
        jwtSecret: process.env['JWT_SECRET']
      }),
      jwtExpiresIn: process.env['JWT_EXPIRES_IN'] || '24h'
    },

    ...(process.env['REDIS_HOST'] && {
      redis: {
        host: process.env['REDIS_HOST'],
        port: Number(process.env['REDIS_PORT']) || 6379,
        ...(process.env['REDIS_PASSWORD'] && {
          password: process.env['REDIS_PASSWORD']
        }),
        db: Number(process.env['REDIS_DB']) || 0
      }
    })
  };
};

/**
 * 验证必需的环境变量
 */
export const validateConfig = (): void => {
  const config = getConfig();

  if (config.app.env === 'production' && !config.security.jwtSecret) {
    throw new Error('生产环境必须设置 JWT_SECRET');
  }
};
