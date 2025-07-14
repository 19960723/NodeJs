import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).json({
    code: status,
    message: err.message || "服务器错误",
  });
};

export default errorHandler;
