// 全局类型定义

// API 响应基础结构
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页响应结构
export interface PageResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 分页请求参数
export interface PageParams {
  page: number
  pageSize: number
  [key: string]: any
}

// 用户信息
export interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  roles: string[]
  permissions: string[]
  createTime: string
  updateTime: string
  status: number
}

// 登录请求参数
export interface LoginParams {
  username: string
  password: string
  answer?: string
  sessionId?: string
}

// 登录响应
export interface LoginResponse {
  token: string
  refreshToken: string
  userInfo: UserInfo

  tokens: {
    accessToken: string
    refreshToken: string
  }
  user: UserInfo
}

// 菜单项
export interface MenuItem {
  id: number
  name: string
  path: string
  component?: string
  redirect?: string
  icon?: string
  title: string
  hidden?: boolean
  keepAlive?: boolean
  sort?: number
  parentId?: number | null
  type?: 'menu' | 'button' | 'api'
  permission?: string
  children?: MenuItem[]
  meta?: {
    title: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
    roles?: string[]
    permissions?: string[]
  }
}

// 动态路由响应
export interface DynamicRoute {
  id: number
  name: string
  path: string
  component?: string
  redirect?: string
  title: string
  icon?: string
  parentId?: number | null
  sort: number
  hidden: boolean
  keepAlive: boolean
  status: 'active' | 'inactive'
  type: 'menu' | 'button' | 'api'
  permission?: string
  children?: DynamicRoute[]
}

// 角色信息
export interface RoleInfo {
  id: number
  name: string
  code: string
  description?: string
  status: 'active' | 'inactive'
  sort: number
  isSystem: boolean
}

// 路由元信息
export interface RouteMeta {
  title: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
  roles?: string[]
  permissions?: string[]
}

// 表格列配置
export interface TableColumn {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | string
  sortable?: boolean
  formatter?: (row: any, column: any, cellValue: any) => string
  [key: string]: any
}

// 表单项配置
export interface FormItem {
  prop: string
  label: string
  type: 'input' | 'select' | 'date' | 'textarea' | 'number' | 'switch' | 'upload'
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  rules?: any[]
  span?: number
  [key: string]: any
}

// 统计卡片数据
export interface StatCard {
  title: string
  value: number | string
  icon: string
  color: string
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
}

// 图表数据
export interface ChartData {
  name: string
  value: number
  [key: string]: any
}

// 环境变量类型
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_UPLOAD_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
