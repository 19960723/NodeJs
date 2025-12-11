import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { DictService } from './dict.service';
import { CreateDictDto, CreateDictItemDto } from './dto/create-dict.dto';
import { UpdateDictDto, UpdateDictItemDto } from './dto/update-dict.dto';
import { QueryDictDto } from './dto/query-dict.dto';
import { Result } from '../../common/dto/result.dto';
import { DictVo, DictItemVo } from './dto/dict.vo';

/**
 * Dict Controller
 * 处理字典相关的 HTTP 请求
 */
@ApiTags('系统字典管理')
@ApiBearerAuth()
@Controller('sys/dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  /**
   * 创建字典
   */
  @Post()
  @ApiOperation({ summary: '创建字典' })
  @ApiResponse({ status: 201, description: '创建成功', type: DictVo })
  async create(@Body() createDictDto: CreateDictDto): Promise<Result<DictVo>> {
    const data = await this.dictService.create(createDictDto);
    return Result.success(data, '创建字典成功');
  }

  /**
   * 分页查询字典列表
   */
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

  /**
   * 更新字典
   */
  @Put(':id')
  @ApiOperation({ summary: '更新字典' })
  @ApiResponse({ status: 200, description: '更新成功', type: DictVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDictDto: UpdateDictDto,
  ): Promise<Result<DictVo>> {
    const dict = await this.dictService.update(id, updateDictDto);
    return Result.success(dict, '更新字典成功');
  }

  /**
   * 删除字典
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除字典' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Result> {
    await this.dictService.remove(id);
    return Result.success(null, '删除字典成功');
  }

  /**
   * 查询字典项列表
   */
  @Get(':id/items')
  @ApiOperation({ summary: '查询字典项列表' })
  @ApiResponse({ status: 200, description: '查询成功', type: DictItemVo })
  async findPageItems(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryPageDto: QueryDictDto,
  ): Promise<Result> {
    const result = await this.dictService.findPageItems(id, queryPageDto);
    return Result.page(
      result.list,
      result.total,
      result.page,
      result.pageSize,
      '查询字典项列表成功',
    );
  }

  /**
   * 创建字典项
   */
  @Post(':id/items')
  @ApiOperation({ summary: '创建字典项' })
  @ApiResponse({ status: 201, description: '创建成功', type: DictItemVo })
  async createItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDictItemDto: CreateDictItemDto,
  ): Promise<Result<DictItemVo>> {
    const item = await this.dictService.createDictItem(id, createDictItemDto);
    return Result.success(item, '创建字典项成功');
  }

  /**
   * 更新字典项
   */
  @Put(':id/items/:itemId')
  @ApiOperation({ summary: '更新字典项' })
  @ApiResponse({ status: 200, description: '更新成功', type: DictItemVo })
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateDictItemDto: UpdateDictItemDto,
  ): Promise<Result<DictItemVo>> {
    const item = await this.dictService.updateDictItem(
      id,
      itemId,
      updateDictItemDto,
    );
    return Result.success(item, '更新字典项成功');
  }

  /**
   * 删除字典项
   */
  @Delete(':id/items/:itemId')
  @ApiOperation({ summary: '删除字典项' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async deleteItem(
    @Param('id', ParseIntPipe) id: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<Result> {
    await this.dictService.deleteDictItem(id, itemId);
    return Result.success(null, '删除字典项成功');
  }
}
