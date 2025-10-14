# Redis 功能使用指南

本项目已完整集成 Redis 功能，包括缓存、会话管理、限流等。以下是各功能的使用说明。

## 环境配置

在 `.env` 文件中配置以下 Redis 相关变量：

```env
# Redis 配置
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_password
REDIS_DB=0

# 会话配置
JWT_SECRET=your-super-secret-jwt-key
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
MAX_SESSIONS_PER_USER=5
```

## 功能模块

### 1. Redis 基础服务 (`src/services/redis.ts`)

提供统一的 Redis 操作接口：

```typescript
import { redisService } from '../services/redis';

// 基本缓存操作
await redisService.set('key', { data: 'value' }, 3600); // 缓存1小时
const data = await redisService.get('key');
await redisService.del('key');

// 哈希表操作
await redisService.hSet('user:1', 'name', 'John');
const name = await redisService.hGet('user:1', 'name');

// 列表操作
await redisService.lPush('queue', 'task1', 'task2');
const task = await redisService.lPop('queue');

// 集合操作
await redisService.sAdd('tags', 'redis', 'cache');
const isMember = await redisService.sIsMember('tags', 'redis');
```

### 2. 会话管理 (`src/services/session.ts`)

基于 Redis 的分布式会话管理：

```typescript
import { sessionService } from '../services/session';

// 创建会话
const { tokens, session } = await sessionService.createSession(
  { id: 1, username: 'john' },
  '192.168.1.1',
  'Mozilla/5.0...'
);

// 验证访问令牌
const result = await sessionService.validateAccessToken(accessToken);
if (result) {
  console.log('用户:', result.user);
  console.log('会话:', result.session);
}

// 刷新令牌
const newTokens = await sessionService.refreshAccessToken(refreshToken);

// 销毁会话
await sessionService.destroySession(sessionId);
```

### 3. 分布式限流 (`src/middlewares/rateLimiter.ts`)

支持多种限流策略：

```typescript
import { rateLimiter, createUserRateLimiter, RateLimitStrategy } from '../middlewares/rateLimiter';

// 使用预设限流配置
app.use('/api/login', rateLimiter('LOGIN', 'ip').middleware());

// 自定义限流配置
const customLimiter = createUserRateLimiter({
  strategy: RateLimitStrategy.SLIDING_WINDOW,
  windowMs: 60 * 1000, // 1分钟
  max: 10, // 最多10个请求
  message: '请求过于频繁'
});

app.use('/api/sensitive', customLimiter.middleware());
```

### 4. 缓存中间件 (`src/middlewares/cache.ts`)

自动缓存 API 响应：

```typescript
import { cache, CachePresets, cacheManager } from '../middlewares/cache';

// 使用预设缓存配置
app.use('/api/data', cache(CachePresets.MEDIUM).middleware());

// 自定义缓存配置
app.use('/api/user', cache({
  ttl: 300,
  condition: (req, res) => res.statusCode === 200,
  keyGenerator: (req) => `user_${req.user?.id}_${req.path}`
}).middleware());

// 手动缓存管理
await cacheManager.set('user:1', userData, 600);
const userData = await cacheManager.get('user:1');
await cacheManager.delByPattern('user:*');
```

### 5. 认证中间件 (`src/middlewares/authMiddleware.ts`)

基于 Redis 会话的认证：

```typescript
import { authMiddleware, optionalAuthMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

// 必须认证
app.use('/api/protected', authMiddleware);

// 可选认证
app.use('/api/public', optionalAuthMiddleware);

// 角色验证
app.use('/api/admin', authMiddleware, roleMiddleware(['admin']));
```

## API 端点

### 健康检查

- `GET /api/healthz` - 基础健康检查
- `GET /api/healthz/detailed` - 详细健康检查
- `GET /api/healthz/alive` - 存活检查
- `GET /api/healthz/ready` - 就绪检查

### Redis 管理 (需要管理员权限)

- `GET /api/redis/status` - Redis 状态信息
- `GET /api/redis/cache/:key` - 获取缓存
- `POST /api/redis/cache/:key` - 设置缓存
- `DELETE /api/redis/cache/:key` - 删除缓存
- `DELETE /api/redis/cache/pattern/:pattern` - 按模式删除
- `GET /api/redis/stats` - Redis 统计信息

### 会话管理

- `GET /api/redis/sessions/my` - 获取当前用户会话
- `DELETE /api/redis/sessions/:sessionId` - 销毁指定会话
- `DELETE /api/redis/sessions/user/:userId/all` - 销毁用户所有会话

## 使用示例

### 1. 用户登录与会话管理

```typescript
// 登录
const loginResult = await loginService(
  { username, password },
  req.ip,
  req.get('User-Agent')
);

// 返回令牌和会话信息
res.json({
  accessToken: loginResult.accessToken,
  refreshToken: loginResult.refreshToken,
  user: loginResult.userInfo,
  sessionId: loginResult.sessionId
});
```

### 2. API 缓存

```typescript
// 自动缓存用户数据
app.get('/api/user/:id', 
  cache({
    ttl: 600,
    keyGenerator: (req) => `user:${req.params.id}`,
    tags: ['user']
  }).middleware(),
  async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user);
  }
);

// 用户更新时清除相关缓存
app.put('/api/user/:id', async (req, res) => {
  await updateUser(req.params.id, req.body);
  await cacheManager.delByTag('user');
  res.json({ success: true });
});
```

### 3. 限流保护

```typescript
// 登录接口限流
app.post('/api/login',
  rateLimiter('LOGIN', 'ip').middleware(),
  loginController
);

// API 接口限流
app.use('/api',
  rateLimiter('API', 'user').middleware()
);
```

## 监控与调试

### 1. 查看 Redis 状态

```bash
curl http://localhost:3000/api/redis/status
```

### 2. 查看用户会话

```bash
curl -H "Authorization: Bearer <token>" \
     http://localhost:3000/api/redis/sessions/my
```

### 3. 清除缓存

```bash
curl -X DELETE \
     -H "Authorization: Bearer <admin-token>" \
     http://localhost:3000/api/redis/cache/pattern/user:*
```

## 性能优化建议

1. **缓存策略**：根据数据更新频率选择合适的 TTL
2. **限流配置**：根据业务需求调整限流参数
3. **会话管理**：合理设置最大会话数量
4. **连接池**：Redis 连接已配置连接池和重连机制
5. **监控告警**：定期检查 Redis 内存使用和连接数

## 故障排查

1. **Redis 连接失败**：检查 REDIS_URL 配置和 Redis 服务状态
2. **缓存未命中**：检查键名和 TTL 设置
3. **限流误判**：检查限流策略和键生成器
4. **会话失效**：检查令牌过期时间和 Redis 存储

## 安全注意事项

1. **JWT 密钥**：使用强随机密钥
2. **Redis 密码**：生产环境必须设置密码
3. **会话管理**：定期清理过期会话
4. **权限控制**：严格控制 Redis 管理接口访问权限

通过以上配置，您的 Express 应用已经具备了完整的 Redis 功能支持，包括高性能缓存、安全的会话管理和智能的限流保护。
