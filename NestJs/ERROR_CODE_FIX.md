# 错误码修复说明

## 🐛 问题描述

之前多处使用了通用的错误处理，导致：

1. **登录相关错误**都使用通用的 `UNAUTHORIZED (30001)` 错误码
2. **JWT 守卫**抛出的异常没有携带错误码，导致返回 `code: 10000`
3. **权限/角色守卫**返回 false 时，默认返回通用的 403 错误

**核心问题**: 前端无法精确判断错误类型，只能通过字符串匹配消息（不可靠）

## ✅ 修复内容

### 1. 添加新的错误处理方法

在 `BusinessError` 类中添加了更精确的错误方法：

```typescript
// 凭证无效（用户名或密码错误）
static invalidCredentials(message?: string): never

// Refresh Token 相关
static refreshTokenExpired(message?: string): never
static refreshTokenInvalid(message?: string): never
static refreshTokenRevoked(message?: string): never
```

### 2. 更新登录错误码

#### 修复前：

```typescript
// ❌ 所有错误都是 30001
if (!user) {
  BusinessError.unauthorized('用户名或密码错误'); // 30001
}

if (!isPasswordValid) {
  BusinessError.unauthorized('用户名或密码错误'); // 30001
}
```

#### 修复后：

```typescript
// ✅ 使用精确的错误码
if (!user) {
  BusinessError.invalidCredentials('用户名或密码错误'); // 30002
}

if (!isPasswordValid) {
  BusinessError.invalidCredentials('用户名或密码错误'); // 30002
}
```

### 3. 更新 Refresh Token 错误码

#### 修复前：

```typescript
// ❌ 所有错误都是 30001
if (!tokenRecord) {
  BusinessError.unauthorized('Invalid refresh token'); // 30001
}

if (tokenRecord.isRevoked) {
  BusinessError.unauthorized('Refresh token has been revoked'); // 30001
}

if (new Date() > tokenRecord.expiresAt) {
  BusinessError.unauthorized('Refresh token has expired'); // 30001
}
```

#### 修复后：

```typescript
// ✅ 使用精确的错误码
if (!tokenRecord) {
  BusinessError.refreshTokenInvalid('Refresh Token 无效'); // 30007
}

if (tokenRecord.isRevoked) {
  BusinessError.refreshTokenRevoked('Refresh Token 已被撤销'); // 30008
}

if (new Date() > tokenRecord.expiresAt) {
  BusinessError.refreshTokenExpired('Refresh Token 已过期'); // 30006
}
```

### 4. 更新用户状态错误

```typescript
// ✅ 使用更精确的错误方法
if (user.status === 0) {
  BusinessError.userDisabled('账号已被禁用'); // 20003
}
```

### 5. 修复 JWT 守卫错误码 ⚠️ **最重要的修复**

#### 修复前：

```typescript
// ❌ 使用原生的 UnauthorizedException，没有错误码
handleRequest(err: any, user: any, info: any) {
  if (err || !user) {
    throw err || new UnauthorizedException('登录已过期，请重新登录');
    // 返回: { "code": 10000, ... } ← 默认错误码
  }
  return user;
}
```

#### 修复后：

```typescript
// ✅ 根据 JWT 验证失败原因返回不同错误码
handleRequest(err: any, user: any, info: any) {
  if (err) {
    throw err;
  }

  if (!user) {
    if (info) {
      const infoName = info.name as string;

      // Token 过期
      if (infoName === 'TokenExpiredError') {
        throw new BusinessException(
          'Token 已过期，请重新登录',
          ErrorCode.TOKEN_EXPIRED  // 30003
        );
      }

      // Token 无效
      if (infoName === 'JsonWebTokenError') {
        throw new BusinessException(
          'Token 无效',
          ErrorCode.TOKEN_INVALID  // 30004
        );
      }
    }

    // 没有提供 Token
    throw new BusinessException(
      '未登录，请先登录',
      ErrorCode.TOKEN_MISSING  // 30005
    );
  }

  return user;
}
```

### 6. 修复权限守卫错误码

#### 修复前：

```typescript
// ❌ 返回 false，NestJS 自动返回 403，但没有错误码
if (!user) {
  return false; // 默认 403 错误
}

if (!hasPermissions) {
  return false; // 默认 403 错误
}
```

#### 修复后：

```typescript
// ✅ 抛出带错误码的异常
if (!user) {
  throw new BusinessException(
    '未登录，请先登录',
    ErrorCode.UNAUTHORIZED, // 30001
  );
}

if (!hasAllPermissions) {
  throw new BusinessException(
    `权限不足，需要权限: ${requiredPermissions.join(', ')}`,
    ErrorCode.INSUFFICIENT_PERMISSIONS, // 40002
  );
}
```

