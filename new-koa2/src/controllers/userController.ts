import { Context } from 'koa';
import { UserService } from '../services/UserService';
import { commonSchemas, validate } from '../middleware/validator';
import { success, handleError } from '../utils/response';

class UserController {
  private static userService = new UserService();

  static async login(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;

      // 调用Service层处理登录业务逻辑（包含JWT令牌生成）
      const result = await UserController.userService.login(data);

      success(ctx, result, '登录成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async register(ctx: Context): Promise<void> {
    try {
      const data = ctx.request.body as any;

      const result = await UserController.userService.register(data);
      success(ctx, result, '注册成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  static async getUser(ctx: Context): Promise<void> {
    try {
      // 从ctx.state.user中获取当前用户信息（由auth中间件设置）
      const userId = ctx.state['user']?.id;
      if (!userId) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '用户未认证' };
        return;
      }

      const result = await UserController.userService.getUserInfo(userId);
      success(ctx, result, '获取用户信息成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async deleteUser(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const result = await UserController.userService.deleteUser(id);
      success(ctx, result, '删除用户成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async updateUser(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body as any;
      const result = await UserController.userService.updateUser(id, data);
      success(ctx, result, '更新用户成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async getUserById(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const result = await UserController.userService.getUserById(id);
      success(ctx, result, '获取用户信息成功', 200);
    } catch (error) {
      handleError(ctx, error);
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

export const getUser = [validate({}), UserController.getUser];
export const deleteUser = [validate({}), UserController.deleteUser];
export const updateUser = [validate({}), UserController.updateUser];
export const getUserById = [validate({}), UserController.getUserById];
export default UserController;
