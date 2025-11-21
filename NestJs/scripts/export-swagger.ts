import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 导出 Swagger 文档为 JSON 文件
 * 用于导入到 apiFox 或其他 API 管理工具
 */
async function exportSwagger() {
  console.log('🚀 正在生成 Swagger 文档...');

  // 创建 NestJS 应用实例（不启动服务器）
  const app = await NestFactory.create(AppModule, {
    logger: false, // 关闭日志
  });

  // 配置 Swagger（与 main.ts 保持一致）
  const config = new DocumentBuilder()
    .setTitle('NestJS 企业级项目 API')
    .setDescription('基于 NestJS + Prisma + MySQL 的企业级后端项目 API 文档')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: '请输入 JWT Token',
        in: 'header',
      },
      'JWT',
    )
    .addTag('认证管理', '用户登录、注册、Token 管理')
    .addTag('用户管理', '用户 CRUD 操作')
    .addTag('角色管理', '角色 CRUD 操作')
    .addTag('分类管理', '文章分类 CRUD 操作')
    .addTag('文章管理', '文章 CRUD 操作')
    .build();

  // 创建 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);

  // 导出为 JSON 文件
  const outputPath = path.resolve(__dirname, '../swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });

  console.log('✅ Swagger 文档已导出到:', outputPath);
  console.log('📄 您可以将此文件导入到 apiFox 中');

  await app.close();
  process.exit(0);
}

exportSwagger().catch((error) => {
  console.error('❌ 导出失败:', error);
  process.exit(1);
});
