import { BaseService } from './BaseService';
import { BusinessError } from '../types';
import { UserRepository } from '../repositories/UserRepository';
import { getConfig } from '../config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

interface LoginDto {
  username: string;
  password: string;
}

export class AuthService extends BaseService<LoginDto> {
  private repository: UserRepository;

  constructor() {
    super();
    this.repository = new UserRepository();
  }

  async login(data: LoginDto) {
    const { username, password } = data;
    const user = await this.repository.findByUsername(username);
    if (!user) {
      throw new BusinessError(401, '用户不存在');
    }
    const hashed = String(user.password || '');
    let passwordOk = false;
    if (hashed.startsWith('$2')) {
      passwordOk = await bcrypt.compare(password, hashed);
    } else {
      passwordOk = hashed === password;
    }
    if (!passwordOk) {
      throw new BusinessError(401, '密码错误');
    }

    const config = getConfig();
    const secret = config.security.jwtSecret || 'dev-secret';
    const accessToken = jwt.sign(
      { sub: user.id, username: user.username },
      secret,
      { expiresIn: config.security.jwtExpiresIn || '24h' }
    );
    const refreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, secret, {
      expiresIn: '7d'
    });

    const userInfo = {
      id: user.id,
      username: user.username,
      nickname: user['nickname'] || null
    };

    return {
      accessToken,
      refreshToken,
      user: userInfo
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new BusinessError(400, '缺少刷新令牌');
    }
    const config = getConfig();
    const secret = config.security.jwtSecret || 'dev-secret';
    try {
      const payload = jwt.verify(refreshToken, secret) as any;
      if (!payload || payload.type !== 'refresh' || !payload.sub) {
        throw new Error('无效刷新令牌');
      }
      const accessToken = jwt.sign({ sub: payload.sub }, secret, {
        expiresIn: config.security.jwtExpiresIn || '24h'
      });
      return { accessToken };
    } catch (e) {
      throw new BusinessError(401, '刷新令牌无效或已过期');
    }
  }

  async logout(): Promise<boolean> {
    // 无状态 JWT 无法真正注销，这里返回成功；如需黑名单请接入 Redis
    return true;
  }
}
