import { ApiProperty } from '@nestjs/swagger';
import { PermissionType } from './create-permission.dto';

/**
 * 权限返回 VO（RBAC 标准模型）
 */
export class PermissionVo {
  @ApiProperty({ description: '权限ID' })
  id: number;

  @ApiProperty({ description: '父权限ID' })
  parentId?: number;

  @ApiProperty({ description: '权限名称' })
  name: string;

  @ApiProperty({ description: '权限代码' })
  perms?: string;

  @ApiProperty({ description: '权限类型: M-目录 C-菜单 A-按钮 API-纯API' })
  type: PermissionType;

  @ApiProperty({ description: '显示标题' })
  title?: string;

  @ApiProperty({ description: '图标' })
  icon?: string;

  @ApiProperty({ description: '路由路径' })
  path?: string;

  @ApiProperty({ description: '组件路径' })
  component?: string;

  @ApiProperty({ description: '重定向路径' })
  redirect?: string;

  @ApiProperty({ description: '是否显示' })
  visible: boolean;

  @ApiProperty({ description: '是否缓存' })
  keepAlive: boolean;

  @ApiProperty({ description: '描述' })
  description?: string;

  @ApiProperty({ description: '扩展配置' })
  metadata?: any;

  @ApiProperty({ description: '排序' })
  sort: number;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '子权限', required: false, type: [PermissionVo] })
  children?: PermissionVo[];
}

/**
 * 权限树 VO
 */
export class PermissionTreeVo {
  @ApiProperty({ description: '权限ID' })
  id: number;

  @ApiProperty({ description: '父权限ID' })
  parentId?: number;

  @ApiProperty({ description: '权限名称' })
  name: string;

  @ApiProperty({ description: '显示标题' })
  title?: string;

  @ApiProperty({ description: '权限类型' })
  type: number;

  @ApiProperty({ description: '权限代码' })
  perms?: string;

  @ApiProperty({ description: '图标' })
  icon?: string;

  @ApiProperty({ description: '路由路径' })
  path?: string;

  @ApiProperty({ description: '组件路径' })
  component?: string;

  @ApiProperty({ description: '是否显示' })
  visible: boolean;

  @ApiProperty({ description: '排序' })
  sort: number;

  @ApiProperty({ description: '子权限', type: [PermissionTreeVo] })
  children: PermissionTreeVo[];
}

/**
 * 用户权限信息 VO
 */
export class UserPermissionsVo {
  @ApiProperty({ description: '权限代码列表', type: [String] })
  permissions: string[];

  @ApiProperty({ description: '菜单树', type: [PermissionVo] })
  menus: PermissionVo[];
}
