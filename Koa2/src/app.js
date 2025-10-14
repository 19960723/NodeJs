require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const helmet = require('koa-helmet');
const fs = require('fs');
const path = require('path');

// 导入中间件
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/logger');
const { notFound } = require('./utils/response');

// 导入路由
const routes = require('./routes');

// 导入数据库配置
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');
const logger = require('./utils/logger');

// 创建 Koa 应用
const app = new Koa();

// 确保日志目录存在
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 全局中间件
app.use(errorHandler);
app.use(requestLogger);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  })
);
app.use(
  bodyParser({
    jsonLimit: '10mb',
    textLimit: '10mb'
  })
);

// 注册路由
app.use(routes.routes());
app.use(routes.allowedMethods());

// 404 处理
app.use(async ctx => {
  notFound(ctx, '请求的资源不存在');
});

// 启动服务器
const startServer = async () => {
  try {
    // 测试数据库连接
    const dbConnected = await testConnection();
    if (!dbConnected) {
      logger.error('数据库连接失败，服务器启动中止');
      process.exit(1);
    }

    // 同步数据库（仅在开发环境）
    await syncDatabase();

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || '0.0.0.0';

    app.listen(PORT, HOST, () => {
      logger.info(`服务器启动成功`);
      logger.info(`环境: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`地址: http://${HOST}:${PORT}`);
      logger.info(`健康检查: http://${HOST}:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('服务器启动失败:', error);
    process.exit(1);
  }
};

// 优雅关闭
const gracefulShutdown = signal => {
  logger.info(`收到 ${signal} 信号，开始优雅关闭服务器...`);

  // 这里可以添加清理逻辑，如关闭数据库连接等
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 未捕获的异常处理
process.on('uncaughtException', error => {
  logger.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 启动服务器
if (require.main === module) {
  startServer();
}

module.exports = app;
