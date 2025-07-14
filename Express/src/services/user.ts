import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import prisma from "../services/prisma";

interface LoginInput {
  phone: string;
  username: string;
  password: string;
}

export const loginService = async ({ phone, password }: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw new Error("手機號或密碼錯誤");

  const valid = await bcrypt.compare(password, user.password); // 比对加密密码
  if (!valid) throw new Error("手機號或密碼錯誤");

  const token = jwt.sign(
    { id: user.id, phone: user.phone },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
  return { token, userInfo: user };
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
