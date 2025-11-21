import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../../common/dto/page.dto';

/**
 * 查询角色列表 DTO
 */
export class QueryRoleDto extends PageDto {
  @ApiPropertyOptional({ description: '角色名称（模糊搜索）', example: '管理' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: '角色编码（模糊搜索）',
    example: 'ADMIN',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: '状态：1-正常，0-禁用', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  status?: number;
}
