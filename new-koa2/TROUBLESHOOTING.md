# 登录接口故障排查指南

## 问题现象

`POST /api/auth/login` 返回 500 服务器内部错误

## 可能的原因

### 1. 数据库中没有测试用户

最常见的原因是数据库中不存在用户，导致登录失败。

**解决方案**：运行以下命令创建测试用户

```bash
node scripts/create-test-user.js
```

这将创建一个测试用户：

- 用户名: `admin`
- 密码: `password`

### 2. UserRepository 初始化失败

模型可能没有正确初始化。

**排查方法**：

1. 检查日志文件 `logs/error.log` 和 `logs/combined.log`
2. 查看是否有数据库连接错误

### 3. JWT Secret 未配置

如果在生产环境没有配置 JWT_SECRET，会导致错误。

**解决方案**：

1. 复制 `env.template` 为 `.env`
2. 设置 `JWT_SECRET=your_jwt_secret_key_here`

### 4. 请求格式错误

JSON 格式不正确会导致解析失败。

**正确的请求格式**：

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

## 调试步骤

### 步骤 1: 创建测试用户

```bash
node scripts/create-test-user.js
```

### 步骤 2: 运行调试脚本

```bash
node debug-login.js
```

### 步骤 3: 查看日志

查看 `logs/error.log` 获取详细错误信息

### 步骤 4: 检查数据库连接

确保数据库正在运行并且可以连接：

```bash
# 查看日志中是否有 "数据库连接成功" 的消息
```

## 改进的错误处理

现在登录接口包含以下改进：

1. **详细的错误日志**
   - 所有错误都会记录到 `logs/error.log`
   - 包含完整的堆栈跟踪和请求上下文

2. **更好的错误消息**
   - 开发环境下返回详细的错误信息
   - 生产环境下返回通用的错误消息

3. **JSON 解析错误处理**
   - 提供针对性的错误提示
   - 区分不同类型的格式错误

## 测试用例

使用提供的测试脚本：

```bash
node test-login.js
```

这将测试以下场景：

- ✅ 正确的 JSON 格式
- ❌ 错误的 JSON 格式（转义字符错误）
- ⚠️ 缺少 Content-Type 头部
- ❌ 空的请求体
- ❌ 缺少必需字段

## 常见错误及解决方案

| 错误码 | 错误信息                         | 原因                   | 解决方案                               |
| ------ | -------------------------------- | ---------------------- | -------------------------------------- |
| 400    | JSON格式错误：包含无效的转义字符 | 请求体 JSON 格式不正确 | 检查 JSON 格式，确保没有错误的转义字符 |
| 400    | 请求体不能为空                   | 没有发送请求体         | 发送包含 username 和 password 的 JSON  |
| 401    | 用户不存在                       | 数据库中没有该用户     | 运行 create-test-user.js 创建用户      |
| 401    | 密码错误                         | 密码不匹配             | 检查密码是否正确                       |
| 500    | 服务器内部错误                   | 服务器端异常           | 查看 logs/error.log 获取详细信息       |

## 联系支持

如果以上步骤都无法解决问题，请：

1. 收集 `logs/error.log` 的最新日志
2. 运行 `debug-login.js` 并保存输出
3. 检查数据库是否正常运行
4. 提供完整的错误堆栈信息
