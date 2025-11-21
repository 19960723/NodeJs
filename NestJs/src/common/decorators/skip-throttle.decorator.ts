import { SetMetadata } from '@nestjs/common';
import { SkipThrottle as NestSkipThrottle } from '@nestjs/throttler';

/**
 * 跳过限流检查装饰器
 * 用于标记不需要限流的接口
 */
export const SkipThrottle = NestSkipThrottle;

/**
 * 自定义限流配置装饰器
 * @param ttl 时间窗口 (毫秒)
 * @param limit 限制次数
 */
export const CustomThrottle = (ttl: number, limit: number) => {
  return SetMetadata('throttle', { ttl, limit });
};
