import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PermissionRepository } from './repositories/permission.repository';
import {
  CreatePermissionDto,
  PermissionType,
} from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PermissionVo, UserPermissionsVo } from './dto/permission.vo';
import { BusinessError } from '../../common/exceptions/business.exception';
import { RedisService } from '../../common/redis/redis.service';

/**
 * Permission Service
 */
@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);
  private readonly TREE_CACHE_KEY = 'permission:tree:all';
  // 移除用户菜单缓存前缀，改为实时计算
  // private readonly USER_MENU_PREFIX = 'permission:menu:user:';

  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 创建权限（动态管理）
   *
   * @note Prisma 客户端类型与 schema 不匹配，需要重新运行 `npx prisma generate`
   */
  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionVo> {
    const { perms, name } = createPermissionDto;

    // 检查代码是否已存在（如果有perms）
    if (perms) {
      const existingCode = await this.permissionRepository.findByCode(perms);
      if (existingCode) {
        BusinessError.conflict('权限代码已存在');
      }
    }

    // 构建 Prisma 创建输入
    const createData: any = {
      name: createPermissionDto.name || createPermissionDto.title,
      perms: createPermissionDto.perms,
      type: createPermissionDto.type,
      title: createPermissionDto.title,
      icon: createPermissionDto.icon,
      path: createPermissionDto.path,
      component: createPermissionDto.component,
      redirect: createPermissionDto.redirect,
      visible: createPermissionDto.visible ?? true,
      keepAlive: createPermissionDto.keepAlive ?? false,
      description: createPermissionDto.description,
      metadata: createPermissionDto.metadata,
      sort: createPermissionDto.sort ?? 0,
    };

    // 如果有父权限ID，添加关联
    if (createPermissionDto.parentId) {
      createData.parentId = createPermissionDto.parentId;
    }

    // 创建权限
    const permission = await this.permissionRepository.create(createData);

    // 清除缓存
    await this.clearCache();

    this.logger.log(`创建权限成功: ${name}`);
    return this.toPermissionVo(permission);
  }

  /**
   * 获取权限树（用于前端渲染菜单）
   */
  async getTree(): Promise<PermissionVo[]> {
    const allPermissions = await this.getAllPermissions();
    return this.buildTree(allPermissions);
  }

  /**
   * 获取用户菜单树（只返回 type=1,2 且 visible=true）
   * @note 改为实时计算，不再缓存用户级菜单，避免缓存一致性问题
   */
  async getUserMenuTree(userId: number): Promise<PermissionVo[]> {
    // 1. 获取所有权限（优先查缓存）
    const allPermissions = await this.getAllPermissions();

    // 2. 获取用户拥有的权限 ID
    const userPermissionIds = await this.getUserPermissionIds(userId);
    // 3. 过滤出用户可访问的菜单
    const menuPermissions = allPermissions.filter(
      (p) =>
        userPermissionIds.has(p.id) &&
        (p.type === PermissionType.DIRECTORY ||
          p.type === PermissionType.MENU) &&
        p.visible &&
        p.status === 1,
    );

    // 4. 构建树
    return this.buildTree(menuPermissions);
  }

  /**
   * 获取当前用户的权限信息（包含权限代码列表和菜单树）
   */
  async getUserPermissions(userId: number): Promise<UserPermissionsVo> {
    // 1. 获取所有权限（优先查缓存）
    const allPermissions = await this.getAllPermissions();

    // 2. 获取用户拥有的权限 ID
    const userPermissionIds = await this.getUserPermissionIds(userId);

    // 3. 过滤出用户可访问的权限
    const userPermissions = allPermissions.filter(
      (p) => userPermissionIds.has(p.id) && p.status === 1,
    );

    // 4. 提取权限代码
    const permissions: string[] = userPermissions
      .filter((p) => p.perms)
      .map((p) => p.perms!);

    // 5. 过滤菜单并构建树
    const menuPermissions = userPermissions.filter(
      (p) =>
        (p.type === PermissionType.DIRECTORY ||
          p.type === PermissionType.MENU) &&
        p.visible,
    );
    const menus = this.buildTree(menuPermissions);

    return {
      permissions,
      menus,
    };
  }

  /**
   * 获取所有权限（带缓存）
   */
  private async getAllPermissions(): Promise<PermissionVo[]> {
    // 尝试从缓存获取
    const cachedTree = await this.redisService.getJSON<PermissionVo[]>(
      this.TREE_CACHE_KEY,
    );
    if (cachedTree) {
      return cachedTree;
    }

    // 查库
    const permissions = await this.permissionRepository.findMany({
      where: { status: 1 },
      orderBy: { sort: 'asc' }, // 可以在数据库层面排序
    });

    // 转换 VO
    const permissionVos = permissions.map((p) => this.toPermissionVo(p));

    // 写入缓存 (1小时)
    await this.redisService.setJSON(this.TREE_CACHE_KEY, permissionVos, 3600);

    return permissionVos;
  }

  /**
   * 获取用户拥有的所有权限 ID
   */
  private async getUserPermissionIds(userId: number): Promise<Set<number>> {
    const permissions = await this.permissionRepository.findByUserId(userId);
    return new Set(permissions.map((p) => p.id));
  }

  /**
   * 构建树形结构
   * @note 输入已经是 VO 列表，不需要再次转换
   */
  private buildTree(
    permissions: PermissionVo[],
    parentId: number | null = null,
  ): PermissionVo[] {
    return permissions
      .filter((p) => p.parentId === parentId)
      .map((p) => ({
        ...p,
        children: this.buildTree(permissions, p.id),
      }))
      .sort((a, b) => a.sort - b.sort);
  }

  /**
   * 转换为 VO
   */
  private toPermissionVo(permission: any): PermissionVo {
    return {
      ...permission,
      meta: {
        title: permission.title,
        icon: permission.icon,
        visible: permission.visible,
        keepAlive: permission.keepAlive,
        metadata: permission.metadata,
      },
    };
  }

  /**
   * 根据 ID 查询权限
   */
  async findById(id: number): Promise<PermissionVo> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      BusinessError.notFound('权限不存在');
    }
    return this.toPermissionVo(permission);
  }

  /**
   * 分页查询权限列表
   */
  async findAll(queryPermissionDto: QueryPermissionDto) {
    const { name, perms, status, page, pageSize } = queryPermissionDto;

    // 构建查询条件
    const where: Prisma.PermissionWhereInput = {};

    if (name) {
      where.name = { contains: name };
    }

    if (perms) {
      where.perms = { contains: perms };
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
      list: permissions.map((p) => this.toPermissionVo(p)),
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
    if (updatePermissionDto.perms) {
      const existingCode = await this.permissionRepository.findByCode(
        updatePermissionDto.perms,
      );
      if (existingCode && existingCode.id !== id) {
        BusinessError.conflict('权限代码已被其他权限使用');
      }
    }

    // 更新权限
    const updatedPermission = await this.permissionRepository.update(
      id,
      updatePermissionDto as Prisma.PermissionUpdateInput,
    );

    // 清除缓存
    await this.clearCache();

    this.logger.log(`更新权限成功: ${updatedPermission.name}`);
    return this.toPermissionVo(updatedPermission);
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

    // 清除缓存
    await this.clearCache();

    this.logger.log(`删除权限成功: ${permission.name}`);
  }

  /**
   * 清除权限相关缓存（公开方法，供控制器调用）
   */
  async refreshCache(): Promise<void> {
    await this.clearCache();
  }

  /**
   * 清除权限相关缓存
   */
  private async clearCache(): Promise<void> {
    // 仅需清除全局权限树缓存
    // 用户菜单因为是实时计算的（基于全量权限 + 用户角色ID），所以无需清理
    await this.redisService.del(this.TREE_CACHE_KEY);
  }
}
