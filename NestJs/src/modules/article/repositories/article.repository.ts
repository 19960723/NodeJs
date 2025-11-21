import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/repositories/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

/**
 * Article Repository
 * 负责文章数据库操作
 */
@Injectable()
export class ArticleRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 创建文章
   */
  async create(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({ data });
  }

  /**
   * 根据 ID 查询文章
   */
  async findById(
    id: number,
    includeRelations = false,
  ): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
      include: includeRelations
        ? {
            author: {
              select: {
                id: true,
                username: true,
                nickname: true,
                avatar: true,
                email: true,
                status: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            category: true,
          }
        : undefined,
    });
  }

  /**
   * 根据标识查询文章
   */
  async findBySlug(
    slug: string,
    includeRelations = false,
  ): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { slug },
      include: includeRelations
        ? {
            author: {
              select: {
                id: true,
                username: true,
                nickname: true,
                avatar: true,
                email: true,
                status: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            category: true,
          }
        : undefined,
    });
  }

  /**
   * 分页查询文章列表
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput;
    includeRelations?: boolean;
  }): Promise<Article[]> {
    const { skip, take, where, orderBy, includeRelations = false } = params;
    return this.prisma.article.findMany({
      skip,
      take,
      where,
      orderBy,
      include: includeRelations
        ? {
            author: {
              select: {
                id: true,
                username: true,
                nickname: true,
                avatar: true,
                email: true,
                status: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            category: true,
          }
        : undefined,
    });
  }

  /**
   * 统计文章数量
   */
  async count(where?: Prisma.ArticleWhereInput): Promise<number> {
    return this.prisma.article.count({ where });
  }

  /**
   * 更新文章
   */
  async update(id: number, data: Prisma.ArticleUpdateInput): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  /**
   * 删除文章
   */
  async delete(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: { id },
    });
  }

  /**
   * 增加浏览次数
   */
  async incrementViewCount(id: number): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  /**
   * 增加点赞次数
   */
  async incrementLikeCount(id: number): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });
  }
}
