# API 响应格式示例

## 标准响应格式

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    // 具体数据内容
  }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "错误描述"
}
```

## 具体接口响应示例

### 1. 获取示例列表

```http
GET /api/examples?page=1&pageSize=10
```

**成功响应 (200)**

```json
{
  "code": 200,
  "message": "获取示例列表成功",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "示例1",
        "description": "这是示例1",
        "status": "active",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

**空列表响应 (200)**

```json
{
  "code": 200,
  "message": "获取示例列表成功",
  "data": {
    "list": [],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

### 2. 获取示例详情

```http
GET /api/examples/1
```

**成功响应 (200)**

```json
{
  "code": 200,
  "message": "获取示例详情成功",
  "data": {
    "id": 1,
    "name": "示例1",
    "description": "这是示例1",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**资源不存在响应 (200)**

```json
{
  "code": 404,
  "message": "not found",
  "data": null
}
```

### 3. 创建示例

```http
POST /api/examples
Content-Type: application/json

{
  "name": "新示例",
  "description": "这是一个新示例",
  "status": "active"
}
```

**创建成功响应 (201)**

```json
{
  "code": 200,
  "message": "创建示例成功",
  "data": {
    "id": 2,
    "name": "新示例",
    "description": "这是一个新示例",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**参数错误响应 (400)**

```json
{
  "code": 400,
  "message": "示例名称不能为空"
}
```

**资源冲突响应 (409)**

```json
{
  "code": 409,
  "message": "示例名称已存在"
}
```

### 4. 更新示例

```http
PUT /api/examples/1
Content-Type: application/json

{
  "name": "更新的示例",
  "status": "inactive"
}
```

**更新成功响应 (200)**

```json
{
  "code": 200,
  "message": "更新示例成功",
  "data": {
    "id": 1,
    "name": "更新的示例",
    "description": "这是示例1",
    "status": "inactive",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**资源不存在响应 (404)**

```json
{
  "code": 404,
  "message": "示例不存在"
}
```

### 5. 删除示例

```http
DELETE /api/examples/1
```

**删除成功响应 (204)**

```http
HTTP/1.1 204 No Content
```

**资源不存在响应 (404)**

```json
{
  "code": 404,
  "message": "示例不存在"
}
```

### 6. 根据状态获取示例

```http
GET /api/examples/status/active
```

**成功响应 (200)**

```json
{
  "code": 200,
  "message": "获取示例成功",
  "data": [
    {
      "id": 1,
      "name": "示例1",
      "description": "这是示例1",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## HTTP状态码使用规范

| 场景         | HTTP状态码 | 业务状态码 | 说明                 |
| ------------ | ---------- | ---------- | -------------------- |
| 成功获取数据 | 200        | 200        | 正常返回数据         |
| 成功创建资源 | 201        | 200        | 创建成功，返回新资源 |
| 成功删除资源 | 204        | 200        | 删除成功，无返回内容 |
| 查询无数据   | 200        | 404        | 查询成功但无数据     |
| 资源不存在   | 404        | 404        | 要操作的资源ID不存在 |
| 参数错误     | 400        | 400        | 请求参数格式错误     |
| 资源冲突     | 409        | 409        | 资源名称重复等冲突   |
| 服务器错误   | 500        | 500        | 服务器内部错误       |

## 错误处理最佳实践

1. **统一错误格式**: 所有错误都使用相同的JSON结构
2. **明确的错误信息**: 提供清晰、可操作的错误描述
3. **适当的HTTP状态码**: 使用符合RESTful标准的HTTP状态码
4. **业务状态码**: 在响应体中提供业务层面的状态码
5. **错误分类**: 区分客户端错误(4xx)和服务器错误(5xx)
