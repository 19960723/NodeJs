import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user');
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
