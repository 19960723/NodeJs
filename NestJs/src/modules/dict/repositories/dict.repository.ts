import { Injectable } from '@nestjs/common';
import { Dict, DictItem, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/repositories/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { CreateDictItemDto } from '../dto/create-dict.dto';

/**
 * Dict Repository
 * 负责字典数据库操作
 */
@Injectable()
export class DictRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * 创建字典
   */
  async create(data: Prisma.DictCreateInput): Promise<Dict> {
    return this.prisma.dict.create({ data });
  }

  /**
   * 更新字典
   */
  async update(id: number, data: Prisma.DictUpdateInput): Promise<Dict> {
    return this.prisma.dict.update({
      where: { id },
      data,
    });
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

  /**
   * 统计字典数量
   */
  async count(where?: Prisma.DictWhereInput): Promise<number> {
    return this.prisma.dict.count({ where });
  }

  /**
   * 根据字典编码查询字典
   */
  async findByCode(code: string): Promise<Dict | null> {
    return this.prisma.dict.findUnique({ where: { code } });
  }

  /**
   * 根据 ID 查询字典
   */
  async findById(id: number): Promise<Dict | null> {
    return this.prisma.dict.findUnique({
      where: { id },
    });
  }

  /**
   * 删除字典
   */
  async delete(id: number): Promise<Dict> {
    return this.prisma.dict.delete({
      where: { id },
    });
  }

  /**
   * 根据字典 ID 查询字典项列表
   */
  async findItems(id: number): Promise<DictItem[]> {
    return this.prisma.dictItem.findMany({
      where: { dictId: id },
    });
  }

  /**
   * 根据字典 ID 和字典值查询字典项
   */
  async findItemByValue(id: number, value: string): Promise<DictItem | null> {
    return this.prisma.dictItem.findUnique({
      where: { dictId_value: { dictId: id, value } },
    });
  }

  /**
   * 创建字典项
   */
  async createItem(id: number, data: CreateDictItemDto): Promise<DictItem> {
    return this.prisma.dictItem.create({
      data: { ...data, dictId: id },
    });
  }

  /**
   * 分页查询字典项列表
   */
  async findManyDictItems(params: {
    skip?: number;
    take?: number;
    where?: Prisma.DictItemWhereInput;
    orderBy?: Prisma.DictItemOrderByWithRelationInput;
  }): Promise<DictItem[]> {
    const { skip, take, where, orderBy } = params;
    return await this.prisma.dictItem.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /**
   * 统计字典项数量
   */
  async countDictItems(where?: Prisma.DictItemWhereInput): Promise<number> {
    return this.prisma.dictItem.count({ where });
  }

  /**
   * 根据字典 ID 和字典项 ID 查询字典项
   */
  async findDictItemById(
    dictId: number,
    itemId: number,
  ): Promise<DictItem | null> {
    return this.prisma.dictItem.findUnique({
      where: { id: itemId, dictId },
    });
  }

  /**
   * 删除字典项
   */
  async deleteDictItem(dictId: number, itemId: number): Promise<DictItem> {
    return this.prisma.dictItem.delete({
      where: { id: itemId, dictId },
    });
  }

  /**
   * 更新字典项
   */
  async updateDictItem(
    dictId: number,
    itemId: number,
    data: Prisma.DictItemUpdateInput,
  ): Promise<DictItem> {
    return this.prisma.dictItem.update({
      where: { id: itemId, dictId },
      data: { ...data },
    });
  }
}
