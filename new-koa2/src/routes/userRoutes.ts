import Router from 'koa-router';
import UserController from '../controllers/userController';
import {
  login,
  register,
  logout,
  refresh,
  getUser,
  deleteUser,
  updateUser,
  getUserById
} from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = new Router({ prefix: '/api/user' });

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 用户登录
 *     description: 用户使用用户名和密码登录系统
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 密码
 *           examples:
 *             login:
 *               summary: 登录请求示例
 *               value:
 *                 username: "admin"
 *                 password: "password123"
 *     responses:
 *       200:
 *         description: 登录成功
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
 *                         accessToken:
 *                           type: string
 *                         refreshToken:
 *                           type: string
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *       401:
 *         description: 用户名或密码错误
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', ...login);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: 用户注册
 *     description: 注册新用户账号
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 密码
 *               nickname:
 *                 type: string
 *                 description: 昵称
 *           examples:
 *             register:
 *               summary: 注册请求示例
 *               value:
 *                 username: "newuser"
 *                 password: "password123"
 *                 nickname: "新用户"
 *     responses:
 *       201:
 *         description: 注册成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: 请求参数错误或用户名已存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', ...register);

router.post('/logout', auth, ...logout);
router.post('/refresh', auth, ...refresh);
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: 获取当前用户信息
 *     description: 获取当前登录用户的详细信息
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取用户信息成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', auth, ...getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: 根据ID获取用户信息
 *     description: 根据用户ID获取指定用户的详细信息
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *     responses:
 *       200:
 *         description: 获取用户信息成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: 用户不存在
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
router.get('/:id', auth, ...getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: 更新用户信息
 *     description: 根据用户ID更新用户信息
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 邮箱
 *               nickname:
 *                 type: string
 *                 description: 昵称
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 新密码
 *               status:
 *                 type: boolean
 *                 description: 用户状态
 *           examples:
 *             update:
 *               summary: 更新用户信息
 *               value:
 *                 nickname: "更新的昵称"
 *                 email: "newemail@example.com"
 *     responses:
 *       200:
 *         description: 更新用户成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: 用户不存在
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
router.put('/:id', auth, ...updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: 删除用户
 *     description: 根据用户ID删除用户
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *     responses:
 *       200:
 *         description: 删除用户成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 用户不存在
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
router.delete('/:id', auth, ...deleteUser);

/**
 * @swagger
 * /api/user/{id}/roles:
 *   get:
 *     summary: 获取用户角色列表
 *     description: 获取指定用户的所有角色信息
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *     responses:
 *       200:
 *         description: 获取用户角色成功
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
 *       404:
 *         description: 用户不存在
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
router.get('/:id/roles', auth, UserController.getUserRoles);

/**
 * @swagger
 * /api/user/{id}/roles:
 *   post:
 *     summary: 分配用户角色（覆盖）
 *     description: 为用户分配角色，会覆盖原有角色
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleIds
 *             properties:
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: 角色ID数组
 *           examples:
 *             assign:
 *               summary: 分配角色
 *               value:
 *                 roleIds: [1, 2, 3]
 *     responses:
 *       200:
 *         description: 分配角色成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 用户不存在
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
router.post('/:id/roles', auth, UserController.assignRoles);

/**
 * @swagger
 * /api/user/{id}/roles/add:
 *   post:
 *     summary: 为用户添加角色
 *     description: 为用户添加新角色，不会覆盖原有角色
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *                 description: 角色ID
 *           examples:
 *             add:
 *               summary: 添加角色
 *               value:
 *                 roleId: 3
 *     responses:
 *       200:
 *         description: 添加角色成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 用户或角色不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: 请求参数错误或角色已存在
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
router.post('/:id/roles/add', auth, UserController.addRole);

/**
 * @swagger
 * /api/user/{id}/roles/{roleId}:
 *   delete:
 *     summary: 移除用户角色
 *     description: 从用户移除指定角色
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 用户ID
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 角色ID
 *     responses:
 *       200:
 *         description: 移除角色成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 用户或角色不存在
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
router.delete('/:id/roles/:roleId', auth, UserController.removeRole);

export default router;
