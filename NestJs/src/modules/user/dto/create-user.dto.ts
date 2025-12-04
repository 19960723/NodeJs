import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 创建用户 DTO
 */
export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    example: 'zhangsan',
    minLength: 3,
    maxLength: 50,
  })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名最少 3 个字符' })
  @MaxLength(50, { message: '用户名最多 50 个字符' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: '用户名只能包含字母、数字和下划线' })
  username: string;

  @ApiProperty({ description: '邮箱', example: 'zhangsan@example.com' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiPropertyOptional({
    description: '密码',
    example: 'Password123',
    minLength: 6,
    maxLength: 20,
  })
  @IsOptional()
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码最少 6 个字符' })
  @MaxLength(20, { message: '密码最多 20 个字符' })
  password?: string;

  @ApiPropertyOptional({ description: '昵称', example: '张三' })
  @IsOptional()
  @IsString({ message: '昵称必须是字符串' })
  @MaxLength(50, { message: '昵称最多 50 个字符' })
  nickname?: string;

  @ApiPropertyOptional({ description: '姓名', example: '李四' })
  @IsOptional()
  @IsString({ message: '姓名必须是字符串' })
  @MaxLength(50, { message: '姓名最多 50 个字符' })
  name?: string;

  @ApiPropertyOptional({
    description: '头像 URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString({ message: '头像必须是字符串' })
  avatar?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsOptional()
  @IsString({ message: '手机号必须是字符串' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone?: string;

  @ApiPropertyOptional({ description: '性别', example: 1 })
  @IsOptional()
  @IsInt({ message: '性别必须是数字' })
  gender?: number;

  @ApiPropertyOptional({ description: 'remark', example: '备注' })
  @IsOptional()
  @IsString({ message: '备注必须是字符串' })
  @MaxLength(255, { message: '备注最多 255 个字符' })
  remark?: string;
}
