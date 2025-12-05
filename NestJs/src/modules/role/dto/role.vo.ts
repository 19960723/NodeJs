import { ApiProperty } from '@nestjs/swagger';
import { UserVo } from 'src/modules/user/dto/user.vo';

/**
 * 角色返回 VO
 */
export class RoleVo {
  @ApiProperty({ description: '角色 ID' })
  id: number;

  @ApiProperty({ description: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色编码' })
  code: string;

  @ApiProperty({ description: '角色描述', required: false })
  description?: string;

  @ApiProperty({ description: '状态：1-正常，0-禁用' })
  status: number;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}

/**
 * 用户角色信息 VO
 */
export class UserRolesVo {
  @ApiProperty({ description: '用户列表', type: [UserVo] })
  users: UserVo[];

  @ApiProperty({ description: '用户ID列表', type: [Number] })
  userIds: number[];
}
