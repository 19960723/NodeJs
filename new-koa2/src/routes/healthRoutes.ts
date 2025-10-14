import Router from 'koa-router';
import { Context } from 'koa';
import { sequelize } from '../config/database';
import logger from '../utils/logger';
import { success, serverError } from '../utils/response';

const router = new Router({ prefix: '/api/health' });

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: 基础健康检查
 *     description: 检查服务基本运行状态
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: 服务运行正常
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/HealthCheck'
 *             examples:
 *               success:
 *                 summary: 成功响应
 *                 value:
 *                   code: 200
 *                   message: "服务运行正常"
 *                   data:
 *                     status: "healthy"
 *                     timestamp: "2024-01-01T00:00:00.000Z"
 *                     uptime: 3600
 *                     version: "1.0.0"
 *                     environment: "development"
 */

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  services?: Record<string, any>;
}

/**
 * 基础健康检查
 */
router.get('/', async (ctx: Context): Promise<void> => {
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
 * @swagger
 * /api/health/detailed:
 *   get:
 *     summary: 详细健康检查
 *     description: 检查服务详细状态，包括数据库连接、内存使用、CPU使用等
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: 所有服务运行正常
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/DetailedHealthCheck'
 *             examples:
 *               success:
 *                 summary: 成功响应
 *                 value:
 *                   code: 200
 *                   message: "所有服务运行正常"
 *                   data:
 *                     status: "healthy"
 *                     timestamp: "2024-01-01T00:00:00.000Z"
 *                     uptime: 3600
 *                     version: "1.0.0"
 *                     environment: "development"
 *                     services:
 *                       database:
 *                         status: "healthy"
 *                         message: "数据库连接正常"
 *                       memory:
 *                         status: "healthy"
 *                         usage:
 *                           rss: "50MB"
 *                           heapTotal: "20MB"
 *                           heapUsed: "15MB"
 *                           external: "5MB"
 *                       cpu:
 *                         status: "healthy"
 *                         usage:
 *                           user: 1000000
 *                           system: 500000
 *       503:
 *         description: 部分服务异常
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/DetailedHealthCheck'
 *             examples:
 *               error:
 *                 summary: 服务异常响应
 *                 value:
 *                   code: 503
 *                   message: "部分服务异常"
 *                   data:
 *                     status: "unhealthy"
 *                     timestamp: "2024-01-01T00:00:00.000Z"
 *                     uptime: 3600
 *                     version: "1.0.0"
 *                     environment: "development"
 *                     services:
 *                       database:
 *                         status: "unhealthy"
 *                         message: "数据库连接失败"
 *                         error: "Connection timeout"
 */
router.get('/detailed', async (ctx: Context): Promise<void> => {
  const health: HealthData = {
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
    health.services!.database = {
      status: 'healthy',
      message: '数据库连接正常'
    };
  } catch (error: any) {
    health.status = 'unhealthy';
    health.services!.database = {
      status: 'unhealthy',
      message: '数据库连接失败',
      error: error.message
    };
    logger.error('健康检查 - 数据库连接失败:', error);
  }

  // 检查内存使用情况
  const memoryUsage = process.memoryUsage();
  health.services!.memory = {
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
  health.services!.cpu = {
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

export default router;
