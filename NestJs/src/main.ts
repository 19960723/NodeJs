import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * 应用启动入口
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // 创建 NestJS 应用实例
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // 获取配置服务
  const configService = app.get(ConfigService);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 启用 API 版本控制（可选）
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  // 配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动删除未定义的属性
      forbidNonWhitelisted: false, // 禁止非白名单属性（设为 true 会抛出错误）
      transform: true, // 自动转换类型
      transformOptions: {
        enableImplicitConversion: true, // 隐式类型转换
      },
    }),
  );

  // 配置 CORS（允许跨域）
  app.enableCors({
    origin: true, // 生产环境应配置具体域名
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // 配置 Swagger 文档
  const swaggerEnable = configService.get<boolean>('SWAGGER_ENABLE') !== false;
  if (swaggerEnable) {
    const config = new DocumentBuilder()
      .setTitle('NestJS 企业级项目 API')
      .setDescription('基于 NestJS + Prisma + MySQL 的企业级后端项目 API 文档')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: '请输入 JWT Token',
        in: 'header',
      })
      .addTag('认证管理', '用户登录、注册、Token 管理')
      .addTag('用户管理', '用户 CRUD 操作')
      .addTag('角色管理', '角色 CRUD 操作')
      .addTag('分类管理', '文章分类 CRUD 操作')
      .addTag('文章管理', '文章 CRUD 操作')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const swaggerPath = configService.get<string>('SWAGGER_PATH') || 'api/docs';
    SwaggerModule.setup(swaggerPath, app, document, {
      swaggerOptions: {
        persistAuthorization: true, // 持久化认证信息
      },
    });

    logger.log(
      `Swagger 文档已启用: http://localhost:${configService.get('PORT') || 3000}/${swaggerPath}`,
    );
  }

  // 启动应用
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 应用启动成功！`);
  logger.log(`📡 服务地址: http://localhost:${port}/api`);
  logger.log(
    `📚 API 文档: http://localhost:${port}/${configService.get('SWAGGER_PATH') || 'api/docs'}`,
  );
}

void bootstrap();
