import { Request, Response, NextFunction } from 'express'
import { loginService } from "../services/user"
import { successResponse } from '../utils/response';
import prisma from '../services/prisma';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await loginService(req.body)
        successResponse(res, result, '登陆成功')
    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany()
        successResponse(res, users, '查询成功')
    } catch (err) {
        next(err)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = req.body
        const user = await prisma.user.create({
            data: { email, username, password }
        })
        successResponse(res, user, '创建成功')
    } catch (err) {
        next(err)
    }

}