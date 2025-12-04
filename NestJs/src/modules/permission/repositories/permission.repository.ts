import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PrismaService } from '../../../common/repositories/prisma.service';

/**
 * Permission Repository
 */
@Injectable()
export class PermissionRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 创建权限
   */
  async create(data: Prisma.PermissionCreateInput) {
    return this.prisma.permission.create({ data });
  }

  /**
   * 根据 ID 查询权限
   */
  async findById(id: number) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  /**
   * 根据代码查询权限
   */
  async findByCode(perms: string) {
    return this.prisma.permission.findUnique({ where: { perms } });
  }

  /**
   * 分页查询权限列表
   */
  async findMany(params: {
    where?: Prisma.PermissionWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.PermissionOrderByWithRelationInput;
  }) {
    return this.prisma.permission.findMany(params);
  }

  /**
   * 统计权限数量
   */
  async count(where?: Prisma.PermissionWhereInput) {
    return this.prisma.permission.count({ where });
  }

  /**
   * 更新权限
   */
  async update(id: number, data: Prisma.PermissionUpdateInput) {
    return this.prisma.permission.update({
      where: { id },
      data,
    });
  }

  /**
   * 删除权限
   */
  async delete(id: number) {
    return this.prisma.permission.delete({ where: { id } });
  }

  /**
   * 批量创建权限
   */
  async createMany(data: Prisma.PermissionCreateManyInput[]) {
    return this.prisma.permission.createMany({
      data,
      skipDuplicates: true,
    });
  }

  /**
   * 根据用户ID获取权限列表
   */
  async findByUserId(userId: number) {
    return this.prisma.permission.findMany({
      where: {
        roles: {
          some: {
            role: {
              users: {
                some: { userId },
              },
              status: 1,
            },
          },
        },
        status: 1,
      },
      orderBy: [{ sort: 'asc' }, { id: 'asc' }],
    });
  }
}
