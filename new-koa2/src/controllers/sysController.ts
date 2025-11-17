import { Context } from 'koa';
import { validate } from '../middleware/validator';
import { success, handleError } from '../utils/response';

import { SysService } from '../services/SysService';

class SysController {
  private static sysService = new SysService();

  static async getDictList(ctx: Context): Promise<void> {
    try {
      const query = ctx.query as any;
      const result = await SysController.sysService.getDictList(query);
      success(ctx, result, '获取字典列表成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async getDictById(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.getDictById(ctx.params.id);
      success(ctx, result, '获取字典详情成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async createDict(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.createDict(
        ctx.request.body
      );
      success(ctx, result, '创建字典成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async updateDict(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.updateDict(
        ctx.params.id,
        ctx.request.body
      );
      success(ctx, result, '更新字典成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async deleteDict(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.deleteDict(ctx.params.id);
      success(ctx, result, '删除字典成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  static async getDictDataList(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.getDictDataList(
        ctx.params.id
      );
      success(ctx, result, '获取字典数据列表成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async getDictDataById(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.getDictDataById(
        ctx.params.id
      );
      success(ctx, result, '获取字典数据详情成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async createDictData(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.createDictData(
        ctx.request.body
      );
      success(ctx, result, '创建字典数据成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async updateDictData(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.updateDictData(
        ctx.params.id,
        ctx.request.body
      );
      success(ctx, result, '更新字典数据成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async deleteDictData(ctx: Context): Promise<void> {
    try {
      const result = await SysController.sysService.deleteDictData(
        ctx.params.id
      );
      success(ctx, result, '删除字典数据成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
}

export const getDictList = [validate({}), SysController.getDictList];
export const getDictById = [validate({}), SysController.getDictById];
export const createDict = [validate({}), SysController.createDict];
export const updateDict = [validate({}), SysController.updateDict];
export const deleteDict = [validate({}), SysController.deleteDict];

export const getDictDataList = [validate({}), SysController.getDictDataList];
export const getDictDataById = [validate({}), SysController.getDictDataById];
export const createDictData = [validate({}), SysController.createDictData];
export const updateDictData = [validate({}), SysController.updateDictData];
export const deleteDictData = [validate({}), SysController.deleteDictData];

export default SysController;
