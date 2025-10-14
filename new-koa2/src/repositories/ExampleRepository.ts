import { Example, ExampleInstance } from '../models/Example';
import { BaseRepository } from './BaseRepository';
import { PaginationQuery } from '../types';
const { sequelize } = require('../config/database');
import { Op } from 'sequelize';

/**
 * 示例数据仓储
 */
export class ExampleRepository extends BaseRepository<ExampleInstance> {
  constructor() {
    super(Example(sequelize));
  }

  /**
   * 根据状态查找示例
   */
  async findByStatus(
    status: 'active' | 'inactive'
  ): Promise<ExampleInstance[]> {
    return (await this.model.findAll({
      where: { status }
    })) as ExampleInstance[];
  }

  /**
   * 分页查询示例
   */
  async findWithPagination(query: PaginationQuery) {
    const {
      page = 1,
      pageSize = 10,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = query;

    const offset = (page - 1) * pageSize;
    return await this.findAll({
      limit: pageSize,
      offset,
      order: [[sortBy, sortOrder]],
      where: {
        deleted_at: null // 排除软删除的记录
      }
    });
  }

  /**
   * 根据名称搜索
   */
  async searchByName(name: string): Promise<ExampleInstance[]> {
    return (await this.model.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })) as ExampleInstance[];
  }
}
