import { ApiProperty } from '@nestjs/swagger';
import { UserVo } from '../../user/dto/user.vo';
import { CategoryVo } from '../../category/dto/category.vo';

/**
 * 文章返回 VO
 */
export class ArticleVo {
  @ApiProperty({ description: '文章 ID' })
  id: number;

  @ApiProperty({ description: '文章标题' })
  title: string;

  @ApiProperty({ description: '文章标识' })
  slug: string;

  @ApiProperty({ description: '文章摘要', required: false })
  summary?: string;

  @ApiProperty({ description: '文章内容' })
  content: string;

  @ApiProperty({ description: '封面图', required: false })
  cover?: string;

  @ApiProperty({ description: '作者 ID' })
  authorId: number;

  @ApiProperty({ description: '分类 ID' })
  categoryId: number;

  @ApiProperty({ description: '浏览次数' })
  viewCount: number;

  @ApiProperty({ description: '点赞次数' })
  likeCount: number;

  @ApiProperty({ description: '状态：1-已发布，0-草稿' })
  status: number;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '作者信息', type: UserVo, required: false })
  author?: UserVo;

  @ApiProperty({ description: '分类信息', type: CategoryVo, required: false })
  category?: CategoryVo;
}
