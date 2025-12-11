import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../../common/dto/page.dto';

/**
 * 查询字典列表 DTO
 */
export class QueryDictDto extends PageDto {
  @ApiPropertyOptional({ description: '搜索关键字 (字典名称/编码)', example: '字典' })
  @IsOptional()
  @IsString({ message: '关键字必须是字符串' })
  keyword?: string;
}
