import { Context } from 'koa';
import { RoleService } from '../services/RoleService';
import { success, handleError } from '../utils/response';
import { validate } from '../middleware/validator';

class RoleController {
  private static roleService = new RoleService();

  /**
   * 创建角色
   */
  static async createRole(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;
      const result = await RoleController.roleService.createRole(data);
      success(ctx, result, '创建角色成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 获取角色列表（分页）
   */
  static async getRoleList(ctx: Context): Promise<void> {
    try {
      const query = ctx.query as any;
      const result = await RoleController.roleService.getRoleList({
        page: query.page ? parseInt(query.page) : 1,
        pageSize: query.pageSize ? parseInt(query.pageSize) : 10,
        status: query.status !== undefined ? parseInt(query.status) : undefined,
        keyword: query.keyword
      });
      success(ctx, result, '获取角色列表成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 获取所有启用的角色
   */
  static async getActiveRoles(ctx: Context): Promise<void> {
    try {
      const result = await RoleController.roleService.getActiveRoles();
      success(ctx, result, '获取启用角色列表成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 根据ID获取角色详情
   */
  static async getRoleById(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const result = await RoleController.roleService.getRoleById(parseInt(id));
      success(ctx, result, '获取角色详情成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 更新角色
   */
  static async updateRole(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body as any;
      const result = await RoleController.roleService.updateRole(
        parseInt(id),
        data
      );
      success(ctx, result, '更新角色成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 删除角色
   */
  static async deleteRole(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const result = await RoleController.roleService.deleteRole(parseInt(id));
      success(ctx, result, '删除角色成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 更新角色状态
   */
  static async updateRoleStatus(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const { status } = ctx.request.body as any;
      const result = await RoleController.roleService.updateRoleStatus(
        parseInt(id),
        status
      );
      success(ctx, result, '更新角色状态成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
}

// 导出控制器方法（带验证中间件）
export const createRole = [validate({}), RoleController.createRole];
export const getRoleList = [validate({}), RoleController.getRoleList];
export const getActiveRoles = [validate({}), RoleController.getActiveRoles];
export const getRoleById = [validate({}), RoleController.getRoleById];
export const updateRole = [validate({}), RoleController.updateRole];
export const deleteRole = [validate({}), RoleController.deleteRole];
export const updateRoleStatus = [validate({}), RoleController.updateRoleStatus];

export default RoleController;
