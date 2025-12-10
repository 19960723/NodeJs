import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { QueryDictDto } from './dto/query-dict.dto';
import { Result } from '../../common/dto/result.dto';

@Controller('sys/dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post()
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Get()
  @ApiOperation({ summary: '查询字典列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findPage(@Query() queryDictDto: QueryDictDto): Promise<Result> {
    const result = await this.dictService.findPage(queryDictDto);
    return Result.page(
      result.list,
      result.total,
      result.page,
      result.pageSize,
      '查询字典列表成功',
    );
  }

  @Get('all')
  findAll() {
    return this.dictService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(+id, updateDictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictService.remove(+id);
  }
}
