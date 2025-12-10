import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { Prisma } from '@prisma/client';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-codes';

/**
 * 全局异常过滤器
 * 捕获所有异常并返回统一格式
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = (request as any).requestId || 'unknown';
    const env = process.env.NODE_ENV || 'development';

    // 默认值
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let errorCode = ErrorCode.UNKNOWN_ERROR;
    let details: any = undefined;

    // 1. 处理业务异常
    if (exception instanceof BusinessException) {
      status = exception.getStatus();
      errorCode = exception.errorCode;
      const exceptionResponse = exception.getResponse() as any;
      message = exceptionResponse.message || message;
    }
    // 2. 处理 HTTP 异常
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as any;
        message = res.message || message;
        errorCode = res.errorCode || ErrorCode.UNKNOWN_ERROR;

        // 处理 class-validator 的验证错误
        if (Array.isArray(res.message)) {
          message = res.message.join('; ');
          errorCode = ErrorCode.VALIDATION_ERROR;
        }
      }
    }
    // 3. 处理 Prisma 数据库错误
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      errorCode = ErrorCode.DATABASE_ERROR;

      switch (exception.code) {
        case 'P2002':
          message = '数据已存在，违反唯一性约束';
          errorCode = ErrorCode.ALREADY_EXISTS;
          break;
        case 'P2025':
          message = '记录不存在';
          errorCode = ErrorCode.NOT_FOUND;
          break;
        case 'P2003':
          message = '外键约束失败';
          break;
        default:
          message = '数据库操作失败';
      }

      // 开发环境显示详细错误
      if (env === 'development') {
        details = {
          code: exception.code,
          meta: exception.meta,
        };
      }
    }
    // 4. 处理其他数据库错误
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      errorCode = ErrorCode.VALIDATION_ERROR;
      // 提取简化的错误信息
      const simplifiedMessage =
        exception.message.split('\n').pop()?.trim() || '数据格式错误';
      message = `数据验证失败: ${simplifiedMessage}`;

      if (env === 'development') {
        details = { error: exception.message };
      }
    }
    // 5. 处理未知错误
    else {
      message = exception?.message || message;

      // 开发环境显示详细错误
      if (env === 'development') {
        details = {
          name: exception?.name,
          message: exception?.message,
        };
      }
    }

    // 记录错误日志
    this.logger.error('Request exception', {
      requestId,
      method: request.method,
      url: request.url,
      status,
      errorCode,
      message,
      userId: (request as any).user?.userId || 'anonymous',
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      // 只在开发环境记录堆栈
      ...(env === 'development' && { stack: exception.stack }),
    });

    // 构建响应
    const result = {
      code: errorCode,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      requestId,
    };

    // 开发环境返回额外信息
    if (env === 'development' && process.env.ENABLE_ERROR_STACK !== 'false') {
      Object.assign(result, {
        stack: exception.stack,
        details,
      });
    }

    response.status(status).json(result);
  }
}
