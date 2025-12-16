import { SetMetadata } from '@nestjs/common';

export const AUDIT_LOG_KEY = 'audit_log';

/**
 * 审计日志装饰器
 * @param summary 操作摘要
 */
export const AuditLog = (summary: string) => SetMetadata(AUDIT_LOG_KEY, summary);

