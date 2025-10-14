import type { MenuItem } from '@/types'
import { useRouteStore } from '@/store/route'

/**
 * 获取动态菜单配置
 * 从路由store中获取用户可访问的菜单
 */
export function getMenuConfig(): MenuItem[] {
  const routeStore = useRouteStore()
  return routeStore.visibleMenus
}

/**
 * 静态菜单配置（备用，当动态路由不可用时使用）
 */
export const staticMenuConfig: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    title: '仪表盘',
    icon: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'Dashboard',
      keepAlive: true
    }
  }
]

// 为了向后兼容，保留原有的menuConfig导出
export const menuConfig = staticMenuConfig

/**
 * 根据用户权限过滤菜单
 * @param menus 菜单列表
 * @param userRoles 用户角色
 * @param userPermissions 用户权限
 * @returns 过滤后的菜单
 */
export function filterMenusByPermission(
  menus: MenuItem[],
  userRoles: string[] = [],
  userPermissions: string[] = []
): MenuItem[] {
  return menus.filter(menu => {
    // 检查菜单权限
    if (!hasMenuPermission(menu, userRoles, userPermissions)) {
      return false
    }

    // 递归过滤子菜单
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenusByPermission(menu.children, userRoles, userPermissions)
    }

    return true
  })
}

/**
 * 检查是否有菜单权限
 * @param menu 菜单项
 * @param userRoles 用户角色
 * @param userPermissions 用户权限
 * @returns 是否有权限
 */
function hasMenuPermission(
  menu: MenuItem,
  userRoles: string[],
  userPermissions: string[]
): boolean {
  const { roles, permissions } = menu.meta || {}

  // 如果没有设置权限要求，则允许访问
  if (!roles && !permissions) {
    return true
  }

  // 检查角色权限
  if (roles && roles.length > 0) {
    const hasRole = roles.some(role => userRoles.includes(role))
    if (!hasRole) {
      return false
    }
  }

  // 检查操作权限
  if (permissions && permissions.length > 0) {
    const hasPermission = permissions.some(permission => userPermissions.includes(permission))
    if (!hasPermission) {
      return false
    }
  }

  return true
}

/**
 * 将菜单转换为路由
 * @param menus 菜单列表
 * @returns 路由配置
 */
export function menusToRoutes(menus: MenuItem[]) {
  const routes: any[] = []

  function processMenu(menu: MenuItem, parentPath = '') {
    const fullPath = parentPath + menu.path

    const route = {
      path: fullPath,
      name: menu.name,
      component: menu.component,
      meta: menu.meta,
      children: []
    }

    if (menu.children && menu.children.length > 0) {
      menu.children.forEach(child => {
        const childRoute = processMenu(child, fullPath)
        if (childRoute) {
          route.children.push(childRoute)
        }
      })
    }

    return route
  }

  menus.forEach(menu => {
    const route = processMenu(menu)
    if (route) {
      routes.push(route)
    }
  })

  return routes
}
