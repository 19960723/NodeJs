import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginVo } from './dto/auth.vo';
import { UserVo } from '../user/dto/user.vo';
import { BusinessError } from '../../common/exceptions/business.exception';
import { HashUtil } from '../../common/utils/hash.util';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { RedisService } from '../../common/redis/redis.service';
import { PrismaService } from '../../common/repositories/prisma.service';

/**
 * Auth Service
 * 处理认证相关业务逻辑
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * 用户注册
   */
  async register(registerDto: RegisterDto): Promise<LoginVo> {
    const { username, email, password } = registerDto;

    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      BusinessError.conflict('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      BusinessError.conflict('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await HashUtil.hashPassword(password);

    // 创建用户
    const user = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      nickname: username, // 默认昵称为用户名
    });

    this.logger.log(`用户注册成功: ${user.username}`);

    // 生成 Token 并返回
    return this.generateToken(user);
  }

  /**
   * 用户登录
   */
  async login(loginDto: LoginDto): Promise<LoginVo> {
    const { username, password } = loginDto;

    // 查询用户（支持用户名或邮箱登录）
    let user = await this.userRepository.findByUsername(username);
    if (!user) {
      user = await this.userRepository.findByEmail(username);
    }

    if (!user) {
      BusinessError.invalidCredentials('用户名或密码错误');
    }

    // 检查用户状态
    if (user.status === 0) {
      BusinessError.userDisabled('账号已被禁用');
    }

    // 验证密码
    const isPasswordValid = await HashUtil.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      BusinessError.invalidCredentials('用户名或密码错误');
    }

    this.logger.log(`用户登录成功: ${user.username}`);

    // 生成 Token 并返回
    return this.generateToken(user);
  }

  /**
   * 获取当前登录用户信息
   */
  async getCurrentUser(userId: number): Promise<UserVo> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      BusinessError.notFound('用户不存在');
    }

    return this.toUserVo(user);
  }

  /**
   * 缓存用户角色和权限 (预热)
   */
  private async cacheUserPermissions(userId: number): Promise<void> {
    try {
      // 查询用户角色和权限
      const userWithRoles = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!userWithRoles) return;

      // 1. 缓存角色
      const userRoleCodes = userWithRoles.roles.map((ur) => ur.role.code);
      const rolesKey = `auth:roles:${userId}`;
      await this.redisService.setJSON(rolesKey, userRoleCodes, 3600);
      this.logger.debug(
        `Cached roles for user ${userId}: ${userRoleCodes.join(', ')}`,
      );

      // 2. 缓存权限
      const userPermissionCodes = userWithRoles.roles
        .flatMap((ur) => ur.role.permissions)
        .map((rp) => rp.permission.code);
      const permissionsKey = `auth:permissions:${userId}`;
      await this.redisService.setJSON(
        permissionsKey,
        userPermissionCodes,
        3600,
      );
      this.logger.debug(
        `Cached permissions for user ${userId}: ${userPermissionCodes.length} items`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to cache permissions for user ${userId}`,
        error,
      );
    }
  }

  /**
   * 生成 JWT Token (双令牌机制)
   */
  private async generateToken(user: User): Promise<LoginVo> {
    // 异步预热缓存
    this.cacheUserPermissions(user.id);

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    // 生成 Access Token
    const accessToken = this.jwtService.sign(payload);

    // 生成 Refresh Token (使用随机字符串)
    const refreshToken = this.generateRefreshToken();

    // 计算过期时间
    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d';
    const expiresAt = this.calculateExpiryDate(refreshExpiresIn);

    // 存储 Refresh Token 到数据库
    await this.refreshTokenRepository.create(user.id, refreshToken, expiresAt);

    // Access Token 过期时间 (秒)
    const accessExpiresIn = this.parseExpiresIn(
      this.configService.get<string>('JWT_EXPIRES_IN') || '7d',
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: accessExpiresIn,
      user: this.toUserVo(user),
    };
  }

  /**
   * 生成随机 Refresh Token
   */
  private generateRefreshToken(): string {
    return randomBytes(64).toString('hex');
  }

  /**
   * 计算过期日期
   */
  private calculateExpiryDate(expiresIn: string): Date {
    const seconds = this.parseExpiresIn(expiresIn);
    return new Date(Date.now() + seconds * 1000);
  }

  /**
   * 解析过期时间字符串 (如 7d, 30d, 1h) 转换为秒
   */
  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([dhms])$/);
    if (!match) {
      throw new Error('Invalid expiresIn format');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };

    return value * multipliers[unit];
  }

  /**
   * 刷新 Access Token
   */
  async refreshToken(refreshToken: string): Promise<LoginVo> {
    // 验证 Refresh Token
    const tokenRecord =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (!tokenRecord) {
      BusinessError.refreshTokenInvalid('Refresh Token 无效');
    }

    // 检查是否已撤销
    if (tokenRecord.isRevoked) {
      BusinessError.refreshTokenRevoked('Refresh Token 已被撤销');
    }

    // 检查是否过期
    if (new Date() > tokenRecord.expiresAt) {
      // 删除过期 token
      await this.refreshTokenRepository.deleteByToken(refreshToken);
      BusinessError.refreshTokenExpired('Refresh Token 已过期');
    }

    // 检查用户状态
    const user = tokenRecord.user;
    if (user.status === 0) {
      BusinessError.userDisabled('账号已被禁用');
    }

    // 撤销旧的 refresh token
    await this.refreshTokenRepository.revokeToken(refreshToken);

    this.logger.log(`Refresh token for user: ${user.username}`);

    // 生成新的 token 对
    return this.generateToken(user);
  }

  /**
   * 登出 (撤销 Refresh Token)
   */
  async logout(refreshToken: string): Promise<void> {
    const tokenRecord =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (tokenRecord) {
      await this.refreshTokenRepository.revokeToken(refreshToken);
      this.logger.log(`User logged out: ${tokenRecord.user.username}`);
    }
  }

  /**
   * 撤销用户所有 Token
   */
  async revokeAllTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository.revokeAllByUserId(userId);
    this.logger.log(`All tokens revoked for user ID: ${userId}`);
  }

  /**
   * 转换为 UserVo（隐藏敏感信息）
   */
  private toUserVo(user: User): UserVo {
    const { password, ...userVo } = user;
    return userVo as UserVo;
  }
}
