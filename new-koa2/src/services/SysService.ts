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

    const where: any = {};
    if (status !== undefined) where.status = status;
    if (keyword) {
      where[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        { code: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } }
      ];
    }

    const offset = (page - 1) * pageSize;
    const { rows, count } = await models.SysDict.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['deleted_at'] }
    });

    return {
      list: rows,
      pagination: this.calculatePagination(page, pageSize, count)
    };
  }

  async getDictById(id: number): Promise<any> {
    const dict = await models.SysDict.findOne({
      where: { id },
      attributes: { exclude: ['deleted_at'] }
    });
    if (!dict) {
      throw new BusinessError(404, '字典不存在');
    }
    return dict;
  }

  async createDict(data: any): Promise<any> {
    const { name, code, description, status } = data;

    // 只做业务逻辑验证：检查代码是否存在
    const existingCode = await models.SysDict.findOne({
      where: { code }
    });
    if (existingCode) {
      throw new BusinessError(409, '字典代码已存在');
    }

    const dict = await models.SysDict.create({
      name,
      code,
      description: description || null,
      status: status || 1
    });
    return dict;
  }

  async updateDict(id: number, data: any): Promise<any> {
    const existingDict = await models.SysDict.findOne({ where: { id } });
    if (!existingDict) {
      throw new BusinessError(404, '字典不存在');
    }

    const result = await models.SysDict.update(data, { where: { id } });
    return result;
  }

  async deleteDict(id: number): Promise<any> {
    const dict = await models.SysDict.findOne({ where: { id } });
    if (!dict) {
      throw new BusinessError(404, '字典不存在');
    }

    // 业务规则：检查是否存在关联的字典项
    const itemCount = await models.SysDictItem.count({
      where: { dict_id: id }
    });
    if (itemCount > 0) {
      throw new BusinessError(409, '该字典下存在数据项，不能删除');
    }

    return await models.SysDict.destroy({ where: { id } });
  }

  async getDictDataList(
    dict_id: number,
    query: {
      page?: number;
      pageSize?: number;
      dict_id?: number;
      status?: number;
      keyword?: string;
    }
  ): Promise<any> {
    console.log(dict_id, '==', query);
    const { page = 1, pageSize = 10, status, keyword } = query;

    const where: any = {};

    if (dict_id !== undefined) {
      // 业务规则：验证字典是否存在
      const dictExists = await models.SysDict.findOne({
        where: { id: dict_id }
      });
      if (!dictExists) {
        throw new BusinessError(404, '字典不存在');
      }
      where.dict_id = dict_id;
    }

    if (status !== undefined) where.status = status;
    if (keyword) {
      where[Op.or] = [
        { label: { [Op.like]: `%${keyword}%` } },
        { value: { [Op.like]: `%${keyword}%` } }
      ];
    }

    const offset = (page - 1) * pageSize;
    const { count, rows } = await models.SysDictItem.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['deleted_at'] }
    });

    return {
      list: rows,
      pagination: this.calculatePagination(page, pageSize, count)
    };
  }

  async getDictDataById(id: number): Promise<any> {
    const dictData = await models.SysDictItem.findOne({
      where: { id },
      attributes: { exclude: ['deleted_at'] }
    });
    if (!dictData) {
      throw new BusinessError(404, '字典数据不存在');
    }
    return dictData;
  }

  async createDictData(data: any): Promise<any> {
    const { dict_id, label, value } = data;

    // 业务逻辑：验证字典是否存在
    const dictExists = await models.SysDict.findOne({ where: { id: dict_id } });
    if (!dictExists) {
      throw new BusinessError(404, '字典不存在');
    }

    // 业务规则：检查value唯一性
    const existingValue = await models.SysDictItem.findOne({
      where: { dict_id, value }
    });
    if (existingValue) {
      throw new BusinessError(409, '该字典下数据值已存在');
    }

    const dictData = await models.SysDictItem.create(data);
    return dictData;
  }

  async updateDictData(id: number, data: any): Promise<any> {
    const existingData = await models.SysDictItem.findOne({ where: { id } });
    if (!existingData) {
      throw new BusinessError(404, '字典数据不存在');
    }

    // 业务规则：如果修改value，检查唯一性
    if (data.value !== undefined && data.value !== existingData.value) {
      const existingValue = await models.SysDictItem.findOne({
        where: {
          dict_id: (existingData as any).dict_id,
          value: data.value,
          id: { [Op.ne]: id }
        }
      });
      if (existingValue) {
        throw new BusinessError(409, '该字典下数据值已存在');
      }
    }

    const result = await models.SysDictItem.update(data, { where: { id } });
    return result;
  }

  async deleteDictData(id: number): Promise<any> {
    const dictData = await models.SysDictItem.findOne({ where: { id } });
    if (!dictData) {
      throw new BusinessError(404, '字典数据不存在');
    }
    return await models.SysDictItem.destroy({ where: { id } });
  }
}
