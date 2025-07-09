import { Response } from 'express';

export const successResponse = (res: Response, data: any = {}, message = '操作成功') => {
  res.json({ code: 200, message, data });
};
