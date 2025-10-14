import {
  Model,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  ModelCtor
} from 'sequelize';
import { IRepository } from '../types';

/**
 * 基础仓储类 - 提供通用的CRUD操作
 */
export abstract class BaseRepository<T extends Model>
  implements IRepository<T>
{
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  /**
   * 查找所有记录
   */
  async findAll(
    options: FindOptions = {}
  ): Promise<{ rows: T[]; count: number }> {
    return (await this.model.findAndCountAll(options)) as {
      rows: T[];
      count: number;
    };
  }

  /**
   * 根据ID查找记录
   */
  async findById(id: number): Promise<T | null> {
    return (await this.model.findByPk(id)) as T | null;
  }

  /**
   * 创建新记录
   */
  async create(data: any, options?: CreateOptions): Promise<T> {
    return (await this.model.create(data, options)) as T;
  }

  /**
   * 更新记录
   */
  async update(id: number, data: any, options?: UpdateOptions): Promise<T> {
    const [affectedCount] = await this.model.update(data, {
      where: { id },
      ...options
    });

    if (affectedCount === 0) {
      throw new Error('Record not found');
    }

    return (await this.findById(id)) as T;
  }

  /**
   * 删除记录
   */
  async delete(id: number, options?: DestroyOptions): Promise<boolean> {
    const deletedCount = await this.model.destroy({
      where: { id },
      ...options
    });

    return deletedCount > 0;
  }

  /**
   * 软删除记录
   */
  async softDelete(id: number): Promise<boolean> {
    return (await this.update(id, { deleted_at: new Date() })) !== null;
  }

  /**
   * 恢复软删除的记录
   */
  async restore(id: number): Promise<boolean> {
    return (await this.update(id, { deleted_at: null })) !== null;
  }
}
