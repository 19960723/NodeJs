import { ModelCtor } from 'sequelize';
import { MenuInstance } from '../models/Menus';
import { BaseRepository } from './BaseRepository';

/**
 * 菜单数据访问层
 */
class MenuRepository extends BaseRepository<MenuInstance> {
  constructor(model: ModelCtor<MenuInstance>) {
    super(model);
  }

  /**
   * 获取所有菜单（树形结构）
   */
  async findAllMenuTree(): Promise<MenuInstance[]> {
    const allMenus = await this.model.findAll({
      where: { status: 'active' },
      order: [
        ['order', 'ASC'],
        ['id', 'ASC']
      ]
    });

    return this.buildMenuTree(allMenus);
  }

  /**
   * 根据父级ID查找子菜单
   */
  async findByParentId(parentId: number | null): Promise<MenuInstance[]> {
    return await this.model.findAll({
      where: { parent_id: parentId },
      order: [['order', 'ASC']]
    });
  }

  /**
   * 获取菜单及其关联的角色
   */
  async findWithRoles(id: number): Promise<MenuInstance | null> {
    const models = require('../models').models;
    return await this.model.findByPk(id, {
      include: [
        {
          model: models.Role,
          as: 'roles',
          through: { attributes: [] },
          attributes: ['id', 'name', 'code', 'description']
        }
      ]
    });
  }

  /**
   * 根据权限标识查找菜单
   */
  async findByPermission(perms: string): Promise<MenuInstance | null> {
    return await this.model.findOne({
      where: { perms }
    });
  }

  /**
   * 获取用户的菜单权限（通过角色）
   */
  async findUserMenus(userId: number): Promise<MenuInstance[]> {
    const models = require('../models').models;

    // 获取用户的所有角色
    const user = await models.User.findByPk(userId, {
      include: [
        {
          model: models.Role,
          as: 'roles',
          where: { status: 1 },
          required: false,
          include: [
            {
              model: models.Menu,
              as: 'menus',
              where: { status: 'active' },
              required: false,
              through: { attributes: [] }
            }
          ]
        }
      ]
    });

    if (!user) {
      return [];
    }

    // 收集所有菜单（去重）
    const menuMap = new Map<number, MenuInstance>();
    const roles = (user as any).roles || [];

    for (const role of roles) {
      const menus = role.menus || [];
      for (const menu of menus) {
        if (!menuMap.has(menu.id)) {
          menuMap.set(menu.id, menu);
        }
      }
    }

    const allMenus = Array.from(menuMap.values());
    return this.buildMenuTree(allMenus);
  }

  /**
   * 获取用户的权限列表
   */
  async findUserPermissions(userId: number): Promise<string[]> {
    const menus = await this.findUserMenus(userId);
    const permissions: string[] = [];

    const extractPermissions = (menuList: MenuInstance[]) => {
      for (const menu of menuList) {
        if (menu.perms) {
          permissions.push(menu.perms);
        }
        // 如果有子菜单，递归提取
        const children = (menu as any).children;
        if (children && children.length > 0) {
          extractPermissions(children);
        }
      }
    };

    extractPermissions(menus);
    return [...new Set(permissions)]; // 去重
  }

  /**
   * 构建菜单树
   */
  private buildMenuTree(
    menus: MenuInstance[],
    parentId: number | null = null
  ): MenuInstance[] {
    const tree: MenuInstance[] = [];

    for (const menu of menus) {
      if (menu.parent_id === parentId) {
        const children = this.buildMenuTree(menus, menu.id!);
        const menuData = menu.toJSON() as any;
        if (children.length > 0) {
          menuData.children = children;
        }
        tree.push(menuData);
      }
    }

    return tree;
  }

  /**
   * 获取所有菜单按钮（type = 'A'）
   */
  async findAllButtons(): Promise<MenuInstance[]> {
    return await this.model.findAll({
      where: { type: 'A', status: 'active' },
      order: [['order', 'ASC']]
    });
  }

  /**
   * 获取某个菜单下的所有按钮
   */
  async findButtonsByMenuId(menuId: number): Promise<MenuInstance[]> {
    return await this.model.findAll({
      where: {
        parent_id: menuId,
        type: 'A',
        status: 'active'
      },
      order: [['order', 'ASC']]
    });
  }

  /**
   * 检查菜单路径是否已存在
   */
  async isPathExists(path: string, excludeId?: number): Promise<boolean> {
    const where: any = { path };
    if (excludeId) {
      where.id = { $ne: excludeId };
    }

    const count = await this.model.count({ where });
    return count > 0;
  }
}

export default MenuRepository;
