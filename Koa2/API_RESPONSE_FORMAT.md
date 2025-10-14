# API 响应格式说明

本项目已更新API响应格式以匹配前端 `request.ts` 的期望格式。

## 响应格式结构

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    // 响应数据
  }
}
```

### 错误响应

```json
{
  "code": 400, // 错误代码
  "message": "错误信息",
  "data": {
    // 可选，额外的错误详情
    // 错误详情
  }
}
```

## 状态码对应关系

| HTTP状态码 | 响应code | 说明           |
| ---------- | -------- | -------------- |
| 200        | 200      | 成功           |
| 400        | 400      | 请求参数错误   |
| 401        | 401      | 未授权         |
| 403        | 403      | 权限不足       |
| 404        | 404      | 资源不存在     |
| 409        | 409      | 资源冲突       |
| 500        | 500      | 服务器内部错误 |
| 503        | 503      | 服务不可用     |

## API响应示例

### 1. 用户登录成功

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "tokenType": "Bearer",
      "expiresIn": "1h"
    }
  }
}
```

### 2. 参数验证失败

```json
{
  "code": 400,
  "message": "数据验证失败",
  "data": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    },
    {
      "field": "password",
      "message": "密码长度至少6位"
    }
  ]
}
```

### 3. 未授权访问

```json
{
  "code": 401,
  "message": "未授权，请重新登录"
}
```

### 4. 分页数据响应

```json
{
  "code": 200,
  "message": "获取用户列表成功",
  "data": {
    "list": [
      {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

## 前端配置

前端 `request.ts` 已配置为处理以下响应：

- `code === 200` 或 `code === 0`: 请求成功
- `code === 401`: 自动跳转登录页面
- `code === 403`: 显示权限不足提示
- 其他错误码: 显示相应错误信息

## 工具函数

项目提供了统一的响应工具函数 (`src/utils/response.js`):

- `success(ctx, data, message, code)` - 成功响应
- `error(ctx, message, code, status, data)` - 错误响应
- `unauthorized(ctx, message)` - 401未授权
- `forbidden(ctx, message)` - 403权限不足
- `notFound(ctx, message)` - 404资源不存在
- `badRequest(ctx, message, data)` - 400参数错误
- `conflict(ctx, message)` - 409资源冲突
- `serverError(ctx, message)` - 500服务器错误
- `paginated(ctx, list, pagination, message)` - 分页数据响应
