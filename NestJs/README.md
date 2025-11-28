# NestJS 企业级后端项目

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  基于 NestJS + Prisma + MySQL 的企业级后端项目模板
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql" alt="MySQL" />
</p>

---

## 📖 项目简介

这是一个功能完善的企业级后端项目模板，集成了现代 Web 开发的最佳实践，可快速用于生产环境或作为学习参考。

### ✨ 核心特性

- 🔐 **JWT 双令牌认证** - Access Token + Refresh Token，支持撤销
- 👥 **RBAC 权限模型** - 用户-角色-权限多对多关联，细粒度权限控制
- 📝 **完整业务模块** - 用户、角色、权限、文章、分类管理
- 🛡️ **安全防护** - 限流保护、密码加密、参数验证
- 📊 **Winston 日志** - 分级日志、文件持久化、请求追踪
- 🎯 **统一返回格式** - 标准化 API 响应和错误码系统
- 📚 **Swagger 文档** - 自动生成 API 文档，支持在线调试
- 🗄️ **Prisma ORM** - 类型安全的数据库操作，支持迁移和 Seed

---

## 🏗️ 技术架构

### 技术栈

| 技术            | 版本 | 说明                |
| --------------- | ---- | ------------------- |
| NestJS          | 11.x | 渐进式 Node.js 框架 |
| Prisma          | 6.x  | 下一代 ORM          |
| MySQL           | 8.x  | 关系型数据库        |
| TypeScript      | 5.x  | JavaScript 超集     |
| JWT             | -    | JSON Web Token 认证 |
| Winston         | 3.x  | 日志管理            |
| Swagger         | -    | API 文档生成        |
| class-validator | -    | DTO 参数验证        |

### 架构分层

```
Controller（路由控制）
    ↓
Service（业务逻辑）
    ↓
Repository（数据访问）
    ↓
Prisma（ORM 层）
    ↓
Database（数据库）
```

### 目录结构

```
src/
├── common/                 # 公共模块
│   ├── constants/          # 常量定义（错误码）
│   ├── decorators/         # 自定义装饰器（@Public、@Roles、@CurrentUser）
│   ├── dto/                # 通用 DTO（分页、响应）
│   ├── exceptions/         # 业务异常类
│   ├── filters/            # 全局异常过滤器
│   ├── guards/             # 守卫（JWT、角色、权限）
│   ├── interceptors/       # 拦截器（日志、响应转换）
│   ├── logger/             # Winston 日志模块
│   ├── repositories/       # Prisma 基础仓储
│   ├── strategies/         # Passport 策略（JWT）
│   └── utils/              # 工具函数
│
├── config/                 # 配置模块
│   ├── config.module.ts    # 配置模块定义
│   └── configuration.ts    # 环境变量配置
│
├── modules/                # 业务模块
│   ├── auth/               # 认证模块（登录、注册、Token 刷新）
│   ├── user/               # 用户管理
│   ├── role/               # 角色管理
│   ├── permission/         # 权限管理
│   ├── article/            # 文章管理
│   └── category/           # 分类管理
│
├── app.module.ts           # 根模块
└── main.ts                 # 应用入口

prisma/
├── schema.prisma           # 数据库模型定义
├── seed.ts                 # 数据 Seed 入口
├── seeds/                  # 种子数据文件
│   ├── permissions.seed.ts # 权限初始化
│   └── roles.seed.ts       # 角色初始化
└── migrations/             # 数据库迁移文件
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- MySQL >= 8.x
- pnpm >= 8.x（推荐）或 npm

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 配置环境变量

创建 `.env` 文件（参考 `.env.example`）：

```env
# 应用配置
NODE_ENV=development
PORT=3000

# 数据库配置
DATABASE_URL="mysql://用户名:密码@localhost:3306/数据库名"

# JWT 配置
JWT_SECRET=your_super_secret_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Swagger 文档配置
SWAGGER_ENABLE=true
SWAGGER_PATH=api/docs
```

### 数据库初始化

```bash
# 生成 Prisma Client
pnpm prisma:generate

# 执行数据库迁移
pnpm prisma:migrate

# 填充初始数据（可选）
pnpm prisma:seed
```

### 启动应用

```bash
# 开发模式（热重载）
pnpm start:dev

