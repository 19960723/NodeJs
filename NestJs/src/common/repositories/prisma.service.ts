/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SoftDeleteExtension } from './middleware/soft-delete.middleware';

/**
 * Prisma Service
 * 管理 Prisma Client 的生命周期
 * Prisma 7.0 需要配置 engineType
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private readonly extendedClient: any;

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.extendedClient = this.$extends(SoftDeleteExtension);

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (
          [
            'onModuleInit',
            'onModuleDestroy',
            '$connect',
            '$disconnect',
            '$on',
            '$transaction',
          ].includes(prop as string)
        ) {
          return Reflect.get(target, prop, receiver);
        }
        if (prop in target.extendedClient) {
          return target.extendedClient[prop];
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma 数据库连接成功');

    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as never, (e: any) => {
        this.logger.debug(`Query: ${e.query}`);
        this.logger.debug(`Duration: ${e.duration}ms`);
      });
    }

    this.$on('error' as never, (e: any) => {
      this.logger.error(`Prisma Error: ${e.message}`);
    });

    this.$on('warn' as never, (e: any) => {
      this.logger.warn(`Prisma Warning: ${e.message}`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma 数据库连接已断开');
  }
}
