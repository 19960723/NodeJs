import {
  Controller,
  Get,
  Post,
  Put,
  Body,
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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleVo, UserRolesVo } from './dto/role.vo';
import { Result } from '../../common/dto/result.dto';

/**
 * Role Controller
 * 处理角色相关的 HTTP 请求
 */
@ApiTags('角色管理')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 创建角色
   */
  @Post()
  @ApiOperation({ summary: '创建角色' })
  @ApiResponse({ status: 200, description: '创建成功', type: RoleVo })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Result<RoleVo>> {
    const role = await this.roleService.create(createRoleDto);
    return Result.success(role, '创建角色成功');
  }

  /**
   * 分页查询角色列表
   */
  @Get()
  @ApiOperation({ summary: '查询角色列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findAll(@Query() queryRoleDto: QueryRoleDto): Promise<Result> {
    const result = await this.roleService.findAll(queryRoleDto);
    return Result.page(
      result.list,
      result.total,
      result.page,
      result.pageSize,
      '查询角色列表成功',
    );
  }

  /**
   * 根据 ID 查询角色
   */
  @Get(':id')
  @ApiOperation({ summary: '查询角色详情' })
  @ApiResponse({ status: 200, description: '查询成功', type: RoleVo })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<RoleVo>> {
    const role = await this.roleService.findById(id);
    return Result.success(role, '查询角色详情成功');
  }

  /**
   * 更新角色
   */
  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiResponse({ status: 200, description: '更新成功', type: RoleVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Result<RoleVo>> {
    const role = await this.roleService.update(id, updateRoleDto);
    return Result.success(role, '更新角色成功');
  }

  /**
   * 删除角色
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Result<void>> {
    await this.roleService.remove(id);
    return Result.success(undefined, '删除角色成功');
  }

  /**
   * 为角色分配权限
   */
  @Post(':id/permissions')
  @ApiOperation({ summary: '为角色分配权限' })
  @ApiResponse({ status: 200, description: '分配成功' })
  async assignPermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { permissionIds: number[] },
  ): Promise<Result<void>> {
    await this.roleService.assignPermissions(id, body.permissionIds);
    return Result.success(undefined, '分配权限成功');
  }

  /**
   * 获取角色的权限列表
   */
  @Get(':id/permissions')
  @ApiOperation({ summary: '获取角色的权限列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getPermissions(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<any>> {
    const result = await this.roleService.getPermissions(id);
    return Result.success(result, '获取权限列表成功');
  }

  // 获取角色关联的用户列表
  @Get(':id/users')
  @ApiOperation({ summary: '获取角色关联的用户列表' })
  @ApiResponse({ status: 200, description: '获取成功', type: UserRolesVo })
  async getUsers(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<UserRolesVo>> {
    const result = await this.roleService.getUsers(id);
    return Result.success(result as UserRolesVo);
  }

  // 设置角色关联的用户列表
  @Post(':id/users')
  @ApiOperation({ summary: '设置角色关联的用户列表' })
  @ApiResponse({ status: 200, description: '设置成功' })
  async assignUsers(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { userIds: number[] },
  ): Promise<Result<void>> {
    await this.roleService.assignUsers(id, body.userIds);
    return Result.success(undefined, '关联用户成功');
  }
}
