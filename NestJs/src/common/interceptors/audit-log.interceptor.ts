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

  // 敏感字段黑名单
  private readonly SENSITIVE_FIELDS = [
    'password',
    'passwordConfirm',
    'token',
    'accessToken',
    'refreshToken',
    'oldPassword',
    'newPassword',
  ];

  // 字段最大长度限制
  private readonly MAX_FIELD_LENGTH = 1000;

  // 整体 JSON 最大长度限制
  private readonly MAX_JSON_LENGTH = 5000;

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

      // 1. 处理请求参数 (脱敏 + 截断)
      const safeParams = this.sanitizeData(params);
      let paramsStr = JSON.stringify(safeParams);
      if (paramsStr.length > this.MAX_JSON_LENGTH) {
        paramsStr = paramsStr.substring(0, this.MAX_JSON_LENGTH) + '...[truncated]';
      }

      // 2. 处理响应结果 (截断)
      // 响应结果通常不包含密码，主要关注长度
      let resultStr = JSON.stringify(result);
      if (resultStr.length > this.MAX_JSON_LENGTH) {
        resultStr = resultStr.substring(0, this.MAX_JSON_LENGTH) + '...[truncated]';
      }

      await this.auditLogService.create({
        userId: user ? user.userId : null,
        action,
        method,
        path,
        params: paramsStr,
        result: resultStr,
        status,
        ip,
        userAgent: userAgent ? userAgent.substring(0, 500) : null, // 限制 UA 长度
        duration,
      });
    } catch (error) {
      this.logger.error(`Failed to create audit log: ${error.message}`, error.stack);
    }
  }

  /**
   * 递归清洗数据：
   * 1. 过滤敏感字段
   * 2. 截断超长字段
   */
  private sanitizeData(data: any): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeData(item));
    }

    if (typeof data === 'object') {
      const cleaned: any = {};
      for (const key of Object.keys(data)) {
        // 检查敏感字段
        if (this.SENSITIVE_FIELDS.includes(key)) {
          cleaned[key] = '******';
          continue;
        }

        const value = data[key];
        
        // 递归处理对象
        if (typeof value === 'object' && value !== null) {
          cleaned[key] = this.sanitizeData(value);
        } 
        // 截断超长字符串
        else if (typeof value === 'string' && value.length > this.MAX_FIELD_LENGTH) {
           cleaned[key] = value.substring(0, this.MAX_FIELD_LENGTH) + '...[truncated]';
        }
        else {
          cleaned[key] = value;
        }
      }
      return cleaned;
    }

    return data;
  }
}
