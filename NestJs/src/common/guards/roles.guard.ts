import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../repositories/prisma.service';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-codes';

/**
 * 角色守卫
 * 检查用户是否拥有所需角色
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取所需角色
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 获取请求中的用户信息
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new BusinessException('未登录，请先登录', ErrorCode.UNAUTHORIZED);
    }

    // 查询用户的角色
    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!userWithRoles) {
      throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
    }

    // 提取用户的角色代码
    const userRoleCodes = userWithRoles.roles.map((ur) => ur.role.code);

    // 检查用户是否拥有所需的任一角色 (OR 逻辑)
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoleCodes.includes(role),
    );

    if (!hasRequiredRole) {
      throw new BusinessException(
        `权限不足，需要以下角色之一: ${requiredRoles.join(', ')}`,
        ErrorCode.INSUFFICIENT_PERMISSIONS,
      );
    }

    return true;
  }
}
