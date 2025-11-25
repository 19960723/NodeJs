import { Controller, Post, Body, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginVo } from './dto/auth.vo';
import { UserVo } from '../user/dto/user.vo';
import { Result } from '../../common/dto/result.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';

/**
 * Auth Controller
 * 处理认证相关的 HTTP 请求
 */
@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户注册
   */
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 3 } }) // 1分钟最多3次
  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 200, description: '注册成功', type: LoginVo })
  async register(@Body() registerDto: RegisterDto): Promise<Result<LoginVo>> {
    const result = await this.authService.register(registerDto);
    return Result.success(result, '注册成功');
  }

  /**
   * 用户登录
   */
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 5 } }) // 1分钟最多5次
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: LoginVo })
  async login(@Body() loginDto: LoginDto): Promise<Result<LoginVo>> {
    const result = await this.authService.login(loginDto);
    return Result.success(result, '登录成功');
  }

  /**
   * 获取当前登录用户信息
   */
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '获取成功', type: UserVo })
  async getProfile(
    @CurrentUser('userId') userId: number,
  ): Promise<Result<UserVo>> {
    const user = await this.authService.getCurrentUser(userId);
    return Result.success(user, '获取用户信息成功');
  }

  /**
   * 获取当前登录用户信息
   */
  @ApiBearerAuth()
  @Get('user')
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '获取成功', type: UserVo })
  async getUser(
    @CurrentUser('userId') userId: number,
  ): Promise<Result<UserVo>> {
    const user = await this.authService.getCurrentUser(userId);
    return Result.success(user, '获取用户信息成功');
  }

  /**
   * 刷新 Access Token
   */
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 10 } }) // 1分钟最多10次
  @Post('refresh')
  @ApiOperation({ summary: '刷新 Access Token' })
  @ApiResponse({ status: 200, description: '刷新成功', type: LoginVo })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<Result<LoginVo>> {
    const result = await this.authService.refreshToken(
      refreshTokenDto.refreshToken,
    );
    return Result.success(result, 'Token 刷新成功');
  }

  /**
   * 登出
   */
  @Public()
  @Post('logout')
  @ApiOperation({ summary: '用户登出' })
  @ApiResponse({ status: 200, description: '登出成功' })
  async logout(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<Result<null>> {
    await this.authService.logout(refreshTokenDto.refreshToken);
    return Result.success(null, '登出成功');
  }
}
