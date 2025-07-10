# 🚀 Node.js Express + TypeScript + Prisma + MySQL 项目模板

这是一个使用 **Express + TypeScript + Prisma + MySQL** 搭建的后端服务模板，适用于前后端分离项目、API 服务开发或中大型项目的快速起步。

---

## 📦 技术栈

- **Express** - Node.js Web 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Prisma** - 现代 ORM，操作数据库更安全便捷
- **MySQL** - 高性能关系型数据库
- **bcrypt** - 安全加密用户密码
- **jsonwebtoken** - 支持基于 JWT 的用户认证
- **dotenv** - 管理多环境配置
- **morgan** - 记录 HTTP 请求日志
- **cors** - 处理跨域请求

---

## 📁 项目结构说明

```
.
├── prisma/                    # Prisma 数据建模与迁移目录
│   └── schema.prisma          # 数据模型定义，映射数据库表结构
│
├── src/                       # 源码主目录
│   ├── config/                # 配置项，例如数据库连接、JWT 密钥等
│   │   └── db.ts              # Prisma 实例和数据库连接导出
│
│   ├── controllers/           # 控制器层：处理请求，调用 service 返回响应
│   │   └── user.controller.ts # 示例用户接口逻辑，如登录注册
│
│   ├── services/              # 服务层：处理业务逻辑、调用数据库
│   │   └── user.service.ts    # 用户业务逻辑，如创建用户、验证密码等
│
│   ├── routes/                # 路由层：定义各模块的路由规则
│   │   └── user.routes.ts     # 用户模块的路由注册
│
│   ├── middlewares/           # 中间件层：用于处理鉴权、错误、日志等
│   │   ├── authMiddleware.ts  # 鉴权中间件，校验 JWT
│   │   └── errorHandler.ts    # 错误处理器，统一输出错误信息
│
│   ├── utils/                 # 工具函数封装目录
│   │   ├── hash.ts            # 加密/比对密码（封装 bcrypt）
│   │   └── response.ts        # 封装统一响应格式
│
│   ├── types/                 # 类型定义（可选）
│   │   └── index.d.ts         # 项目中用到的自定义类型
│
│   └── index.ts               # 应用主入口，加载中间件、挂载路由、启动服务
│
├── .env                       # 环境变量配置（数据库地址、JWT密钥）
├── package.json               # 项目依赖和脚本配置
├── tsconfig.json              # TypeScript 配置文件
└── README.md                  # 项目说明文档
```

---

## ⚙️ 环境配置

在项目根目录下创建 `.env` 文件：

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/your_db_name"
JWT_SECRET=your_jwt_secret
PORT=3000
```

---

## 🛠 安装与启动

```bash
# 1. 安装依赖
npm install

# 2. 初始化数据库（首次建表）
npx prisma migrate dev --name init

# 3. 生成 Prisma 客户端
npx prisma generate

# 4. 启动开发环境
npm run dev
```

---

## 🧪 API 示例

### POST `/api/users/register`

注册新用户  
```json
{
  "username": "admin",
  "password": "123456"
}
```

### POST `/api/users/login`

登录并返回 token  
```json
{
  "username": "admin",
  "password": "123456"
}
```

---

## ✅ 常用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 使用 ts-node-dev 启动开发服务器 |
| `npm run build` | 编译 TypeScript 到 `dist` |
| `npm start` | 启动编译后的代码 |
| `npx prisma studio` | 打开数据库可视化管理界面 |
| `npx prisma migrate dev` | 执行数据库迁移 |
| `npx prisma generate` | 生成 Prisma 客户端 |

---

## 🔐 JWT 鉴权说明

部分接口已接入基于 JWT 的权限认证，通过 `Authorization: Bearer <token>` 方式访问。

可在中间件中扩展角色、权限校验逻辑。

---
