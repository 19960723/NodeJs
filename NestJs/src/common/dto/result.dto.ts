/**
 * 统一返回格式 Result API
 * 用于封装所有接口的返回数据
 */
export class Result<T = any> {
  /**
   * 状态码：200 成功，其他失败
   */
  code: number;

  /**
   * 返回信息
   */
  message: string;

  /**
   * 返回数据
   */
  data?: T;

  /**
   * 时间戳
   */
  timestamp: number;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = Date.now();
  }

  /**
   * 成功返回
   */
  static success<T>(data?: T, message: string = '操作成功'): Result<T> {
    return new Result(200, message, data);
  }

  /**
   * 失败返回
   */
  static error<T>(
    message: string = '操作失败',
    code: number = 500,
    data?: T,
  ): Result<T> {
    return new Result(code, message, data);
  }

  /**
   * 分页成功返回
   */
  static page<T>(
    data: T[],
    total: number,
    page: number,
    pageSize: number,
    message: string = '查询成功',
  ): Result<PageResult<T>> {
    return new Result(200, message, {
      list: data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  }
}

/**
 * 分页返回数据结构
 */
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
