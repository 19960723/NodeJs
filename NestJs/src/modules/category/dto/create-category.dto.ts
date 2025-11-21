import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 创建分类 DTO
 */
export class CreateCategoryDto {
  @ApiProperty({
    description: '分类名称',
    example: '技术文章',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: '分类名称必须是字符串' })
  @MinLength(2, { message: '分类名称最少 2 个字符' })
  @MaxLength(50, { message: '分类名称最多 50 个字符' })
  name: string;

  @ApiProperty({
    description: '分类标识',
    example: 'tech',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: '分类标识必须是字符串' })
  @MinLength(2, { message: '分类标识最少 2 个字符' })
  @MaxLength(50, { message: '分类标识最多 50 个字符' })
  @Matches(/^[a-z0-9-]+$/, {
    message: '分类标识只能包含小写字母、数字和短横线',
  })
  slug: string;

  @ApiPropertyOptional({ description: '分类描述', example: '技术相关的文章' })
  @IsOptional()
  @IsString({ message: '分类描述必须是字符串' })
  @MaxLength(255, { message: '分类描述最多 255 个字符' })
  description?: string;

  @ApiPropertyOptional({ description: '父分类 ID', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '父分类 ID 必须是整数' })
  @Min(1, { message: '父分类 ID 必须大于 0' })
  parentId?: number;

  @ApiPropertyOptional({ description: '排序值', example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '排序值必须是整数' })
  @Min(0, { message: '排序值不能小于 0' })
  sort?: number;
}
