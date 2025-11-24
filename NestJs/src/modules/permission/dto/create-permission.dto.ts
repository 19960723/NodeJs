import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsJSON,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

/**
 * 权限类型枚举
 */
export enum PermissionType {
  DIRECTORY = 1, // 目录
  MENU = 2, // 菜单
  BUTTON = 3, // 按钮
  API = 4, // 纯API
}

/**
 * 创建权限 DTO（RBAC 标准模型）
 */
export class CreatePermissionDto {
  // ========== 基本信息 ==========
  @ApiProperty({ description: '父权限ID', required: false, example: 1 })
  @IsInt()
  @IsOptional()
  parentId?: number;

  @ApiProperty({
    description: '权限名称（英文标识）',
    example: 'UserManage',
  })
  @IsString()
  @IsNotEmpty({ message: '权限名称不能为空' })
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: '权限代码（目录类型可为空）',
    required: false,
    example: 'user:create',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  code?: string;

  @ApiProperty({
    description: '权限类型：1-目录 2-菜单 3-按钮 4-API',
    enum: PermissionType,
    example: PermissionType.MENU,
  })
  @IsInt()
  @IsNotEmpty({ message: '权限类型不能为空' })
  type: PermissionType;

  // ========== 前端展示字段 ==========
  @ApiProperty({
    description: '显示标题（中文）',
    required: false,
    example: '用户管理',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @ApiProperty({
    description: '图标名称',
    required: false,
    example: 'UserOutlined',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  icon?: string;

  @ApiProperty({
    description: '路由路径',
    required: false,
    example: '/system/user',
  })
  @ValidateIf(
    (o) =>
      o.type === PermissionType.DIRECTORY || o.type === PermissionType.MENU,
  )
  @IsString()
  @IsOptional()
  @MaxLength(200)
  path?: string;

  @ApiProperty({
    description: '组件路径',
    required: false,
    example: '/system/user/index',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  component?: string;

  @ApiProperty({
    description: '重定向路径',
    required: false,
    example: '/system/user',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  redirect?: string;

  @ApiProperty({
    description: '是否在菜单中显示',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  visible?: boolean;

  @ApiProperty({
    description: '页面是否缓存',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  keepAlive?: boolean;

  // ========== 扩展字段 ==========
  @ApiProperty({
    description: '描述说明',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: '扩展配置（JSON格式）',
    required: false,
    example: { dataScope: 'self' },
  })
  @IsOptional()
  metadata?: any;

  @ApiProperty({
    description: '排序号',
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  sort?: number;
}
