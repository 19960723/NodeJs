# 数据库设置指南

## 问题诊断

根据错误日志，主要问题包括：

1. **数据库连接失败** - `Access denied for user 'root'@'localhost'`
2. **数据库不存在** - `Unknown database 'koa2_dev'`
3. **BusinessError导入问题** - `BusinessError is not a constructor`

## 解决方案

### 1. 数据库连接问题

#### 方法一：使用Docker（推荐）

```bash
# 启动MySQL数据库
docker-compose up -d mysql

# 等待数据库启动完成
docker-compose logs mysql
```

#### 方法二：本地MySQL安装

1. 确保MySQL服务正在运行
2. 创建数据库和用户：

```sql
-- 连接到MySQL
mysql -u root -p

-- 创建数据库
CREATE DATABASE IF NOT EXISTS koa2_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS koa2_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户（可选）
CREATE USER IF NOT EXISTS 'koa2user'@'localhost' IDENTIFIED BY 'koa2password';
GRANT ALL PRIVILEGES ON koa2_dev.* TO 'koa2user'@'localhost';
GRANT ALL PRIVILEGES ON koa2_test.* TO 'koa2user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. 环境变量配置

创建 `.env` 文件：

```env
# 应用配置
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=koa2_dev
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT配置
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# 日志配置
LOG_LEVEL=info

# CORS配置
CORS_ORIGIN=http://localhost:3000

# 数据库同步配置（开发环境）
DB_SYNC=true
```

### 3. 自动数据库设置

使用提供的脚本自动设置数据库：

```bash
# 构建项目
npm run build

# 设置数据库
npm run db:setup
```

### 4. 启动应用

```bash
# 开发模式
npm run dev

# 或者生产模式
npm run build
npm start
```

## 验证设置

1. **检查数据库连接**：
   - 应用启动时会显示数据库连接状态
   - 查看日志确认连接成功

2. **测试API**：

   ```bash
   # 健康检查
   curl http://localhost:3000/api/health

   # 获取示例列表
   curl http://localhost:3000/api/examples
   ```

3. **查看API文档**：
   - 访问 http://localhost:3000/api-docs/
   - 查看完整的API文档

## 常见问题

### Q: 数据库连接失败

**A:** 检查以下几点：

- MySQL服务是否运行
- 用户名和密码是否正确
- 数据库是否存在
- 端口是否正确（默认3306）

### Q: BusinessError is not a constructor

**A:** 这是TypeScript编译问题，运行以下命令：

```bash
npm run build
```

### Q: 端口被占用

**A:** 检查端口使用情况：

```bash
# Windows
netstat -ano | findstr :3000

# 杀死进程
taskkill /PID <进程ID> /F
```

### Q: 数据库表不存在

**A:** 确保在开发环境中启用了数据库同步：

```env
NODE_ENV=development
DB_SYNC=true
```

## 生产环境部署

1. **使用Docker Compose**：

   ```bash
   docker-compose up -d
   ```

2. **环境变量**：
   - 设置生产环境的数据库配置
   - 使用强密码和安全的JWT密钥
   - 禁用数据库自动同步

3. **数据库迁移**：
   ```bash
   npm run db:migrate
   ```

## 技术支持

如果遇到问题，请检查：

1. 错误日志：`logs/error.log`
2. 应用日志：`logs/combined.log`
3. 数据库连接状态
4. 环境变量配置
