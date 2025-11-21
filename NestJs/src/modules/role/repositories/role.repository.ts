import { Injectable } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/repositories/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * Role Repository
 * 负责角色数据库操作
 */
@Injectable()
export class RoleRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 创建角色
   */
  async create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  /**
   * 根据 ID 查询角色
   */
  async findById(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  /**
   * 根据角色名称查询角色
   */
  async findByName(name: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { name },
    });
  }

  /**
   * 根据角色编码查询角色
   */
  async findByCode(code: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { code },
    });
  }

  /**
   * 分页查询角色列表
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /**
   * 统计角色数量
   */
  async count(where?: Prisma.RoleWhereInput): Promise<number> {
    return this.prisma.role.count({ where });
  }

  /**
   * 更新角色
   */
  async update(id: number, data: Prisma.RoleUpdateInput): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  /**
   * 删除角色
   */
  async delete(id: number): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
