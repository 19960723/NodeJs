import { Request, Response, NextFunction } from 'express'
import { getListService } from "../services/app";

export const getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getListService()
        res.json({ code: 200, message: '成功哈哈哈～', data: result })
    } catch (err) {
        next(err)
    }
}

