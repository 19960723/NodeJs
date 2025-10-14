# 前端 API 迁移指南

## 📋 接口路径变更对照表

### 用户相关接口

| 功能         | 旧路径                          | 新路径 (RESTful)                     | 方法      |
| ------------ | ------------------------------- | ------------------------------------ | --------- |
| 用户登录     | `POST /api/users/login`         | `POST /api/users/login`              | ✅ 无变化 |
| 退出登录     | `POST /auth/logout`             | `POST /api/users/logout`             | 🔄 已更新 |
| 刷新 Token   | `POST /auth/refresh`            | `POST /api/users/refresh-token`      | 🔄 已更新 |
| 获取用户信息 | `GET /user/info`                | `GET /api/users/me`                  | 🔄 已更新 |
| 更新用户信息 | `PUT /user/profile`             | `PUT /api/users/me`                  | 🔄 已更新 |
| 修改密码     | `POST /user/change-password`    | `PUT /api/users/me/password`         | 🔄 已更新 |
| 获取用户列表 | `GET /user/list`                | `GET /api/users`                     | 🔄 已更新 |
| 创建用户     | `POST /user`                    | `POST /api/users`                    | 🔄 已更新 |
| 获取指定用户 | -                               | `GET /api/users/:id`                 | ✨ 新增   |
| 更新用户     | `PUT /user/:id`                 | `PUT /api/users/:id`                 | 🔄 已更新 |
| 删除用户     | `DELETE /user/:id`              | `DELETE /api/users/:id`              | 🔄 已更新 |
| 批量删除用户 | `DELETE /user/batch`            | `POST /api/users/batch-delete`       | 🔄 已更新 |
| 重置密码     | `POST /user/:id/reset-password` | `POST /api/users/:id/reset-password` | 🔄 已更新 |

### 文件上传接口

| 功能     | 旧路径                | 新路径 (RESTful)           | 方法      |
| -------- | --------------------- | -------------------------- | --------- |
| 上传头像 | `POST /upload/avatar` | `POST /api/upload/avatars` | 🔄 已更新 |

### Dashboard 接口

| 功能         | 旧路径                         | 新路径 (RESTful)                      | 方法      |
| ------------ | ------------------------------ | ------------------------------------- | --------- |
| 获取统计数据 | `GET /dashboard/stats`         | `GET /api/dashboard/statistics`       | 🔄 已更新 |
| 用户增长趋势 | `GET /dashboard/user-growth`   | `GET /api/dashboard/analytics/users`  | 🔄 已更新 |
| 获取销售数据 | `GET /dashboard/sales`         | `GET /api/dashboard/analytics/sales`  | 🔄 已更新 |
| 获取访问统计 | `GET /dashboard/visit-stats`   | `GET /api/dashboard/analytics/visits` | 🔄 已更新 |
| 获取热门页面 | `GET /dashboard/popular-pages` | `GET /api/dashboard/analytics/pages`  | 🔄 已更新 |
| 获取系统信息 | `GET /dashboard/system-info`   | `GET /api/dashboard/system`           | 🔄 已更新 |
| 获取在线用户 | `GET /dashboard/online-users`  | `GET /api/dashboard/users/online`     | 🔄 已更新 |

### 验证码接口

| 功能       | 旧路径             | 新路径 (RESTful)   | 方法      |
| ---------- | ------------------ | ------------------ | --------- |
| 获取验证码 | `GET /api/captcha` | `GET /api/captcha` | ✅ 无变化 |

## 🔧 前端代码更新

### 1. API 文件更新

- ✅ `src/api/user.ts` - 已更新所有用户相关接口
- ✅ `src/api/dashboard.ts` - 已更新所有 Dashboard 接口

### 2. Vite 配置更新

- ✅ `vite.config.ts` - 简化代理配置，统一使用 `/api` 前缀

### 3. 新增功能

- ✨ `userApi.register()` - 用户注册接口
- ✨ `userApi.getUserById()` - 获取指定用户信息接口
- ✨ `userApi.updateProfile()` - 更新当前用户信息接口

### 4. 方法名调整

- `changePassword()` 保持不变，但路径和 HTTP 方法已更新
- `updateProfile()` 新增，用于更新当前用户信息
- `updateUser()` 用于管理员更新其他用户信息

## 🚀 迁移检查清单

- [x] 更新 `src/api/user.ts` 中的所有接口路径
- [x] 更新 `src/api/dashboard.ts` 中的所有接口路径
- [x] 简化 `vite.config.ts` 中的代理配置
- [x] 确保所有接口都使用 `/api` 前缀
- [ ] 测试前端登录功能
- [ ] 测试用户管理功能
- [ ] 测试 Dashboard 数据加载
- [ ] 测试文件上传功能

## ⚠️ 注意事项

1. **HTTP 方法变更**:

   - 修改密码从 `POST` 改为 `PUT`
   - 批量删除从 `DELETE` 改为 `POST`

2. **路径语义化**:

   - 使用 `/me` 表示当前用户资源
   - 使用 `/analytics` 分组分析类接口
   - 使用复数名词表示资源集合

3. **代理配置简化**:

   - 所有接口统一使用 `/api` 前缀
   - 前端代理配置更加简洁

4. **向后兼容**:
   - 如有其他页面使用旧接口，需要同步更新
   - 建议全局搜索确认所有接口调用都已更新

## 🔍 测试建议

启动前后端服务后，依次测试：

1. 登录/退出功能
2. 用户信息获取和更新
3. 用户管理 CRUD 操作
4. 文件上传功能
5. Dashboard 数据展示

如发现接口调用问题，请检查：

1. 接口路径是否正确
2. HTTP 方法是否匹配
3. 参数格式是否正确
4. 认证 Token 是否正常传递
