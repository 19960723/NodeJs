import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PrismaService } from '../../../common/repositories/prisma.service';

/**
 * RefreshToken Repository
 * 处理 Refresh Token 数据访问
 */
@Injectable()
export class RefreshTokenRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 创建 Refresh Token
   */
  async create(userId: number, token: string, expiresAt: Date) {
    return this.prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  /**
   * 根据 Token 查询
   */
  async findByToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });
  }

  /**
   * 撤销指定用户的所有 Token
   */
  async revokeAllByUserId(userId: number) {
    return this.prisma.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  /**
   * 撤销指定 Token
   */
  async revokeToken(token: string) {
    return this.prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }

  /**
   * 删除过期的 Token (定时清理)
   */
  async deleteExpired() {
    return this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * 删除用户的指定 Token
   */
  async deleteByToken(token: string) {
    return this.prisma.refreshToken.delete({
      where: { token },
    });
  }
}
