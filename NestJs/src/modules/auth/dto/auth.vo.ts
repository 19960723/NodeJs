import { ApiProperty } from '@nestjs/swagger';
import { UserVo } from '../../user/dto/user.vo';

/**
 * 登录返回 VO
 */
export class LoginVo {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;

  @ApiProperty({ description: 'Token 过期时间 (秒)' })
  expiresIn: number;

  @ApiProperty({ description: '用户信息', type: UserVo })
  user: UserVo;
}
