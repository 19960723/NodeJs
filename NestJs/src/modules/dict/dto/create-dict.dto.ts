import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
} from 'class-validator';

/**
 * 创建字典 DTO
 */
export class CreateDictDto {
  @ApiProperty({
    description: '字典名称',
    example: '性别',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: '字典名称必须是字符串' })
  @MinLength(2, { message: '字典名称最少 2 个字符' })
  @MaxLength(50, { message: '字典名称最多 50 个字符' })
  name: string;

  @ApiProperty({
    description: '字典编码',
    example: 'GENDER',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: '字典编码必须是字符串' })
  @MinLength(2, { message: '字典编码最少 2 个字符' })
  @MaxLength(50, { message: '字典编码最多 50 个字符' })
  @Matches(/^[A-Za-z_]+$/, { message: '字典编码只能包含字母和下划线' })
  code: string;

  @ApiPropertyOptional({ description: '字典描述', example: '描述性文本' })
  @IsOptional()
  @IsString({ message: '字典描述必须是字符串' })
  @MaxLength(255, { message: '字典描述最多 255 个字符' })
  description?: string;
}

/**
 * 创建字典项 DTO
 */
export class CreateDictItemDto {
  @ApiProperty({
    description: '字典项名称',
    example: '男',
    minLength: 1,
    maxLength: 50,
  })
  @IsString({ message: '字典项名称必须是字符串' })
  @MinLength(1, { message: '字典项名称最少 1 个字符' })
  @MaxLength(50, { message: '字典项名称最多 50 个字符' })
  label: string;

  @ApiProperty({
    description: '字典项值',
    example: '1',
  })
  @IsString({ message: '字典项值必须是字符串' })
  @MinLength(1, { message: '字典项值最少 1 个字符' })
  @MaxLength(50, { message: '字典项值最多 50 个字符' })
  value: string;

  @ApiPropertyOptional({ description: '字典项描述', example: '描述性文本' })
  @IsOptional()
  @IsString({ message: '字典项描述必须是字符串' })
  @MaxLength(255, { message: '字典项描述最多 255 个字符' })
  description?: string;
}
