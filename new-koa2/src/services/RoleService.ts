import { BaseService } from './BaseService';
import { RoleRepository } from '../repositories/RoleRepository';
import { BusinessError } from '../types';

export class RoleService extends BaseService<any> {
  private repository: RoleRepository;

  constructor() {
    super();
    this.repository = new RoleRepository();
  }

  /**
   * 创建角色
   */
  async createRole(data: {
    name: string;
    code: string;
    description?: string;
    status?: number;
  }) {
    const { name, code, description, status = 1 } = data;

    // 检查角色名称是否已存在
    const existingName = await this.repository.findByName(name);
    if (existingName) {
      throw new BusinessError(409, '角色名称已存在');
    }

    // 检查角色代码是否已存在
    const existingCode = await this.repository.findByCode(code);
    if (existingCode) {
      throw new BusinessError(409, '角色代码已存在');
    }

    // 创建角色
    const role = await this.repository.create({
      name,
      code,
      description,
      status
    });

    return role;
  }

  /**
   * 获取角色列表（分页）
   */
  async getRoleList(query: {
    page?: number;
    pageSize?: number;
    status?: number;
    keyword?: string;
  }) {
    const { page = 1, pageSize = 10, status, keyword } = query;

    const where: any = {};

    // 状态筛选
    if (status !== undefined) {
      where.status = status;
    }

    // 关键词搜索（名称或代码）
    if (keyword) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        { code: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } }
      ];
    }

    const offset = (page - 1) * pageSize;
    const { rows, count } = await this.repository.findAll({
      where,
      limit: pageSize,
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      list: rows,
      pagination: this.calculatePagination(page, pageSize, count)
    };
  }

  /**
   * 获取所有启用的角色
   */
  async getActiveRoles() {
    return await this.repository.findActiveRoles();
  }

  /**
   * 根据ID获取角色详情
   */
  async getRoleById(id: number) {
    const roleId = this.validateId(id);
    const role = await this.repository.findById(roleId);

    if (!role) {
      throw new BusinessError(404, '角色不存在');
    }

    return role;
  }

  /**
   * 更新角色
   */
  async updateRole(
    id: number,
    data: {
      name?: string;
      code?: string;
      description?: string;
      status?: number;
      menuIds?: number[];
    }
  ) {
    const roleId = this.validateId(id);

    // 检查角色是否存在
    const role = await this.repository.findById(roleId);
    if (!role) {
      throw new BusinessError(404, '角色不存在');
    }

    // 如果更新名称，检查名称是否已被其他角色使用
    if (data.name && data.name !== role.name) {
      const existingName = await this.repository.findByName(data.name);
      if (existingName && existingName.id !== roleId) {
        throw new BusinessError(409, '角色名称已存在');
      }
    }

    // 如果更新代码，检查代码是否已被其他角色使用
    if (data.code && data.code !== role.code) {
      const existingCode = await this.repository.findByCode(data.code);
      if (existingCode && existingCode.id !== roleId) {
        throw new BusinessError(409, '角色代码已存在');
      }
    }
    // 更新角色
    return await this.repository.update(roleId, data);
  }

  /**
   * 删除角色
   */
  async deleteRole(id: number) {
    const roleId = this.validateId(id);

    // 检查角色是否存在
    const role = await this.repository.findById(roleId);
    if (!role) {
      throw new BusinessError(404, '角色不存在');
    }

    // TODO: 检查角色是否被用户使用，如果使用则不能删除
    // 可以在这里添加检查角色是否关联用户的逻辑

    return await this.repository.delete(roleId);
  }

  /**
   * 更新角色状态
   */
  async updateRoleStatus(id: number, status: number) {
    const roleId = this.validateId(id);

    // 检查角色是否存在
    const role = await this.repository.findById(roleId);
    if (!role) {
      throw new BusinessError(404, '角色不存在');
    }

    // 状态值验证
    if (status !== 0 && status !== 1) {
      throw new BusinessError(400, '状态值无效');
    }

    return await this.repository.updateStatus(roleId, status);
  }

  /**
   * 获取角色的菜单权限
   */
  async getRoleMenus(id: number) {
    const roleId = this.validateId(id);

    // 检查角色是否存在
    const role = await this.repository.findById(roleId);
    if (!role) {
      throw new BusinessError(404, '角色不存在');
    }

    // 获取角色及其菜单
    const roleWithMenus = await this.repository.findWithMenus(roleId);
    const menus = (roleWithMenus as any)?.menus || [];

    return {
      roleId,
      roleName: role.name,
      menus,
      menuIds: menus.map((m: any) => m.id)
    };
  }

  /**
   * 为角色分配菜单权限
   */
  async assignMenusToRole(id: number, menuIds: number[]) {
    const roleId = this.validateId(id);

    // 检查角色是否存在
    const role = await this.repository.findById(roleId);
    if (!role) {
      throw new BusinessError(404, '角色不存在');
    }

    // 验证角色状态
    if (role.status !== 1) {
      throw new BusinessError(400, '角色已被禁用，无法分配权限');
    }

    // 验证菜单ID
    if (!Array.isArray(menuIds)) {
      throw new BusinessError(400, '菜单ID必须是数组');
    }

    // 去重并验证
    const validMenuIds = [...new Set(menuIds)].filter(id => {
      const numId = Number(id);
      return !isNaN(numId) && numId > 0;
    });

    // 验证菜单是否存在
    if (validMenuIds.length > 0) {
      const models = require('../models').models;
      const menus = await models.Menu.findAll({
        where: { id: validMenuIds }
      });

      if (menus.length !== validMenuIds.length) {
        throw new BusinessError(400, '部分菜单不存在');
      }

      // 检查菜单状态
      const disabledMenus = menus.filter((m: any) => m.status !== 1);
      if (disabledMenus.length > 0) {
        throw new BusinessError(
          400,
          `部分菜单已被禁用: ${disabledMenus.map((m: any) => m.name).join(', ')}`
        );
      }
    }

    // 使用Sequelize的关联方法分配菜单
    await this.repository.assignMenus(roleId, validMenuIds);

    return {
      roleId,
      menuIds: validMenuIds,
      message: '菜单权限分配成功'
    };
  }
}
