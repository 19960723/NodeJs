import { Router  } from 'express'
import { getList } from '../controllers/app'

/**
 * @swagger
 * tags:
 *   name: App
 *   description: 应用通用接口
 */

/**
 * 应用路由模块
 * 处理通用的应用级别路由
 * 基础路径: /api/apps
 */
const router = Router();

/**
 * @swagger
 * /api/apps/getList:
 *   get:
 *     summary: 获取通用列表数据
 *     tags: [App]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 页码
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: 每页数量
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 搜索关键词（可选）
 *     responses:
 *       200:
 *         description: 成功返回列表数据
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: 总记录数
 *                 list:
 *                   type: array
 *                   description: 数据列表
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 记录ID
 *                       name:
 *                         type: string
 *                         description: 名称
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 创建时间
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 更新时间
 *       400:
 *         description: 请求参数错误
 */
router.get('/getList', getList)

export default router;