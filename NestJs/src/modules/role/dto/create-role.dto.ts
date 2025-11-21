import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 创建角色 DTO
 */
export class CreateRoleDto {
  @ApiProperty({
    description: '角色名称',
    example: '管理员',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: '角色名称必须是字符串' })
  @MinLength(2, { message: '角色名称最少 2 个字符' })
  @MaxLength(50, { message: '角色名称最多 50 个字符' })
  name: string;

  @ApiProperty({
    description: '角色编码',
    example: 'ADMIN',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: '角色编码必须是字符串' })
  @MinLength(2, { message: '角色编码最少 2 个字符' })
  @MaxLength(50, { message: '角色编码最多 50 个字符' })
  @Matches(/^[A-Z_]+$/, { message: '角色编码只能包含大写字母和下划线' })
  code: string;

  @ApiPropertyOptional({ description: '角色描述', example: '系统管理员角色' })
  @IsOptional()
  @IsString({ message: '角色描述必须是字符串' })
  @MaxLength(255, { message: '角色描述最多 255 个字符' })
  description?: string;
}
