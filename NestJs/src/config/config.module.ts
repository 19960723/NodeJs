import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configuration, configValidationSchema } from './configuration';

/**
 * 全局配置模块
 * 管理环境变量和应用配置
 */
@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: false, // 显示所有验证错误
        allowUnknown: true, // 允许未知的环境变量
      },
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
