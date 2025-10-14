const Router = require('koa-router');
const routeController = require('../controllers/routeController');
const { authenticate } = require('../middleware/auth');

const router = new Router({ prefix: '/api/routes' });

// 获取用户可访问的路由（动态路由）
router.get('/user-routes', authenticate, routeController.getUserRoutes);

// 获取路由树结构
router.get('/tree', authenticate, routeController.getRouteTree);

// RESTful 路由管理接口
// GET /api/routes - 获取路由列表
router.get('/', authenticate, routeController.getRoutes);

// POST /api/routes - 创建路由
router.post('/', authenticate, routeController.createRoute);

// GET /api/routes/:id - 获取指定路由信息
router.get('/:id', authenticate, routeController.getRouteById);

// PUT /api/routes/:id - 更新路由信息
router.put('/:id', authenticate, routeController.updateRoute);

// DELETE /api/routes/:id - 删除路由
router.delete('/:id', authenticate, routeController.deleteRoute);

module.exports = router;
