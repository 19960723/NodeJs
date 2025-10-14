# RESTful API 规范文档

本项目遵循 RESTful API 设计规范，所有接口统一使用 `/api` 前缀。

## 1. 用户管理 API (Users)

### 基础路径: `/api/users`

| 方法   | 路径                       | 描述             | 认证 |
| ------ | -------------------------- | ---------------- | ---- |
| `POST` | `/api/users/register`      | 用户注册         | ❌   |
| `POST` | `/api/users/login`         | 用户登录         | ❌   |
| `POST` | `/api/users/logout`        | 用户退出登录     | ✅   |
| `POST` | `/api/users/refresh-token` | 刷新访问令牌     | ❌   |
| `GET`  | `/api/users/me`            | 获取当前用户信息 | ✅   |
| `PUT`  | `/api/users/me`            | 更新当前用户信息 | ✅   |
| `PUT`  | `/api/users/me/password`   | 修改当前用户密码 | ✅   |

### 用户管理 (管理员功能)

| 方法     | 路径                            | 描述             | 认证 |
| -------- | ------------------------------- | ---------------- | ---- |
| `GET`    | `/api/users`                    | 获取用户列表     | ✅   |
| `POST`   | `/api/users`                    | 创建新用户       | ✅   |
| `GET`    | `/api/users/:id`                | 获取指定用户信息 | ✅   |
| `PUT`    | `/api/users/:id`                | 更新用户信息     | ✅   |
| `DELETE` | `/api/users/:id`                | 删除用户         | ✅   |
| `POST`   | `/api/users/:id/reset-password` | 重置用户密码     | ✅   |
| `POST`   | `/api/users/batch-delete`       | 批量删除用户     | ✅   |

## 2. 文件上传 API (Upload)

### 基础路径: `/api/upload`

| 方法   | 路径                  | 描述         | 认证 |
| ------ | --------------------- | ------------ | ---- |
| `POST` | `/api/upload/avatars` | 上传用户头像 | ✅   |

## 3. 仪表盘 API (Dashboard)

### 基础路径: `/api/dashboard`

| 方法  | 路径                              | 描述             | 认证 |
| ----- | --------------------------------- | ---------------- | ---- |
| `GET` | `/api/dashboard/statistics`       | 获取统计数据     | ✅   |
| `GET` | `/api/dashboard/analytics/users`  | 获取用户增长趋势 | ✅   |
| `GET` | `/api/dashboard/analytics/sales`  | 获取销售数据     | ✅   |
| `GET` | `/api/dashboard/analytics/visits` | 获取访问统计     | ✅   |
| `GET` | `/api/dashboard/analytics/pages`  | 获取热门页面     | ✅   |
| `GET` | `/api/dashboard/system`           | 获取系统信息     | ✅   |
| `GET` | `/api/dashboard/users/online`     | 获取在线用户     | ✅   |

## 4. 验证码 API (Captcha)

### 基础路径: `/api/captcha`

| 方法   | 路径                            | 描述           | 认证 |
| ------ | ------------------------------- | -------------- | ---- |
| `GET`  | `/api/captcha`                  | 获取验证码     | ❌   |
| `GET`  | `/api/captcha/image/:sessionId` | 获取验证码图片 | ❌   |
| `POST` | `/api/captcha/refresh`          | 刷新验证码     | ❌   |
| `POST` | `/api/captcha/verify`           | 验证验证码     | ❌   |
| `GET`  | `/api/captcha/stats`            | 获取验证码统计 | ❌   |

## 5. 健康检查 API (Health)

### 基础路径: `/api/health`

| 方法  | 路径                   | 描述         | 认证 |
| ----- | ---------------------- | ------------ | ---- |
| `GET` | `/api/health`          | 基础健康检查 | ❌   |
| `GET` | `/api/health/detailed` | 详细健康检查 | ❌   |

## HTTP 状态码规范

- `200 OK` - 请求成功
- `201 Created` - 资源创建成功
- `400 Bad Request` - 请求参数错误
- `401 Unauthorized` - 未授权
- `403 Forbidden` - 权限不足
- `404 Not Found` - 资源不存在
- `409 Conflict` - 资源冲突
- `500 Internal Server Error` - 服务器内部错误

## 响应格式

所有接口统一返回格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

## 分页格式

列表接口的分页响应格式：

```json
{
  "code": 200,
  "message": "获取数据成功",
  "data": {
    "list": [],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

## 认证方式

使用 JWT Bearer Token 认证：

```
Authorization: Bearer <token>
```
