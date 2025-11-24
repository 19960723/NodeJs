import { Injectable, Logger } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';
import { RoleRepository } from './repositories/role.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleVo } from './dto/role.vo';
import { BusinessError } from '../../common/exceptions/business.exception';

/**
 * Role Service
 * 处理角色相关业务逻辑
 */
@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  /**
   * 创建角色
   */
  async create(createRoleDto: CreateRoleDto): Promise<RoleVo> {
    const { name, code } = createRoleDto;

    // 检查角色名称是否已存在
    const existingName = await this.roleRepository.findByName(name);
    if (existingName) {
      BusinessError.conflict('角色名称已存在');
    }

    // 检查角色编码是否已存在
    const existingCode = await this.roleRepository.findByCode(code);
    if (existingCode) {
      BusinessError.conflict('角色编码已存在');
    }

    // 创建角色
    const role = await this.roleRepository.create(createRoleDto);

    this.logger.log(`创建角色成功: ${role.name}`);

    return this.toRoleVo(role);
  }

  /**
   * 根据 ID 查询角色
   */
  async findById(id: number): Promise<RoleVo> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      BusinessError.notFound('角色不存在');
    }
    return this.toRoleVo(role);
  }

  /**
   * 分页查询角色列表
   */
  async findAll(queryRoleDto: QueryRoleDto) {
    const { name, code, status, page, pageSize } = queryRoleDto;

    // 构建查询条件
    const where: Prisma.RoleWhereInput = {};

    if (name) {
      where.name = { contains: name };
    }

    if (code) {
      where.code = { contains: code };
    }

    if (status !== undefined) {
      where.status = status;
    }

    // 查询数据
    const [roles, total] = await Promise.all([
      this.roleRepository.findMany({
        where,
        skip: (page! - 1) * pageSize!,
        take: pageSize!,
        orderBy: { createdAt: 'desc' },
      }),
      this.roleRepository.count(where),
    ]);

    return {
      list: roles.map((role) => this.toRoleVo(role)),
      total,
      page: page!,
      pageSize: pageSize!,
      totalPages: Math.ceil(total / pageSize!),
    };
  }

  /**
   * 更新角色
   */
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleVo> {
    // 检查角色是否存在
    const role = await this.roleRepository.findById(id);
    if (!role) {
      BusinessError.notFound('角色不存在');
    }

    // 如果更新角色名称，检查是否已被其他角色使用
    if (updateRoleDto.name) {
      const existingName = await this.roleRepository.findByName(
        updateRoleDto.name,
      );
      if (existingName && existingName.id !== id) {
        BusinessError.conflict('角色名称已被其他角色使用');
      }
    }

    // 如果更新角色编码，检查是否已被其他角色使用
    if (updateRoleDto.code) {
      const existingCode = await this.roleRepository.findByCode(
        updateRoleDto.code,
      );
      if (existingCode && existingCode.id !== id) {
        BusinessError.conflict('角色编码已被其他角色使用');
      }
    }

    // 更新角色
    const updatedRole = await this.roleRepository.update(id, updateRoleDto);

    this.logger.log(`更新角色成功: ${updatedRole.name}`);

    return this.toRoleVo(updatedRole);
  }

  /**
   * 删除角色
   */
  async remove(id: number): Promise<void> {
    // 检查角色是否存在
    const role = await this.roleRepository.findById(id);
    if (!role) {
      BusinessError.notFound('角色不存在');
    }

    await this.roleRepository.delete(id);

    this.logger.log(`删除角色成功: ${role.name}`);
  }

  /**
   * 为角色分配权限
   */
  async assignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    // 检查角色是否存在
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      BusinessError.notFound('角色不存在');
    }

    // 删除原有权限关联
    await this.roleRepository.deletePermissions(roleId);

    // 添加新的权限关联
    if (permissionIds && permissionIds.length > 0) {
      await this.roleRepository.assignPermissions(roleId, permissionIds);
    }

    this.logger.log(
      `为角色 ${role.name} 分配了 ${permissionIds.length} 个权限`,
    );
  }

  /**
   * 获取角色的权限列表
   */
  async getPermissions(roleId: number) {
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      BusinessError.notFound('角色不存在');
    }

    return this.roleRepository.getPermissions(roleId);
  }

  /**
   * 转换为 RoleVo
   */
  private toRoleVo(role: Role): RoleVo {
    return role as RoleVo;
  }
}
