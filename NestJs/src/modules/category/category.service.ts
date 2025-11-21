import { Injectable, Logger } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { CategoryVo } from './dto/category.vo';
import { BusinessError } from '../../common/exceptions/business.exception';

/**
 * Category Service
 * 处理分类相关业务逻辑
 */
@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}

  /**
   * 创建分类
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryVo> {
    const { name, slug, parentId } = createCategoryDto;

    // 检查分类名称是否已存在
    const existingName = await this.categoryRepository.findByName(name);
    if (existingName) {
      BusinessError.conflict('分类名称已存在');
    }

    // 检查分类标识是否已存在
    const existingSlug = await this.categoryRepository.findBySlug(slug);
    if (existingSlug) {
      BusinessError.conflict('分类标识已存在');
    }

    // 如果有父分类，检查父分类是否存在
    if (parentId) {
      const parentCategory = await this.categoryRepository.findById(parentId);
      if (!parentCategory) {
        BusinessError.notFound('父分类不存在');
      }
    }

    // 创建分类
    const category = await this.categoryRepository.create(createCategoryDto);

    this.logger.log(`创建分类成功: ${category.name}`);

    return this.toCategoryVo(category);
  }

  /**
   * 根据 ID 查询分类
   */
  async findById(id: number): Promise<CategoryVo> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      BusinessError.notFound('分类不存在');
    }
    return this.toCategoryVo(category);
  }

  /**
   * 分页查询分类列表
   */
  async findAll(queryCategoryDto: QueryCategoryDto) {
    const { name, slug, parentId, status, page, pageSize } = queryCategoryDto;

    // 构建查询条件
    const where: Prisma.CategoryWhereInput = {};

    if (name) {
      where.name = { contains: name };
    }

    if (slug) {
      where.slug = slug;
    }

    if (parentId !== undefined) {
      where.parentId = parentId;
    }

    if (status !== undefined) {
      where.status = status;
    }

    // 查询数据
    const [categories, total] = await Promise.all([
      this.categoryRepository.findMany({
        where,
        skip: (page! - 1) * pageSize!,
        take: pageSize!,
        orderBy: { sort: 'asc' },
      }),
      this.categoryRepository.count(where),
    ]);

    return {
      list: categories.map((category) => this.toCategoryVo(category)),
      total,
      page: page!,
      pageSize: pageSize!,
      totalPages: Math.ceil(total / pageSize!),
    };
  }

  /**
   * 更新分类
   */
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryVo> {
    // 检查分类是否存在
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      BusinessError.notFound('分类不存在');
    }

    // 如果更新分类名称，检查是否已被其他分类使用
    if (updateCategoryDto.name) {
      const existingName = await this.categoryRepository.findByName(
        updateCategoryDto.name,
      );
      if (existingName && existingName.id !== id) {
        BusinessError.conflict('分类名称已被其他分类使用');
      }
    }

    // 如果更新分类标识，检查是否已被其他分类使用
    if (updateCategoryDto.slug) {
      const existingSlug = await this.categoryRepository.findBySlug(
        updateCategoryDto.slug,
      );
      if (existingSlug && existingSlug.id !== id) {
        BusinessError.conflict('分类标识已被其他分类使用');
      }
    }

    // 如果更新父分类，检查父分类是否存在且不能是自己
    if (updateCategoryDto.parentId !== undefined) {
      if (updateCategoryDto.parentId === id) {
        BusinessError.badRequest('父分类不能是自己');
      }

      if (updateCategoryDto.parentId) {
        const parentCategory = await this.categoryRepository.findById(
          updateCategoryDto.parentId,
        );
        if (!parentCategory) {
          BusinessError.notFound('父分类不存在');
        }
      }
    }

    // 更新分类
    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );

    this.logger.log(`更新分类成功: ${updatedCategory.name}`);

    return this.toCategoryVo(updatedCategory);
  }

  /**
   * 删除分类
   */
  async remove(id: number): Promise<void> {
    // 检查分类是否存在
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      BusinessError.notFound('分类不存在');
    }

    // 检查是否有子分类
    const childCount = await this.categoryRepository.count({
      parentId: id,
    });

    if (childCount > 0) {
      BusinessError.badRequest('该分类下存在子分类，无法删除');
    }

    await this.categoryRepository.delete(id);

    this.logger.log(`删除分类成功: ${category.name}`);
  }

  /**
   * 转换为 CategoryVo
   */
  private toCategoryVo(category: Category): CategoryVo {
    return category as CategoryVo;
  }
}
