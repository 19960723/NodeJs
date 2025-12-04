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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserVo } from './dto/user.vo';
import { Result } from '../../common/dto/result.dto';
import { Public } from '../../common/decorators/public.decorator';

/**
 * User Controller
 * 处理用户相关的 HTTP 请求
 */
@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   */
  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 200, description: '创建成功', type: UserVo })
  async create(@Body() createUserDto: CreateUserDto): Promise<Result<UserVo>> {
    const user = await this.userService.create(createUserDto);
    return Result.success(user, '创建用户成功');
  }

  /**
   * 分页查询用户列表
   */
  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  @ApiResponse({ status: 200, description: '查询成功' })
  async findAll(@Query() queryUserDto: QueryUserDto): Promise<Result> {
    const result = await this.userService.findAll(queryUserDto);
    return Result.page(
      result.list,
      result.total,
      result.page!,
      result.pageSize!,
      '查询用户列表成功',
    );
  }

  /**
   * 根据 ID 查询用户
   */
  @Get(':id')
  @ApiOperation({ summary: '查询用户详情' })
  @ApiResponse({ status: 200, description: '查询成功', type: UserVo })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<UserVo>> {
    const user = await this.userService.findById(id);
    return Result.success(user, '查询用户详情成功');
  }

  /**
   * 更新用户
   */
  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: 200, description: '更新成功', type: UserVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Result<UserVo>> {
    const user = await this.userService.update(id, updateUserDto);
    return Result.success(user, '更新用户成功');
  }

  /**
   * 删除用户
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Result> {
    await this.userService.remove(id);
    return Result.success(undefined, '删除用户成功');
  }
}
