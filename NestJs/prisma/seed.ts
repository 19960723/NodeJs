import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { seedPermissions } from './seeds/permissions.seed';
import { seedRoles } from './seeds/roles.seed';

const prisma = new PrismaClient();

/**
 * 数据库种子数据
 * 运行命令: pnpm prisma db seed
 */
async function main() {
  console.log('🚀 开始初始化数据库...\n');

  // 1. 初始化权限数据
  await seedPermissions();

  // 2. 初始化角色数据并分配权限
  await seedRoles();

  // 3. 获取创建好的角色
  const adminRole = await prisma.role.findUnique({
    where: { code: 'admin' },
  });

  const authorRole = await prisma.role.findUnique({
    where: { code: 'author' },
  });

  if (!adminRole || !authorRole) {
    throw new Error('角色未正确创建');
  }

  console.log('');

  // 4. 创建管理员用户
  console.log('🌱 开始创建用户...');
  const hashedPassword = await bcrypt.hash('Admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      nickname: '系统管理员',
      status: 1,
    },
  });

  // 关联管理员角色
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log('✅ 管理员用户创建成功');
  console.log('   用户名: admin');
  console.log('   密码: Admin123');

  // 5. 创建测试用户（作者角色）
  const testPassword = await bcrypt.hash('Test123', 10);
  const testUser = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      email: 'test@example.com',
      password: testPassword,
      nickname: '测试作者',
      status: 1,
    },
  });

  // 关联作者角色
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: testUser.id,
        roleId: authorRole.id,
      },
    },
    update: {},
    create: {
      userId: testUser.id,
      roleId: authorRole.id,
    },
  });

  console.log('✅ 测试用户创建成功');
  console.log('   用户名: testuser');
  console.log('   密码: Test123');
  console.log('');

  // 6. 创建分类
  console.log('🌱 开始创建分类...');
  const techCategory = await prisma.category.upsert({
    where: { slug: 'tech' },
    update: {},
    create: {
      name: '技术文章',
      slug: 'tech',
      description: '技术相关的文章',
      sort: 1,
      status: 1,
    },
  });

  const lifeCategory = await prisma.category.upsert({
    where: { slug: 'life' },
    update: {},
    create: {
      name: '生活随笔',
      slug: 'life',
      description: '生活相关的文章',
      sort: 2,
      status: 1,
    },
  });

  console.log('✅ 分类创建成功');
  console.log('');

  // 7. 创建示例文章
  console.log('🌱 开始创建示例文章...');
  await prisma.article.upsert({
    where: { slug: 'welcome-to-nestjs' },
    update: {},
    create: {
      title: '欢迎使用 NestJS 企业级项目模板',
      slug: 'welcome-to-nestjs',
      summary:
        '这是一个完整的 NestJS 企业级项目模板，包含用户认证、权限管理、文章管理等功能。',
      content: `# 欢迎使用 NestJS 企业级项目模板

## 特性

- 🏗️ **企业级架构**: Controller / Service / Repository 分层设计
- 🔐 **JWT 认证**: 完整的用户登录注册、Token 管理
- 📦 **统一返回格式**: Result API 统一接口返回
- ✅ **参数校验**: class-validator 自动参数验证
- 🛡️ **全局异常处理**: 统一的异常捕获和错误返回

## 快速开始

访问 API 文档: http://localhost:3000/api/docs

## 技术栈

- NestJS 11.x
- Prisma 7.x
- MySQL
- JWT + Passport
- Swagger

祝您开发愉快！`,
      authorId: adminUser.id,
      categoryId: techCategory.id,
      status: 1,
    },
  });

  await prisma.article.upsert({
    where: { slug: 'nestjs-best-practices' },
    update: {},
    create: {
      title: 'NestJS 开发最佳实践',
      slug: 'nestjs-best-practices',
      summary: '介绍 NestJS 开发中的最佳实践和常见问题解决方案。',
      content: `# NestJS 开发最佳实践

## 1. 模块化设计

每个模块应该职责单一，便于维护和测试。

## 2. 统一返回格式

使用 Result API 统一所有接口的返回格式。

## 3. 异常处理

使用 BusinessError 抛出业务异常，通过全局异常过滤器统一处理。

## 4. 数据验证

使用 class-validator 进行参数验证，确保数据安全。

## 5. 安全性

- JWT Token 认证
- 密码加密存储
- CORS 配置
- API 限流`,
      authorId: adminUser.id,
      categoryId: techCategory.id,
      status: 1,
    },
  });

  console.log('✅ 示例文章创建成功');

  console.log('\n✨ ==========================================');
  console.log('🎉 数据库初始化完成！');
  console.log('==========================================\n');
  console.log('📊 初始化内容：');
  console.log('  ✅ 31 个权限');
  console.log('  ✅ 4 个角色（admin, editor, author, guest）');
  console.log('  ✅ 2 个用户');
  console.log('  ✅ 2 个分类');
  console.log('  ✅ 2 篇文章\n');
  console.log('🔑 可以使用以下账号登录：');
  console.log('  📌 超级管理员: admin / Admin123 (拥有所有权限)');
  console.log('  📌 测试作者: testuser / Test123 (只能管理文章)\n');
  console.log('🌐 访问地址：');
  console.log('  📚 API 文档: http://localhost:3000/api/docs');
  console.log('  🔐 登录接口: POST /api/auth/login');
  console.log('==========================================\n');
}

main()
  .catch((e) => {
    console.error('❌ 数据库初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
