/**
 * 应用常量配置
 */

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'userInfo',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed',
  THEME: 'theme',
  LANGUAGE: 'language',
  REMEMBERED_USERNAME: 'rememberedUsername'
} as const

// API 响应状态码
export const API_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const

// 用户状态
export const USER_STATUS = {
  DISABLED: 0,
  ENABLED: 1,
  LOCKED: 2
} as const

// 用户状态标签
export const USER_STATUS_LABELS = {
  [USER_STATUS.DISABLED]: '禁用',
  [USER_STATUS.ENABLED]: '启用',
  [USER_STATUS.LOCKED]: '锁定'
} as const

// 用户状态标签类型
export const USER_STATUS_TYPES = {
  [USER_STATUS.DISABLED]: 'danger',
  [USER_STATUS.ENABLED]: 'success',
  [USER_STATUS.LOCKED]: 'warning'
} as const

// 性别
export const GENDER = {
  UNKNOWN: 0,
  MALE: 1,
  FEMALE: 2
} as const

// 性别标签
export const GENDER_LABELS = {
  [GENDER.UNKNOWN]: '未知',
  [GENDER.MALE]: '男',
  [GENDER.FEMALE]: '女'
} as const

// 默认分页配置
export const PAGINATION_CONFIG = {
  PAGE: 1,
  PAGE_SIZE: 10,
  PAGE_SIZES: [10, 20, 50, 100],
  LAYOUT: 'total, sizes, prev, pager, next, jumper'
} as const

// 表格配置
export const TABLE_CONFIG = {
  SIZE: 'default',
  STRIPE: true,
  BORDER: true,
  EMPTY_TEXT: '暂无数据',
  MAX_HEIGHT: 600
} as const

// 表单配置
export const FORM_CONFIG = {
  SIZE: 'default',
  LABEL_WIDTH: '100px',
  LABEL_POSITION: 'right',
  GUTTER: 20,
  DEFAULT_SPAN: 24
} as const

// 上传配置
export const UPLOAD_CONFIG = {
  // 图片类型
  IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  // 文档类型
  DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  // 图片大小限制 (MB)
  IMAGE_SIZE_LIMIT: 2,
  // 文档大小限制 (MB)
  DOCUMENT_SIZE_LIMIT: 10,
  // 默认上传路径
  DEFAULT_ACTION: '/api/upload'
} as const

// 主题配置
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark'
} as const

// 语言配置
export const LANGUAGE_CONFIG = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US'
} as const

// 设备类型
export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
} as const

// 断点配置
export const BREAKPOINTS = {
  XS: 480,
  SM: 768,
  MD: 992,
  LG: 1200,
  XL: 1920
} as const

// 动画持续时间
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
} as const

// 防抖延迟
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  RESIZE: 100,
  SCROLL: 50
} as const

// 请求超时时间
export const REQUEST_TIMEOUT = {
  DEFAULT: 15000,
  UPLOAD: 60000,
  DOWNLOAD: 120000
} as const

// 缓存时间 (毫秒)
export const CACHE_TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000
} as const

// 正则表达式
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  CHINESE: /^[\u4e00-\u9fa5]+$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d+(\.\d+)?$/
} as const

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接异常，请检查网络',
  REQUEST_TIMEOUT: '请求超时，请稍后重试',
  SERVER_ERROR: '服务器内部错误',
  UNAUTHORIZED: '未授权，请重新登录',
  FORBIDDEN: '权限不足',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_FAILED: '数据验证失败',
  UPLOAD_FAILED: '文件上传失败',
  DOWNLOAD_FAILED: '文件下载失败'
} as const

// 成功消息
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: '保存成功',
  UPDATE_SUCCESS: '更新成功',
  DELETE_SUCCESS: '删除成功',
  UPLOAD_SUCCESS: '上传成功',
  DOWNLOAD_SUCCESS: '下载成功',
  COPY_SUCCESS: '复制成功',
  OPERATION_SUCCESS: '操作成功'
} as const

// 确认消息
export const CONFIRM_MESSAGES = {
  DELETE_CONFIRM: '确定要删除吗？',
  BATCH_DELETE_CONFIRM: '确定要批量删除吗？',
  RESET_CONFIRM: '确定要重置吗？',
  LOGOUT_CONFIRM: '确定要退出登录吗？',
  UNSAVED_CHANGES: '有未保存的更改，确定要离开吗？'
} as const
