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
      throw new BusinessError(401, '用户名或密码错误');
    }

    const hashed = String(user.password || '');
    let passwordOk = false;
    if (hashed.startsWith('$2')) {
      passwordOk = await bcrypt.compare(password, hashed);
    } else {
      passwordOk = hashed === password;
    }
    if (!passwordOk) {
      throw new BusinessError(401, '用户名或密码错误');
    }

    // 获取用户角色和权限
    const models = require('../models').models;
    const MenuService = require('./MenuService').default;
    const menuService = new MenuService(models.Menu);

    const userWithRoles = await models.User.findByPk(user.id, {
      include: [
        {
          model: models.Role,
          as: 'roles',
          where: { status: 1 },
          required: false,
          through: { attributes: [] },
          attributes: ['id', 'code', 'name', 'description']
        }
      ]
    });

    const roles = (userWithRoles as any)?.roles || [];
    const permissions = await menuService.getUserPermissions(user.id);
    const menus = await menuService.getUserMenus(user.id);

    const config = getConfig();
    const secret = config.security.jwtSecret || 'dev-secret';

    // 生成访问令牌
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

    // 生成刷新令牌
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

    const userInfo = {
      id: user.id,
      username: user.username,
      nickname: user['nickname'] || null,
      avatar: user['avatar'] || null,
      roles: roles.map((role: any) => ({
        id: role.id,
        code: role.code,
        name: role.name
      })),
      permissions,
      menus
    };

    return {
      accessToken,
      refreshToken,
      user: userInfo,
      expiresIn: config.security.jwtExpiresIn || '24h'
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
        throw new BusinessError(401, '无效刷新令牌');
      }

      // 验证用户是否仍然存在
      const user = await this.repository.findById(payload.sub);
      if (!user) {
        throw new BusinessError(401, '用户不存在');
      }

      // 生成新的访问令牌
      const accessToken = jwt.sign(
        {
          sub: payload.sub,
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

      return {
        accessToken,
        expiresIn: config.security.jwtExpiresIn || '24h'
      };
    } catch (error) {
      if (error instanceof BusinessError) {
        throw error;
      }
      throw new BusinessError(401, '刷新令牌无效或已过期');
    }
  }

  async logout(): Promise<boolean> {
    // 无状态 JWT 无法真正注销，这里返回成功；如需黑名单请接入 Redis
    return true;
  }
}
