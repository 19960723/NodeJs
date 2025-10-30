import { RoleInstance } from '../models/Role';
import { MenuInstance } from '../models/Menus';
import { BaseRepository } from './BaseRepository';
import models from '../models';

/**
 * 角色数据访问层
 */
export class RoleRepository extends BaseRepository<RoleInstance> {
  constructor() {
    super((models as any)['Role'] as any);
  }

  async findByName(name: string): Promise<RoleInstance | null> {
    return await this.model.findOne({
      where: { name }
    });
  }

  /**
   * 根据角色代码查找角色
   */
  async findByCode(code: string): Promise<RoleInstance | null> {
    return await this.model.findOne({
      where: { code }
    });
  }

  /**
   * 获取角色及其关联的菜单
   */
  async findWithMenus(id: number): Promise<RoleInstance | null> {
    const models = require('../models').models;
    return await this.model.findByPk(id, {
      include: [
        {
          model: models.Menu,
          as: 'menus',
          through: { attributes: [] }, // 不返回中间表数据
          attributes: [
            'id',
            'name',
            'path',
            'type',
            'perms',
            'icon',
            'parent_id',
            'order',
            'status'
          ]
        }
      ]
    });
  }

  /**
   * 获取角色及其关联的用户
   */
  async findWithUsers(id: number): Promise<RoleInstance | null> {
    const models = require('../models').models;
    return await this.model.findByPk(id, {
      include: [
        {
          model: models.User,
          as: 'users',
          through: { attributes: [] },
          attributes: ['id', 'username', 'nickname', 'avatar']
        }
      ]
    });
  }

  /**
   * 获取所有角色及其菜单
   */
  async findAllWithMenus(): Promise<RoleInstance[]> {
    const models = require('../models').models;
    return await this.model.findAll({
      include: [
        {
          model: models.Menu,
          as: 'menus',
          through: { attributes: [] },
          attributes: [
            'id',
            'name',
            'path',
            'type',
            'perms',
            'icon',
            'parent_id',
            'order'
          ]
        }
      ]
    });
  }

  /**
   * 为角色分配菜单
   */
  async assignMenus(roleId: number, menuIds: number[]): Promise<void> {
    const role = await this.findById(roleId);
    if (!role) {
      throw new Error('角色不存在');
    }

    if (role.setMenus) {
      await role.setMenus(menuIds);
    }
  }

  /**
   * 为角色添加单个菜单
   */
  async addMenu(roleId: number, menuId: number): Promise<void> {
    const role = await this.findById(roleId);
    if (!role) {
      throw new Error('角色不存在');
    }

    if (role.addMenu) {
      await role.addMenu(menuId);
    }
  }

  /**
   * 移除角色的菜单
   */
  async removeMenu(roleId: number, menuId: number): Promise<void> {
    const role = await this.findById(roleId);
    if (!role) {
      throw new Error('角色不存在');
    }

    if (role.removeMenu) {
      await role.removeMenu(menuId);
    }
  }

  /**
   * 获取角色的所有菜单ID
   */
  async getMenuIds(roleId: number): Promise<number[]> {
    const role = await this.findWithMenus(roleId);
    if (!role) {
      return [];
    }

    const menus = (role as any).menus || [];
    return menus.map((menu: MenuInstance) => menu.id!);
  }
}
