import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../repositories/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-codes';

/**
 * 角色守卫
 * 检查用户是否拥有所需角色
 */
@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private redisService: RedisService,
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

    // 尝试从 Redis 获取缓存
    const cacheKey = `auth:roles:${user.userId}`;
    const cachedRoles = await this.redisService.get(cacheKey);
    let userRoleCodes: string[] = [];

    if (cachedRoles) {
      this.logger.debug(`Cache hit for user ${user.userId}`);
      userRoleCodes = JSON.parse(cachedRoles);
    } else {
      this.logger.debug(`Cache miss for user ${user.userId}`);
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
      userRoleCodes = userWithRoles.roles.map((ur) => ur.role.code);

      // 写入缓存，设置 1 小时过期
      await this.redisService.set(
        cacheKey,
        JSON.stringify(userRoleCodes),
        3600,
      );
    }

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
