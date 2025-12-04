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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { CategoryVo } from './dto/category.vo';
import { Result } from '../../common/dto/result.dto';
import { Public } from '../../common/decorators/public.decorator';

/**
 * Category Controller
 * 处理分类相关的 HTTP 请求
 */
@ApiTags('分类管理')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 创建分类
   */
  @Post()
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 200, description: '创建成功', type: CategoryVo })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Result<CategoryVo>> {
    const category = await this.categoryService.create(createCategoryDto);
    return Result.success(category, '创建分类成功');
  }

  /**
   * 分页查询分类列表
   */
  @Public()
  @Get()
  @ApiOperation({ summary: '查询分类列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findAll(@Query() queryCategoryDto: QueryCategoryDto): Promise<Result> {
    const result = await this.categoryService.findAll(queryCategoryDto);
    return Result.page(
      result.list,
      result.total,
      result.page,
      result.pageSize,
      '查询分类列表成功',
    );
  }

  /**
   * 根据 ID 查询分类
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: '查询分类详情' })
  @ApiResponse({ status: 200, description: '查询成功', type: CategoryVo })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<CategoryVo>> {
    const category = await this.categoryService.findById(id);
    return Result.success(category, '查询分类详情成功');
  }

  /**
   * 更新分类
   */
  @Put(':id')
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '更新成功', type: CategoryVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Result<CategoryVo>> {
    const category = await this.categoryService.update(id, updateCategoryDto);
    return Result.success(category, '更新分类成功');
  }

  /**
   * 删除分类
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Result<void>> {
    await this.categoryService.remove(id);
    return Result.success(undefined, '删除分类成功');
  }
}
