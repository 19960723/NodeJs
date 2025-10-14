const Router = require('koa-router');
const { sequelize } = require('../config/database');
const logger = require('../utils/logger');
const { success, serverError } = require('../utils/response');

const router = new Router({ prefix: '/api/health' });

/**
 * 基础健康检查
 */
router.get('/', async ctx => {
  success(
    ctx,
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    },
    '服务运行正常'
  );
});

/**
 * 详细健康检查（包含数据库连接状态）
 */
router.get('/detailed', async ctx => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: {}
  };

  // 检查数据库连接
  try {
    await sequelize.authenticate();
    health.services.database = {
      status: 'healthy',
      message: '数据库连接正常'
    };
  } catch (error) {
    health.status = 'unhealthy';
    health.services.database = {
      status: 'unhealthy',
      message: '数据库连接失败',
      error: error.message
    };
    logger.error('健康检查 - 数据库连接失败:', error);
  }

  // 检查内存使用情况
  const memoryUsage = process.memoryUsage();
  health.services.memory = {
    status: 'healthy',
    usage: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024) + 'MB',
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
      external: Math.round(memoryUsage.external / 1024 / 1024) + 'MB'
    }
  };

  // 检查 CPU 使用情况
  const cpuUsage = process.cpuUsage();
  health.services.cpu = {
    status: 'healthy',
    usage: {
      user: cpuUsage.user,
      system: cpuUsage.system
    }
  };

  const message =
    health.status === 'healthy' ? '所有服务运行正常' : '部分服务异常';

  if (health.status === 'unhealthy') {
    ctx.status = 503;
    ctx.body = {
      code: 503,
      message,
      data: health
    };
  } else {
    success(ctx, health, message);
  }
});

module.exports = router;
