import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../../common/dto/page.dto';

/**
 * 查询字典列表 DTO
 */
export class QueryDictDto extends PageDto {
  @ApiPropertyOptional({ description: '关键词（模糊搜索）', example: '字典' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
