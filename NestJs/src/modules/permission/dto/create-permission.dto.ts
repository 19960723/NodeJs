import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

/**
 * 创建权限 DTO
 */
export class CreatePermissionDto {
  @ApiProperty({ description: '权限名称', example: '创建用户' })
  @IsString()
  @IsNotEmpty({ message: '权限名称不能为空' })
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: '权限代码', example: 'user:create' })
  @IsString()
  @IsNotEmpty({ message: '权限代码不能为空' })
  @MaxLength(50)
  code: string;

  @ApiProperty({ description: '资源类型', example: 'user' })
  @IsString()
  @IsNotEmpty({ message: '资源类型不能为空' })
  @MaxLength(50)
  resource: string;

  @ApiProperty({ description: '操作类型', example: 'create' })
  @IsString()
  @IsNotEmpty({ message: '操作类型不能为空' })
  @MaxLength(20)
  action: string;

  @ApiProperty({ description: '描述', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
