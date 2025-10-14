import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import prisma from "../services/prisma";
import { sessionService, UserPayload } from "./session";
import { redisService } from "./redis";
import logger from "../utils/logger";

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

export const loginService = async (
  {
    username,
    password,
    captcha,
    captchaId,
  }: LoginInput & { captcha?: string; captchaId?: string },
  ipAddress?: string,
  userAgent?: string
) => {
  if (!username || !password) {
    throw new Error("請輸入用戶名和密碼");
  }

  // 检查登录尝试限制
  const loginAttemptKey = `login_attempts:${username}`;
  const attempts = (await redisService.get<number>(loginAttemptKey)) || 0;

  if (attempts >= 5) {
    const ttl = await redisService.ttl(loginAttemptKey);
    throw new Error(`登录尝试过于频繁，请 ${Math.ceil(ttl / 60)} 分钟后再试`);
  }

  // 如果登录失败次数超过3次，需要验证码
  if (attempts >= 3) {
    if (!captcha || !captchaId) {
      throw new Error("请输入验证码");
    }

    // 验证验证码
    const { captchaService } = await import("./captcha");
    const isCaptchaValid = await captchaService.verifyCaptcha(
      captchaId,
      captcha
    );
    if (!isCaptchaValid) {
      // 记录失败尝试
      await redisService.incr(loginAttemptKey);
      await redisService.expire(loginAttemptKey, 15 * 60); // 15分钟过期
      throw new Error("验证码错误");
    }
  }

  // 根据 username 查询用户（先从缓存查询）
  const userCacheKey = `user:username:${username}`;
  let user = await redisService.get(userCacheKey);

  if (!user) {
    user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      // 缓存用户信息（不包含密码）
      const { password: _, ...userToCache } = user;
      await redisService.set(userCacheKey, userToCache, 300); // 缓存5分钟
    }
  }

  if (!user) {
    // 记录失败尝试
    await redisService.incr(loginAttemptKey);
    await redisService.expire(loginAttemptKey, 15 * 60); // 15分钟过期
    throw new Error("用戶名或密碼錯誤");
  }

  // 验证密码（需要重新查询以获取密码）
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      password: true,
      phone: true,
      email: true,
    },
  });

  const valid = await bcrypt.compare(password, userWithPassword!.password);
  if (!valid) {
    // 记录失败尝试
    await redisService.incr(loginAttemptKey);
    await redisService.expire(loginAttemptKey, 15 * 60); // 15分钟过期
    throw new Error("用戶名或密碼錯誤");
  }

  // 登录成功，清除失败尝试记录
  await redisService.del(loginAttemptKey);

  // 创建会话
  const userPayload: UserPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  };

  const { tokens, session } = await sessionService.createSession(
    userPayload,
    ipAddress,
    userAgent
  );

  // 返回时去掉 password
  const { password: _, ...userInfo } = user;

  logger.info(`用户登录成功: ${username}, sessionId: ${session.sessionId}`);

  return {
    ...tokens,
    userInfo,
    sessionId: session.sessionId,
  };
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

  // 检查用户是否存在（先从缓存查询）
  const userCacheKey = `user:id:${id}`;
  let existingUser = await redisService.get(userCacheKey);

  if (!existingUser) {
    existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error("用戶不存在");
    }
  }

  // 过滤掉空值字段，避免覆盖为 null 或 undefined
  const validFields = Object.fromEntries(
    Object.entries(updateFields).filter(
      ([_, v]) => v !== undefined && v !== null
    )
  );

  // 如果要更新密码，进行加密
  if (validFields.password) {
    validFields.password = await bcrypt.hash(
      validFields.password as string,
      10
    );
  }

  // 执行更新
  const updatedUser = await prisma.user.update({
    where: { id },
    data: validFields,
  });

  // 返回用户信息时去掉密码
  const { password: _, ...userInfo } = updatedUser;

  // 更新缓存
  await redisService.set(userCacheKey, userInfo, 300); // 缓存5分钟

  // 如果用户名被更新，需要更新用户名缓存
  if (validFields.username) {
    const usernameCacheKey = `user:username:${validFields.username}`;
    await redisService.set(usernameCacheKey, userInfo, 300);

    // 删除旧的用户名缓存
    if (existingUser.username !== validFields.username) {
      const oldUsernameCacheKey = `user:username:${existingUser.username}`;
      await redisService.del(oldUsernameCacheKey);
    }
  }

  logger.info(`用户信息更新成功: userId=${id}`);
  return userInfo;
};

/**
 * 根据用户ID获取用户信息（带缓存）
 * @param id 用户ID
 */
export const getUserByIdService = async (id: number) => {
  const userCacheKey = `user:id:${id}`;
  let user = await redisService.get(userCacheKey);

  if (!user) {
    user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        avatar: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user) {
      await redisService.set(userCacheKey, user, 300); // 缓存5分钟
    }
  }

  if (!user) {
    throw new Error("用戶不存在");
  }

  return user;
};

/**
 * 根据用户名获取用户信息（带缓存）
 * @param username 用户名
 */
export const getUserByUsernameService = async (username: string) => {
  const userCacheKey = `user:username:${username}`;
  let user = await redisService.get(userCacheKey);

  if (!user) {
    user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        avatar: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user) {
      await redisService.set(userCacheKey, user, 300); // 缓存5分钟
    }
  }

  if (!user) {
    throw new Error("用戶不存在");
  }

  return user;
};

/**
 * 用户登出服务
 * @param sessionId 会话ID
 */
export const logoutService = async (sessionId: string) => {
  try {
    await sessionService.destroySession(sessionId);
    logger.info(`用户登出成功: sessionId=${sessionId}`);
    return { success: true, message: "登出成功" };
  } catch (error) {
    logger.error(`用户登出失败: sessionId=${sessionId}`, error);
    throw new Error("登出失败");
  }
};

/**
 * 刷新访问令牌服务
 * @param refreshToken 刷新令牌
 */
export const refreshTokenService = async (refreshToken: string) => {
  const tokens = await sessionService.refreshAccessToken(refreshToken);

  if (!tokens) {
    throw new Error("刷新令牌无效或已过期");
  }

  logger.info("访问令牌刷新成功");
  return tokens;
};

/**
 * 获取用户会话列表
 * @param userId 用户ID
 */
export const getUserSessionsService = async (userId: number) => {
  const sessions = await sessionService.getUserSessions(userId);
  logger.debug(
    `获取用户会话列表: userId=${userId}, 会话数量=${sessions.length}`
  );
  return sessions;
};

/**
 * 销毁用户所有会话
 * @param userId 用户ID
 */
export const destroyUserSessionsService = async (userId: number) => {
  await sessionService.destroyUserSessions(userId);

  // 清除用户相关缓存
  await redisService.delPattern(`user:id:${userId}*`);

  logger.info(`用户所有会话已销毁: userId=${userId}`);
  return { success: true, message: "所有会话已销毁" };
};
