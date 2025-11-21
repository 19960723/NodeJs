import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PermissionRepository } from './repositories/permission.repository';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PermissionVo } from './dto/permission.vo';
import { BusinessError } from '../../common/exceptions/business.exception';

/**
 * Permission Service
 */
@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);

  constructor(private readonly permissionRepository: PermissionRepository) {}

  /**
   * 创建权限
   */
  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionVo> {
    const { code, name } = createPermissionDto;

    // 检查代码是否已存在
    const existingCode = await this.permissionRepository.findByCode(code);
    if (existingCode) {
      BusinessError.conflict('权限代码已存在');
    }

    // 创建权限
    const permission =
      await this.permissionRepository.create(createPermissionDto);

    this.logger.log(`创建权限成功: ${name}`);
    return permission as PermissionVo;
  }

  /**
   * 根据 ID 查询权限
   */
  async findById(id: number): Promise<PermissionVo> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      BusinessError.notFound('权限不存在');
    }
    return permission as PermissionVo;
  }

  /**
   * 分页查询权限列表
   */
  async findAll(queryPermissionDto: QueryPermissionDto) {
    const { name, code, resource, action, status, page, pageSize } =
      queryPermissionDto;

    // 构建查询条件
    const where: Prisma.PermissionWhereInput = {};

    if (name) {
      where.name = { contains: name };
    }

    if (code) {
      where.code = { contains: code };
    }

    if (resource) {
      where.resource = resource;
    }

    if (action) {
      where.action = action;
    }

    if (status !== undefined) {
      where.status = status;
    }

    // 查询数据
    const [permissions, total] = await Promise.all([
      this.permissionRepository.findMany({
        where,
        skip: (page! - 1) * pageSize!,
        take: pageSize!,
        orderBy: { createdAt: 'desc' },
      }),
      this.permissionRepository.count(where),
    ]);

    return {
      list: permissions as PermissionVo[],
      total,
      page: page!,
      pageSize: pageSize!,
      totalPages: Math.ceil(total / pageSize!),
    };
  }

  /**
   * 更新权限
   */
  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionVo> {
    // 检查权限是否存在
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      BusinessError.notFound('权限不存在');
    }

    // 如果更新代码，检查是否已被其他权限使用
    if (updatePermissionDto.code) {
      const existingCode = await this.permissionRepository.findByCode(
        updatePermissionDto.code,
      );
      if (existingCode && existingCode.id !== id) {
        BusinessError.conflict('权限代码已被其他权限使用');
      }
    }

    // 更新权限
    const updatedPermission = await this.permissionRepository.update(
      id,
      updatePermissionDto,
    );

    this.logger.log(`更新权限成功: ${updatedPermission.name}`);
    return updatedPermission as PermissionVo;
  }

  /**
   * 删除权限
   */
  async remove(id: number): Promise<void> {
    // 检查权限是否存在
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      BusinessError.notFound('权限不存在');
    }

    await this.permissionRepository.delete(id);
    this.logger.log(`删除权限成功: ${permission.name}`);
  }

  /**
   * 根据资源查询权限
   */
  async findByResource(resource: string): Promise<PermissionVo[]> {
    const permissions =
      await this.permissionRepository.findByResource(resource);
    return permissions as PermissionVo[];
  }
}
