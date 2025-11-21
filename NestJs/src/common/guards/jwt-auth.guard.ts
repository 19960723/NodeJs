import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JWT 认证守卫
 * 默认所有接口都需要 JWT 认证，除非使用 @Public() 装饰器标记
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 检查是否是公开接口
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公开接口，直接放行
    if (isPublic) {
      return true;
    }

    // 否则进行 JWT 认证
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // 如果有错误或者用户不存在，抛出未授权异常
    if (err || !user) {
      throw err || new UnauthorizedException('登录已过期，请重新登录');
    }
    return user;
  }
}
