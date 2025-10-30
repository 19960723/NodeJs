import { ModelCtor } from 'sequelize';
import { MenuInstance, MenusAttributes } from '../models/Menus';
import MenuRepository from '../repositories/MenuRepository';
import { BaseService } from './BaseService';

/**
 * 菜单服务层
 */
class MenuService extends BaseService<MenuInstance> {
  private menuRepository: MenuRepository;

  constructor(model: ModelCtor<MenuInstance>) {
    super(model);
    this.menuRepository = new MenuRepository(model);
  }

  /**
   * 获取所有菜单（树形结构）
   */
  async getAllMenuTree(): Promise<MenuInstance[]> {
    return await this.menuRepository.findAllMenuTree();
  }

  /**
   * 根据ID获取菜单详情（包含角色信息）
   */
  async getMenuWithRoles(id: number): Promise<MenuInstance | null> {
    return await this.menuRepository.findWithRoles(id);
  }

  /**
   * 创建菜单
   */
  async createMenu(data: MenusAttributes): Promise<MenuInstance> {
    // 根据类型验证路径
    const menuType = data.type || 'M';

    // 如果是按钮类型，不应该有路径
    if (menuType === 'A') {
      if (data.path && data.path.trim() !== '') {
        throw new Error('按钮类型的菜单不应该有路径');
      }
      // 按钮类型时，将path设置为空字符串（数据库不允许null）
      data.path = '';
    } else {
      // 非按钮类型必须验证路径
      if (!data.path || data.path.trim() === '') {
        throw new Error('菜单路径不能为空');
      }

      // 验证路径是否已存在
      const pathExists = await this.menuRepository.isPathExists(data.path);
      if (pathExists) {
        throw new Error('菜单路径已存在');
      }
    }

    // 如果有父级菜单，验证父级菜单是否存在
    if (data.parent_id) {
      const parentMenu = await this.menuRepository.findById(data.parent_id);
      if (!parentMenu) {
        throw new Error('父级菜单不存在');
      }
    }

    return await this.menuRepository.create(data);
  }

  /**
   * 更新菜单
   */
  async updateMenu(
    id: number,
    data: Partial<MenusAttributes>
  ): Promise<MenuInstance> {
    const menu = await this.menuRepository.findById(id);
    if (!menu) {
      throw new Error('菜单不存在');
    }

    // 确定最终的菜单类型（如果更新了类型则使用新类型，否则使用原来的类型）
    const finalType = data.type !== undefined ? data.type : menu.type;

    // 根据类型验证路径
    if (finalType === 'A') {
      // 如果是按钮类型，不应该有路径
      if (data.path !== undefined && data.path.trim() !== '') {
        throw new Error('按钮类型的菜单不应该有路径');
      }
      // 如果更新类型为按钮，确保path为空字符串
      if (data.type === 'A' && menu.type !== 'A') {
        data.path = '';
      }
    } else {
      // 非按钮类型必须验证路径
      if (data.path !== undefined) {
        if (!data.path || data.path.trim() === '') {
          throw new Error('菜单路径不能为空');
        }

        // 如果更新路径，检查新路径是否已被其他菜单使用
        if (data.path !== menu.path) {
          const pathExists = await this.menuRepository.isPathExists(
            data.path,
            id
          );
          if (pathExists) {
            throw new Error('菜单路径已存在');
          }
        }
      }
    }

    // 如果更新父级菜单，检查是否会造成循环引用
    if (data.parent_id !== undefined && data.parent_id !== menu.parent_id) {
      if (data.parent_id === id) {
        throw new Error('不能将菜单设置为自己的父级');
      }

      // 检查新父级菜单是否存在
      if (data.parent_id) {
        const parentMenu = await this.menuRepository.findById(data.parent_id);
        if (!parentMenu) {
          throw new Error('父级菜单不存在');
        }

        // 检查是否会形成循环
        if (await this.wouldCreateCircle(id, data.parent_id)) {
          throw new Error('不能将菜单设置为其子级菜单的父级');
        }
      }
    }

    return await this.menuRepository.update(id, data);
  }

  /**
   * 删除菜单
   */
  async deleteMenu(id: number): Promise<void> {
    const menu = await this.menuRepository.findById(id);
    if (!menu) {
      throw new Error('菜单不存在');
    }

    // 检查是否有子菜单
    const children = await this.menuRepository.findByParentId(id);
    if (children.length > 0) {
      throw new Error('该菜单下还有子菜单，无法删除');
    }

    await this.menuRepository.delete(id);
  }

  /**
   * 获取用户的菜单权限
   */
  async getUserMenus(userId: number): Promise<MenuInstance[]> {
    return await this.menuRepository.findUserMenus(userId);
  }

  /**
   * 获取用户的权限列表
   */
  async getUserPermissions(userId: number): Promise<string[]> {
    return await this.menuRepository.findUserPermissions(userId);
  }

  /**
   * 获取所有按钮权限
   */
  async getAllButtons(): Promise<MenuInstance[]> {
    return await this.menuRepository.findAllButtons();
  }

  /**
   * 获取某个菜单下的所有按钮
   */
  async getButtonsByMenuId(menuId: number): Promise<MenuInstance[]> {
    return await this.menuRepository.findButtonsByMenuId(menuId);
  }

  /**
   * 检查是否会形成循环引用
   */
  private async wouldCreateCircle(
    menuId: number,
    newParentId: number
  ): Promise<boolean> {
    let currentId: number | null = newParentId;

    while (currentId) {
      if (currentId === menuId) {
        return true; // 形成循环
      }

      const parent = await this.menuRepository.findById(currentId);
      if (!parent) {
        break;
      }

      currentId = parent.parent_id || null;
    }

    return false;
  }

  /**
   * 根据菜单类型获取菜单
   */
  async getMenusByType(type: 'M' | 'C' | 'A'): Promise<MenuInstance[]> {
    return await this.menuRepository.findAll({
      where: { type, status: 'active' },
      order: [['order', 'ASC']]
    } as any);
  }

  /**
   * 批量更新菜单排序
   */
  async updateMenusOrder(
    orders: Array<{ id: number; order: number }>
  ): Promise<void> {
    for (const item of orders) {
      await this.menuRepository.update(item.id, { order: item.order });
    }
  }
}

export default MenuService;
