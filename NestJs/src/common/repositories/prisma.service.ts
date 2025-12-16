import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { softDeleteExtension } from './middleware/soft-delete.middleware';

/**
 * Prisma Service
 * 管理 Prisma Client 的生命周期
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });

    // 启用软删除扩展
    // 注意：$extends 返回一个新的 Client 实例
    const extendedClient = this.$extends(softDeleteExtension);

    // 使用 Proxy 代理，让 PrismaService 的实例表现得像 extendedClient
    return new Proxy(this, {
      get: (target, prop, receiver) => {
        // 优先从 extendedClient 获取属性 (比如 user, post 等模型访问)
        if (prop in extendedClient) {
          return (extendedClient as any)[prop];
        }
        // 否则回落到原始实例 (比如 $connect, $on 等)
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma 数据库连接成功');

    if (process.env.NODE_ENV === 'development') {
      // 这里的 $on 还是原始 client 的
      // (this as any).$on('query', (e: any) => { ... })
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma 数据库连接已断开');
  }
}
