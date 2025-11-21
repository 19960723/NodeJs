import { PrismaClient } from '@prisma/client';

/**
 * 基础 Repository
 * 所有 Repository 都继承此类，获得 Prisma 客户端实例
 */
export abstract class BaseRepository {
  constructor(protected readonly prisma: PrismaClient) {}

  /**
   * 开始事务
   */
  async transaction<T>(fn: (tx: PrismaClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      return fn(tx as PrismaClient);
    });
  }
}
