import { Context } from 'koa';
import { AuthService } from '../services/AuthService';
import { success } from '../utils/response';
import { BusinessError } from '../types';
import { validate, commonSchemas } from '../middleware/validator';

class AuthController {
  private static authService = new AuthService();
  static async login(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;
      const result = await this.authService.login(data);
      success(ctx, result, '登录成功', 200);
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
  static async refresh(ctx: Context): Promise<void> {
    try {
      const { refreshToken } = ctx.request.body as any;
      const result = await this.authService.refresh(refreshToken);
      success(ctx, result, '刷新成功', 200);
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
