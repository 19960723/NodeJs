# API 文档说明

## 概述

本项目已集成 Swagger/OpenAPI 3.0 文档，提供完整的 API 接口文档和在线测试功能。

## 访问方式

### 1. 在线文档界面

- **URL**: `http://localhost:3000/api-docs/`
- **功能**: 可视化 API 文档，支持在线测试接口
- **特点**:
  - 交互式文档界面
  - 在线测试 API 接口
  - 请求/响应示例
  - 参数验证说明

### 2. OpenAPI 规范文件

- **URL**: `http://localhost:3000/api-docs.json`
- **功能**: 获取完整的 OpenAPI 3.0 规范 JSON 文件
- **用途**:
  - 导入到 Postman、Insomnia 等 API 测试工具
  - 导入到 Apifox 进行接口管理
  - 生成客户端 SDK
  - 集成到 CI/CD 流程

## 在 Apifox 中使用

### 方法一：直接导入 OpenAPI 规范

1. 启动项目：`npm run dev`
2. 访问 `http://localhost:3000/api-docs.json`
3. 复制 JSON 内容
4. 在 Apifox 中创建新项目
5. 选择"导入" -> "OpenAPI" -> "从文本导入"
6. 粘贴 JSON 内容并确认导入

### 方法二：通过 URL 导入

1. 在 Apifox 中创建新项目
2. 选择"导入" -> "OpenAPI" -> "从 URL 导入"
3. 输入 URL: `http://localhost:3000/api-docs.json`
4. 点击导入

## API 接口列表

### 基础接口

- `GET /api` - 获取 API 信息
- `GET /api/health` - 基础健康检查
- `GET /api/health/detailed` - 详细健康检查

### 示例数据管理

- `GET /api/examples` - 获取示例列表（分页）
- `GET /api/examples/:id` - 获取示例详情
- `POST /api/examples` - 创建示例
- `PUT /api/examples/:id` - 更新示例
- `DELETE /api/examples/:id` - 删除示例
- `GET /api/examples/status/:status` - 根据状态获取示例

## 响应格式

所有 API 接口都遵循统一的响应格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 状态码说明

- `200` - 成功
- `201` - 创建成功
- `204` - 删除成功（无内容返回）
- `400` - 请求参数错误
- `404` - 资源不存在
- `500` - 服务器内部错误
- `503` - 服务不可用

## 分页响应格式

列表接口支持分页，响应格式如下：

```json
{
  "code": 200,
  "message": "获取数据成功",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## 错误响应格式

```json
{
  "code": 400,
  "message": "数据验证失败",
  "errors": [
    {
      "field": "name",
      "message": "名称不能为空",
      "type": "body"
    }
  ]
}
```

## 开发说明

### 添加新的 API 接口

1. 在对应的路由文件中添加 Swagger 注解
2. 使用 `@swagger` 注释描述接口
3. 定义请求参数、响应格式等
4. 重启服务器查看文档更新

### Swagger 注解示例

```typescript
/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: 获取示例
 *     description: 获取示例数据
 *     tags: [Examples]
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Example'
 */
```

## 技术栈

- **Swagger JSDoc**: 从代码注释生成 OpenAPI 规范
- **Swagger UI**: 提供可视化文档界面
- **OpenAPI 3.0**: 标准的 API 文档规范

## 注意事项

1. 确保在开发环境中启动服务器
2. 修改 API 接口后需要重启服务器才能看到文档更新
3. 所有接口都包含完整的请求/响应示例
4. 支持参数验证和错误处理说明
