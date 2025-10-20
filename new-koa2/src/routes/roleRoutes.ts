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
 * 角色路由
 */

// 创建角色（需要认证）
router.post('/', auth, ...createRole);

// 获取角色列表（需要认证）
router.get('/', auth, ...getRoleList);

// 获取所有启用的角色（需要认证）
router.get('/active', auth, ...getActiveRoles);

// 根据ID获取角色详情（需要认证）
router.get('/:id', auth, ...getRoleById);

// 更新角色（需要认证）
router.put('/:id', auth, ...updateRole);

// 删除角色（需要认证）
router.delete('/:id', auth, ...deleteRole);

// 更新角色状态（需要认证）
router.patch('/:id/status', auth, ...updateRoleStatus);

export default router;
