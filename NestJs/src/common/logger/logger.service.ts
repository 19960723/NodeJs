import {
  Injectable,
  Inject,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

/**
 * 增强的日志服务
 * 包装 Winston Logger，提供更友好的 API
 */
@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  /**
   * 设置上下文
   */
  private formatMessage(message: string, context?: string): string {
    return context ? `[${context}] ${message}` : message;
  }

  /**
   * 记录普通日志
   */
  log(message: any, context?: string) {
    this.logger.info(this.formatMessage(message, context));
  }

  /**
   * 记录错误日志
   */
  error(message: any, trace?: string, context?: string) {
    this.logger.error(this.formatMessage(message, context), { trace });
  }

  /**
   * 记录警告日志
   */
  warn(message: any, context?: string) {
    this.logger.warn(this.formatMessage(message, context));
  }

  /**
   * 记录调试日志
   */
  debug(message: any, context?: string) {
    this.logger.debug(this.formatMessage(message, context));
  }

  /**
   * 记录详细日志
   */
  verbose(message: any, context?: string) {
    this.logger.verbose(this.formatMessage(message, context));
  }

  /**
   * 记录 HTTP 请求日志
   */
  http(message: string, meta?: Record<string, any>) {
    this.logger.http(message, meta);
  }

  /**
   * 带请求 ID 的日志
   */
  logWithRequestId(
    level: 'info' | 'error' | 'warn' | 'debug',
    message: string,
    requestId: string,
    meta?: Record<string, any>,
  ) {
    this.logger.log(level, message, { requestId, ...meta });
  }

  /**
   * 记录方法执行时间
   */
  logMethodExecution(methodName: string, duration: number, context?: string) {
    this.logger.info(
      this.formatMessage(`${methodName} executed in ${duration}ms`, context),
    );
  }

  /**
   * 记录数据库操作
   */
  logDatabaseQuery(query: string, duration: number, context?: string) {
    this.logger.debug(
      this.formatMessage(`Query executed in ${duration}ms`, context),
      { query },
    );
  }
}
