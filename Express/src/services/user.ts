import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

interface LoginInput {
  username: string;
  password: string;
}
const mockUser = {  
  username: 'admin',
  passwordHash: bcrypt.hash('123456', 10) // 可换成 DB 查询结果
};

export const loginService = async ({ username, password }: LoginInput) => {
  if (username !== mockUser.username) {
    throw createHttpError(401, '用户不存在');
  }

  const match = await bcrypt.compare(password, await mockUser.passwordHash);
  if (!match) {
    throw createHttpError(401, '密码错误');
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  return { token };
};
