import { ApiProperty } from '@nestjs/swagger';

/**
 * 分类返回 VO
 */
export class CategoryVo {
  @ApiProperty({ description: '分类 ID' })
  id: number;

  @ApiProperty({ description: '分类名称' })
  name: string;

  @ApiProperty({ description: '分类标识' })
  slug: string;

  @ApiProperty({ description: '分类描述', required: false })
  description?: string;

  @ApiProperty({ description: '父分类 ID', required: false })
  parentId?: number;

  @ApiProperty({ description: '排序值' })
  sort: number;

  @ApiProperty({ description: '状态：1-正常，0-禁用' })
  status: number;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
