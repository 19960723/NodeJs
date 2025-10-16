import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import helmet from 'koa-helmet';
import fs from 'fs';
import path from 'path';

// 导入中间件
import errorHandler from './middleware/errorHandler';
import requestLogger from './middleware/logger';
import { requestId } from './middleware/requestId';
import { apiRateLimiter } from './middleware/rateLimiter';
import { notFound } from './utils/response';
import {
  swaggerJsonMiddleware,
  swaggerRedirectMiddleware,
  swaggerHtmlMiddleware
} from './middleware/swagger-simple';

// 导入路由
import routes from './routes';

// 导入配置和数据库
import { getConfig, validateConfig } from './config';
const { testConnection } = require('./config/database');
import { syncDatabase } from './models';
import logger from './utils/logger';

// 获取配置
const config = getConfig();

// 验证配置
try {
  validateConfig();
} catch (error) {
  console.error('配置验证失败:', error);
  process.exit(1);
}

// 创建 Koa 应用
const app = new Koa();

// 确保日志目录存在
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 全局中间件（按顺序）
app.use(errorHandler); // 错误处理必须在最前面
app.use(requestId); // 请求ID
app.use(requestLogger); // 请求日志
app.use(helmet()); // 安全头
app.use(apiRateLimiter); // API限流
app.use(
  cors({
    origin: config.security.corsOrigin,
    credentials: true
  })
);
app.use(
  bodyParser({
    jsonLimit: '10mb',
    textLimit: '10mb',
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      json: ['application/json'],
      form: ['application/x-www-form-urlencoded'],
      text: ['text/plain']
    },
    onerror: (err, ctx) => {
      logger.error('Body parser error:', {
        error: err.message,
        stack: err.stack,
        url: ctx.url,
        method: ctx.method,
        headers: ctx.headers,
        body: ctx.request.body
      });

      // 提供更详细的错误信息
      if (err.message.includes('Bad escaped character')) {
        ctx.throw(400, 'JSON格式错误：包含无效的转义字符，请检查JSON格式');
      } else if (err.message.includes('Unexpected token')) {
        ctx.throw(400, 'JSON格式错误：包含无效的字符，请检查JSON格式');
      } else {
        ctx.throw(400, `请求体解析失败: ${err.message}`);
      }
    }
  })
);

// Swagger 文档路由（在API路由之前）
app.use(swaggerRedirectMiddleware);
app.use(swaggerJsonMiddleware);
app.use(swaggerHtmlMiddleware);

// 注册路由
app.use(routes.routes());
app.use(routes.allowedMethods());

// 404 处理
app.use(async ctx => {
  notFound(ctx, '请求的资源不存在');
});

// 启动服务器
const startServer = async (): Promise<void> => {
  try {
    logger.info('正在启动服务器...');
    logger.info(`应用名称: ${config.app.name}`);
    logger.info(`应用版本: ${config.app.version}`);
    logger.info(`运行环境: ${config.app.env}`);

    // 测试数据库连接
    logger.info('正在连接数据库...');
    const dbConnected = await testConnection();
    if (!dbConnected) {
      logger.error('数据库连接失败，服务器启动中止');
      process.exit(1);
    }

    // 同步数据库（仅在开发环境）
    if (config.app.env === 'development') {
      logger.info('正在同步数据库...');
      try {
        await syncDatabase();
        logger.info('数据库同步完成');
      } catch (error) {
        logger.error('数据库同步失败:', error);
        // 在开发环境中，同步失败不应该阻止应用启动
        logger.warn('继续启动应用，但数据库可能未正确同步');
      }
    }

    // 启动HTTP服务器
    const server = app.listen(config.app.port, config.app.host, () => {
      logger.info('🚀 服务器启动成功');
      logger.info(`📍 地址: http://${config.app.host}:${config.app.port}`);
      logger.info(
        `🏥 健康检查: http://${config.app.host}:${config.app.port}/api/health`
      );
      logger.info(
        `📊 详细健康检查: http://${config.app.host}:${config.app.port}/api/health/detailed`
      );
      logger.info(
        `📚 API文档: http://${config.app.host}:${config.app.port}/api-docs/`
      );
      logger.info(
        `📄 API规范: http://${config.app.host}:${config.app.port}/api-docs.json`
      );
    });

    // 处理端口冲突
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(
          `端口 ${config.app.port} 被占用，请手动停止其他进程或使用不同端口`
        );
        logger.error('解决方案：');
        logger.error('1. 按 Ctrl+C 停止当前进程');
        logger.error('2. 运行 npm run dev:stable 使用稳定模式');
        logger.error('3. 或修改配置文件使用不同端口');
        process.exit(1);
      } else {
        logger.error('服务器启动失败:', error);
        process.exit(1);
      }
    });

    // 设置服务器超时
    server.timeout = 30000; // 30秒
    server.keepAliveTimeout = 5000; // 5秒
    server.headersTimeout = 6000; // 6秒
  } catch (error) {
    logger.error('服务器启动失败:', error);
    process.exit(1);
  }
};

// 优雅关闭
const gracefulShutdown = (signal: string): void => {
  logger.info(`收到 ${signal} 信号，开始优雅关闭服务器...`);

  // 这里可以添加清理逻辑，如关闭数据库连接等
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 未捕获的异常处理
process.on('uncaughtException', (error: Error) => {
  logger.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 启动服务器
if (require.main === module) {
  startServer();
}

export default app;
