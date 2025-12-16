import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuditLogService {
  constructor(private readonly repository: AuditLogRepository) {}

  async create(data: Prisma.AuditLogCreateInput) {
    return this.repository.create(data);
  }

  async findAll(query: {
    page: number;
    pageSize: number;
    userId?: number;
    action?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { page, pageSize, userId, action, startDate, endDate } = query;
    const skip = (page - 1) * pageSize;

    const where: Prisma.AuditLogWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (action) {
      where.action = {
        contains: action,
      };
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [items, total] = await Promise.all([
      this.repository.findAll({
        skip,
        take: pageSize,
        where,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.repository.count(where),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }
}
