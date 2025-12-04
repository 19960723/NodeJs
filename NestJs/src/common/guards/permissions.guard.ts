import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PrismaService } from '../repositories/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-codes';

/**
 * 权限守卫
 * 检查用户是否拥有所需权限
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private redisService: RedisService,
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
      throw new BusinessException('未登录，请先登录', ErrorCode.UNAUTHORIZED);
    }

    // 尝试从 Redis 获取缓存
    const cacheKey = `auth:permissions:${user.userId}`;
    this.logger.debug(`Cache key: ${cacheKey}`);
    const userPermissionCodes =
      await this.redisService.getJSON<string[]>(cacheKey);

    if (userPermissionCodes) {
      this.logger.debug(`Cache hit for user ${user.userId}`);
      this.logger.debug(
        `User permissions: ${JSON.stringify(userPermissionCodes)}`,
      );
    } else {
      this.logger.debug(`Cache miss for user ${user.userId}`);
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
        throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
      }
      console.log(userWithPermissions, 'userWithPermissions', user.userId);
      // 提取用户的所有权限代码
      const dbPermissionCodes = userWithPermissions.roles
        .flatMap((ur) => ur.role.permissions)
        .map((rp) => rp.permission.perms);

      // 写入缓存，设置 1 小时过期
      await this.redisService.setJSON(cacheKey, dbPermissionCodes, 3600);

      // 赋值给局部变量以供后续检查
      // 注意：这里需要强制类型转换或者重新赋值，因为 TypeScript 会推断类型不匹配
      // 但实际上逻辑是一致的，我们直接用新变量名更清晰
      return this.checkPermissions(requiredPermissions, dbPermissionCodes);
    }
    return this.checkPermissions(requiredPermissions, userPermissionCodes);
  }

  private checkPermissions(
    requiredPermissions: string[],
    userPermissionCodes: (string | null)[],
  ): boolean {
    // 检查用户是否拥有所需的所有权限 (AND 逻辑)
    const hasAllPermissions = requiredPermissions.every((permission) =>
      userPermissionCodes.includes(permission),
    );

    if (!hasAllPermissions) {
      throw new BusinessException(
        `权限不足，需要权限: ${requiredPermissions.join(', ')}`,
        ErrorCode.INSUFFICIENT_PERMISSIONS,
      );
    }

    return true;
  }
}
