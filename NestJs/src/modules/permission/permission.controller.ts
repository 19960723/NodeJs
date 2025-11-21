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
import { PermissionVo } from './dto/permission.vo';
import { Result } from '../../common/dto/result.dto';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

/**
 * Permission Controller
 */
@ApiTags('权限管理')
@ApiBearerAuth('JWT')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

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

  /**
   * 根据资源查询权限
   */
  @Get('resource/:resource')
  @RequirePermissions('permission:list')
  @ApiOperation({ summary: '根据资源查询权限' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findByResource(
    @Param('resource') resource: string,
  ): Promise<Result<PermissionVo[]>> {
    const result = await this.permissionService.findByResource(resource);
    return Result.success(result, '查询权限成功');
  }
}
