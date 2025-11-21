import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 查询权限 DTO
 */
export class QueryPermissionDto {
  @ApiProperty({ description: '权限名称', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '权限代码', required: false })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: '资源类型', required: false })
  @IsString()
  @IsOptional()
  resource?: string;

  @ApiProperty({ description: '操作类型', required: false })
  @IsString()
  @IsOptional()
  action?: string;

  @ApiProperty({ description: '状态', required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  status?: number;

  @ApiProperty({ description: '页码', required: false, default: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ description: '每页数量', required: false, default: 10 })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  pageSize?: number = 10;
}
