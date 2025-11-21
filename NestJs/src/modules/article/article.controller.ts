import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { ArticleVo } from './dto/article.vo';
import { Result } from '../../common/dto/result.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Public } from '../../common/decorators/public.decorator';

/**
 * Article Controller
 * 处理文章相关的 HTTP 请求
 */
@ApiTags('文章管理')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * 创建文章
   */
  @Post()
  @ApiOperation({ summary: '创建文章' })
  @ApiResponse({ status: 200, description: '创建成功', type: ArticleVo })
  async create(
    @CurrentUser('userId') userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Result<ArticleVo>> {
    const article = await this.articleService.create(userId, createArticleDto);
    return Result.success(article, '创建文章成功');
  }

  /**
   * 分页查询文章列表（公开接口）
   */
  @Public()
  @Get()
  @ApiOperation({ summary: '查询文章列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findAll(@Query() queryArticleDto: QueryArticleDto): Promise<Result> {
    const result = await this.articleService.findAll(queryArticleDto);
    return Result.page(
      result.list,
      result.total,
      result.page,
      result.pageSize,
      '查询文章列表成功',
    );
  }

  /**
   * 根据 ID 查询文章（公开接口）
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: '查询文章详情' })
  @ApiResponse({ status: 200, description: '查询成功', type: ArticleVo })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<ArticleVo>> {
    const article = await this.articleService.findById(id);
    return Result.success(article, '查询文章详情成功');
  }

  /**
   * 根据标识查询文章（公开接口）
   */
  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: '根据标识查询文章' })
  @ApiResponse({ status: 200, description: '查询成功', type: ArticleVo })
  async findBySlug(@Param('slug') slug: string): Promise<Result<ArticleVo>> {
    const article = await this.articleService.findBySlug(slug);
    return Result.success(article, '查询文章详情成功');
  }

  /**
   * 更新文章
   */
  @Patch(':id')
  @ApiOperation({ summary: '更新文章' })
  @ApiResponse({ status: 200, description: '更新成功', type: ArticleVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Result<ArticleVo>> {
    const article = await this.articleService.update(
      id,
      userId,
      updateArticleDto,
    );
    return Result.success(article, '更新文章成功');
  }

  /**
   * 删除文章
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('userId') userId: number,
  ): Promise<Result<void>> {
    await this.articleService.remove(id, userId);
    return Result.success(undefined, '删除文章成功');
  }

  /**
   * 点赞文章（公开接口）
   */
  @Public()
  @Post(':id/like')
  @ApiOperation({ summary: '点赞文章' })
  @ApiResponse({ status: 200, description: '点赞成功', type: ArticleVo })
  async like(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<ArticleVo>> {
    const article = await this.articleService.like(id);
    return Result.success(article, '点赞成功');
  }
}
