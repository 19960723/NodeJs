const Router = require('koa-router');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validate, userSchemas } = require('../middleware/validator');

const router = new Router({ prefix: '/api/users' });

// 用户注册
router.post(
  '/register',
  validate(userSchemas.register),
  userController.register
);

// 用户登录
router.post('/login', validate(userSchemas.login), userController.login);

// 退出登录
router.post('/logout', authenticate, userController.logout);

// 刷新token
router.post('/refresh-token', userController.refreshToken);

// 获取当前用户信息（需要认证）
router.get('/me', authenticate, userController.getCurrentUser);

// 更新当前用户信息（需要认证）
router.put(
  '/me',
  authenticate,
  validate(userSchemas.updateProfile),
  userController.updateProfile
);

// 修改当前用户密码（需要认证）
router.put(
  '/me/password',
  authenticate,
  validate(userSchemas.changePassword),
  userController.changePassword
);

// RESTful 用户管理接口
// GET /api/users - 获取用户列表
router.get('/', authenticate, userController.getUsers);

// POST /api/users - 创建用户
router.post('/', authenticate, userController.createUser);

// GET /api/users/:id - 获取指定用户信息
router.get('/:id', authenticate, userController.getUserById);

// PUT /api/users/:id - 更新用户信息
router.put('/:id', authenticate, userController.updateUser);

// DELETE /api/users/:id - 删除用户
router.delete('/:id', authenticate, userController.deleteUser);

// POST /api/users/:id/reset-password - 重置用户密码
router.post('/:id/reset-password', authenticate, userController.resetPassword);

// POST /api/users/batch-delete - 批量删除用户
router.post('/batch-delete', authenticate, userController.batchDeleteUsers);

module.exports = router;
