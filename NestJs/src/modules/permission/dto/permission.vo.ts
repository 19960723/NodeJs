import { ApiProperty } from '@nestjs/swagger';

/**
 * 权限返回 VO
 */
export class PermissionVo {
  @ApiProperty({ description: '权限ID' })
  id: number;

  @ApiProperty({ description: '权限名称' })
  name: string;

  @ApiProperty({ description: '权限代码' })
  code: string;

  @ApiProperty({ description: '资源类型' })
  resource: string;

  @ApiProperty({ description: '操作类型' })
  action: string;

  @ApiProperty({ description: '描述' })
  description?: string;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
