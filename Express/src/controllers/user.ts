import { Request, Response, NextFunction } from 'express'
import { loginService } from "../services/user"
import { successResponse } from '../utils/response';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await loginService(req.body)
        successResponse(res, result, '登陆成功')
    } catch (err) {
        next(err)
    }
}