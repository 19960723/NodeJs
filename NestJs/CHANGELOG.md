# 更新日志

## [2024-11-20] - 项目重构

### 主要变更

#### 1. Prisma 降级到版本 6 (稳定版)

- ✅ `@prisma/client`: 7.0.0 → 6.19.0
- ✅ `prisma`: 7.0.0 → 6.19.0
- ✅ 删除 Prisma 7 特有的 `prisma.config.ts` 文件
- ✅ 修复 `prisma/schema.prisma` 配置，添加 `url = env("DATABASE_URL")`
- ✅ 重新生成 Prisma Client

#### 2. 项目架构整理

- ✅ 创建 `ARCHITECTURE.md` - 详细的项目架构文档
- ✅ 更新 `README.md` - 简洁实用的项目说明
- ✅ 创建 `.env.example` - 环境变量配置示例

#### 3. 清理不必要的文件

删除以下文档文件：

- ❌ `PROJECT_STRUCTURE.md`
- ❌ `PROJECT_SUMMARY.md`
- ❌ `QUICK_START.md`
- ❌ `USAGE_GUIDE.md`
- ❌ `FILE_LIST.md`
- ❌ `package.json.new`
- ❌ `prisma.config.ts`

#### 4. 优化 package.json

添加 Prisma 相关脚本：

- `prisma:generate` - 生成 Prisma Client
- `prisma:migrate` - 执行数据库迁移
- `prisma:studio` - 打开 Prisma Studio
- `prisma:seed` - 执行数据库种子

### 当前技术栈

- **框架**: NestJS 11.x
- **ORM**: Prisma 6.19.0 (稳定版)
- **数据库**: MySQL
- **认证**: JWT + Passport
- **语言**: TypeScript 5.7.x
- **包管理器**: pnpm

### 项目结构

```
NestJs/
├── prisma/           # Prisma 配置
├── src/
│   ├── common/       # 公共模块
│   ├── config/       # 配置模块
│   └── modules/      # 业务模块
│       ├── auth/     # 认证
│       ├── user/     # 用户管理
│       ├── role/     # 角色管理
│       ├── article/  # 文章管理
│       └── category/ # 分类管理
├── test/             # 测试文件
├── scripts/          # 脚本文件
└── dist/             # 编译输出
```

### 快速开始

1. 安装依赖：`pnpm install`
2. 配置环境变量：复制 `.env.example` 为 `.env` 并填写配置
3. 生成 Prisma Client：`pnpm prisma:generate`
4. 执行数据库迁移：`pnpm prisma:migrate`
5. 填充种子数据：`pnpm prisma:seed`
6. 启动项目：`pnpm run start:dev`

### 下一步

- 配置数据库连接
- 执行数据库迁移
- 运行项目测试
- 部署到生产环境
