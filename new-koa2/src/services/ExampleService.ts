import { ExampleRepository } from '../repositories/ExampleRepository';
import { BaseService } from './BaseService';
import { PaginationQuery, BusinessError } from '../types';
import { ExampleInstance } from '../models/Example';

interface CreateExampleDto {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
}

interface UpdateExampleDto {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

/**
 * 示例业务服务
 */
export class ExampleService extends BaseService<
  ExampleInstance,
  CreateExampleDto,
  UpdateExampleDto
> {
  private repository: ExampleRepository;

  constructor() {
    super();
    this.repository = new ExampleRepository();
  }

  /**
   * 获取所有示例（分页）
   */
  async findAll(query: PaginationQuery = {}) {
    try {
      const validatedQuery = this.validatePagination(query);
      const result = await this.repository.findWithPagination(validatedQuery);
      const pagination = this.calculatePagination(
        validatedQuery.page!,
        validatedQuery.pageSize!,
        result.count
      );

      return {
        list: result.rows,
        pagination
      };
    } catch (error) {
      this.handleBusinessError(error, '获取示例列表失败');
    }
  }

  /**
   * 根据ID获取示例
   */
  async findById(id: number) {
    try {
      const validatedId = this.validateId(id);
      const example = await this.repository.findById(validatedId);

      // 按照RESTful标准，查询不到数据应该返回null，而不是抛出404错误
      // 404应该用于资源路径不存在的情况
      return example;
    } catch (error) {
      this.handleBusinessError(error, '获取示例详情失败');
    }
  }

  /**
   * 创建示例
   */
  async create(data: CreateExampleDto) {
    try {
      // 业务验证
      if (!data.name || data.name.trim().length === 0) {
        throw new BusinessError(400, '示例名称不能为空');
      }

      if (data.name.length > 100) {
        throw new BusinessError(400, '示例名称不能超过100个字符');
      }
      console.log(this.repository, '==');
      // 检查名称是否已存在
      const existingExample = await this.repository.searchByName(data.name);
      if (existingExample.length > 0) {
        throw new BusinessError(409, '示例名称已存在');
      }
      console.log(existingExample, '==');
      return await this.repository.create({
        name: data.name.trim(),
        description: data.description?.trim(),
        status: data.status || 'active'
      });
    } catch (error) {
      this.handleBusinessError(error, '创建示例失败');
    }
  }

  /**
   * 更新示例
   */
  async update(id: number, data: UpdateExampleDto) {
    try {
      const validatedId = this.validateId(id);

      // 检查示例是否存在
      const existingExample = await this.repository.findById(validatedId);
      if (!existingExample) {
        return null; // 返回null，让控制器层处理404
      }

      // 业务验证
      if (data.name !== undefined) {
        if (!data.name || data.name.trim().length === 0) {
          throw new BusinessError(400, '示例名称不能为空');
        }
        if (data.name.length > 100) {
          throw new BusinessError(400, '示例名称不能超过100个字符');
        }
      }

      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name.trim();
      if (data.description !== undefined)
        updateData.description = data.description?.trim();
      if (data.status !== undefined) updateData.status = data.status;

      return await this.repository.update(validatedId, updateData);
    } catch (error) {
      this.handleBusinessError(error, '更新示例失败');
    }
  }

  /**
   * 删除示例
   */
  async delete(id: number) {
    try {
      console.log(id, '111');
      const validatedId = this.validateId(id);

      const existingExample = await this.repository.findById(validatedId);
      if (!existingExample) {
        return null; // 返回null，让控制器层处理404
      }

      return await this.repository.delete(validatedId);
    } catch (error) {
      this.handleBusinessError(error, '删除示例失败');
    }
  }

  /**
   * 根据状态获取示例
   */
  async findByStatus(status: 'active' | 'inactive') {
    try {
      return await this.repository.findByStatus(status);
    } catch (error) {
      this.handleBusinessError(error, '根据状态获取示例失败');
    }
  }
}
