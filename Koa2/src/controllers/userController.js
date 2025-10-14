const { User } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const captchaService = require('../services/captcha');
const logger = require('../utils/logger');
const {
  success,
  unauthorized,
  forbidden,
  conflict,
  badRequest,
  notFound,
  paginated
} = require('../utils/response');

/**
 * 用户注册
 */
const register = async ctx => {
  try {
    const { username, email, password } = ctx.request.body;

    // 检查用户是否已存在
    const existingUser = await User.findByEmailOrUsername(email);
    if (existingUser) {
      return conflict(ctx, '用户名或邮箱已存在');
    }

    // 创建新用户
    const user = await User.create({
      username,
      email,
      password
    });

    logger.info(`新用户注册: ${user.username} (${user.email})`);

    ctx.status = 201;
    success(ctx, { user: user.toJSON() }, '注册成功', 200);
  } catch (error) {
    logger.error('用户注册失败:', error);
    throw error;
  }
};

/**
 * 用户登录
 */
const login = async ctx => {
  try {
    const { username, password, sessionId, answer } = ctx.request.body;

    // 1. 验证验证码
    const captchaResult = captchaService.verifyCaptcha(sessionId, answer);
    if (!captchaResult.success) {
      logger.warn(
        `验证码验证失败: ${sessionId}, 原因: ${captchaResult.message}`
      );
      return badRequest(ctx, captchaResult.message, {
        code: captchaResult.code,
        remainingAttempts: captchaResult.remainingAttempts
      });
    }

    // 查找用户（支持用户名或邮箱登录）
    const user = await User.findByEmailOrUsername(username);
    if (!user) {
      logger.warn(`用户登录失败: 用户不存在 - ${username}`);
      return unauthorized(ctx, '用户名或密码错误');
    }

    // 验证密码
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      logger.warn(`用户登录失败: 密码错误 - ${user.username} (${user.email})`);
      return unauthorized(ctx, '用户名或密码错误');
    }

    // 检查用户状态
    if (user.status !== 'active') {
      let message;
      switch (user.status) {
        case 'inactive':
          message = '账户未激活，请检查邮箱激活链接';
          break;
        case 'banned':
          message = '账户已被封禁，请联系管理员';
          break;
        default:
          message = '账户状态异常，请联系管理员';
      }

      logger.warn(
        `用户登录失败: 账户状态异常 - ${user.username} (${user.email}), 状态: ${user.status}`
      );
      return forbidden(ctx, message);
    }

    // 更新最后登录时间
    await user.update({ lastLoginAt: new Date() });

    // 生成JWT令牌
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      loginTime: Date.now()
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // 记录成功登录日志
    logger.info(
      `用户登录成功: ${user.username} (${user.email}), IP: ${ctx.ip}`
    );

    // 返回成功响应
    success(
      ctx,
      {
        tokens: {
          accessToken,
          refreshToken
        },
        user: user.toJSON()
      },
      '登录成功'
    );
  } catch (error) {
    logger.error('用户登录失败:', {
      error: error.message,
      stack: error.stack,
      username: ctx.request.body?.username,
      ip: ctx.ip
    });
    throw error;
  }
};

/**
 * 获取当前用户信息
 */
const getCurrentUser = async ctx => {
  try {
    const userId = ctx.state.user.id;

    // 获取用户信息及其角色
    const user = await User.findByPk(userId, {
      include: [
        {
          model: User.sequelize.models.Role,
          as: 'roles',
          attributes: ['id', 'name', 'code'],
          where: { status: 'active' },
          required: false,
          include: [
            {
              model: User.sequelize.models.Route,
              as: 'routes',
              attributes: ['permission'],
              where: {
                status: 'active',
                permission: { [User.sequelize.Sequelize.Op.ne]: null }
              },
              required: false
            }
          ]
        }
      ]
    });

    if (!user) {
      return notFound(ctx, '用户不存在');
    }

    // 构建用户信息
    const userInfo = user.toJSON();

    // 提取角色和权限
    const roles = user.roles.map(role => role.code);
    const permissions = new Set();

    user.roles.forEach(role => {
      role.routes.forEach(route => {
        if (route.permission) {
          permissions.add(route.permission);
        }
      });
    });

    userInfo.roles = roles;
    userInfo.permissions = Array.from(permissions);

    success(ctx, userInfo, '获取用户信息成功');
  } catch (error) {
    logger.error('获取用户信息失败:', error);
    throw error;
  }
};

/**
 * 根据ID获取用户信息
 */
const getUserById = async ctx => {
  try {
    const { id } = ctx.params;

    const user = await User.findByPk(id);
    if (!user) {
      return notFound(ctx, '用户不存在');
    }

    success(ctx, user.toJSON(), '获取用户信息成功');
  } catch (error) {
    logger.error('获取用户信息失败:', error);
    throw error;
  }
};

/**
 * 更新用户信息
 */
const updateProfile = async ctx => {
  try {
    const user = ctx.state.user;
    const updateData = ctx.request.body;

    // 如果更新邮箱，检查是否已存在
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: updateData.email }
      });
      if (existingUser) {
        return conflict(ctx, '邮箱已被使用');
      }
    }

    // 如果更新用户名，检查是否已存在
    if (updateData.username && updateData.username !== user.username) {
      const existingUser = await User.findOne({
        where: { username: updateData.username }
      });
      if (existingUser) {
        return conflict(ctx, '用户名已被使用');
      }
    }

    // 更新用户信息
    await user.update(updateData);

    logger.info(`用户信息更新: ${user.username} (${user.email})`);

    success(ctx, { user: user.toJSON() }, '更新成功');
  } catch (error) {
    logger.error('更新用户信息失败:', error);
    throw error;
  }
};

