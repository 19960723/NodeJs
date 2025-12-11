import { Injectable, Logger } from '@nestjs/common';
import { Dict, DictItem, Prisma } from '@prisma/client';
import { CreateDictDto, CreateDictItemDto } from './dto/create-dict.dto';
import { UpdateDictDto, UpdateDictItemDto } from './dto/update-dict.dto';
import { QueryDictDto } from './dto/query-dict.dto';
import { DictVo, DictItemVo } from './dto/dict.vo';
import { DictRepository } from './repositories/dict.repository';
import { BusinessError } from '../../common/exceptions/business.exception';

/**
 * Dict Service
 * 处理字典相关业务逻辑
 */
@Injectable()
export class DictService {
  private readonly logger = new Logger(DictService.name);
  constructor(private readonly dictRepository: DictRepository) {}

  /**
   * 创建字典
   */
  async create(createDictDto: CreateDictDto): Promise<DictVo> {
    const { code } = createDictDto;

    // 检查字典编码是否已存在
    const existingCode = await this.dictRepository.findByCode(code);
    if (existingCode) {
      BusinessError.conflict('字典编码已存在');
    }

    // 创建字典
    const dict = await this.dictRepository.create(createDictDto);

    this.logger.log(`创建字典成功: ${dict.name}`);

    return this.toDictVo(dict);
  }

  /**
   * 分页查询字典列表
   */
  async findPage(queryDictDto: QueryDictDto): Promise<{
    list: DictVo[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const { page, pageSize, keyword } = queryDictDto;
    const where: Prisma.DictWhereInput = {};
    if (keyword) {
      where.OR = [
        { name: { contains: keyword } },
        { code: { contains: keyword } },
      ];
    }
    // 查询数据
    const [dicts, total] = await Promise.all([
      this.dictRepository.findMany({
        where,
        skip: (page! - 1) * pageSize!,
        take: pageSize!,
        orderBy: { createdAt: 'desc' },
      }),
      this.dictRepository.count(where),
    ]);
    return {
      list: dicts.map((dict) => this.toDictVo(dict)),
      total,
      page: page!,
      pageSize: pageSize!,
      totalPages: Math.ceil(total / pageSize!),
    };
  }

  /**
   * 更新字典
   */
  async update(id: number, updateDictDto: UpdateDictDto): Promise<DictVo> {
    // 检查字典是否存在
    const dict = await this.dictRepository.findById(id);
    if (!dict) {
      BusinessError.notFound('字典不存在');
    }

    // 如果更新字典编码，检查是否已被其他字典使用
    if (updateDictDto.code) {
      const existingCode = await this.dictRepository.findByCode(
        updateDictDto.code,
      );
      if (existingCode && existingCode.id !== id) {
        BusinessError.conflict('字典编码已被其他字典使用');
      }
    }

    // 更新字典
    const updatedDict = await this.dictRepository.update(id, updateDictDto);

    this.logger.log(`更新字典成功: ${updatedDict.name}`);

    return this.toDictVo(updatedDict);
  }

  /**
   * 删除字典
   */
  async remove(id: number): Promise<void> {
    // 检查字典是否存在
    const dict = await this.dictRepository.findById(id);
    if (!dict) {
      BusinessError.notFound('字典不存在');
    }
    await this.dictRepository.delete(id);
    this.logger.log(`删除字典成功: ${dict.code}`);
  }

  /**
   * 创建字典项
   */
  async createDictItem(
    dictId: number,
    createDictItemDto: CreateDictItemDto,
  ): Promise<DictItemVo> {
    const { value } = createDictItemDto;

    // 检查字典值是否已存在
    const existingItem = await this.dictRepository.findItemByValue(
      dictId,
      value,
    );
    if (existingItem) {
      BusinessError.conflict('字典值已存在');
    }
    const dictItem = await this.dictRepository.createItem(
      dictId,
      createDictItemDto,
    );
    return this.toDictItemVo(dictItem);
  }

  /**
   * 更新字典项
   */
  async updateDictItem(
    dictId: number,
    itemId: number,
    updateDictItemDto: UpdateDictItemDto,
  ): Promise<DictItemVo> {
    const dictItem = await this.dictRepository.findDictItemById(dictId, itemId);
    if (!dictItem) {
      BusinessError.notFound('字典项不存在');
    }
    const updatedDictItem = await this.dictRepository.updateDictItem(
      dictId,
      itemId,
      updateDictItemDto,
    );
    return this.toDictItemVo(updatedDictItem);
  }

  /**
   * 删除字典项
   */
  async deleteDictItem(dictId: number, itemId: number): Promise<void> {
    const dictItem = await this.dictRepository.findDictItemById(dictId, itemId);
    if (!dictItem) {
      BusinessError.notFound('字典项不存在');
    }
    await this.dictRepository.deleteDictItem(dictId, itemId);
  }

  /**
   * 分页查询字典项
   */
  async findPageItems(
    dictId: number,
    queryDictDto: QueryDictDto,
  ): Promise<{
    list: DictItemVo[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const { page = 1, pageSize = 10, keyword } = queryDictDto;
    const where: Prisma.DictItemWhereInput = {
      dictId,
    };

    if (keyword) {
      where.OR = [
        { label: { contains: keyword } },
        { value: { contains: keyword } },
      ];
    }

    const [items, total] = await Promise.all([
      this.dictRepository.findManyDictItems({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.dictRepository.countDictItems(where),
    ]);

    return {
      list: items.map((item) => this.toDictItemVo(item)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  private toDictVo(dict: Dict): DictVo {
    return dict as DictVo;
  }

  private toDictItemVo(item: DictItem): DictItemVo {
    return item as DictItemVo;
  }
}
