import { computed } from 'vue'
import { useUserStore } from '@/store/user'

/**
 * 权限控制 Hook
 */
export function usePermission() {
  const userStore = useUserStore()

  // 检查是否有指定角色
  const hasRole = (role: string | string[]) => {
    if (Array.isArray(role)) {
      return role.some(r => userStore.hasRole(r))
    }
    return userStore.hasRole(role)
  }

  // 检查是否有指定权限
  const hasPermission = (permission: string | string[]) => {
    if (Array.isArray(permission)) {
      return permission.some(p => userStore.hasPermission(p))
    }
    return userStore.hasPermission(permission)
  }

  // 检查是否有任意角色
  const hasAnyRole = (roles: string[]) => {
    return userStore.hasAnyRole(roles)
  }

  // 检查是否有任意权限
  const hasAnyPermission = (permissions: string[]) => {
    return userStore.hasAnyPermission(permissions)
  }

  // 检查是否有所有角色
  const hasAllRoles = (roles: string[]) => {
    return roles.every(role => userStore.hasRole(role))
  }

  // 检查是否有所有权限
  const hasAllPermissions = (permissions: string[]) => {
    return permissions.every(permission => userStore.hasPermission(permission))
  }

  // 当前用户角色
  const currentRoles = computed(() => userStore.roles)

  // 当前用户权限
  const currentPermissions = computed(() => userStore.permissions)

  // 是否为超级管理员
  const isSuperAdmin = computed(() => userStore.hasRole('super_admin'))

  return {
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
    hasAllRoles,
    hasAllPermissions,
    currentRoles,
    currentPermissions,
    isSuperAdmin
  }
}
