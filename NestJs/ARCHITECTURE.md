# 项目架构

## 技术栈

- **框架**: NestJS 11.x
- **ORM**: Prisma 6.x
- **数据库**: MySQL
- **认证**: JWT + Passport
- **语言**: TypeScript 5.x
- **包管理器**: pnpm

## 目录结构

```
src/
├── common/              # 公共模块
│   ├── constants/       # 常量（错误码）
│   ├── decorators/      # 装饰器（@Public, @Roles, @CurrentUser等）
│   ├── dto/            # 通用DTO（分页、统一返回）
│   ├── exceptions/     # 异常处理
│   ├── filters/        # 全局过滤器
│   ├── guards/         # 守卫（JWT、角色、权限）
│   ├── interceptors/   # 拦截器（日志、响应转换）
│   ├── logger/         # Winston日志系统
│   ├── repositories/   # Prisma服务和基础仓储
│   ├── strategies/     # JWT策略
│   └── utils/          # 工具函数
│
├── config/             # 配置模块（环境变量、Joi验证）
│
├── modules/            # 业务模块
│   ├── auth/          # 认证（登录/注册/Token刷新）
│   ├── user/          # 用户管理
│   ├── role/          # 角色管理
│   ├── permission/    # 权限管理
│   ├── article/       # 文章管理
│   └── category/      # 分类管理
│
├── app.module.ts      # 根模块
└── main.ts            # 应用入口
```

## 架构设计

### 分层架构

```
Controller → Service → Repository → Prisma → Database
```

### 数据流

```
请求 → Guards → Controller → Service → Repository → 数据库
响应 ← Interceptor ← Controller ← Service ← Repository ← 数据库
```

## 核心特性

### 1. 统一返回格式

```typescript
{
  "code": 0,
  "message": "成功",
  "data": {...},
  "timestamp": "2024-11-24T10:00:00Z"
}
```

### 2. 错误码系统

- 10000-19999: 通用错误
- 20000-29999: 用户相关
- 30000-39999: 认证相关
- 40000-49999: 权限相关
- 50000-59999: 资源相关
- 60000-69999: 业务逻辑

### 3. RBAC权限模型

```
User ─┬─> UserRole ──> Role ─┬─> RolePermission ──> Permission
      └─ 多对多              └─ 多对多
```

### 4. JWT双令牌机制

- **Access Token**: 7天（API调用）
- **Refresh Token**: 30天（Token刷新，可撤销）

### 5. Winston日志系统

- 分级日志（error/warn/info/debug）
- 文件持久化 + 按日轮转
- 敏感信息自动脱敏
- 请求追踪（Request ID）

### 6. 全局特性

- ✅ 参数自动验证（class-validator）
- ✅ 限流保护（ThrottlerGuard）
- ✅ 全局异常处理（AllExceptionFilter）
- ✅ 响应转换（TransformInterceptor）
- ✅ Swagger文档（自动生成）

## 数据模型

### 核心表

- **users** - 用户表
- **roles** - 角色表
- **permissions** - 权限表
- **user_roles** - 用户角色关联
- **role_permissions** - 角色权限关联
- **articles** - 文章表
- **categories** - 分类表
- **refresh_tokens** - 刷新令牌表

## 开发规范

### 命名规范

- **文件**: kebab-case（user.service.ts）
- **类**: PascalCase（UserService）
- **方法/变量**: camelCase（getUserById）
- **常量**: UPPER_SNAKE_CASE（JWT_SECRET）

### 模块结构

```
module/
├── dto/                    # 数据传输对象
├── repositories/           # 数据访问层
├── module.controller.ts    # 控制器
├── module.service.ts       # 服务
└── module.module.ts        # 模块定义
```

## 环境变量

关键配置项：

```env
DATABASE_URL=mysql://user:pass@localhost:3306/db
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
PORT=3000
NODE_ENV=development
```

## 常用命令

```bash
# 开发
pnpm start:dev

# 数据库
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma studio
pnpm prisma db seed

# 测试
pnpm test
pnpm test:e2e

# 构建
pnpm build
pnpm start:prod
```
