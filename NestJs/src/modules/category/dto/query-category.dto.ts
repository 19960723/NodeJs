import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../../common/dto/page.dto';

/**
 * 查询分类列表 DTO
 */
export class QueryCategoryDto extends PageDto {
  @ApiPropertyOptional({ description: '分类名称（模糊搜索）', example: '技术' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '分类标识', example: 'tech' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: '父分类 ID', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  parentId?: number;

  @ApiPropertyOptional({ description: '状态：1-正常，0-禁用', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  status?: number;
}
