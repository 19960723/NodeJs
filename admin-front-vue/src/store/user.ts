import { defineStore } from 'pinia'
import { userApi } from '@/api/user'
import { useRouteStore } from './route'
import type { UserInfo, LoginParams } from '@/types'

interface UserState {
  token: string
  refreshToken: string
  userInfo: UserInfo | null
  permissions: string[]
  roles: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    userInfo: null,
    permissions: [],
    roles: []
  }),

  getters: {
    // 是否已登录
    isLoggedIn: state => !!state.token,

    // 用户头像
    avatar: state => state.userInfo?.avatar || '',

    // 用户昵称
    nickname: state => state.userInfo?.nickname || state.userInfo?.username || '',

    // 是否有指定权限
    hasPermission: state => (permission: string) => {
      return state.permissions.includes(permission)
    },

    // 是否有指定角色
    hasRole: state => (role: string) => {
      return state.roles.includes(role)
    },

    // 是否有任意一个权限
    hasAnyPermission: state => (permissions: string[]) => {
      return permissions.some(permission => state.permissions.includes(permission))
    },

    // 是否有任意一个角色
    hasAnyRole: state => (roles: string[]) => {
      return roles.some(role => state.roles.includes(role))
    }
  },

  actions: {
    // 设置token
    setToken(token: string, refreshToken?: string) {
      this.token = token
      if (refreshToken) {
        this.refreshToken = refreshToken
      }
      localStorage.setItem('token', token)
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    },

    // 设置用户信息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      this.roles = userInfo.roles || []
      this.permissions = userInfo.permissions || []
    },

    // 登录
    async login(loginParams: LoginParams) {
      try {
        const response = await userApi.login(loginParams)
        console.log(response, '----')
        const { tokens, user } = response

        this.setToken(tokens.accessToken, tokens.refreshToken)
        this.setUserInfo(user)
        return response
      } catch (error) {
        throw error
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const userInfo = await userApi.getUserInfo()
        this.setUserInfo(userInfo)
        return userInfo
      } catch (error) {
        // 如果获取用户信息失败，清除登录状态
        this.logout()
        throw error
      }
    },

    // 刷新token
    async refreshTokenAction() {
      try {
        const response = await userApi.refreshToken(this.refreshToken)
        this.setToken(response.token, response.refreshToken)
        return response
      } catch (error) {
        // 刷新失败，清除登录状态
        this.logout()
        throw error
      }
    },

    // 退出登录
    async logout() {
      try {
        // 调用退出登录接口
        if (this.token) {
          await userApi.logout()
        }
      } catch (error) {
        console.error('退出登录接口调用失败:', error)
      } finally {
        // 清除本地存储
        this.token = ''
        this.refreshToken = ''
        this.userInfo = null
        this.permissions = []
        this.roles = []

        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')

        // 清除路由状态
        const routeStore = useRouteStore()
        routeStore.resetRoutes()
      }
    },

    // 重置状态
    reset() {
      this.token = ''
      this.refreshToken = ''
      this.userInfo = null
      this.permissions = []
      this.roles = []

      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')

      // 清除路由状态
      const routeStore = useRouteStore()
      routeStore.resetRoutes()
    }
  }
})
