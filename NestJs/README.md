# NestJS 项目

基于 NestJS + Prisma 6 + MySQL 的后端应用框架。

## 技术栈

- **框架**: NestJS 11
- **数据库**: MySQL
- **ORM**: Prisma 6
- **认证**: JWT
- **包管理**: pnpm

## 功能模块

- 用户管理 (User)
- 角色管理 (Role)
- 文章管理 (Article)
- 分类管理 (Category)
- JWT 认证 (Auth)

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

创建 `.env` 文件（参考 `.env.example`）：

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

### 3. 数据库迁移

```bash
# 生成 Prisma Client
pnpm prisma generate

# 执行数据库迁移
pnpm prisma migrate dev

# 数据填充（可选）
pnpm prisma db seed
```

### 4. 启动项目

```bash
# 开发模式
pnpm run start:dev

# 生产模式
pnpm run build
pnpm run start:prod
```

## 项目结构

```
src/
├── common/              # 公共模块
│   ├── decorators/      # 装饰器
│   ├── dto/            # 数据传输对象
│   ├── exceptions/     # 异常处理
│   ├── filters/        # 过滤器
│   ├── guards/         # 守卫
│   ├── interceptors/   # 拦截器
│   ├── repositories/   # 仓储层（Prisma）
│   ├── strategies/     # 策略
│   └── utils/          # 工具函数
├── config/             # 配置模块
├── modules/            # 业务模块
│   ├── auth/          # 认证模块
│   ├── user/          # 用户模块
│   ├── role/          # 角色模块
│   ├── article/       # 文章模块
│   └── category/      # 分类模块
└── main.ts            # 应用入口
```

## API 文档

启动项目后访问 Swagger 文档：

```
http://localhost:3000/api
```

## 开发命令

```bash
# 代码格式化
pnpm run format

# 代码检查
pnpm run lint

# 运行测试
pnpm run test

# 测试覆盖率
pnpm run test:cov
```

## Prisma 命令

```bash
# 生成 Prisma Client
pnpm prisma generate

# 创建迁移
pnpm prisma migrate dev --name migration_name

# 查看数据库
pnpm prisma studio

# 重置数据库
pnpm prisma migrate reset
```

## License

MIT
