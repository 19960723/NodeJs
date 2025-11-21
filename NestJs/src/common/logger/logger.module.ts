import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { createWinstonConfig } from './logger.config';

/**
 * 全局日志模块
 */
@Global()
@Module({
  imports: [WinstonModule.forRoot(createWinstonConfig())],
  exports: [WinstonModule],
})
export class LoggerModule {}
