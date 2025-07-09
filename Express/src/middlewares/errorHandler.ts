import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    code: status,
    message: err.message || '服务器错误',
  });
};

export default errorHandler;
