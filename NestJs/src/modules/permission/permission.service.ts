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
  private readonly USER_MENU_PREFIX = 'permission:menu:user:';

  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 创建权限（动态管理）
   *
   * @note Prisma 客户端类型与 schema 不匹配，需要重新运行 `npx prisma generate`
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
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
      name: createPermissionDto.name,
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
    return permission as unknown as PermissionVo;
  }

  /**
   * 获取权限树（用于前端渲染菜单）
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  async getTree(): Promise<PermissionVo[]> {
    // 尝试从缓存获取
    const cachedTree = await this.redisService.getJSON<PermissionVo[]>(
      this.TREE_CACHE_KEY,
    );
    if (cachedTree) {
      return cachedTree;
    }

    const permissions = await this.permissionRepository.findMany({
      where: { status: 1 },
      orderBy: { id: 'asc' } as any,
    });

    const tree = this.buildTree(permissions as unknown as PermissionVo[]);

    // 写入缓存 (1小时)
    await this.redisService.setJSON(this.TREE_CACHE_KEY, tree, 3600);

    return tree;
  }

  /**
   * 获取用户菜单树（只返回 type=1,2 且 visible=true）
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  async getUserMenuTree(userId: number): Promise<PermissionVo[]> {
    const cacheKey = `${this.USER_MENU_PREFIX}${userId}`;
    const cachedMenu =
      await this.redisService.getJSON<PermissionVo[]>(cacheKey);

    if (cachedMenu) {
      return cachedMenu;
    }

    // 获取用户所有权限
    const permissions: any =
      await this.permissionRepository.findByUserId(userId);

    // 过滤菜单类型
    const menuPermissions: any = permissions.filter(
      (p: any) =>
        (p.type === PermissionType.DIRECTORY ||
          p.type === PermissionType.MENU) &&
        p.visible &&
        p.status === 1,
    );

    const menuTree = this.buildTree(
      menuPermissions as unknown as PermissionVo[],
    );

    // 写入缓存 (1小时)
    await this.redisService.setJSON(cacheKey, menuTree, 3600);

    return menuTree;
  }

  /**
   * 获取当前用户的权限信息（包含权限代码列表和菜单树）
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  async getUserPermissions(userId: number): Promise<UserPermissionsVo> {
    // 获取用户所有权限
    const allPermissions: any =
      await this.permissionRepository.findByUserId(userId);

    // 提取所有权限代码（过滤掉空的 perms）
    const permissions: string[] = allPermissions
      .filter((p: any) => p.perms && p.status === 1)
      .map((p: any) => p.perms);

    // 过滤菜单类型（type=1,2 且 visible=true）
    const menuPermissions: any = allPermissions.filter(
      (p: any) =>
        (p.type === PermissionType.DIRECTORY ||
          p.type === PermissionType.MENU) &&
        p.visible &&
        p.status === 1,
    );

    // 构建菜单树
    const menus = this.buildTree(menuPermissions as unknown as PermissionVo[]);

    return {
      permissions,
      menus,
    };
  }

  /**
   * 构建树形结构
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
   * 根据 ID 查询权限
   */
  async findById(id: number): Promise<PermissionVo> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      BusinessError.notFound('权限不存在');
    }
    return permission as unknown as PermissionVo;
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
      list: permissions as unknown as PermissionVo[],
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
    return updatedPermission as unknown as PermissionVo;
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
   * 清除权限相关缓存
   */
  private async clearCache(): Promise<void> {
    // 清除全局权限树缓存
    await this.redisService.del(this.TREE_CACHE_KEY);

    // 清除所有用户的菜单缓存（因为无法确定影响了哪些用户，简单起见全部清除）
    // 生产环境如果用户量大，可以使用 scan 扫描删除，或者只删除受影响角色的用户缓存
    const userMenuKeys = await this.redisService.keys(
      `${this.USER_MENU_PREFIX}*`,
    );
    if (userMenuKeys.length > 0) {
      await Promise.all(userMenuKeys.map((key) => this.redisService.del(key)));
    }
  }
}
