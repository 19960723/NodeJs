import { Context } from 'koa';
import Joi from 'joi';
import { success, notFound } from '../utils/response';
import { ExampleService } from '../services/ExampleService';
import { BusinessError } from '../types';
import { validate, commonSchemas } from '../middleware/validator';

/**
 * 示例控制器 - 企业级控制器模式
 */
class ExampleController {
  private static exampleService = new ExampleService();

  /**
   * 获取示例列表（分页）
   */
  static async getExamples(ctx: Context): Promise<void> {
    try {
      const query = ctx.query as any;
      const result = await ExampleController.exampleService.findAll(query);

      success(ctx, result, '获取示例列表成功');
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = {
          code: error.code,
          message: error.message,
          data: []
        };
      } else {
        throw error;
      }
    }
  }

  /**
   * 获取示例详情
   */
  static async getExampleById(ctx: Context): Promise<void> {
    try {
      const { id } = ctx['params'] as { id: string };
      const example = await ExampleController.exampleService.findById(
        Number(id)
      );

      if (!example) {
        // 查询成功但无数据：HTTP 200，业务状态码 404
        ctx.status = 200;
        ctx.body = {
          code: 404,
          message: 'not found',
          data: null
        };
        return;
      }

      success(ctx, example, '获取示例详情成功');
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = {
          code: error.code,
          message: error.message
        };
      } else {
        throw error;
      }
    }
  }

  /**
   * 创建示例
   */
  static async createExample(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;
      const example = await ExampleController.exampleService.create(data);

      success(ctx, example, '创建示例成功', 201);
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = {
          code: error.code,
          message: error.message
        };
      } else {
        throw error;
      }
    }
  }

  /**
   * 更新示例
   */
  static async updateExample(ctx: Context): Promise<void> {
    try {
      const { id } = ctx['params'] as { id: string };
      const data = ctx.request.body as any;
      const example = await ExampleController.exampleService.update(
        Number(id),
        data
      );

      if (!example) {
        // 要更新的资源不存在，返回404
        notFound(ctx, '示例不存在');
        return;
      }

      success(ctx, example, '更新示例成功');
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = {
          code: error.code,
          message: error.message
        };
      } else {
        throw error;
      }
    }
  }

  /**
   * 删除示例
   */
  static async deleteExample(ctx: Context): Promise<void> {
    try {
      const { id } = ctx['params'] as { id: string };
      const result = await ExampleController.exampleService.delete(Number(id));

      if (result === null) {
        // 要删除的资源不存在，返回404
        notFound(ctx, '示例不存在');
        return;
      }

      if (result) {
        ctx.status = 204; // No Content
      } else {
        throw new BusinessError(500, '删除失败');
      }
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = {
          code: error.code,
          message: error.message
        };
      } else {
        throw error;
      }
    }
  }

  /**
   * 根据状态获取示例
   */
  static async getExamplesByStatus(ctx: Context): Promise<void> {
    try {
      const { status } = ctx['params'] as { status: 'active' | 'inactive' };
      const examples =
        await ExampleController.exampleService.findByStatus(status);

      success(ctx, examples, '获取示例成功');
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = {
          code: error.code,
          message: error.message
        };
      } else {
        throw error;
      }
    }
  }
}

// 导出带验证的控制器方法
export const getExamples = [
  validate({ query: commonSchemas.pagination }),
  ExampleController.getExamples
];

export const getExampleById = [
  validate({ params: commonSchemas.id }),
  ExampleController.getExampleById
];

export const createExample = [
  validate({ body: commonSchemas.createExample }),
  ExampleController.createExample
];

export const updateExample = [
  validate({
    params: commonSchemas.id,
    body: commonSchemas.updateExample
  }),
  ExampleController.updateExample
];

export const deleteExample = [
  validate({ params: commonSchemas.id }),
  ExampleController.deleteExample
];

export const getExamplesByStatus = [
  validate({
    params: Joi.object({
      status: Joi.string().valid('active', 'inactive').required()
    })
  }),
  ExampleController.getExamplesByStatus
];

export default ExampleController;
