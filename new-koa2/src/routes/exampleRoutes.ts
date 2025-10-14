import Router from 'koa-router';
import {
  getExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample,
  getExamplesByStatus
} from '../controllers/exampleController';

const router = new Router({ prefix: '/api' });

/**
 * @swagger
 * /api/examples:
 *   get:
 *     summary: 获取示例列表
 *     description: 分页获取示例数据列表
 *     tags: [Examples]
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
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: 排序字段
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: 排序方向
 *     responses:
 *       200:
 *         description: 获取示例列表成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *             examples:
 *               success:
 *                 summary: 成功响应
 *                 value:
 *                   code: 200
 *                   message: "获取示例列表成功"
 *                   data:
 *                     items:
 *                       - id: 1
 *                         name: "示例1"
 *                         description: "这是示例1"
 *                         status: "active"
 *                         createdAt: "2024-01-01T00:00:00.000Z"
 *                         updatedAt: "2024-01-01T00:00:00.000Z"
 *                     pagination:
 *                       page: 1
 *                       pageSize: 10
 *                       total: 1
 *                       totalPages: 1
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/examples', ...getExamples);

/**
 * @swagger
 * /api/examples/status/{status}:
 *   get:
 *     summary: 根据状态获取示例
 *     description: 根据状态筛选示例数据
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: 示例状态
 *     responses:
 *       200:
 *         description: 获取示例成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Example'
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/examples/status/:status', ...getExamplesByStatus);

/**
 * @swagger
 * /api/examples/{id}:
 *   get:
 *     summary: 获取示例详情
 *     description: 根据ID获取示例详细信息
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 示例ID
 *     responses:
 *       200:
 *         description: 获取示例详情成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Example'
 *       404:
 *         description: 示例不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/examples/:id', ...getExampleById);

/**
 * @swagger
 * /api/examples:
 *   post:
 *     summary: 创建示例
 *     description: 创建新的示例数据
 *     tags: [Examples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExampleRequest'
 *           examples:
 *             example1:
 *               summary: 创建活跃示例
 *               value:
 *                 name: "新示例"
 *                 description: "这是一个新的示例"
 *                 status: "active"
 *             example2:
 *               summary: 创建非活跃示例
 *               value:
 *                 name: "非活跃示例"
 *                 status: "inactive"
 *     responses:
 *       201:
 *         description: 创建示例成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Example'
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/examples', ...createExample);

/**
 * @swagger
 * /api/examples/{id}:
 *   put:
 *     summary: 更新示例
 *     description: 根据ID更新示例数据
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 示例ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExampleRequest'
 *           examples:
 *             example1:
 *               summary: 更新示例名称
 *               value:
 *                 name: "更新的示例名称"
 *             example2:
 *               summary: 更新示例状态
 *               value:
 *                 status: "inactive"
 *             example3:
 *               summary: 更新多个字段
 *               value:
 *                 name: "更新的示例"
 *                 description: "更新的描述"
 *                 status: "active"
 *     responses:
 *       200:
 *         description: 更新示例成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Example'
 *       404:
 *         description: 示例不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/examples/:id', ...updateExample);

/**
 * @swagger
 * /api/examples/{id}:
 *   delete:
 *     summary: 删除示例
 *     description: 根据ID删除示例数据
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 示例ID
 *     responses:
 *       204:
 *         description: 删除示例成功
 *       404:
 *         description: 示例不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/examples/:id', ...deleteExample);

export default router;
