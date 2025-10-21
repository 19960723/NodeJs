import { Context } from 'koa';
import { models } from '../models';
import MenuService from '../services/MenuService';
import { success, error } from '../utils/response';

const menuService = new MenuService(models.Menu);

/**
 * 菜单控制器
 */
class MenuController {
  /**
   * 获取所有菜单（树形结构）
   */
  async getAllMenus(ctx: Context): Promise<void> {
    try {
      const menus = await menuService.getAllMenuTree();
      success(ctx, menus, '获取菜单列表成功');
    } catch (err: any) {
      error(ctx, err.message || '获取菜单列表失败');
    }
  }

  /**
   * 获取菜单详情
   */
  async getMenuById(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const menu = await menuService.getById(Number(id));

      if (!menu) {
        error(ctx, '菜单不存在', 404, 404);
        return;
      }

      success(ctx, menu, '获取菜单详情成功');
    } catch (err: any) {
      error(ctx, err.message || '获取菜单详情失败');
    }
  }

  /**
   * 获取菜单及其关联的角色
   */
  async getMenuWithRoles(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const menu = await menuService.getMenuWithRoles(Number(id));

      if (!menu) {
        error(ctx, '菜单不存在', 404, 404);
        return;
      }

      success(ctx, menu, '获取菜单信息成功');
    } catch (err: any) {
      error(ctx, err.message || '获取菜单信息失败');
    }
  }

  /**
   * 创建菜单
   */
  async createMenu(ctx: Context): Promise<void> {
    try {
      const menuData = ctx.request.body;
      const menu = await menuService.createMenu(menuData);
      success(ctx, menu, '创建菜单成功', 201);
    } catch (err: any) {
      error(ctx, err.message || '创建菜单失败');
    }
  }

  /**
   * 更新菜单
   */
  async updateMenu(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const menuData = ctx.request.body;
      const menu = await menuService.updateMenu(Number(id), menuData);
      success(ctx, menu, '更新菜单成功');
    } catch (err: any) {
      error(ctx, err.message || '更新菜单失败');
    }
  }

  /**
   * 删除菜单
   */
  async deleteMenu(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      await menuService.deleteMenu(Number(id));
      success(ctx, null, '删除菜单成功');
    } catch (err: any) {
      error(ctx, err.message || '删除菜单失败');
    }
  }

  /**
   * 获取当前用户的菜单权限
   */
  async getUserMenus(ctx: Context): Promise<void> {
    try {
      const userId = ctx.state.user?.id;
      if (!userId) {
        error(ctx, '用户未登录', 401, 401);
        return;
      }

      const menus = await menuService.getUserMenus(userId);
      success(ctx, menus, '获取用户菜单成功');
    } catch (err: any) {
      error(ctx, err.message || '获取用户菜单失败');
    }
  }

  /**
   * 获取当前用户的权限列表
   */
  async getUserPermissions(ctx: Context): Promise<void> {
    try {
      const userId = ctx.state.user?.id;
      if (!userId) {
        error(ctx, '用户未登录', 401, 401);
        return;
      }

      const permissions = await menuService.getUserPermissions(userId);
      success(ctx, permissions, '获取用户权限成功');
    } catch (err: any) {
      error(ctx, err.message || '获取用户权限失败');
    }
  }

  /**
   * 获取所有按钮权限
   */
  async getAllButtons(ctx: Context): Promise<void> {
    try {
      const buttons = await menuService.getAllButtons();
      success(ctx, buttons, '获取按钮权限成功');
    } catch (err: any) {
      error(ctx, err.message || '获取按钮权限失败');
    }
  }

  /**
   * 根据类型获取菜单
   */
  async getMenusByType(ctx: Context): Promise<void> {
    try {
      const { type } = ctx.params;

      if (!['M', 'C', 'A'].includes(type)) {
        error(ctx, '菜单类型无效', 400, 400);
        return;
      }

      const menus = await menuService.getMenusByType(type as 'M' | 'C' | 'A');
      success(ctx, menus, '获取菜单成功');
    } catch (err: any) {
      error(ctx, err.message || '获取菜单失败');
    }
  }

  /**
   * 批量更新菜单排序
   */
  async updateMenusOrder(ctx: Context): Promise<void> {
    try {
      const { orders } = ctx.request.body;

      if (!Array.isArray(orders)) {
        error(ctx, '参数格式错误', 400, 400);
        return;
      }

      await menuService.updateMenusOrder(orders);
      success(ctx, null, '更新菜单排序成功');
    } catch (err: any) {
      error(ctx, err.message || '更新菜单排序失败');
    }
  }
}

export default new MenuController();