### 7. 修复角色守卫错误码

```typescript
// ✅ 同样的修复逻辑
if (!hasRequiredRole) {
  throw new BusinessException(
    `权限不足，需要以下角色之一: ${requiredRoles.join(', ')}`,
    ErrorCode.INSUFFICIENT_PERMISSIONS, // 40002
  );
}
```

---

## 📊 错误码对照表

### 修复前后对比

| 场景                 | 修复前       | 修复后       | 错误码常量               | HTTP状态码 |
| -------------------- | ------------ | ------------ | ------------------------ | ---------- |
| **JWT 守卫相关**     |
| JWT Token 过期       | **10000** ❌ | **30003** ✅ | TOKEN_EXPIRED            | 401        |
| JWT Token 无效       | **10000** ❌ | **30004** ✅ | TOKEN_INVALID            | 401        |
| 未提供 Token         | **10000** ❌ | **30005** ✅ | TOKEN_MISSING            | 401        |
| **登录相关**         |
| 用户名不存在         | 30001        | **30002** ✅ | INVALID_CREDENTIALS      | 401        |
| 密码错误             | 30001        | **30002** ✅ | INVALID_CREDENTIALS      | 401        |
| 账号被禁用           | 40001        | **20003** ✅ | USER_DISABLED            | 403        |
| **Refresh Token**    |
| Refresh Token 无效   | 30001        | **30007** ✅ | REFRESH_TOKEN_INVALID    | 401        |
| Refresh Token 已撤销 | 30001        | **30008** ✅ | REFRESH_TOKEN_REVOKED    | 401        |
| Refresh Token 已过期 | 30001        | **30006** ✅ | REFRESH_TOKEN_EXPIRED    | 401        |
| **权限守卫**         |
| 权限不足             | **403** ❌   | **40002** ✅ | INSUFFICIENT_PERMISSIONS | 403        |
| 用户未登录           | **403** ❌   | **30001** ✅ | UNAUTHORIZED             | 401        |

**重点**: JWT 守卫的错误从 `10000` (未知错误) 修复为精确的 `30003/30004/30005`！

---

## 🧪 测试验证

### 测试 0: JWT Token 错误 ⭐ **核心修复验证**

```bash
# 测试 0-1: Token 过期
GET /api/users
Authorization: Bearer <已过期的Token>

# 修复前响应
{
  "code": 10000,  ❌ 通用错误码
  "message": "登录已过期，请重新登录"
}

# 修复后响应
HTTP/1.1 401 Unauthorized
{
  "code": 30003,  ✅ TOKEN_EXPIRED
  "message": "Token 已过期，请重新登录",
  "requestId": "abc-123"
}
```

```bash
# 测试 0-2: Token 无效
GET /api/users
Authorization: Bearer invalid_token_format

# 修复后响应
HTTP/1.1 401 Unauthorized
{
  "code": 30004,  ✅ TOKEN_INVALID
  "message": "Token 无效",
  "requestId": "abc-123"
}
```

```bash
# 测试 0-3: 未提供 Token
GET /api/users
# 不携带 Authorization 头

# 修复后响应
HTTP/1.1 401 Unauthorized
{
  "code": 30005,  ✅ TOKEN_MISSING
  "message": "未登录，请先登录",
  "requestId": "abc-123"
}
```

---

### 测试 1: 登录失败（用户名或密码错误）

```bash
POST /api/auth/login
{
  "username": "wronguser",
  "password": "wrongpass"
}

# 响应
HTTP/1.1 401 Unauthorized
{
  "code": 30002,  ← 现在是 INVALID_CREDENTIALS
  "message": "用户名或密码错误",
  "data": null,
  "timestamp": "2025-11-21T10:30:00Z",
  "requestId": "abc-123"
}
```

### 测试 2: 账号被禁用

```bash
POST /api/auth/login
{
  "username": "disabled_user",
  "password": "correct_password"
}

# 响应
HTTP/1.1 403 Forbidden
{
  "code": 20003,  ← 现在是 USER_DISABLED
  "message": "账号已被禁用",
  "data": null,
  "timestamp": "2025-11-21T10:30:00Z",
  "requestId": "abc-123"
}
```

### 测试 3: Refresh Token 已过期

```bash
POST /api/auth/refresh
{
  "refreshToken": "expired_token_here"
}

# 响应
HTTP/1.1 401 Unauthorized
{
  "code": 30006,  ← 现在是 REFRESH_TOKEN_EXPIRED
  "message": "Refresh Token 已过期",
  "data": null,
  "timestamp": "2025-11-21T10:30:00Z",
  "requestId": "abc-123"
}
```

