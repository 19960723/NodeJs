import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error } from "../utils/result";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

/**
 * 認證中間件
 * 先檢查 headers 是否有 authorization
 * 如果有，則檢查 token 是否有效
 * 如果有效，則將 user 資訊存入 req.user
 * 如果無效，則回傳 401 未授權
 * 如果沒有，則回傳 401 未授權
 * */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(error("未授權，請先登入", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      username: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(error("Token 無效或已過期", 401));
  }
};
