import { request } from './request'
import type { LoginParams, LoginResponse, UserInfo, PageResponse, PageParams } from '@/types'

// 用户相关API
export const userApi = {
  // 用户注册
  register(data: {
    username: string
    email: string
    password: string
  }): Promise<{ user: UserInfo }> {
    return request.post('/api/users/register', data)
  },

  // 用户登录
  login(data: LoginParams): Promise<LoginResponse> {
    return request.post('/api/users/login', data)
  },

  // 退出登录
  logout(): Promise<void> {
    return request.post('/api/users/logout')
  },

  // 刷新token
  refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    return request.post('/api/users/refresh-token', { refreshToken })
  },

  // 获取当前用户信息
  getUserInfo(): Promise<UserInfo> {
    return request.get('/api/users/me')
  },

  // 更新当前用户信息
  updateProfile(data: Partial<UserInfo>): Promise<UserInfo> {
    return request.put('/api/users/me', data)
  },

  // 修改当前用户密码
  changePassword(data: { oldPassword: string; newPassword: string }): Promise<void> {
    return request.put('/api/users/me/password', data)
  },

  // === 用户管理接口（管理员功能） ===

  // 获取用户列表
  getUserList(
    params: PageParams & {
      username?: string
      email?: string
      status?: number
    }
  ): Promise<PageResponse<UserInfo>> {
    return request.get('/api/users', params)
  },

  // 创建用户
  createUser(data: Partial<UserInfo>): Promise<UserInfo> {
    return request.post('/api/users', data)
  },

  // 获取指定用户信息
  getUserById(id: number): Promise<UserInfo> {
    return request.get(`/api/users/${id}`)
  },

  // 更新用户信息
  updateUser(id: number, data: Partial<UserInfo>): Promise<UserInfo> {
    return request.put(`/api/users/${id}`, data)
  },

  // 删除用户
  deleteUser(id: number): Promise<void> {
    return request.delete(`/api/users/${id}`)
  },

  // 批量删除用户
  batchDeleteUsers(ids: number[]): Promise<void> {
    return request.post('/api/users/batch-delete', { ids })
  },

  // 重置用户密码
  resetPassword(id: number): Promise<{ password: string }> {
    return request.post(`/api/users/${id}/reset-password`)
  },

  // 上传头像
  uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    return request.upload('/api/upload/avatars', formData)
  },

  // 获取验证码
  getCaptcha(params: {
    type: string
    width: number
    height: number
  }): Promise<{ sessionId: string; question: string; svg: string }> {
    return request.get('/api/captcha', params)
  }
}