# 生产模式
pnpm build
pnpm start:prod
```

访问地址：

- **API 接口**: http://localhost:3000/api
- **Swagger 文档**: http://localhost:3000/api/docs

---

## 📦 数据模型

### 核心表结构

#### 用户表 (users)

```prisma
- id: 用户 ID
- username: 用户名（唯一）
- email: 邮箱（唯一）
- password: 密码（bcrypt 加密）
- nickname: 昵称
- avatar: 头像
- phone: 手机号
- status: 状态（1:正常 0:禁用）
```

#### 角色表 (roles)

```prisma
- id: 角色 ID
- name: 角色名称
- code: 角色代码（唯一）
- description: 描述
- status: 状态
```

#### 权限表 (permissions)

```prisma
- id: 权限 ID
- parentId: 父权限 ID（支持树形结构）
- name: 权限名称
- code: 权限代码（如：user:create）
- type: 类型（1:目录 2:菜单 3:按钮 4:API）
- title: 显示标题
- path: 路由路径
- component: 组件路径
- icon: 图标
- metadata: 扩展配置（JSON）
- sort: 排序
- status: 状态
```

#### 文章表 (articles)

```prisma
- id: 文章 ID
- title: 标题
- slug: URL 别名
- summary: 摘要
- content: 内容
- cover: 封面图
- authorId: 作者 ID
- categoryId: 分类 ID
- viewCount: 浏览量
- likeCount: 点赞量
- status: 状态（1:已发布 0:草稿）
```

### RBAC 权限模型

```
User (用户) ←→ UserRole ←→ Role (角色) ←→ RolePermission ←→ Permission (权限)
     1..N              N..M              1..N                    N..M              1..N
```

- 用户可以拥有多个角色（多对多）
- 角色可以拥有多个权限（多对多）
- 支持动态权限分配和细粒度控制

---

## 🔐 认证与授权

### JWT 双令牌机制

| Token 类型    | 有效期 | 用途       | 存储位置        |
| ------------- | ------ | ---------- | --------------- |
| Access Token  | 7 天   | API 调用   | HTTP Header     |
| Refresh Token | 30 天  | 刷新 Token | 数据库 + Cookie |

### 使用示例

#### 1. 注册用户

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123"
}
```

#### 2. 登录获取 Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "Password123"
}
```

响应：

```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    }
  },
  "timestamp": "2024-11-24T10:00:00Z"
}
```

#### 3. 携带 Token 访问受保护接口

```http
GET /api/users/profile
Authorization: Bearer <accessToken>
```

#### 4. 刷新 Access Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 权限控制

#### 角色守卫

```typescript
@Roles('admin', 'editor')
@Get()
findAll() {
  // 只有 admin 或 editor 角色可以访问
}
```

#### 权限守卫

```typescript
@Permissions('user:create')
@Post()
create() {
  // 只有拥有 user:create 权限的用户可以访问
}
```

#### 公开接口（跳过认证）

```typescript
@Public()
@Get('public')
getPublicData() {
  // 无需登录即可访问
}
```

---

## 📋 API 文档

启动项目后访问 Swagger 文档：**http://localhost:3000/api/docs**

### 主要 API 端点

#### 认证管理 (Auth)

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/refresh` - 刷新 Token
- `POST /api/auth/logout` - 退出登录

#### 用户管理 (User)

