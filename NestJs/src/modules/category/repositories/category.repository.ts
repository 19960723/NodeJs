import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/repositories/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * Category Repository
 * 负责分类数据库操作
 */
@Injectable()
export class CategoryRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 创建分类
   */
  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  /**
   * 根据 ID 查询分类
   */
  async findById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  /**
   * 根据名称查询分类
   */
  async findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { name },
    });
  }

  /**
   * 根据标识查询分类
   */
  async findBySlug(slug: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { slug },
    });
  }

  /**
   * 分页查询分类列表
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /**
   * 统计分类数量
   */
  async count(where?: Prisma.CategoryWhereInput): Promise<number> {
    return this.prisma.category.count({ where });
  }

  /**
   * 更新分类
   */
  async update(
    id: number,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  /**
   * 删除分类
   */
  async delete(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
