import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';

/**
 * 敏感信息脱敏
 */
const maskSensitiveData = winston.format((info) => {
  const sensitiveFields = [
    'password',
    'token',
    'accessToken',
    'refreshToken',
    'authorization',
    'cookie',
    'secret',
  ];

  const maskValue = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(maskValue);
    }

    const masked = { ...obj };
    for (const key in masked) {
      if (
        sensitiveFields.some((field) =>
          key.toLowerCase().includes(field.toLowerCase()),
        )
      ) {
        masked[key] = '******';
      } else if (typeof masked[key] === 'object') {
        masked[key] = maskValue(masked[key]);
      }
    }
    return masked;
  };

  info.message =
    typeof info.message === 'object' ? maskValue(info.message) : info.message;

  // 脱敏元数据
  const metaKeys = Object.keys(info).filter(
    (key) => !['level', 'message', 'timestamp', 'label'].includes(key),
  );
  metaKeys.forEach((key) => {
    if (typeof info[key] === 'object') {
      info[key] = maskValue(info[key]);
    }
  });

  return info;
});

/**
 * 日志格式化
 */
const logFormat = winston.format.printf(
  ({ timestamp, level, message, context, trace, requestId, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]`;

    if (requestId) {
      log += ` [${requestId}]`;
    }

    if (context) {
      log += ` [${context}]`;
    }

    log += ` ${message}`;

    // 添加额外的元数据
    const metaKeys = Object.keys(meta);
    if (metaKeys.length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }

    if (trace) {
      log += `\n${trace}`;
    }

    return log;
  },
);

/**
 * Winston 日志配置
 */
export const createWinstonConfig = (): WinstonModuleOptions => {
  const env = process.env.NODE_ENV || 'development';
  const logLevel =
    process.env.LOG_LEVEL || (env === 'production' ? 'info' : 'debug');
  const logDir = process.env.LOG_DIR || 'logs';
  const enableConsole = process.env.LOG_CONSOLE !== 'false';
  const enableFile = process.env.LOG_FILE !== 'false';

  const transports: winston.transport[] = [];

  // 控制台输出
  if (enableConsole) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          maskSensitiveData(),
          logFormat,
        ),
      }),
    );
  }

  // 文件输出
  if (enableFile) {
    // 错误日志
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          maskSensitiveData(),
          winston.format.json(),
        ),
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
      }),
    );

    // 组合日志 (所有级别)
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          maskSensitiveData(),
          winston.format.json(),
        ),
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 30,
      }),
    );

    // HTTP 访问日志
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, 'access.log'),
        level: 'http',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.json(),
        ),
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 30,
      }),
    );
  }

  return {
    level: logLevel,
    transports,
    // 异常处理
    exceptionHandlers: enableFile
      ? [
          new winston.transports.File({
            filename: path.join(logDir, 'exceptions.log'),
            maxsize: 10 * 1024 * 1024,
            maxFiles: 10,
          }),
        ]
      : [],
    // 未捕获的 Promise 拒绝
    rejectionHandlers: enableFile
      ? [
          new winston.transports.File({
            filename: path.join(logDir, 'rejections.log'),
            maxsize: 10 * 1024 * 1024,
            maxFiles: 10,
          }),
        ]
      : [],
  };
};
