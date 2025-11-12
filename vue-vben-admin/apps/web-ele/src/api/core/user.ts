import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user');
}

/**
 * 获取用户列表
 */
export async function getUserListApi(params?: any) {
  return requestClient.get<any>('/user/list', { params });
}

/**
 * 创建用户
 */
export async function createUser(data: any) {
  return requestClient.post<any>('/user', data);
}

/**
 * 删除用户
 */
export async function deleteUser(id: number) {
  return requestClient.delete<any>(`/user/${id}`);
}

/**
 * 更新用户
 */
export async function updateUser(id: number, data: any) {
  return requestClient.put<any>(`/user/${id}`, data);
}

/**
 * 获取角色分页列表
 */
export async function getRolePageList(params?: any) {
  return requestClient.get<any>('/role', { params });
}

/**
 * 创建角色
 */
export async function createRoles(data: any) {
  return requestClient.post<any>('/role', data);
}
/**
 * 更新角色
 */
export async function updateRole(id: number, data: any) {
  return requestClient.put<any>(`/role/${id}`, data);
}

/**
 * 删除角色
 */
export async function deleteRole(id: number) {
  return requestClient.delete<any>(`/role/${id}`);
}

/**
 * 分配角色菜单
 */
export async function assignRoleMenus(id: number, menuIds: number[]) {
  return requestClient.post<any>(`/role/${id}/menus`, { menuIds });
}

/**
 * 获取角色菜单
 */
export async function getRoleMenus(id: number) {
  return requestClient.get<any>(`/role/${id}/menus`);
}
