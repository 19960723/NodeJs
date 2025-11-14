import Router from 'koa-router';
import healthRoutes from './healthRoutes';
import exampleRoutes from './exampleRoutes';
import userRoutes from './userRoutes';
import roleRoutes from './roleRoutes';
import menuRoutes from './menuRoutes';
import sysRoutes from './sysRoutes';
import { success } from '../utils/response';

const router = new Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: API信息
 *     description: 获取API版本和环境信息
 *     tags: [API Info]
 *     responses:
 *       200:
 *         description: 获取API信息成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         version:
 *                           type: string
 *                           example: "1.0.0"
 *                         environment:
 *                           type: string
 *                           example: "development"
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-01T00:00:00.000Z"
 *             examples:
 *               success:
 *                 summary: 成功响应
 *                 value:
 *                   code: 200
 *                   message: "Koa2 API Server"
 *                   data:
 *                     version: "1.0.0"
 *                     environment: "development"
 *                     timestamp: "2024-01-01T00:00:00.000Z"
 */
router.get('/api', async ctx => {
  success(
    ctx,
    {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    },
    'Koa2 API Server'
  );
});

// 注册路由
router.use(healthRoutes.routes(), healthRoutes.allowedMethods());
router.use(exampleRoutes.routes(), exampleRoutes.allowedMethods());
router.use(userRoutes.routes(), userRoutes.allowedMethods());
router.use(roleRoutes.routes(), roleRoutes.allowedMethods());
router.use(menuRoutes.routes(), menuRoutes.allowedMethods());
router.use(sysRoutes.routes(), sysRoutes.allowedMethods());

export default router;
