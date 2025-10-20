import Router from 'koa-router';
import UserController from '../controllers/userController';
import {
  login,
  register,
  getUser,
  deleteUser,
  updateUser,
  getUserById
} from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = new Router({ prefix: '/api/user' });

// 认证路由
router.post('/login', ...login);
router.post('/register', ...register);

// 用户信息路由
router.get('/', auth, ...getUser);
router.get('/:id', auth, ...getUserById);
router.put('/:id', auth, ...updateUser);
router.delete('/:id', auth, ...deleteUser);

// 用户角色管理路由
router.get('/:id/roles', auth, UserController.getUserRoles);
router.post('/:id/roles', auth, UserController.assignRoles);
router.post('/:id/roles/add', auth, UserController.addRole);
router.delete('/:id/roles/:roleId', auth, UserController.removeRole);

export default router;
