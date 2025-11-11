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
  static async logout(ctx: Context): Promise<void> {
    try {
      const userId = ctx.state['user']?.id;
      if (!userId) {
        ctx.status = 401;
        ctx.body = { code: 401, message: '用户未认证' };
        return;
      }
      // 获取 token
      const authHeader = ctx.headers['authorization'];
      const token = authHeader?.split(' ')[1] || '';
      const result = await UserController.userService.logout(userId, token);
      success(ctx, result, '退出成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }
  static async refresh(ctx: Context): Promise<void> {
    try {
      const { refreshToken } = ctx.request.body as any;
      const result = await UserController.userService.refresh(refreshToken);
      success(ctx, result, '刷新成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  static async getUserList(ctx: Context): Promise<void> {
    try {
      const query = ctx.query as any;
      const queryParams: any = {
        page: query.page ? parseInt(query.page) : 1,
        pageSize: query.pageSize ? parseInt(query.pageSize) : 10,
        keyword: query.keyword
      };
      if (query.status !== undefined) {
        queryParams.status = parseInt(query.status);
      }
      const result = await UserController.userService.getUserList(queryParams);
      success(ctx, result, '获取用户列表成功', 200);
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

  /**
   * 获取用户的角色
   */
  static async getUserRoles(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const result = await UserController.userService.getUserRoles(Number(id));
      success(ctx, result, '获取用户角色成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 为用户分配角色
   */
  static async assignRoles(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const { roleIds } = ctx.request.body as any;

      if (!Array.isArray(roleIds)) {
        ctx.status = 400;
        ctx.body = { code: 400, message: 'roleIds必须是数组' };
        return;
      }

      const result = await UserController.userService.assignRoles(
        Number(id),
        roleIds
      );
      success(ctx, result, '分配角色成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 为用户添加单个角色
   */
  static async addRole(ctx: Context): Promise<void> {
    try {
      const { id } = ctx.params;
      const { roleId } = ctx.request.body as any;

      if (!roleId) {
        ctx.status = 400;
        ctx.body = { code: 400, message: 'roleId不能为空' };
        return;
      }

      const result = await UserController.userService.addRole(
        Number(id),
        Number(roleId)
      );
      success(ctx, result, '添加角色成功', 200);
    } catch (error) {
      handleError(ctx, error);
    }
  }

  /**
   * 移除用户的角色
   */
  static async removeRole(ctx: Context): Promise<void> {
    try {
      const { id, roleId } = ctx.params;
      const result = await UserController.userService.removeRole(
        Number(id),
        Number(roleId)
      );
      success(ctx, result, '移除角色成功', 200);
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
export const logout = [validate({}), UserController.logout];
export const refresh = [validate({}), UserController.refresh];

export const getUser = [validate({}), UserController.getUser];
export const deleteUser = [validate({}), UserController.deleteUser];
export const updateUser = [validate({}), UserController.updateUser];
export const getUserById = [validate({}), UserController.getUserById];
export const getUserList = [validate({}), UserController.getUserList];

export default UserController;
