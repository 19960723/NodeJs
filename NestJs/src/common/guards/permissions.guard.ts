import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PrismaService } from '../repositories/prisma.service';

/**
 * 权限守卫
 * 检查用户是否拥有所需权限
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取所需权限
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // 获取请求中的用户信息
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    // 查询用户的权限 (通过角色)
    const userWithPermissions = await this.prisma.user.findUnique({
      where: { id: user.userId },
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

    if (!userWithPermissions) {
      return false;
    }

    // 提取用户的所有权限代码
    const userPermissionCodes = userWithPermissions.roles
      .flatMap((ur) => ur.role.permissions)
      .map((rp) => rp.permission.code);

    // 检查用户是否拥有所需的所有权限 (AND 逻辑)
    return requiredPermissions.every((permission) =>
      userPermissionCodes.includes(permission),
    );
  }
}
