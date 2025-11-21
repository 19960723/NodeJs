import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { randomUUID } from 'crypto';

/**
 * 日志拦截器
 * 记录每个请求的耗时和基本信息
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';

    // 生成请求 ID
    const requestId = headers['x-request-id'] || randomUUID();
    request.requestId = requestId;
    response.setHeader('X-Request-ID', requestId);

    const now = Date.now();
    const userId = request.user?.userId || 'anonymous';

    this.logger.http('Incoming request', {
      requestId,
      method,
      url,
      ip,
      userAgent,
      userId,
    });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - now;
          const statusCode = response.statusCode;

          this.logger.http('Request completed', {
            requestId,
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            userId,
          });
        },
        error: (error: Error) => {
          const duration = Date.now() - now;

          this.logger.error('Request failed', {
            requestId,
            method,
            url,
            duration: `${duration}ms`,
            error: error.message,
            userId,
          });
        },
      }),
    );
  }
}
