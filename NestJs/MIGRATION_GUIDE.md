# 数据库迁移指南

## Refresh Token 功能迁移

本次更新添加了 Refresh Token 双令牌机制，需要执行数据库迁移。

### 迁移步骤

1. **生成 Prisma Client**

   ```bash
   pnpm prisma generate
   ```

2. **创建并执行迁移**

   ```bash
   # 开发环境
   pnpm prisma migrate dev --name add_refresh_token

   # 生产环境
   pnpm prisma migrate deploy
   ```

3. **验证迁移**
   ```bash
   # 查看数据库
   pnpm prisma studio
   ```

### 新增表结构

```sql
CREATE TABLE `refresh_tokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(500) NOT NULL,
  `user_id` INT NOT NULL,
  `expires_at` DATETIME(3) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `is_revoked` BOOLEAN NOT NULL DEFAULT false,

  PRIMARY KEY (`id`),
  UNIQUE INDEX `refresh_tokens_token_key`(`token`),
  INDEX `refresh_tokens_user_id_idx`(`user_id`),
  INDEX `refresh_tokens_expires_at_idx`(`expires_at`),

  CONSTRAINT `refresh_tokens_user_id_fkey`
    FOREIGN KEY (`user_id`)
    REFERENCES `users`(`id`)
    ON DELETE CASCADE
);
```

### 新功能说明

1. **双令牌机制**
   - Access Token: 短期有效 (默认 7 天)
   - Refresh Token: 长期有效 (默认 30 天)

2. **新增接口**
   - `POST /api/auth/refresh` - 刷新 Access Token
   - `POST /api/auth/logout` - 登出并撤销 Refresh Token

3. **登录/注册返回格式**

   ```json
   {
     "accessToken": "eyJhbG...",
     "refreshToken": "a1b2c3d4...",
     "expiresIn": 604800,
     "user": { ... }
   }
   ```

4. **Token 刷新流程**
   ```
   客户端 -> POST /auth/refresh (携带 refreshToken)
   -> 验证 refreshToken
   -> 撤销旧 refreshToken
   -> 生成新的 accessToken 和 refreshToken
   -> 返回新的 token 对
   ```

### 环境变量配置

请确保 `.env` 文件中包含以下配置：

```env
# Refresh Token 过期时间
JWT_REFRESH_EXPIRES_IN=30d
```

### 定时清理任务 (可选)

建议添加定时任务清理过期的 Refresh Token：

```typescript
@Cron('0 0 * * *') // 每天凌晨执行
async cleanupExpiredTokens() {
  await this.refreshTokenRepository.deleteExpired();
}
```

### 回滚方案

如果需要回滚，执行：

```bash
# 查看迁移历史
pnpm prisma migrate status

# 回滚到指定版本
pnpm prisma migrate resolve --rolled-back <migration-name>

# 删除 RefreshToken 表
DROP TABLE IF EXISTS `refresh_tokens`;
```

### 注意事项

1. 生产环境迁移前请备份数据库
2. 迁移完成后，所有现有用户需要重新登录
3. 客户端需要更新 Token 存储逻辑，保存 refreshToken
4. 建议配置 Token 自动刷新机制

### 测试

迁移完成后，测试以下场景：

1. ✅ 用户登录获取双令牌
2. ✅ 使用 Access Token 访问受保护接口
3. ✅ Access Token 过期后使用 Refresh Token 刷新
4. ✅ 登出后 Refresh Token 被撤销
5. ✅ 使用已撤销的 Refresh Token 会失败
