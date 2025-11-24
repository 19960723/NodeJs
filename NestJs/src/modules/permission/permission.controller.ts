import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PermissionVo, UserPermissionsVo } from './dto/permission.vo';
import { Result } from '../../common/dto/result.dto';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';

/**
 * Permission Controller（RBAC 动态权限管理）
 */
@ApiTags('权限管理')
@ApiBearerAuth('JWT')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  /**
   * 获取权限树
   */
  @Get('tree')
  @RequirePermissions('permission:list')
  @ApiOperation({ summary: '获取权限树' })
  @ApiResponse({ status: 200, description: '获取成功', type: [PermissionVo] })
  async getTree(): Promise<Result<PermissionVo[]>> {
    const result = await this.permissionService.getTree();
    return Result.success(result);
  }

  /**
   * 获取当前用户菜单树
   */
  @Get('menu')
  @ApiOperation({ summary: '获取当前用户菜单树' })
  @ApiResponse({ status: 200, description: '获取成功', type: [PermissionVo] })
  async getUserMenu(
    @CurrentUser('userId') userId: number,
  ): Promise<Result<PermissionVo[]>> {
    const result = await this.permissionService.getUserMenuTree(userId);
    return Result.success(result);
  }

  /**
   * 获取当前用户的权限信息（包含权限代码列表和菜单树）
   */
  @Get('user/permissions')
  @ApiOperation({ summary: '获取当前用户的权限信息' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
    type: UserPermissionsVo,
  })
  async getUserPermissions(
    @CurrentUser('userId') userId: number,
  ): Promise<Result<UserPermissionsVo>> {
    const result = await this.permissionService.getUserPermissions(userId);
    return Result.success(result, '获取用户权限成功');
  }

  /**
   * 创建权限
   */
  @Post()
  @RequirePermissions('permission:create')
  @ApiOperation({ summary: '创建权限' })
  @ApiResponse({ status: 200, description: '创建成功', type: PermissionVo })
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Result<PermissionVo>> {
    const result = await this.permissionService.create(createPermissionDto);
    return Result.success(result, '创建权限成功');
  }

  /**
   * 查询权限列表
   */
  @Get()
  @RequirePermissions('permission:list')
  @ApiOperation({ summary: '查询权限列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findAll(@Query() queryPermissionDto: QueryPermissionDto) {
    const result = await this.permissionService.findAll(queryPermissionDto);
    return Result.success(result, '查询权限列表成功');
  }

  /**
   * 根据 ID 查询权限
   */
  @Get(':id')
  @RequirePermissions('permission:read')
  @ApiOperation({ summary: '根据 ID 查询权限' })
  @ApiResponse({ status: 200, description: '查询成功', type: PermissionVo })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<PermissionVo>> {
    const result = await this.permissionService.findById(id);
    return Result.success(result, '查询权限成功');
  }

  /**
   * 更新权限
   */
  @Patch(':id')
  @RequirePermissions('permission:update')
  @ApiOperation({ summary: '更新权限' })
  @ApiResponse({ status: 200, description: '更新成功', type: PermissionVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Result<PermissionVo>> {
    const result = await this.permissionService.update(id, updatePermissionDto);
    return Result.success(result, '更新权限成功');
  }

  /**
   * 删除权限
   */
  @Delete(':id')
  @RequirePermissions('permission:delete')
  @ApiOperation({ summary: '删除权限' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Result<null>> {
    await this.permissionService.remove(id);
    return Result.success(null, '删除权限成功');
  }
}
