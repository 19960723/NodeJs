import {
  IsString,
  IsInt,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 创建文章 DTO
 */
export class CreateArticleDto {
  @ApiProperty({
    description: '文章标题',
    example: 'NestJS 企业级开发实践',
    minLength: 5,
    maxLength: 200,
  })
  @IsString({ message: '文章标题必须是字符串' })
  @MinLength(5, { message: '文章标题最少 5 个字符' })
  @MaxLength(200, { message: '文章标题最多 200 个字符' })
  title: string;

  @ApiProperty({
    description: '文章标识',
    example: 'nestjs-enterprise-practice',
    minLength: 5,
    maxLength: 200,
  })
  @IsString({ message: '文章标识必须是字符串' })
  @MinLength(5, { message: '文章标识最少 5 个字符' })
  @MaxLength(200, { message: '文章标识最多 200 个字符' })
  @Matches(/^[a-z0-9-]+$/, {
    message: '文章标识只能包含小写字母、数字和短横线',
  })
  slug: string;

  @ApiPropertyOptional({
    description: '文章摘要',
    example: '本文介绍 NestJS 企业级开发的最佳实践...',
  })
  @IsOptional()
  @IsString({ message: '文章摘要必须是字符串' })
  summary?: string;

  @ApiProperty({
    description: '文章内容',
    example: '## 介绍\n\nNestJS 是一个...',
  })
  @IsString({ message: '文章内容必须是字符串' })
  @MinLength(10, { message: '文章内容最少 10 个字符' })
  content: string;

  @ApiPropertyOptional({
    description: '封面图 URL',
    example: 'https://example.com/cover.jpg',
  })
  @IsOptional()
  @IsString({ message: '封面图必须是字符串' })
  cover?: string;

  @ApiProperty({ description: '分类 ID', example: 1 })
  @Type(() => Number)
  @IsInt({ message: '分类 ID 必须是整数' })
  @Min(1, { message: '分类 ID 必须大于 0' })
  categoryId: number;
}