- `GET /api/users` - 获取用户列表（分页）
- `GET /api/users/:id` - 获取用户详情
- `GET /api/users/profile` - 获取当前用户信息
- `POST /api/users` - 创建用户
- `PATCH /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

#### 角色管理 (Role)

- `GET /api/roles` - 获取角色列表
- `GET /api/roles/:id` - 获取角色详情
- `POST /api/roles` - 创建角色
- `PATCH /api/roles/:id` - 更新角色
- `DELETE /api/roles/:id` - 删除角色

#### 权限管理 (Permission)

- `GET /api/permissions` - 获取权限列表
- `GET /api/permissions/tree` - 获取权限树
- `GET /api/permissions/menu` - 获取当前用户菜单树
- `GET /api/permissions/user` - 获取当前用户的权限信息（权限代码列表 + 菜单树）
- `POST /api/permissions` - 创建权限
- `PATCH /api/permissions/:id` - 更新权限
- `DELETE /api/permissions/:id` - 删除权限

#### 文章管理 (Article)

- `GET /api/articles` - 获取文章列表
- `GET /api/articles/:id` - 获取文章详情
- `POST /api/articles` - 创建文章
- `PATCH /api/articles/:id` - 更新文章
- `DELETE /api/articles/:id` - 删除文章

#### 分类管理 (Category)

- `GET /api/categories` - 获取分类列表
- `GET /api/categories/:id` - 获取分类详情
- `POST /api/categories` - 创建分类
- `PATCH /api/categories/:id` - 更新分类
- `DELETE /api/categories/:id` - 删除分类

---

## 🎯 核心功能

### 1. 统一返回格式

所有 API 响应都遵循统一格式：

```typescript
{
  "code": 0,              // 状态码（0:成功 其他:失败）
  "message": "操作成功",   // 消息描述
  "data": {},             // 数据（可选）
  "timestamp": "2024-11-24T10:00:00Z"  // 时间戳
}
```

### 2. 错误码系统

| 范围        | 说明     | 示例             |
| ----------- | -------- | ---------------- |
| 10000-19999 | 通用错误 | 10001:参数错误   |
| 20000-29999 | 用户相关 | 20001:用户不存在 |
| 30000-39999 | 认证相关 | 30001:未授权     |
| 40000-49999 | 权限相关 | 40001:权限不足   |
| 50000-59999 | 资源相关 | 50001:资源不存在 |
| 60000-69999 | 业务逻辑 | 60001:业务异常   |

### 3. 日志系统

基于 Winston 的分级日志系统：

```typescript
// 日志级别：error、warn、info、debug
this.logger.log('普通日志');
this.logger.error('错误日志', trace);
this.logger.warn('警告日志');
this.logger.debug('调试日志');
```

日志文件存储：

```
logs/
├── error/          # 错误日志
├── combined/       # 所有日志
└── exceptions/     # 未捕获异常
```

### 4. 参数验证

使用 `class-validator` 进行 DTO 验证：

```typescript
export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  @ApiProperty({ description: '用户名' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  @ApiProperty({ description: '密码' })
  password: string;
}
```

### 5. 全局异常处理

自动捕获所有异常并统一返回格式：

```typescript
try {
  // 业务代码
} catch (error) {
  throw new BusinessException(ErrorCode.USER_NOT_FOUND);
}
```

### 6. 限流保护

防止 API 滥用：

```typescript
@SkipThrottle(false)    // 启用限流
@Throttle({ default: { limit: 3, ttl: 60000 } })  // 60秒内最多3次
@Get()
findAll() {
  // ...
}
```

---

## 🛠️ 开发指南

### 常用命令

```bash
# 开发
pnpm start:dev              # 开发模式（热重载）
pnpm start:debug            # 调试模式

# 构建
pnpm build                  # 构建项目
pnpm start:prod             # 生产模式

# 测试
pnpm test                   # 单元测试
pnpm test:watch             # 监听模式测试
pnpm test:cov               # 测试覆盖率
pnpm test:e2e               # E2E 测试

# 代码质量
pnpm lint                   # ESLint 检查
pnpm format                 # Prettier 格式化

# 数据库
pnpm prisma:generate        # 生成 Prisma Client
pnpm prisma:migrate         # 执行迁移
pnpm prisma:studio          # 打开数据库管理界面
pnpm prisma:seed            # 填充种子数据
pnpm prisma:reset           # 重置数据库

# Swagger
pnpm swagger:export         # 导出 Swagger JSON
```

### 创建新模块

```bash
# 使用 NestJS CLI
nest g module modules/your-module
nest g controller modules/your-module
nest g service modules/your-module
```

### 数据库迁移

```bash
# 创建迁移
npx prisma migrate dev --name your_migration_name

# 应用迁移到生产
npx prisma migrate deploy

# 重置数据库（开发环境）
npx prisma migrate reset
```

### 添加新权限

编辑 `prisma/seeds/permissions.seed.ts`，然后运行：

```bash
pnpm prisma:seed
```

---

## 📝 开发规范

### 命名规范

| 类型      | 规范                | 示例              |
| --------- | ------------------- | ----------------- |
| 文件      | kebab-case          | `user.service.ts` |
| 类        | PascalCase          | `UserService`     |
| 方法/变量 | camelCase           | `getUserById`     |
| 常量      | UPPER_SNAKE_CASE    | `JWT_SECRET`      |
| 接口      | PascalCase + I 前缀 | `IUserRepository` |

### 代码风格

- 使用 TypeScript 严格模式
- 优先使用 `const` 和 `let`，避免 `var`
- 使用箭头函数
- 使用模板字符串而非字符串拼接
- 适当添加注释和类型注解

### Git 提交规范

```bash
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

---

## 🔒 安全建议

### 生产环境配置

1. **环境变量**
   - 使用强密码和复杂的 JWT_SECRET（至少 32 位）
   - 不要将 `.env` 文件提交到版本控制

2. **CORS 配置**

   ```typescript
   app.enableCors({
     origin: ['https://yourdomain.com'], // 指定允许的域名
     credentials: true,
   });
   ```

3. **限流配置**
   - 根据实际需求调整限流参数
   - 对登录等敏感接口单独设置更严格的限流

4. **数据库**
   - 使用只读账号进行查询操作
   - 定期备份数据库
   - 启用 MySQL 的慢查询日志

5. **日志安全**
   - 避免记录敏感信息（密码、Token）
   - 定期清理旧日志文件

---

## 🚀 部署

### Docker 部署（推荐）

```dockerfile
# Dockerfile 示例
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main"]
```

```bash
# 构建镜像
docker build -t nestjs-app .

# 运行容器
docker run -d -p 3000:3000 --env-file .env nestjs-app
```

### PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start dist/main.js --name nestjs-app

# 查看状态
pm2 status

# 查看日志
pm2 logs nestjs-app

# 重启
pm2 restart nestjs-app
```

### Nginx 反向代理

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📚 学习资源

- [NestJS 官方文档](https://docs.nestjs.com/)
- [Prisma 官方文档](https://www.prisma.io/docs)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [JWT 介绍](https://jwt.io/introduction)

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 许可证

本项目采用 UNLICENSED 许可证。

---

## 👨‍💻 作者

如有问题或建议，欢迎联系！

---

## ⭐ Star History

如果这个项目对你有帮助，欢迎给个 Star ⭐️

---

**Happy Coding! 🎉**