/**
 * 修改密码
 */
const changePassword = async ctx => {
  try {
    const user = ctx.state.user;
    const { oldPassword, newPassword } = ctx.request.body;

    // 验证旧密码
    const isValidPassword = await user.validatePassword(oldPassword);
    if (!isValidPassword) {
      return badRequest(ctx, '旧密码错误');
    }

    // 更新密码
    await user.update({ password: newPassword });

    logger.info(`用户修改密码: ${user.username} (${user.email})`);

    success(ctx, null, '密码修改成功');
  } catch (error) {
    logger.error('修改密码失败:', error);
    throw error;
  }
};

/**
 * 获取用户列表（管理员功能）
 */
const getUsers = async ctx => {
  try {
    const { page = 1, pageSize = 10, username, email, status } = ctx.query;
    const offset = (page - 1) * pageSize;

    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }
    if (username) {
      whereClause.username = {
        [User.sequelize.Sequelize.Op.like]: `%${username}%`
      };
    }
    if (email) {
      whereClause.email = { [User.sequelize.Sequelize.Op.like]: `%${email}%` };
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    success(
      ctx,
      {
        list: rows.map(user => user.toJSON()),
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      },
      '获取用户列表成功'
    );
  } catch (error) {
    logger.error('获取用户列表失败:', error);
    throw error;
  }
};

/**
 * 创建用户
 */
const createUser = async ctx => {
  try {
    const userData = ctx.request.body;

    // 检查用户是否已存在
    const existingUser = await User.findByEmailOrUsername(
      userData.email || userData.username
    );
    if (existingUser) {
      return conflict(ctx, '用户名或邮箱已存在');
    }

    // 创建新用户
    const user = await User.create(userData);

    logger.info(`创建用户: ${user.username} (${user.email})`);

    success(ctx, user.toJSON(), '创建用户成功');
  } catch (error) {
    logger.error('创建用户失败:', error);
    throw error;
  }
};

/**
 * 更新用户
 */
const updateUser = async ctx => {
  try {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    const user = await User.findByPk(id);
    if (!user) {
      return notFound(ctx, '用户不存在');
    }

    // 如果更新邮箱，检查是否已存在
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: updateData.email }
      });
      if (existingUser) {
        return conflict(ctx, '邮箱已被使用');
      }
    }

    // 如果更新用户名，检查是否已存在
    if (updateData.username && updateData.username !== user.username) {
      const existingUser = await User.findOne({
        where: { username: updateData.username }
      });
      if (existingUser) {
        return conflict(ctx, '用户名已被使用');
      }
    }

    // 更新用户信息
    await user.update(updateData);

    logger.info(`更新用户: ${user.username} (${user.email})`);

    success(ctx, user.toJSON(), '更新用户成功');
  } catch (error) {
    logger.error('更新用户失败:', error);
    throw error;
  }
};

/**
 * 删除用户
 */
const deleteUser = async ctx => {
  try {
    const { id } = ctx.params;

    const user = await User.findByPk(id);
    if (!user) {
      return notFound(ctx, '用户不存在');
    }

    await user.destroy();

    logger.info(`删除用户: ${user.username} (${user.email})`);

    success(ctx, null, '删除用户成功');
  } catch (error) {
    logger.error('删除用户失败:', error);
    throw error;
  }
};

/**
 * 批量删除用户
 */
const batchDeleteUsers = async ctx => {
  try {
    const { ids } = ctx.request.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return badRequest(ctx, '请提供要删除的用户ID列表');
    }

    const deletedCount = await User.destroy({
      where: {
        id: ids
      }
    });

    logger.info(`批量删除用户: ${deletedCount} 个用户`);

    success(ctx, null, `成功删除 ${deletedCount} 个用户`);
  } catch (error) {
    logger.error('批量删除用户失败:', error);
    throw error;
  }
};

/**
 * 重置用户密码
 */
const resetPassword = async ctx => {
  try {
    const { id } = ctx.params;

    const user = await User.findByPk(id);
    if (!user) {
      return notFound(ctx, '用户不存在');
    }

    // 生成随机密码
    const newPassword = Math.random().toString(36).slice(-8);
    await user.update({ password: newPassword });

    logger.info(`重置用户密码: ${user.username} (${user.email})`);

    success(ctx, { password: newPassword }, '重置密码成功');
  } catch (error) {
    logger.error('重置用户密码失败:', error);
    throw error;
  }
};

/**
 * 退出登录
 */
const logout = async ctx => {
  try {
    success(ctx, null, '退出登录成功');
  } catch (error) {
    logger.error('退出登录失败:', error);
    throw error;
  }
};

/**
 * 刷新token
 */
const refreshToken = async ctx => {
  try {
    const { refreshToken: oldRefreshToken } = ctx.request.body;

    if (!oldRefreshToken) {
      return badRequest(ctx, '缺少刷新令牌');
    }

    // 验证refreshToken
    const jwt = require('jsonwebtoken');
    try {
      const decoded = jwt.verify(
        oldRefreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh-secret'
      );

      const newAccessToken = generateAccessToken({
        id: decoded.id,
        username: decoded.username,
        email: decoded.email
      });
      const newRefreshToken = generateRefreshToken({
        id: decoded.id,
        username: decoded.username,
        email: decoded.email
      });

      success(
        ctx,
        {
          token: newAccessToken,
          refreshToken: newRefreshToken
        },
        '刷新令牌成功'
      );
    } catch (error) {
      return unauthorized(ctx, '刷新令牌无效或已过期');
    }
  } catch (error) {
    logger.error('刷新令牌失败:', error);
    throw error;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  getUserById,
  updateProfile,
  changePassword,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  batchDeleteUsers,
  resetPassword,
  logout,
  refreshToken
};
