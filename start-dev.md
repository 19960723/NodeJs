# 前后端项目启动指南

## 后端 (Koa2) 启动

1. 进入后端目录：

```bash
cd Koa2
```

2. 安装依赖：

```bash
npm install
# 或
pnpm install
```

3. 运行数据库迁移（如果需要）：

```bash
npm run db:migrate
```

4. 启动开发服务器：

```bash
npm run dev
```

后端将在 http://localhost:3000 运行

## 前端 (Vue3) 启动

1. 进入前端目录：

```bash
cd admin-front-vue
```

2. 安装依赖：

```bash
npm install
# 或
pnpm install
```

3. 启动开发服务器：

```bash
npm run dev
```

前端将在 http://localhost:5173 运行

## 接口对接说明

### 已修改的接口路径对应关系：

| 功能           | 前端调用                           | 后端提供                           |
| -------------- | ---------------------------------- | ---------------------------------- |
| 用户登录       | POST /api/users/login              | POST /api/users/login              |
| 获取验证码     | GET /api/captcha                   | GET /api/captcha                   |
| 获取用户信息   | GET /api/users/me                  | GET /api/users/me                  |
| 获取用户列表   | GET /api/users                     | GET /api/users                     |
| 创建用户       | POST /api/users                    | POST /api/users                    |
| 更新用户       | PUT /api/users/:id                 | PUT /api/users/:id                 |
| 删除用户       | DELETE /api/users/:id              | DELETE /api/users/:id              |
| 批量删除用户   | POST /api/users/batch-delete       | POST /api/users/batch-delete       |
| 重置密码       | POST /api/users/:id/reset-password | POST /api/users/:id/reset-password |
| 修改密码       | POST /api/users/password           | POST /api/users/password           |
| 退出登录       | POST /auth/logout                  | POST /auth/logout                  |
| 刷新 Token     | POST /auth/refresh                 | POST /auth/refresh                 |
| 上传头像       | POST /upload/avatar                | POST /upload/avatar                |
| Dashboard 统计 | GET /dashboard/stats               | GET /dashboard/stats               |

### 数据库字段更新

用户表已添加以下字段：

- `nickname` - 用户昵称
- `phone` - 手机号码
- `roles` - 用户角色（JSON 格式）
- `permissions` - 用户权限（JSON 格式）

### 测试步骤

1. 确保后端服务运行正常
2. 确保前端服务运行正常
3. 访问前端登录页面
4. 使用测试账号登录（需要先创建用户或使用种子数据）
5. 测试各项功能

### 注意事项

- 前端通过 Vite 代理转发请求到后端
- 后端支持 CORS 跨域请求
- JWT Token 用于用户认证
- 文件上传保存在后端 uploads 目录
