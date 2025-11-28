import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const redisConfig = this.configService.get('redis');

    if (!redisConfig) {
      this.logger.warn('Redis 配置未找到，缓存功能将不可用');
      return;
    }

    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
      db: redisConfig.db,
      keyPrefix: redisConfig.keyPrefix,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.client.on('connect', () => {
      this.logger.log('Redis 连接成功');
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis 连接错误', err);
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  getClient(): Redis {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<string | null> {
    if (!this.client) return null;
    if (ttl) {
      return this.client.set(key, value, 'EX', ttl);
    }
    return this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    if (!this.client) return 0;
    return this.client.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.client) return [];
    return this.client.keys(pattern);
  }
}
