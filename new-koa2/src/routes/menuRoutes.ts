import Router from 'koa-router';
import menuController from '../controllers/menuController';
import { auth } from '../middleware/auth';

const router = new Router({
  prefix: '/api/menus'
});

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: 获取所有菜单
 *     description: 获取所有菜单（树形结构）
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取菜单成功
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
 *                         $ref: '#/components/schemas/Menu'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', auth, menuController.getAllMenus);

/**
 * @swagger
 * /api/menus/user:
 *   get:
 *     summary: 获取当前用户的菜单权限
 *     description: 获取当前登录用户有权限访问的菜单列表
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取用户菜单成功
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
 *                         $ref: '#/components/schemas/Menu'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/user', auth, menuController.getUserMenus);

/**
 * @swagger
 * /api/menus/user/permissions:
 *   get:
 *     summary: 获取当前用户的权限列表
 *     description: 获取当前登录用户的所有权限标识
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取权限列表成功
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
 *                         type: string
 *             examples:
 *               success:
 *                 summary: 成功响应
 *                 value:
 *                   code: 200
 *                   message: "获取权限列表成功"
 *                   data: ["user:create", "user:edit", "user:delete"]
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/user/permissions', auth, menuController.getUserPermissions);

/**
 * @swagger
 * /api/menus/buttons:
 *   get:
 *     summary: 获取所有按钮权限
 *     description: 获取系统中所有的按钮权限配置
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取按钮权限成功
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
 *                         $ref: '#/components/schemas/Menu'
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/buttons', auth, menuController.getAllButtons);

/**
 * @swagger
 * /api/menus/type/{type}:
 *   get:
 *     summary: 根据类型获取菜单
 *     description: 根据菜单类型筛选菜单 (M=目录, C=菜单, A=按钮)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [M, C, A]
 *         description: 菜单类型 (M=目录, C=菜单, A=按钮)
 *     responses:
 *       200:
 *         description: 获取菜单成功
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
 *                         $ref: '#/components/schemas/Menu'
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
router.get('/type/:type', auth, menuController.getMenusByType);

/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: 获取菜单详情
 *     description: 根据ID获取菜单详细信息
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 菜单ID
 *     responses:
 *       200:
 *         description: 获取菜单详情成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Menu'
 *       404:
 *         description: 菜单不存在
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
router.get('/:id', auth, menuController.getMenuById);

/**
 * @swagger
 * /api/menus/{id}/roles:
 *   get:
 *     summary: 获取菜单及其关联的角色
 *     description: 获取指定菜单及其关联的所有角色信息
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 菜单ID
 *     responses:
 *       200:
 *         description: 获取菜单及角色信息成功
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
 *                         menu:
 *                           $ref: '#/components/schemas/Menu'
 *                         roles:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Role'
 *       404:
 *         description: 菜单不存在
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
router.get('/:id/roles', auth, menuController.getMenuWithRoles);

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: 创建菜单
 *     description: 创建新的菜单项
 *     tags: [Menu]
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
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: 菜单名称
 *               type:
 *                 type: string
 *                 enum: [M, C, A]
 *                 description: 菜单类型 (M=目录, C=菜单, A=按钮)
 *               parentId:
 *                 type: integer
 *                 description: 父菜单ID
 *               path:
 *                 type: string
 *                 description: 路由路径
 *               component:
 *                 type: string
 *                 description: 组件路径
 *               icon:
 *                 type: string
 *                 description: 菜单图标
 *               orderNum:
 *                 type: integer
 *                 description: 排序号
 *               permission:
 *                 type: string
 *                 description: 权限标识
 *               visible:
 *                 type: boolean
 *                 description: 是否可见
 *               status:
 *                 type: boolean
 *                 description: 菜单状态
 *           examples:
 *             directory:
 *               summary: 创建目录
 *               value:
 *                 name: "系统管理"
 *                 type: "M"
 *                 icon: "setting"
 *                 orderNum: 1
 *                 visible: true
 *                 status: true
 *             menu:
 *               summary: 创建菜单
 *               value:
 *                 name: "用户管理"
 *                 type: "C"
 *                 parentId: 1
 *                 path: "/system/user"
 *                 component: "system/user/index"
 *                 icon: "user"
 *                 orderNum: 1
 *                 permission: "system:user:list"
 *                 visible: true
 *                 status: true
 *     responses:
 *       201:
 *         description: 创建菜单成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Menu'
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
router.post('/', auth, menuController.createMenu);

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: 更新菜单
 *     description: 根据ID更新菜单信息
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 菜单ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 菜单名称
 *               type:
 *                 type: string
 *                 enum: [M, C, A]
 *                 description: 菜单类型
 *               parentId:
 *                 type: integer
 *                 description: 父菜单ID
 *               path:
 *                 type: string
 *                 description: 路由路径
 *               component:
 *                 type: string
 *                 description: 组件路径
 *               icon:
 *                 type: string
 *                 description: 菜单图标
 *               orderNum:
 *                 type: integer
 *                 description: 排序号
 *               permission:
 *                 type: string
 *                 description: 权限标识
 *               visible:
 *                 type: boolean
 *                 description: 是否可见
 *               status:
 *                 type: boolean
 *                 description: 菜单状态
 *           examples:
 *             update:
 *               summary: 更新菜单
 *               value:
 *                 name: "用户管理(更新)"
 *                 orderNum: 2
 *                 visible: false
 *     responses:
 *       200:
 *         description: 更新菜单成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Menu'
 *       404:
 *         description: 菜单不存在
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
router.put('/:id', auth, menuController.updateMenu);

/**
 * @swagger
 * /api/menus/order/batch:
 *   put:
 *     summary: 批量更新菜单排序
 *     description: 批量更新多个菜单的排序号
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orders
 *             properties:
 *               orders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - orderNum
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 菜单ID
 *                     orderNum:
 *                       type: integer
 *                       description: 排序号
 *           examples:
 *             batch:
 *               summary: 批量更新排序
 *               value:
 *                 orders:
 *                   - id: 1
 *                     orderNum: 3
 *                   - id: 2
 *                     orderNum: 1
 *                   - id: 3
 *                     orderNum: 2
 *     responses:
 *       200:
 *         description: 更新排序成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
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
router.put('/order/batch', auth, menuController.updateMenusOrder);

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: 删除菜单
 *     description: 根据ID删除菜单（如果有子菜单则无法删除）
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: 菜单ID
 *     responses:
 *       200:
 *         description: 删除菜单成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 菜单不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: 存在子菜单，无法删除
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
router.delete('/:id', auth, menuController.deleteMenu);

export default router;
