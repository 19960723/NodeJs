import { BaseService } from './BaseService';
import { UserRepository } from '../repositories/UserRepository';
import { BusinessError } from '../types';
import { getConfig } from '../config';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export class UserService extends BaseService<any> {
  private repository: UserRepository;
  constructor() {
    super();
    this.repository = new UserRepository();
  }

  async login(data: { username: string; password: string }) {
    const { username, password } = data;
    const user = await this.repository.findByUsername(username);
    if (!user) {
      throw new BusinessError(401, '用户名或密码错误');
    }

    const hashedPassword = user.password ? String(user.password) : '';

    // 密码格式判定与校验
    let passwordValid = false;
    if (
      hashedPassword.startsWith('$2a$') ||
      hashedPassword.startsWith('$2b$') ||
      hashedPassword.startsWith('$2y$')
    ) {
      // bcrypt哈希
      passwordValid = await bcrypt.compare(password, hashedPassword);
    } else if (hashedPassword.length > 0) {
      // 明文兼容，危险：仅用于兼容历史数据
      passwordValid = password === hashedPassword;
    }

    if (!passwordValid) {
      throw new BusinessError(401, '用户名或密码错误');
    }

    // 生成JWT令牌
    const config = getConfig();
    const secret = config.security.jwtSecret || 'dev-secret';

    const accessToken = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        type: 'access',
        iat: Math.floor(Date.now() / 1000)
      },
      secret,
      {
        expiresIn: config.security.jwtExpiresIn || '24h',
        issuer: config.app.name
      }
    );

    const refreshToken = jwt.sign(
      {
        sub: user.id,
        type: 'refresh',
        iat: Math.floor(Date.now() / 1000)
      },
      secret,
      {
        expiresIn: '7d',
        issuer: config.app.name
      }
    );

    // 返回完整的登录结果
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname || null
      },
      expiresIn: config.security.jwtExpiresIn || '24h'
    };
  }
  async register(data: any) {
    const { username, password, nickname } = data;

    // 检查用户名是否已存在
    const existUser = await this.repository.findByUsername(username);
    if (existUser) {
      throw new BusinessError(409, '用户名已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await this.repository.create({
      username,
      password: hashedPassword,
      nickname: nickname || username
    });

    // 安全起见，不返回密码
    const { password: pwd, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserInfo(userId: number) {
    // 根据用户ID查询用户信息
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new BusinessError(404, '用户不存在');
    }

    // 返回用户信息（不包含密码）
    return {
      id: user.id,
      username: user.username,
      nickname: user.nickname || null
    };
  }

  async deleteUser(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new BusinessError(404, '用户不存在');
    }
    return await this.repository.delete(id);
  }

  async updateUser(id: number, data: any) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new BusinessError(404, '用户不存在');
    }
    return await this.repository.update(id, data);
  }
  async getUserById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new BusinessError(404, '用户不存在');
    }
    return user;
  }
}
