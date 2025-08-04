import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import prisma from "../services/prisma";

interface LoginInput {
  phone: string;
  username: string;
  password: string;
}

interface UpdateUserInput {
  id: number; // 必填，用于定位用户
  username?: string; // 可选，用户名
  phone?: string; // 可选，手机号
  email?: string; // 可选，邮箱
  password?: string; // 可选，新密码
  avatar?: string; // 可选，头像
  nickname?: string; // 可选，昵称
}

export const loginService = async ({ username, password }: LoginInput) => {
  if (!username || !password) {
    throw new Error("請輸入用戶名和密碼");
  }

  // 根据 username 查询用户
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("用戶名或密碼錯誤");
  }

  // 验证密码
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("用戶名或密碼錯誤");
  }

  // 生成 JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // 返回时去掉 password
  const { password: _, ...userInfo } = user;

  return { token, userInfo };
};

export const registerService = async ({
  phone,
  password,
  username,
}: LoginInput) => {
  const exists = await prisma.user.findUnique({ where: { phone } });
  if (exists) throw new Error("該手機號已註冊");
  const hashedPassword = await bcrypt.hash(password, 10); // 加密密码

  return await prisma.user.create({
    data: { phone, password: hashedPassword, username: username || "" },
  });
};

export const updateUserService = async (data: UpdateUserInput) => {
  const { id, ...updateFields } = data;
  if (!id) {
    throw new Error("用戶ID必填");
  }
  // 检查用户是否存在
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    throw new Error("用戶不存在");
  }

  // 过滤掉空值字段，避免覆盖为 null 或 undefined
  const validFields = Object.fromEntries(
    Object.entries(updateFields).filter(
      ([_, v]) => v !== undefined && v !== null
    )
  );

  // 执行更新
  const updatedUser = await prisma.user.update({
    where: { id },
    data: validFields,
  });

  // 返回用户信息时去掉密码
  const { password: _, ...userInfo } = updatedUser;
  return userInfo;
};
