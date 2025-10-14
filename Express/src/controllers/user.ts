/**
 * 用户相关控制器
 * 处理用户认证、信息管理等相关请求
 */

import { Request, Response, NextFunction } from "express";
import {
  loginService,
  registerService,
  updateUserService,
} from "../services/user";
import { captchaService } from "../services/captcha";
import { successResponse } from "../utils/response";
import { success, error } from "../utils/result";
import prisma from "../services/prisma";

/**
 * 用户认证相关控制器
 */

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, captcha, captchaId } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");

    const result = await loginService(
      { username, password, captcha, captchaId },
      ipAddress,
      userAgent
    );
    successResponse(res, result, "登陆成功");
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, password, username } = req.body;
  try {
    const user = await registerService({ phone, password, username });
    successResponse(res, user, "註冊成功");
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 清除 token 或其他登出逻辑
    successResponse(res, null, "登出成功");
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    successResponse(res, users, "查询成功");
  } catch (err) {
    next(err);
  }
};
export const getUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const users = await prisma.user.findMany({
      skip: skip,
      take: Number(limit),
    });
    const total = await prisma.user.count();
    successResponse(res, { users, total }, "获取用户列表成功");
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id; // 从请求参数中获取用户ID
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).json({ message: "用户未找到" });
    }
    successResponse(res, user, "获取用户成功");
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (
  req: Request & { user?: { id: number } },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "未授权访问" });
    }
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "用户未找到" });
    }
    successResponse(res, user, "获取用户信息成功");
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = await updateUserService(req.body);
    successResponse(res, userInfo, "更新用户信息成功");
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({
      where: { id: userId },
    });
    successResponse(res, null, "删除成功");
  } catch (err) {
    next(err);
  }
};
