/**
 * 全局错误处理中间件
 * 统一处理应用中的各类错误，包括：
 * 1. 业务逻辑错误 (AppError)
 * 2. 参数验证错误 (ValidationError)
 * 3. 未知系统错误
 */

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import logger from "../utils/logger";

/**
 * 错误处理中间件
 * @param err - 错误对象
 * @param req - Express请求对象
 * @param res - Express响应对象
 * @param next - Express next函数
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 记录详细的错误日志，包含请求信息
  logger.error('Error 👉', {
    err,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  // 处理已知的业务错误
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
  }

  // 处理验证错误
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: '请求参数验证失败',
      errors: err.errors
    });
  }

  // 处理未知错误
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? '服务器内部错误' : err.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};

export default errorHandler;