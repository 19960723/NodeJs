import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 登录 DTO
 */
export class LoginDto {
  @ApiProperty({ description: '用户名或邮箱', example: 'zhangsan' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @ApiProperty({ description: '密码', example: 'Password123' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码最少 6 个字符' })
  password: string;
}
