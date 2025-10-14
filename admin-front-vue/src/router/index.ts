import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useRouteStore } from '@/store/route'
import { useAppStore } from '@/store/app'
import { ElMessage } from 'element-plus'
import type { RouteMeta } from '@/types'

// 布局组件
const BasicLayout = () => import('@/layouts/BasicLayout.vue')
const BlankLayout = () => import('@/layouts/BlankLayout.vue')

// 页面组件
const Login = () => import('@/views/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const UserList = () => import('@/views/User/UserList.vue')
const UserForm = () => import('@/views/User/UserForm.vue')
const NotFound = () => import('@/views/404.vue')
const Forbidden = () => import('@/views/403.vue')

// 扩展路由元信息类型
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {}
}

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden,
    meta: {
      title: '403',
      hidden: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404',
      hidden: true
    }
  }
]

// 动态路由（将由后端API动态生成）
export const asyncRoutes: RouteRecordRaw[] = []

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 404页面路由（需要在动态路由加载后添加）
const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  meta: {
    hidden: true
  }
}

// 白名单路由
const whiteList = ['/login', '/403', '/404']

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const routeStore = useRouteStore()
  const appStore = useAppStore()

  // 设置页面标题
  if (to.meta?.title) {
    appStore.setTitle(to.meta.title)
  }

  // 显示全局loading
  appStore.setLoading(true)

  // 检查是否已登录
  if (userStore.isLoggedIn) {
    if (to.path === '/login') {
      // 已登录用户访问登录页，重定向到首页
      next({ path: '/' })
    } else {
      // 检查是否已获取用户信息和动态路由
      if (!userStore.userInfo || !routeStore.isRoutesLoaded) {
        try {
          // 获取用户信息
          if (!userStore.userInfo) {
            await userStore.getUserInfo()
          }

          // 获取动态路由
          if (!routeStore.isRoutesLoaded) {
            const dynamicRoutes = await routeStore.generateRoutes()

            // 添加动态路由到路由器
            dynamicRoutes.forEach(route => {
              router.addRoute(route)
            })

            // 添加404路由（必须在最后）
            router.addRoute(notFoundRoute)

            // 重新导航到目标路由
            next({ ...to, replace: true })
            return
          }

          next()
        } catch (error) {
          // 获取用户信息或路由失败，清除登录状态并跳转到登录页
          userStore.reset()
          routeStore.resetRoutes()
          ElMessage.error('获取用户信息失败，请重新登录')
          next(`/login?redirect=${to.path}`)
        }
      } else {
        // 权限验证
        if (hasPermission(to, userStore)) {
          next()
        } else {
          ElMessage.error('权限不足')
          next('/403')
        }
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      // 在白名单中，直接进入
      next()
    } else {
      // 不在白名单中，重定向到登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  const appStore = useAppStore()

  // 隐藏全局loading
  appStore.setLoading(false)

  // 更新面包屑
  updateBreadcrumbs(to)
})

// 权限验证函数
function hasPermission(route: any, userStore: any): boolean {
  const { roles, permissions } = route.meta || {}

  // 如果没有设置权限要求，则允许访问
  if (!roles && !permissions) {
    return true
  }

  // 检查角色权限
  if (roles && roles.length > 0) {
    return userStore.hasAnyRole(roles)
  }

  // 检查操作权限
  if (permissions && permissions.length > 0) {
    return userStore.hasAnyPermission(permissions)
  }

  return true
}

// 更新面包屑导航
function updateBreadcrumbs(route: any) {
  const appStore = useAppStore()
  const breadcrumbs: Array<{ title: string; path?: string }> = []

  // 递归获取面包屑
  function getBreadcrumbs(route: any, parentPath = '') {
    if (route.matched && route.matched.length > 0) {
      route.matched.forEach((match: any) => {
        const meta = match.meta
        if (meta && meta.title && !meta.hidden) {
          const path = match.path === '/' ? '' : match.path
          breadcrumbs.push({
            title: meta.title,
            path: path || undefined
          })
        }
      })
    }
  }

  getBreadcrumbs(route)
  appStore.setBreadcrumbs(breadcrumbs)
}

export default router
