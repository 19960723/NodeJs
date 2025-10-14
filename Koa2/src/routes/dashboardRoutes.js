const Router = require('koa-router');
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

const router = new Router({ prefix: '/api/dashboard' });

// RESTful Dashboard 资源接口
// GET /api/dashboard/statistics - 获取统计数据
router.get('/statistics', authenticate, dashboardController.getStatCards);

// GET /api/dashboard/analytics/users - 获取用户增长趋势
router.get(
  '/analytics/users',
  authenticate,
  dashboardController.getUserGrowthTrend
);

// GET /api/dashboard/analytics/sales - 获取销售数据
router.get('/analytics/sales', authenticate, dashboardController.getSalesData);

// GET /api/dashboard/analytics/visits - 获取访问量统计
router.get(
  '/analytics/visits',
  authenticate,
  dashboardController.getVisitStats
);

// GET /api/dashboard/analytics/pages - 获取热门页面
router.get(
  '/analytics/pages',
  authenticate,
  dashboardController.getPopularPages
);

// GET /api/dashboard/system - 获取系统信息
router.get('/system', authenticate, dashboardController.getSystemInfo);

// GET /api/dashboard/users/online - 获取在线用户
router.get('/users/online', authenticate, dashboardController.getOnlineUsers);

module.exports = router;
