import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../../common/dto/page.dto';

/**
 * 查询用户列表 DTO
 */
export class QueryUserDto extends PageDto {
  @ApiPropertyOptional({ description: '用户名（模糊搜索）', example: 'zhang' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: '邮箱（模糊搜索）',
    example: 'example.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: '状态：1-正常，0-禁用', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  status?: number;

  @ApiPropertyOptional({ description: '关键词（模糊搜索）', example: '张三' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
