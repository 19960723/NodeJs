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
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = req.body
        const user = await prisma.user.create({
            data: { email, username, password }
        })
        successResponse(res, user, '注册成功')
    } catch (err) {
        next(err)
    }
}
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 清除 token 或其他登出逻辑
        successResponse(res, null, '登出成功');
    } catch (err) {
        next(err);
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
export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const users = await prisma.user.findMany({
            skip: skip,
            take: Number(limit),
        });
        const total = await prisma.user.count();
        successResponse(res, { users, total }, '获取用户列表成功');
    } catch (err) {
        next(err);
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id; // 从请求参数中获取用户ID
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: '用户未找到' });
        }
        successResponse(res, user, '获取用户成功');
    } catch (err) {
        next(err);
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

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id; // 假设用户ID存储在req.user中
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: '用户未找到' });
        }
        successResponse(res, user, '获取用户信息成功');
    } catch (err) {
        next(err);
    }
}
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id; // 假设用户ID存储在req.user中
        const { email, username } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { email, username }
        });
        successResponse(res, updatedUser, '更新成功');
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id; // 从请求参数中获取用户ID
        await prisma.user.delete({
            where: { id: userId }
        });
        successResponse(res, null, '删除成功');
    } catch (err) {
        next(err);
    }
}
