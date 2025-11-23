import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-codes';

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
    // 如果有明确的错误，直接抛出
    if (err) {
      throw err;
    }

    // 如果用户不存在，根据 info 判断具体原因
    if (!user) {
      // JWT 验证失败的详细信息
      if (info) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const infoName = info.name as string;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const infoMessage = info.message as string;

        // Token 过期
        if (infoName === 'TokenExpiredError') {
          throw new BusinessException(
            'Token 已过期，请重新登录',
            ErrorCode.TOKEN_EXPIRED,
          );
        }

        // Token 无效
        if (infoName === 'JsonWebTokenError') {
          throw new BusinessException('Token 无效', ErrorCode.TOKEN_INVALID);
        }

        // Token 格式错误或其他错误
        if (infoMessage) {
          throw new BusinessException(infoMessage, ErrorCode.TOKEN_INVALID);
        }
      }

      // 没有提供 Token
      throw new BusinessException('未登录，请先登录', ErrorCode.TOKEN_MISSING);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
