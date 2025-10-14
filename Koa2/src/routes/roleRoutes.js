const Router = require('koa-router');
const roleController = require('../controllers/roleController');
const { authenticate } = require('../middleware/auth');

const router = new Router({ prefix: '/api/roles' });

// 获取所有角色（用于下拉选择）
router.get('/all', authenticate, roleController.getAllRoles);

// RESTful 角色管理接口
// GET /api/roles - 获取角色列表
router.get('/', authenticate, roleController.getRoles);

// POST /api/roles - 创建角色
router.post('/', authenticate, roleController.createRole);

// GET /api/roles/:id - 获取指定角色信息
router.get('/:id', authenticate, roleController.getRoleById);

// PUT /api/roles/:id - 更新角色信息
router.put('/:id', authenticate, roleController.updateRole);

// DELETE /api/roles/:id - 删除角色
router.delete('/:id', authenticate, roleController.deleteRole);

// POST /api/roles/:id/routes - 分配路由权限给角色
router.post('/:id/routes', authenticate, roleController.assignRoutes);

module.exports = router;
