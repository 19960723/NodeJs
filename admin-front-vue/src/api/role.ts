import request from './request'
import type { ApiResponse, PageResponse, PageParams, RoleInfo } from '@/types'

export interface RoleParams extends PageParams {
  name?: string
  status?: 'active' | 'inactive'
}

export interface CreateRoleParams {
  name: string
  code: string
  description?: string
  sort?: number
}

export interface UpdateRoleParams extends Partial<CreateRoleParams> {
  id: number
}

export interface AssignRoutesParams {
  routeIds: number[]
}

export const roleApi = {
  // 获取所有角色（用于下拉选择）
  getAllRoles(): Promise<RoleInfo[]> {
    return request.get('/api/roles/all')
  },

  // 获取角色列表
  getRoles(params: RoleParams): Promise<PageResponse<RoleInfo>> {
    return request.get('/api/roles', { params })
  },

  // 创建角色
  createRole(data: CreateRoleParams): Promise<RoleInfo> {
    return request.post('/api/roles', data)
  },

  // 更新角色
  updateRole(id: number, data: Partial<CreateRoleParams>): Promise<RoleInfo> {
    return request.put(`/api/roles/${id}`, data)
  },

  // 删除角色
  deleteRole(id: number): Promise<void> {
    return request.delete(`/api/roles/${id}`)
  },

  // 获取角色详情
  getRoleById(id: number): Promise<RoleInfo> {
    return request.get(`/api/roles/${id}`)
  },

  // 分配路由权限给角色
  assignRoutes(id: number, data: AssignRoutesParams): Promise<void> {
    return request.post(`/api/roles/${id}/routes`, data)
  }
}
