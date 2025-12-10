import { Injectable } from '@nestjs/common';
import { Dict, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/repositories/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DictRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 分页查询字典列表
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.DictWhereInput;
    orderBy?: Prisma.DictOrderByWithRelationInput;
  }): Promise<Dict[]> {
    const { skip, take, where, orderBy } = params;
    return await this.prisma.dict.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }
}
