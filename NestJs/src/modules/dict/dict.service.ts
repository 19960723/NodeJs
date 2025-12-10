import { Injectable } from '@nestjs/common';
import { Dict, Prisma } from '@prisma/client';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { QueryDictDto } from './dto/query-dict.dto';
import { DictVo } from './dto/dict.vo';
import { DictRepository } from './repositories/dict.repository';

@Injectable()
export class DictService {
  constructor(private readonly dictRepository: DictRepository) {}

  create(createDictDto: CreateDictDto) {
    return 'This action adds a new dict';
  }

  async findPage(queryDictDto: QueryDictDto) {
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

  findAll() {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dict`;
  }

  update(id: number, updateDictDto: UpdateDictDto) {
    return `This action updates a #${id} dict`;
  }

  remove(id: number) {
    return `This action removes a #${id} dict`;
  }
  private toDictVo(dict: Dict): DictVo {
    return dict as DictVo;
  }
}
