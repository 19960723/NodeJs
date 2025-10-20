import Router from 'koa-router';
import menuController from '../controllers/menuController';
import { auth } from '../middleware/auth';

const router = new Router({
  prefix: '/api/menus'
});

/**
 * @route GET /api/menus
 * @desc 获取所有菜单（树形结构）
 * @access Private
 */
router.get('/', auth, menuController.getAllMenus);

/**
 * @route GET /api/menus/user
 * @desc 获取当前用户的菜单权限
 * @access Private
 */
router.get('/user', auth, menuController.getUserMenus);

/**
 * @route GET /api/menus/user/permissions
 * @desc 获取当前用户的权限列表
 * @access Private
 */
router.get('/user/permissions', auth, menuController.getUserPermissions);

/**
 * @route GET /api/menus/buttons
 * @desc 获取所有按钮权限
 * @access Private
 */
router.get('/buttons', auth, menuController.getAllButtons);

/**
 * @route GET /api/menus/type/:type
 * @desc 根据类型获取菜单 (M=目录, C=菜单, A=按钮)
 * @access Private
 */
router.get('/type/:type', auth, menuController.getMenusByType);

/**
 * @route GET /api/menus/:id
 * @desc 获取菜单详情
 * @access Private
 */
router.get('/:id', auth, menuController.getMenuById);

/**
 * @route GET /api/menus/:id/roles
 * @desc 获取菜单及其关联的角色
 * @access Private
 */
router.get('/:id/roles', auth, menuController.getMenuWithRoles);

/**
 * @route POST /api/menus
 * @desc 创建菜单
 * @access Private
 */
router.post('/', auth, menuController.createMenu);

/**
 * @route PUT /api/menus/:id
 * @desc 更新菜单
 * @access Private
 */
router.put('/:id', auth, menuController.updateMenu);

/**
 * @route PUT /api/menus/order
 * @desc 批量更新菜单排序
 * @access Private
 */
router.put('/order/batch', auth, menuController.updateMenusOrder);

/**
 * @route DELETE /api/menus/:id
 * @desc 删除菜单
 * @access Private
 */
router.delete('/:id', auth, menuController.deleteMenu);

export default router;
