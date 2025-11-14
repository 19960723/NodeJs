import models from '../models';
import { BaseService } from './BaseService';
import { Op } from 'sequelize';
import { BusinessError } from '../types';

export class SysService extends BaseService<any> {
  async getDictList(query: {
    page?: number;
    pageSize?: number;
    status?: number;
    keyword?: string;
  }): Promise<any> {
    const { page = 1, pageSize = 10, status, keyword } = query;

    // 构建查询条件
    const where: any = {};

    // 状态筛选
    if (status !== undefined) {
      where.status = status;
    }

    // 关键词搜索（名称、代码、描述）
    if (keyword?.trim()) {
      where[Op.or] = [
        { name: { [Op.like]: `%${keyword.trim()}%` } },
        { code: { [Op.like]: `%${keyword.trim()}%` } },
        { description: { [Op.like]: `%${keyword.trim()}%` } }
      ];
    }

    // 分页参数
    const offset = (page - 1) * pageSize;
    const limit = Math.max(1, Math.min(pageSize, 100)); // 防止异常分页大小

    const { rows, count } = await models.SysDict.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['deleted_at'] } // 可选：排除不需要的字段
    });

    return {
      list: rows,
      pagination: this.calculatePagination(page, limit, count)
    };
  }
  async getDictById(id: number): Promise<any> {
    const dict = await models.SysDict.findOne({ where: { id } });
    if (!dict) {
      throw new BusinessError(404, '字典不存在');
    }
    return dict;
  }
  async createDict(data: any): Promise<any> {
    const { name, code, description, status } = data;

    const existingCode = await models.SysDict.findOne({ where: { code } });
    if (existingCode) {
      throw new BusinessError(409, '字典代码已存在');
    }
    const dict = await models.SysDict.create({
      name,
      code,
      description,
      status
    });
    return dict;
  }
  async updateDict(id: number, data: any): Promise<any> {
    const { name, description, status } = data;

    const dict = await models.SysDict.update(
      {
        name,
        description,
        status
      },
      { where: { id } }
    );
    return dict;
  }
  async deleteDict(id: number): Promise<any> {
    const dict = await models.SysDict.findOne({ where: { id } });
    if (!dict) {
      throw new BusinessError(404, '字典不存在');
    }
    return await models.SysDict.destroy({ where: { id } });
  }
}
