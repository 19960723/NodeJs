import { defineStore } from 'pinia'
import { routeApi } from '@/api/route'
import type { DynamicRoute, MenuItem } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

interface RouteState {
  routes: DynamicRoute[]
  menuList: MenuItem[]
  isRoutesLoaded: boolean
}

export const useRouteStore = defineStore('route', {
  state: (): RouteState => ({
    routes: [],
    menuList: [],
    isRoutesLoaded: false
  }),

  getters: {
    // 获取菜单列表（过滤掉隐藏的菜单）
    visibleMenus: state => {
      return state.menuList.filter(menu => !menu.hidden)
    },

    // 获取扁平化的路由列表
    flatRoutes: state => {
      const flatten = (routes: DynamicRoute[]): DynamicRoute[] => {
        const result: DynamicRoute[] = []
        routes.forEach(route => {
          result.push(route)
          if (route.children && route.children.length > 0) {
            result.push(...flatten(route.children))
          }
        })
        return result
      }
      return flatten(state.routes)
    }
  },

  actions: {
    // 获取用户动态路由
    async getUserRoutes() {
      try {
        const routes = await routeApi.getUserRoutes()
        this.routes = routes
        this.menuList = this.convertToMenuList(routes)
        this.isRoutesLoaded = true
        return routes
      } catch (error) {
        console.error('获取用户路由失败:', error)
        throw error
      }
    },

    // 将动态路由转换为菜单列表
    convertToMenuList(routes: DynamicRoute[]): MenuItem[] {
      return routes.map(route => ({
        id: route.id,
        name: route.name,
        path: route.path,
        component: route.component,
        redirect: route.redirect,
        icon: route.icon,
        title: route.title,
        hidden: route.hidden,
        keepAlive: route.keepAlive,
        sort: route.sort,
        parentId: route.parentId,
        type: route.type,
        permission: route.permission,
        children: route.children ? this.convertToMenuList(route.children) : undefined,
        meta: {
          title: route.title,
          icon: route.icon,
          hidden: route.hidden,
          keepAlive: route.keepAlive,
          permissions: route.permission ? [route.permission] : undefined
        }
      }))
    },

    // 将动态路由转换为Vue路由配置
    convertToVueRoutes(routes: DynamicRoute[]): RouteRecordRaw[] {
      const BasicLayout = () => import('@/layouts/BasicLayout.vue')
      const BlankLayout = () => import('@/layouts/BlankLayout.vue')

      // 组件映射表
      const componentMap: Record<string, any> = {
        BasicLayout: BasicLayout,
        BlankLayout: BlankLayout,
        Dashboard: () => import('@/views/Dashboard.vue'),
        'User/UserList': () => import('@/views/User/UserList.vue'),
        'User/UserForm': () => import('@/views/User/UserForm.vue'),
        'System/RoleList': () => import('@/views/System/RoleList.vue'),
        'System/RouteList': () => import('@/views/System/RouteList.vue')
      }

      const convertRoute = (route: DynamicRoute): RouteRecordRaw => {
        const vueRoute: RouteRecordRaw = {
          path: route.path,
          name: route.name,
          component: route.component ? componentMap[route.component] : undefined,
          redirect: route.redirect,
          meta: {
            title: route.title,
            icon: route.icon,
            hidden: route.hidden,
            keepAlive: route.keepAlive,
            permissions: route.permission ? [route.permission] : undefined
          }
        }

        // 处理子路由
        if (route.children && route.children.length > 0) {
          vueRoute.children = route.children.map(child => convertRoute(child))
        }

        return vueRoute
      }

      return routes.map(route => convertRoute(route))
    },

    // 生成动态路由并添加到路由器
    async generateRoutes() {
      const routes = await this.getUserRoutes()
      const vueRoutes = this.convertToVueRoutes(routes)

      // 添加根路由重定向
      if (vueRoutes.length > 0) {
        const rootRoute: RouteRecordRaw = {
          path: '/',
          component: () => import('@/layouts/BasicLayout.vue'),
          redirect: '/dashboard',
          children: vueRoutes
        }
        return [rootRoute]
      }

      return vueRoutes
    },

    // 重置路由状态
    resetRoutes() {
      this.routes = []
      this.menuList = []
      this.isRoutesLoaded = false
    },

    // 根据路径查找路由
    findRouteByPath(path: string): DynamicRoute | undefined {
      const findInRoutes = (
        routes: DynamicRoute[],
        targetPath: string
      ): DynamicRoute | undefined => {
        for (const route of routes) {
          if (route.path === targetPath) {
            return route
          }
          if (route.children) {
            const found = findInRoutes(route.children, targetPath)
            if (found) return found
          }
        }
        return undefined
      }
      return findInRoutes(this.routes, path)
    },

    // 根据权限过滤路由
    filterRoutesByPermissions(routes: DynamicRoute[], permissions: string[]): DynamicRoute[] {
      return routes.filter(route => {
        // 如果路由没有权限要求，则允许访问
        if (!route.permission) {
          // 递归过滤子路由
          if (route.children) {
            route.children = this.filterRoutesByPermissions(route.children, permissions)
          }
          return true
        }

        // 检查是否有权限
        const hasPermission = permissions.includes(route.permission)
        if (hasPermission && route.children) {
          route.children = this.filterRoutesByPermissions(route.children, permissions)
        }

        return hasPermission
      })
    }
  }
})
