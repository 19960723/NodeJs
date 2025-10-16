import { Context } from 'koa';
import { AuthService } from '../services/AuthService';
import { success } from '../utils/response';
import { BusinessError } from '../types';
import { validate, commonSchemas } from '../middleware/validator';
import logger from '../utils/logger';

class AuthController {
  private static authService = new AuthService();
  static async login(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;

      // 输入验证
      if (!data.username || !data.password) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '用户名和密码不能为空' };
        return;
      }

      if (data.username.length < 2 || data.username.length > 50) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '用户名长度应在2-50个字符之间' };
        return;
      }

      if (data.password.length < 6) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '密码长度至少6位' };
        return;
      }

      const result = await AuthController.authService.login(data);
      success(ctx, result, '登录成功', 200);
    } catch (error) {
      // 记录详细错误信息
      logger.error('登录控制器错误:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        requestBody: ctx.request.body,
        url: ctx.url
      });

      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = { code: error.code, message: error.message };
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '服务器内部错误',
          ...(process.env['NODE_ENV'] === 'development' && {
            error: error instanceof Error ? error.message : String(error)
          })
        };
      }
    }
  }
  static async refresh(ctx: Context): Promise<void> {
    try {
      const { refreshToken } = ctx.request.body as any;
      const result = await this.authService.refresh(refreshToken);
      success(ctx, result, '刷新成功', 200);
    } catch (error) {
      logger.error('刷新令牌错误:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });

      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = { code: error.code, message: error.message };
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '服务器内部错误',
          ...(process.env['NODE_ENV'] === 'development' && {
            error: error instanceof Error ? error.message : String(error)
          })
        };
      }
    }
  }
  static async logout(ctx: Context): Promise<void> {
    try {
      await this.authService.logout();
      success(ctx, null, '退出成功', 200);
    } catch (error) {
      if (error instanceof BusinessError) {
        ctx.status = error.statusCode;
        ctx.body = { code: error.code, message: error.message };
      } else {
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器内部错误' };
      }
    }
  }
}

export const login = [
  validate({
    body: commonSchemas.login
  }),
  AuthController.login
];
export const refresh = [
  validate({ body: commonSchemas.refresh }),
  AuthController.refresh
];
export const logout = [AuthController.logout];
export const codes = [];

export default AuthController;
