import request from './request'
import type { ApiResponse, PageResponse, PageParams, DynamicRoute } from '@/types'

export interface RouteParams extends PageParams {
  name?: string
  status?: 'active' | 'inactive'
  type?: 'menu' | 'button' | 'api'
}

export interface CreateRouteParams {
  name: string
  path: string
  component?: string
  redirect?: string
  title: string
  icon?: string
  parentId?: number | null
  sort?: number
  hidden?: boolean
  keepAlive?: boolean
  type?: 'menu' | 'button' | 'api'
  permission?: string
  description?: string
}

export interface UpdateRouteParams extends Partial<CreateRouteParams> {
  id: number
}

export const routeApi = {
  // 获取用户可访问的路由（动态路由）
  getUserRoutes(): Promise<DynamicRoute[]> {
    return request.get('/api/routes/user-routes')
  },

  // 获取路由树结构
  getRouteTree(): Promise<DynamicRoute[]> {
    return request.get('/api/routes/tree')
  },

  // 获取路由列表
  getRoutes(params: RouteParams): Promise<PageResponse<DynamicRoute>> {
    return request.get('/api/routes', { params })
  },

  // 创建路由
  createRoute(data: CreateRouteParams): Promise<DynamicRoute> {
    return request.post('/api/routes', data)
  },

  // 更新路由
  updateRoute(id: number, data: Partial<CreateRouteParams>): Promise<DynamicRoute> {
    return request.put(`/api/routes/${id}`, data)
  },

  // 删除路由
  deleteRoute(id: number): Promise<void> {
    return request.delete(`/api/routes/${id}`)
  },

  // 获取路由详情
  getRouteById(id: number): Promise<DynamicRoute> {
    return request.get(`/api/routes/${id}`)
  }
}
