import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditLogService } from '../../modules/system/audit-log/audit-log.service';
import { AUDIT_LOG_KEY } from '../decorators/audit-log.decorator';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditLogInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly auditLogService: AuditLogService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const summary = this.reflector.get<string>(
      AUDIT_LOG_KEY,
      context.getHandler(),
    );

    if (!summary) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();
    const userAgent = request.headers['user-agent'];
    const ip = request.ip || request.connection.remoteAddress;
    const method = request.method;
    const path = request.url;
    const params = {
      query: request.query,
      body: request.body,
      params: request.params,
    };

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.logAudit(
            context,
            summary,
            method,
            path,
            params,
            data,
            200,
            ip,
            userAgent,
            Date.now() - startTime,
          );
        },
        error: (error) => {
          this.logAudit(
            context,
            summary,
            method,
            path,
            params,
            { message: error.message },
            error.status || 500,
            ip,
            userAgent,
            Date.now() - startTime,
          );
        },
      }),
    );
  }

  private async logAudit(
    context: ExecutionContext,
    action: string,
    method: string,
    path: string,
    params: any,
    result: any,
    status: number,
    ip: string,
    userAgent: string,
    duration: number,
  ) {
    try {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // 过滤敏感信息
      const safeParams = JSON.parse(JSON.stringify(params));
      if (safeParams.body && safeParams.body.password) {
        safeParams.body.password = '******';
      }

      await this.auditLogService.create({
        userId: user ? user.userId : null, // 假设 request.user 中有 userId
        action,
        method,
        path,
        params: JSON.stringify(safeParams),
        result: JSON.stringify(result).substring(0, 5000), // 截断过长的响应
        status,
        ip,
        userAgent,
        duration,
      });
    } catch (error) {
      this.logger.error(`Failed to create audit log: ${error.message}`, error.stack);
    }
  }
}

