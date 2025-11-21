# 项目架构说明

## 技术栈

- **框架**: NestJS 11.x
- **ORM**: Prisma 6.x (稳定版)
- **数据库**: MySQL
- **认证**: JWT + Passport
- **语言**: TypeScript 5.x
- **包管理器**: pnpm

## 目录结构

```
NestJs/
├── prisma/                    # Prisma 配置和数据库
│   ├── schema.prisma         # 数据库模型定义
│   └── seed.ts               # 数据库种子文件
│
├── src/                      # 源代码目录
│   ├── common/               # 公共模块
│   │   ├── decorators/       # 自定义装饰器
│   │   │   ├── public.decorator.ts      # 公开路由装饰器
│   │   │   └── user.decorator.ts        # 用户装饰器
│   │   ├── dto/              # 通用 DTO
│   │   │   ├── page.dto.ts              # 分页 DTO
│   │   │   └── result.dto.ts            # 统一返回格式
│   │   ├── exceptions/       # 自定义异常
│   │   │   └── business.exception.ts    # 业务异常
│   │   ├── filters/          # 异常过滤器
│   │   │   └── all-exception.filter.ts  # 全局异常过滤器
│   │   ├── guards/           # 守卫
│   │   │   └── jwt-auth.guard.ts        # JWT 认证守卫
│   │   ├── interceptors/     # 拦截器
│   │   │   ├── logging.interceptor.ts   # 日志拦截器
│   │   │   └── transform.interceptor.ts # 响应转换拦截器
│   │   ├── repositories/     # 数据访问层
│   │   │   ├── base.repository.ts       # 基础仓储类
│   │   │   ├── prisma.module.ts         # Prisma 模块
│   │   │   └── prisma.service.ts        # Prisma 服务
│   │   ├── strategies/       # 认证策略
│   │   │   └── jwt.strategy.ts          # JWT 策略
│   │   └── utils/            # 工具函数
│   │       └── hash.util.ts             # 密码哈希工具
│   │
│   ├── config/               # 配置模块
│   │   └── config.module.ts             # 全局配置
│   │
│   ├── modules/              # 业务模块
│   │   ├── auth/             # 认证模块
│   │   │   ├── dto/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── user/             # 用户管理模块
│   │   │   ├── dto/
│   │   │   ├── repositories/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   │
│   │   ├── role/             # 角色管理模块
│   │   │   ├── dto/
│   │   │   ├── repositories/
│   │   │   ├── role.controller.ts
│   │   │   ├── role.service.ts
│   │   │   └── role.module.ts
│   │   │
│   │   ├── article/          # 文章管理模块
│   │   │   ├── dto/
│   │   │   ├── repositories/
│   │   │   ├── article.controller.ts
│   │   │   ├── article.service.ts
│   │   │   └── article.module.ts
│   │   │
│   │   └── category/         # 分类管理模块
│   │       ├── dto/
│   │       ├── repositories/
│   │       ├── category.controller.ts
│   │       ├── category.service.ts
│   │       └── category.module.ts
│   │
│   ├── app.module.ts         # 根模块
│   └── main.ts               # 应用入口
│
├── test/                     # 测试文件
├── scripts/                  # 脚本文件
├── dist/                     # 编译输出目录
│
├── .env                      # 环境变量（不提交）
├── .env.example              # 环境变量示例
├── .gitignore               # Git 忽略配置
├── package.json             # 项目依赖
├── pnpm-lock.yaml           # pnpm 锁定文件
├── tsconfig.json            # TypeScript 配置
├── nest-cli.json            # NestJS CLI 配置
└── README.md                # 项目说明
```

## 架构设计

### 分层架构

项目采用经典的三层架构：

```
Controller (控制层)
    ↓
Service (业务层)
    ↓
Repository (数据访问层)
    ↓
Database (数据库)
```

### 模块说明

#### 1. Common 模块

- **Decorators**: 自定义装饰器，如 `@Public()` 标记公开路由，`@CurrentUser()` 获取当前用户
- **DTO**: 通用数据传输对象，如分页、统一返回格式
- **Exceptions**: 自定义异常类
- **Filters**: 全局异常处理
- **Guards**: 路由守卫，如 JWT 认证守卫
- **Interceptors**: 拦截器，如日志记录、响应转换
- **Repositories**: Prisma 服务和基础仓储类
- **Strategies**: 认证策略
- **Utils**: 工具函数

#### 2. Config 模块

- 全局配置管理
- 环境变量加载

#### 3. Business 模块

- **Auth**: 用户认证（登录、注册）
- **User**: 用户管理（CRUD）
- **Role**: 角色管理（CRUD）
- **Article**: 文章管理（CRUD）
- **Category**: 分类管理（CRUD）

### 数据流

```
Client Request
    ↓
Guard (JWT 验证)
    ↓
Controller (路由处理)
    ↓
Service (业务逻辑)
    ↓
Repository (数据访问)
    ↓
Prisma Client
    ↓
Database
    ↓
Response (经过 Interceptor 转换)
    ↓
Client
```

## 核心特性

### 1. 统一返回格式

所有接口返回统一的格式：

```typescript
{
  code: number;      // 状态码
  message: string;   // 消息
  data?: any;        // 数据
  timestamp: string; // 时间戳
}
```

### 2. JWT 认证

- 使用 JWT 进行用户认证
- 通过 `@Public()` 装饰器标记公开路由
- 默认所有路由需要认证

### 3. 参数校验

- 使用 `class-validator` 进行自动参数校验
- DTO 类中使用装饰器定义验证规则

### 4. 异常处理

- 全局异常过滤器统一处理异常
- 业务异常使用 `BusinessException`
- 自动转换为统一的错误格式

### 5. Repository 模式

- 数据访问层封装
- 继承 `BaseRepository` 获得通用 CRUD 方法
- 易于测试和维护

## 数据库模型

### User (用户)

- 基础信息：用户名、邮箱、密码、昵称、头像、手机号
- 状态管理
- 与角色多对多关联
- 与文章一对多关联

### Role (角色)

- 角色名称、编码、描述
- 状态管理
- 与用户多对多关联

### Article (文章)

- 标题、别名、摘要、内容、封面
- 作者关联
- 分类关联
- 浏览量、点赞量统计

### Category (分类)

- 名称、别名、描述
- 父级分类（支持树形结构）
- 排序、状态管理

## 开发规范

### 命名规范

- **文件**: kebab-case (如 `user.service.ts`)
- **类**: PascalCase (如 `UserService`)
- **方法/变量**: camelCase (如 `getUserById`)
- **常量**: UPPER_SNAKE_CASE (如 `JWT_SECRET`)

### 模块结构

每个业务模块应包含：

- `module.ts` - 模块定义
- `controller.ts` - 控制器
- `service.ts` - 服务
- `dto/` - 数据传输对象
- `repositories/` - 数据访问层（如需要）

### 提交规范

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

## 部署说明

### 开发环境

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm run start:dev
```

### 生产环境

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm run build
pnpm run start:prod
```
