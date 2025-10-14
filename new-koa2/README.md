# Koa2 TypeScript 基础后端项目模板

一个基于 Koa2 + TypeScript + Sequelize 的现代化后端项目模板，提供基础框架结构，适合快速开发。

## 📋 功能特性

### 🏗️ 技术栈
- **框架**: Koa2 + koa-router + koa-bodyparser
- **语言**: TypeScript
- **数据库**: MySQL + Sequelize ORM
- **日志**: Winston 日志系统
- **配置**: dotenv 环境变量管理
- **代码规范**: ESLint + Prettier + Husky + lint-staged
- **测试**: Jest + Supertest + ts-jest
- **容器化**: Docker + Docker Compose

### 🚀 核心功能
- ✅ 基础 Koa2 应用结构
- ✅ 全局错误处理
- ✅ 请求日志记录
- ✅ 健康检查接口
- ✅ 数据库连接配置
- ✅ 单元测试覆盖
- ✅ Docker 容器化部署

## 🛠️ 快速开始

### 环境要求
- Node.js >= 16.0.0
- MySQL >= 5.7 或 8.0
- npm 或 yarn

### 1. 克隆项目
\`\`\`bash
git clone <your-repo-url>
cd koa2-backend-template
\`\`\`

### 2. 安装依赖
\`\`\`bash
npm install
# 或者
yarn install
\`\`\`

### 3. 环境配置
\`\`\`bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，配置数据库等信息
vim .env
\`\`\`

### 4. 数据库设置
\`\`\`bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE koa2_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 运行数据库迁移
npm run db:migrate

# 填充种子数据（可选）
npm run db:seed
\`\`\`

### 5. 启动服务
\`\`\`bash
# 开发模式（TypeScript）
npm run dev

# 构建项目
npm run build

# 生产模式
npm start
\`\`\`

服务启动后访问: http://localhost:3000

## 📡 API 接口

### 基础接口
- \`GET /api\` - API 版本信息
- \`GET /api/health\` - 基础健康检查
- \`GET /api/health/detailed\` - 详细健康检查

### 示例接口
- \`GET /api/examples\` - 获取示例数据
- \`POST /api/examples\` - 创建示例数据

### 请求示例

#### 获取API信息
\`\`\`bash
curl -X GET http://localhost:3000/api
\`\`\`

#### 健康检查
\`\`\`bash
curl -X GET http://localhost:3000/api/health
\`\`\`

#### 获取示例数据
\`\`\`bash
curl -X GET http://localhost:3000/api/examples
\`\`\`

#### 创建示例数据
\`\`\`bash
curl -X POST http://localhost:3000/api/examples \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "示例名称",
    "description": "示例描述"
  }'
\`\`\`

## 🧪 测试

\`\`\`bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm test -- --coverage
\`\`\`

## 📦 Docker 部署

### 使用 Docker Compose（推荐）
\`\`\`bash
# 启动所有服务（包括 MySQL 和 Redis）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
\`\`\`

### 单独构建镜像
\`\`\`bash
# 构建镜像
docker build -t koa2-app .

# 运行容器
docker run -d \\
  --name koa2-app \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e DB_HOST=your-db-host \\
  -e DB_NAME=your-db-name \\
  -e DB_USER=your-db-user \\
  -e DB_PASSWORD=your-db-password \\
  -e JWT_SECRET=your-jwt-secret \\
  koa2-app
\`\`\`

## 🔧 开发指南

### 项目结构
\`\`\`
koa2-backend-template/
├── src/
│   ├── config/          # 配置文件
│   │   └── database.js  # 数据库配置
│   ├── controllers/     # 控制器
│   │   └── userController.js
│   ├── middleware/      # 中间件
│   │   ├── auth.js      # 认证中间件
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validator.js
│   ├── models/          # 数据模型
│   │   ├── index.js
│   │   └── User.js
│   ├── routes/          # 路由
│   │   ├── index.js
│   │   ├── userRoutes.js
│   │   └── healthRoutes.js
│   ├── utils/           # 工具函数
│   │   ├── jwt.js
│   │   └── logger.js
│   ├── migrations/      # 数据库迁移
│   ├── seeders/         # 种子数据
│   └── app.js          # 应用入口
├── tests/              # 测试文件
├── docker/             # Docker 相关文件
├── logs/               # 日志文件
└── uploads/            # 上传文件
\`\`\`

### 代码规范

项目使用 ESLint + Prettier 进行代码格式化和规范检查：

\`\`\`bash
# 检查代码规范
npm run lint

# 自动修复代码规范问题
npm run lint:fix

# 格式化代码
npm run format
\`\`\`

### 数据库操作

\`\`\`bash
# 创建新的迁移文件
npx sequelize-cli migration:generate --name create-your-table

# 运行迁移
npm run db:migrate

# 撤销迁移
npm run db:migrate:undo

# 创建种子文件
npx sequelize-cli seed:generate --name demo-your-data

# 运行种子数据
npm run db:seed

# 撤销种子数据
npm run db:seed:undo
\`\`\`

### 添加新的 API

1. 在 \`src/models/\` 中创建数据模型
2. 在 \`src/controllers/\` 中创建控制器
3. 在 \`src/routes/\` 中创建路由
4. 在 \`src/middleware/validator.js\` 中添加验证规则
5. 在 \`tests/\` 中添加测试用例

## 🚀 生产部署

### 环境变量配置

生产环境需要设置以下关键环境变量：

\`\`\`bash
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key  # 必须更改！
DB_HOST=your-production-db-host
DB_NAME=your-production-db-name
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
\`\`\`

### 性能优化建议

1. **数据库连接池**: 已配置，生产环境建议调整池大小
2. **日志级别**: 生产环境设置为 \`info\` 或 \`warn\`
3. **CORS 配置**: 生产环境应设置具体的域名
4. **HTTPS**: 建议使用反向代理 (Nginx) 处理 SSL
5. **进程管理**: 使用 PM2 或 Docker 进行进程管理

### GitHub Actions CI/CD

项目包含完整的 CI/CD 配置：

1. **持续集成**: 自动运行测试、代码检查和安全扫描
2. **自动部署**: 推送到 main 分支时自动构建和部署
3. **多版本测试**: 支持 Node.js 16/18/20 版本测试

需要在 GitHub 仓库设置中配置以下 Secrets：
- \`DOCKER_USERNAME\`: Docker Hub 用户名
- \`DOCKER_PASSWORD\`: Docker Hub 密码
- \`HOST\`: 部署服务器地址
- \`USERNAME\`: 服务器用户名
- \`KEY\`: 服务器 SSH 私钥

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'Add some AmazingFeature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 常见问题

### Q: 如何更换数据库为 PostgreSQL？
A: 修改 \`package.json\` 中的 \`mysql2\` 为 \`pg\`，并更新 \`src/config/database.js\` 中的 dialect 配置。

### Q: 如何添加 Redis 缓存？
A: 项目已包含 Redis 配置在 docker-compose.yml 中，需要安装 \`redis\` 包并创建相应的服务文件。

### Q: 如何启用 TypeScript？
A: 安装 TypeScript 相关依赖，添加 \`tsconfig.json\`，并将 \`.js\` 文件重命名为 \`.ts\`。

### Q: 数据库连接失败怎么办？
A: 检查 \`.env\` 文件中的数据库配置，确保 MySQL 服务正在运行，并且数据库已创建。

## 📞 支持

如果你觉得这个项目对你有帮助，请给它一个 ⭐️！

如有问题或建议，请创建 [Issue](https://github.com/your-username/koa2-backend-template/issues)。
