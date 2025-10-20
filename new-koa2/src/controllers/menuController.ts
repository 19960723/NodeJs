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
      ctx.body = success(menus, '获取菜单列表成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取菜单列表失败');
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
        ctx.body = error('菜单不存在', 404);
        return;
      }

      ctx.body = success(menu, '获取菜单详情成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取菜单详情失败');
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
        ctx.body = error('菜单不存在', 404);
        return;
      }

      ctx.body = success(menu, '获取菜单信息成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取菜单信息失败');
    }
  }

  /**
   * 创建菜单
   */
  async createMenu(ctx: Context): Promise<void> {
    try {
      const menuData = ctx.request.body;
      const menu = await menuService.createMenu(menuData);
      ctx.body = success(menu, '创建菜单成功', 201);
    } catch (err: any) {
      ctx.body = error(err.message || '创建菜单失败');
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
      ctx.body = success(menu, '更新菜单成功');
    } catch (err: any) {
      ctx.body = error(err.message || '更新菜单失败');
    }
  }

  /**
   * 删除菜单
   */
  async deleteMenu(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      await menuService.deleteMenu(Number(id));
      ctx.body = success(null, '删除菜单成功');
    } catch (err: any) {
      ctx.body = error(err.message || '删除菜单失败');
    }
  }

  /**
   * 获取当前用户的菜单权限
   */
  async getUserMenus(ctx: Context): Promise<void> {
    try {
      const userId = ctx.state.user?.id;
      if (!userId) {
        ctx.body = error('用户未登录', 401);
        return;
      }

      const menus = await menuService.getUserMenus(userId);
      ctx.body = success(menus, '获取用户菜单成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取用户菜单失败');
    }
  }

  /**
   * 获取当前用户的权限列表
   */
  async getUserPermissions(ctx: Context): Promise<void> {
    try {
      const userId = ctx.state.user?.id;
      if (!userId) {
        ctx.body = error('用户未登录', 401);
        return;
      }

      const permissions = await menuService.getUserPermissions(userId);
      ctx.body = success(permissions, '获取用户权限成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取用户权限失败');
    }
  }

  /**
   * 获取所有按钮权限
   */
  async getAllButtons(ctx: Context): Promise<void> {
    try {
      const buttons = await menuService.getAllButtons();
      ctx.body = success(buttons, '获取按钮权限成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取按钮权限失败');
    }
  }

  /**
   * 根据类型获取菜单
   */
  async getMenusByType(ctx: Context): Promise<void> {
    try {
      const { type } = ctx.params;

      if (!['M', 'C', 'A'].includes(type)) {
        ctx.body = error('菜单类型无效');
        return;
      }

      const menus = await menuService.getMenusByType(type as 'M' | 'C' | 'A');
      ctx.body = success(menus, '获取菜单成功');
    } catch (err: any) {
      ctx.body = error(err.message || '获取菜单失败');
    }
  }

  /**
   * 批量更新菜单排序
   */
  async updateMenusOrder(ctx: Context): Promise<void> {
    try {
      const { orders } = ctx.request.body;

      if (!Array.isArray(orders)) {
        ctx.body = error('参数格式错误');
        return;
      }

      await menuService.updateMenusOrder(orders);
      ctx.body = success(null, '更新菜单排序成功');
    } catch (err: any) {
      ctx.body = error(err.message || '更新菜单排序失败');
    }
  }
}

export default new MenuController();
