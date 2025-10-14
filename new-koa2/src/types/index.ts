/**
 * 全局类型定义
 */

// 基础响应接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  timestamp?: string;
  requestId?: string;
}

// 分页信息
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// 分页查询参数
export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// 业务异常
export class BusinessError extends Error {
  public code: number;
  public statusCode: number;

  constructor(statusCode: number, message: string, businessCode?: number) {
    super(message);
    this.name = 'BusinessError';
    this.statusCode = statusCode;
    this.code = businessCode || statusCode; // 如果没有指定业务状态码，使用HTTP状态码
  }
}

// 服务层接口
export interface IService<T, CreateDto, UpdateDto> {
  findAll(query?: any): Promise<{ list: T[]; pagination: PaginationInfo }>;
  findById(id: number): Promise<T | null>;
  create(data: CreateDto): Promise<T>;
  update(id: number, data: UpdateDto): Promise<T>;
  delete(id: number): Promise<boolean>;
}

// 仓储层接口
export interface IRepository<T> {
  findAll(options?: any): Promise<{ rows: T[]; count: number }>;
  findById(id: number): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: number, data: any): Promise<T>;
  delete(id: number): Promise<boolean>;
}
