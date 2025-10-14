import { PaginationQuery, PaginationInfo, BusinessError } from '../types';

/**
 * 基础服务类 - 提供通用的业务逻辑
 */
export abstract class BaseService<T, CreateDto = any, UpdateDto = any> {
  /**
   * 验证分页参数
   */
  protected validatePagination(query: PaginationQuery): PaginationQuery {
    const { page = 1, pageSize = 10, sortBy, sortOrder = 'DESC' } = query;

    const result: PaginationQuery = {
      page: Math.max(1, page),
      pageSize: Math.min(100, Math.max(1, pageSize)), // 限制最大页面大小
      sortOrder: sortOrder === 'ASC' ? 'ASC' : 'DESC'
    };

    if (sortBy) {
      result.sortBy = sortBy;
    }

    return result;
  }

  /**
   * 计算分页信息
   */
  protected calculatePagination(
    page: number,
    pageSize: number,
    total: number
  ): PaginationInfo {
    return {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    };
  }

  /**
   * 验证ID参数
   */
  protected validateId(id: any): number {
    const numId = Number(id);
    if (isNaN(numId) || numId <= 0) {
      throw new BusinessError(400, '无效的ID参数');
    }
    return numId;
  }

  /**
   * 处理业务异常
   */
  protected handleBusinessError(
    error: any,
    defaultMessage: string = '操作失败'
  ): never {
    if (error instanceof BusinessError) {
      throw error;
    }
    throw new BusinessError(500, defaultMessage);
  }
}
