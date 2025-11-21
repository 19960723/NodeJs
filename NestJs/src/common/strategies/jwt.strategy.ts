import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JWT 策略
 * 用于验证 JWT Token 并提取用户信息
 */
export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        'your-secret-key-change-in-production',
    });
  }

  /**
   * 验证 JWT Token 有效性
   * 返回的用户信息会被挂载到 Request.user 上
   */
  async validate(payload: JwtPayload) {
    if (!payload.userId) {
      throw new UnauthorizedException('无效的 Token');
    }

    // 这里可以查询数据库验证用户是否存在、是否被禁用等
    // 当前简化处理，直接返回 payload 中的用户信息
    return {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
    };
  }
}
