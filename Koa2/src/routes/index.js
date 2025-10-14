const Router = require('koa-router');
const userRoutes = require('./userRoutes');
const uploadRoutes = require('./uploadRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const healthRoutes = require('./healthRoutes');
const captchaRoutes = require('./captchaRoutes');
const routeRoutes = require('./routeRoutes');
const roleRoutes = require('./roleRoutes');
const { success } = require('../utils/response');

const router = new Router();

// API 版本信息
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
router.use(userRoutes.routes(), userRoutes.allowedMethods());
router.use(uploadRoutes.routes(), uploadRoutes.allowedMethods());
router.use(dashboardRoutes.routes(), dashboardRoutes.allowedMethods());
router.use('/api', captchaRoutes.routes(), captchaRoutes.allowedMethods());
router.use(routeRoutes.routes(), routeRoutes.allowedMethods());
router.use(roleRoutes.routes(), roleRoutes.allowedMethods());

module.exports = router;
