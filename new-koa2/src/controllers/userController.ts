import { Context } from 'koa';
import { UserService } from '../services/UserService';
import { commonSchemas, validate } from '../middleware/validator';
import { BusinessError } from '../types';
import { success } from '../utils/response';

class UserController {
  private static userService = new UserService();

  static async login(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;

      // 调用Service层处理登录业务逻辑（包含JWT令牌生成）
      const result = await UserController.userService.login(data);

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
  static async register(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;

      const result = await UserController.userService.register(data);
      success(ctx, result, '注册成功', 200);
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
  validate({ body: commonSchemas.login }),
  UserController.login
];
export const register = [
  validate({ body: commonSchemas.register }),
  UserController.register
];

export default UserController;
