import Router from 'koa-router';
import {
  createRole,
  getRoleList,
  getActiveRoles,
  getRoleById,
  updateRole,
  deleteRole,
  updateRoleStatus
} from '../controllers/roleController';
import { auth } from '../middleware/auth';

const router = new Router({ prefix: '/api/role' });

/**
 * @swagger
 * /api/role:
 *   post:
 *     summary: 创建角色
 *     description: 创建新的角色
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 description: 角色名称
 *               code:
 *                 type: string
 *                 description: 角色代码
 *               description:
 *                 type: string
 *                 description: 角色描述
 *               status:
 *                 type: boolean
 *                 description: 角色状态
 *               menuIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: 菜单权限ID数组
 *           examples:
 *             create:
 *               summary: 创建角色示例
 *               value:
 *                 name: "管理员"
 *                 code: "admin"
 *                 description: "系统管理员角色"
 *                 status: true
 *                 menuIds: [1, 2, 3]
 *     responses:
 *       201:
 *         description: 创建角色成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Role'
 *       400:
 *         description: 请求参数错误或角色代码已存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', auth, ...createRole);

/**
 * @swagger
 * /api/role:
 *   get:
 *     summary: 获取角色列表
 *     description: 分页获取角色列表
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
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
 *         name: name
 *         schema:
 *           type: string
 *         description: 角色名称（模糊搜索）
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: 角色代码（模糊搜索）
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: 角色状态
 *     responses:
 *       200:
 *         description: 获取角色列表成功
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
 *                         items:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Role'
 *                         pagination:
 *                           type: object
 *                           properties:
 *                             page:
 *                               type: integer
 *                             pageSize:
 *                               type: integer
 *                             total:
 *                               type: integer
 *                             totalPages:
 *                               type: integer
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', auth, ...getRoleList);

/**
 * @swagger
 * /api/role/active:
 *   get:
 *     summary: 获取所有启用的角色
 *     description: 获取所有状态为启用的角色列表
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取启用角色成功
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
 *                         $ref: '#/components/schemas/Role'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/active', auth, ...getActiveRoles);

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     summary: 获取角色详情
 *     description: 根据ID获取角色详细信息，包括关联的菜单权限
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 角色ID
 *     responses:
 *       200:
 *         description: 获取角色详情成功
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
 *                         role:
 *                           $ref: '#/components/schemas/Role'
 *                         menus:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Menu'
 *       404:
 *         description: 角色不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', auth, ...getRoleById);

/**
 * @swagger
 * /api/role/{id}:
 *   put:
 *     summary: 更新角色
 *     description: 根据ID更新角色信息
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 角色ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 角色名称
 *               code:
 *                 type: string
 *                 description: 角色代码
 *               description:
 *                 type: string
 *                 description: 角色描述
 *               status:
 *                 type: boolean
 *                 description: 角色状态
 *               menuIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: 菜单权限ID数组
 *           examples:
 *             update:
 *               summary: 更新角色示例
 *               value:
 *                 name: "管理员(更新)"
 *                 description: "更新的描述"
 *                 menuIds: [1, 2, 3, 4]
 *     responses:
 *       200:
 *         description: 更新角色成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Role'
 *       404:
 *         description: 角色不存在
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
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', auth, ...updateRole);

/**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     summary: 删除角色
 *     description: 根据ID删除角色（如果角色已分配给用户则无法删除）
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 角色ID
 *     responses:
 *       200:
 *         description: 删除角色成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 角色不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: 角色已分配给用户，无法删除
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', auth, ...deleteRole);

/**
 * @swagger
 * /api/role/{id}/status:
 *   patch:
 *     summary: 更新角色状态
 *     description: 更新角色的启用/禁用状态
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 角色ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: 角色状态（true=启用，false=禁用）
 *           examples:
 *             enable:
 *               summary: 启用角色
 *               value:
 *                 status: true
 *             disable:
 *               summary: 禁用角色
 *               value:
 *                 status: false
 *     responses:
 *       200:
 *         description: 更新角色状态成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 角色不存在
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
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id/status', auth, ...updateRoleStatus);

export default router;
