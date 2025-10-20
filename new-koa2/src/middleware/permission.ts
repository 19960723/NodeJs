import { Context, Next } from 'koa';
import { models } from '../models';
import MenuService from '../services/MenuService';

const menuService = new MenuService(models.Menu);

/**
 * 权限检查中间件工厂函数
 * @param requiredPermission 需要的权限标识
 * @returns 中间件函数
 */
export const checkPermission = (requiredPermission: string) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      const userId = ctx.state.user?.id;

      if (!userId) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '用户未登录'
        };
        return;
      }

      // 获取用户的所有权限
      const userPermissions = await menuService.getUserPermissions(userId);

      // 检查用户是否拥有所需权限
      if (!userPermissions.includes(requiredPermission)) {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: '权限不足'
        };
        return;
      }

      await next();
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '权限验证失败: ' + error.message
      };
    }
  };
};

/**
 * 检查用户是否拥有指定角色
 * @param requiredRoles 需要的角色代码（数组或单个字符串）
 * @returns 中间件函数
 */
export const checkRole = (requiredRoles: string | string[]) => {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      const userId = ctx.state.user?.id;

      if (!userId) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '用户未登录'
        };
        return;
      }

      // 获取用户及其角色
      const user = await models.User.findByPk(userId, {
        include: [
          {
            model: models.Role,
            as: 'roles',
            where: { status: 1 },
            required: false,
            through: { attributes: [] },
            attributes: ['id', 'code', 'name']
          }
        ]
      });

      if (!user) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '用户不存在'
        };
        return;
      }

      // 检查用户是否拥有所需角色
      const userRoles = (user as any).roles || [];
      const userRoleCodes = userRoles.map((role: any) => role.code);

      const hasRequiredRole = roles.some(role => userRoleCodes.includes(role));

      if (!hasRequiredRole) {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: '角色权限不足'
        };
        return;
      }

      await next();
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '角色验证失败: ' + error.message
      };
    }
  };
};

/**
 * 检查用户是否拥有任一权限（OR逻辑）
 * @param permissions 权限标识数组
 * @returns 中间件函数
 */
export const checkAnyPermission = (permissions: string[]) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      const userId = ctx.state.user?.id;

      if (!userId) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '用户未登录'
        };
        return;
      }

      const userPermissions = await menuService.getUserPermissions(userId);

      const hasAnyPermission = permissions.some(perm =>
        userPermissions.includes(perm)
      );

      if (!hasAnyPermission) {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: '权限不足'
        };
        return;
      }

      await next();
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '权限验证失败: ' + error.message
      };
    }
  };
};

/**
 * 检查用户是否拥有所有权限（AND逻辑）
 * @param permissions 权限标识数组
 * @returns 中间件函数
 */
export const checkAllPermissions = (permissions: string[]) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      const userId = ctx.state.user?.id;

      if (!userId) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '用户未登录'
        };
        return;
      }

      const userPermissions = await menuService.getUserPermissions(userId);

      const hasAllPermissions = permissions.every(perm =>
        userPermissions.includes(perm)
      );

      if (!hasAllPermissions) {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: '权限不足'
        };
        return;
      }

      await next();
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '权限验证失败: ' + error.message
      };
    }
  };
};

/**
 * 超级管理员检查中间件
 * @returns 中间件函数
 */
export const checkSuperAdmin = checkRole('super_admin');

/**
 * 管理员检查中间件（包括超级管理员）
 * @returns 中间件函数
 */
export const checkAdmin = checkRole(['super_admin', 'admin']);