### 测试 4: Refresh Token 已被撤销

```bash
POST /api/auth/refresh
{
  "refreshToken": "revoked_token_here"
}

# 响应
HTTP/1.1 401 Unauthorized
{
  "code": 30008,  ← 现在是 REFRESH_TOKEN_REVOKED
  "message": "Refresh Token 已被撤销",
  "data": null,
  "timestamp": "2025-11-21T10:30:00Z",
  "requestId": "abc-123"
}
```

### 测试 5: 权限不足

```bash
# 使用普通用户 Token 访问需要管理员权限的接口
POST /api/permissions
Authorization: Bearer <author用户的Token>
{
  "name": "测试权限",
  "code": "test:create",
  "resource": "test",
  "action": "create"
}

# 响应
HTTP/1.1 403 Forbidden
{
  "code": 40002,  ✅ INSUFFICIENT_PERMISSIONS
  "message": "权限不足，需要权限: permission:create",
  "data": null,
  "timestamp": "2025-11-21T10:30:00Z",
  "requestId": "abc-123"
}
```

---

## 🎯 前端处理示例

现在前端可以精确处理每种错误：

```typescript
// 登录错误处理
try {
  await login(username, password);
} catch (error) {
  switch (error.code) {
    case 30002: // INVALID_CREDENTIALS
      message.error('用户名或密码错误，请重新输入');
      break;

    case 20003: // USER_DISABLED
      message.warning('您的账号已被禁用，请联系管理员');
      router.push('/account-disabled');
      break;

    case 60004: // TOO_MANY_REQUESTS
      message.warning('登录尝试次数过多，请稍后再试');
      break;
  }
}

// Refresh Token 错误处理
try {
  await refreshToken();
} catch (error) {
  switch (error.code) {
    case 30006: // REFRESH_TOKEN_EXPIRED
      message.info('登录已过期，请重新登录');
      redirectToLogin();
      break;

    case 30007: // REFRESH_TOKEN_INVALID
      message.error('Token 无效，请重新登录');
      redirectToLogin();
      break;

    case 30008: // REFRESH_TOKEN_REVOKED
      message.warning('登录已在其他设备失效，请重新登录');
      redirectToLogin();
      break;
  }
}
```

---

## ✨ 改进效果

### 核心改进

1. ✅ **JWT 守卫错误从 10000 修复为 30003/30004/30005** ← **最关键的修复**
2. ✅ **错误更精确** - 每种错误都有独立的错误码
3. ✅ **前端更智能** - 可以针对不同错误做不同处理
4. ✅ **调试更方便** - 通过错误码快速定位问题
5. ✅ **统计更准确** - 可以精确统计各类错误发生频率
6. ✅ **用户体验更好** - 提供更准确的错误提示

### 修复的关键文件

- `src/common/guards/jwt-auth.guard.ts` - JWT 守卫 ⚠️ **核心修复**
- `src/common/guards/permissions.guard.ts` - 权限守卫
- `src/common/guards/roles.guard.ts` - 角色守卫
- `src/modules/auth/auth.service.ts` - 登录服务
- `src/common/exceptions/business.exception.ts` - 新增快捷方法

---

## 📝 完整错误码列表（认证相关）

| 错误码 | 常量名                | 说明                   | HTTP状态码 |
| ------ | --------------------- | ---------------------- | ---------- |
| 30001  | UNAUTHORIZED          | 通用未授权             | 401        |
| 30002  | INVALID_CREDENTIALS   | 用户名或密码错误       | 401        |
| 30003  | TOKEN_EXPIRED         | Access Token 已过期    | 401        |
| 30004  | TOKEN_INVALID         | Access Token 无效      | 401        |
| 30005  | TOKEN_MISSING         | 缺少 Token             | 401        |
| 30006  | REFRESH_TOKEN_EXPIRED | Refresh Token 已过期   | 401        |
| 30007  | REFRESH_TOKEN_INVALID | Refresh Token 无效     | 401        |
| 30008  | REFRESH_TOKEN_REVOKED | Refresh Token 已被撤销 | 401        |
| 30009  | PASSWORD_INCORRECT    | 密码错误               | 401        |
| 30010  | PASSWORD_WEAK         | 密码强度不足           | 400        |

---

## 🚀 下一步建议

1. 更新 API 文档，标注每个接口可能返回的错误码
2. 前端创建错误码枚举文件，与后端保持同步
3. 在日志系统中按错误码进行统计分析
4. 可以考虑添加更多细分的错误码（如密码格式错误、用户名格式错误等）

---

**修复完成！现在错误码系统更加精确和易用了！** ✨
