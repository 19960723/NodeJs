import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticleRepository } from './repositories/article.repository';
import { CategoryRepository } from '../category/repositories/category.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { ArticleVo } from './dto/article.vo';
import { BusinessError } from '../../common/exceptions/business.exception';

/**
 * Article Service
 * 处理文章相关业务逻辑
 */
@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  /**
   * 创建文章
   */
  async create(
    authorId: number,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleVo> {
    const { slug, categoryId } = createArticleDto;

    // 检查文章标识是否已存在
    const existingSlug = await this.articleRepository.findBySlug(slug);
    if (existingSlug) {
      BusinessError.conflict('文章标识已存在');
    }

    // 检查分类是否存在
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      BusinessError.notFound('分类不存在');
    }

    // 创建文章
    const article = await this.articleRepository.create({
      ...createArticleDto,
      author: {
        connect: { id: authorId },
      },
      category: {
        connect: { id: categoryId },
      },
    });

    this.logger.log(`创建文章成功: ${article.title}`);

    return this.toArticleVo(article);
  }

  /**
   * 根据 ID 查询文章
   */
  async findById(id: number, includeRelations = true): Promise<ArticleVo> {
    const article = await this.articleRepository.findById(id, includeRelations);
    if (!article) {
      BusinessError.notFound('文章不存在');
    }

    // 增加浏览次数
    await this.articleRepository.incrementViewCount(id);

    return this.toArticleVo(article);
  }

  /**
   * 根据标识查询文章
   */
  async findBySlug(slug: string, includeRelations = true): Promise<ArticleVo> {
    const article = await this.articleRepository.findBySlug(
      slug,
      includeRelations,
    );
    if (!article) {
      BusinessError.notFound('文章不存在');
    }

    // 增加浏览次数
    await this.articleRepository.incrementViewCount(article.id);

    return this.toArticleVo(article);
  }

  /**
   * 分页查询文章列表
   */
  async findAll(queryArticleDto: QueryArticleDto, includeRelations = true) {
    const { title, authorId, categoryId, status, page, pageSize } =
      queryArticleDto;

    // 构建查询条件
    const where: Prisma.ArticleWhereInput = {};

    if (title) {
      where.title = { contains: title };
    }

    if (authorId !== undefined) {
      where.authorId = authorId;
    }

    if (categoryId !== undefined) {
      where.categoryId = categoryId;
    }

    if (status !== undefined) {
      where.status = status;
    }

    // 查询数据
    const [articles, total] = await Promise.all([
      this.articleRepository.findMany({
        where,
        skip: (page! - 1) * pageSize!,
        take: pageSize!,
        orderBy: { createdAt: 'desc' },
        includeRelations,
      }),
      this.articleRepository.count(where),
    ]);

    return {
      list: articles.map((article) => this.toArticleVo(article)),
      total,
      page: page!,
      pageSize: pageSize!,
      totalPages: Math.ceil(total / pageSize!),
    };
  }

  /**
   * 更新文章
   */
  async update(
    id: number,
    authorId: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleVo> {
    // 检查文章是否存在
    const article = await this.articleRepository.findById(id);
    if (!article) {
      BusinessError.notFound('文章不存在');
    }

    // 检查是否是文章作者
    if (article.authorId !== authorId) {
      BusinessError.forbidden('只能修改自己的文章');
    }

    // 如果更新文章标识，检查是否已被其他文章使用
    if (updateArticleDto.slug) {
      const existingSlug = await this.articleRepository.findBySlug(
        updateArticleDto.slug,
      );
      if (existingSlug && existingSlug.id !== id) {
        BusinessError.conflict('文章标识已被其他文章使用');
      }
    }

    // 如果更新分类，检查分类是否存在
    if (updateArticleDto.categoryId) {
      const category = await this.categoryRepository.findById(
        updateArticleDto.categoryId,
      );
      if (!category) {
        BusinessError.notFound('分类不存在');
      }
    }

    // 更新文章
    const updatedArticle = await this.articleRepository.update(
      id,
      updateArticleDto,
    );

    this.logger.log(`更新文章成功: ${updatedArticle.title}`);

    return this.toArticleVo(updatedArticle);
  }

  /**
   * 删除文章
   */
  async remove(id: number, authorId: number): Promise<void> {
    // 检查文章是否存在
    const article = await this.articleRepository.findById(id);
    if (!article) {
      BusinessError.notFound('文章不存在');
    }

    // 检查是否是文章作者
    if (article.authorId !== authorId) {
      BusinessError.forbidden('只能删除自己的文章');
    }

    await this.articleRepository.delete(id);

    this.logger.log(`删除文章成功: ${article.title}`);
  }

  /**
   * 点赞文章
   */
  async like(id: number): Promise<ArticleVo> {
    // 检查文章是否存在
    const article = await this.articleRepository.findById(id);
    if (!article) {
      BusinessError.notFound('文章不存在');
    }

    // 增加点赞次数
    const updatedArticle = await this.articleRepository.incrementLikeCount(id);

    return this.toArticleVo(updatedArticle);
  }

  /**
   * 转换为 ArticleVo
   */
  private toArticleVo(article: any): ArticleVo {
    return article as ArticleVo;
  }
}
