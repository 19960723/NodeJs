/**
 * 业务错误码枚举
 * 规则: 10000 ~ 99999
 * - 10000-19999: 通用错误
 * - 20000-29999: 用户相关错误
 * - 30000-39999: 认证相关错误
 * - 40000-49999: 权限相关错误
 * - 50000-59999: 资源相关错误
 * - 60000-69999: 业务逻辑错误
 */
export enum ErrorCode {
  // ========== 通用错误 10000-19999 ==========
  SUCCESS = 0,
  UNKNOWN_ERROR = 10000,
  INVALID_PARAMS = 10001,
  NOT_FOUND = 10002,
  ALREADY_EXISTS = 10003,
  OPERATION_FAILED = 10004,
  DATABASE_ERROR = 10005,
  NETWORK_ERROR = 10006,
  TIMEOUT = 10007,

  // ========== 用户相关错误 20000-29999 ==========
  USER_NOT_FOUND = 20001,
  USER_ALREADY_EXISTS = 20002,
  USER_DISABLED = 20003,
  USERNAME_TAKEN = 20004,
  EMAIL_TAKEN = 20005,
  PHONE_TAKEN = 20006,
  INVALID_USER_STATUS = 20007,

  // ========== 认证相关错误 30000-39999 ==========
  UNAUTHORIZED = 30001,
  INVALID_CREDENTIALS = 30002,
  TOKEN_EXPIRED = 30003,
  TOKEN_INVALID = 30004,
  TOKEN_MISSING = 30005,
  REFRESH_TOKEN_EXPIRED = 30006,
  REFRESH_TOKEN_INVALID = 30007,
  REFRESH_TOKEN_REVOKED = 30008,
  PASSWORD_INCORRECT = 30009,
  PASSWORD_WEAK = 30010,

  // ========== 权限相关错误 40000-49999 ==========
  FORBIDDEN = 40001,
  INSUFFICIENT_PERMISSIONS = 40002,
  ROLE_NOT_FOUND = 40003,
  PERMISSION_NOT_FOUND = 40004,
  ROLE_ALREADY_EXISTS = 40005,
  PERMISSION_ALREADY_EXISTS = 40006,

  // ========== 资源相关错误 50000-59999 ==========
  ARTICLE_NOT_FOUND = 50001,
  ARTICLE_ALREADY_EXISTS = 50002,
  CATEGORY_NOT_FOUND = 50003,
  CATEGORY_ALREADY_EXISTS = 50004,
  RESOURCE_LOCKED = 50005,

  // ========== 业务逻辑错误 60000-69999 ==========
  BUSINESS_ERROR = 60001,
  VALIDATION_ERROR = 60002,
  CONFLICT = 60003,
  TOO_MANY_REQUESTS = 60004,
}

/**
 * 错误码对应的HTTP状态码映射
 */
export const ErrorCodeToHttpStatus: Record<number, number> = {
  [ErrorCode.SUCCESS]: 200,
  [ErrorCode.UNKNOWN_ERROR]: 500,
  [ErrorCode.INVALID_PARAMS]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.ALREADY_EXISTS]: 409,
  [ErrorCode.OPERATION_FAILED]: 500,
  [ErrorCode.DATABASE_ERROR]: 500,
  [ErrorCode.NETWORK_ERROR]: 503,
  [ErrorCode.TIMEOUT]: 504,

  // 用户相关
  [ErrorCode.USER_NOT_FOUND]: 404,
  [ErrorCode.USER_ALREADY_EXISTS]: 409,
  [ErrorCode.USER_DISABLED]: 403,
  [ErrorCode.USERNAME_TAKEN]: 409,
  [ErrorCode.EMAIL_TAKEN]: 409,
  [ErrorCode.PHONE_TAKEN]: 409,
  [ErrorCode.INVALID_USER_STATUS]: 400,

  // 认证相关
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.INVALID_CREDENTIALS]: 401,
  [ErrorCode.TOKEN_EXPIRED]: 401,
  [ErrorCode.TOKEN_INVALID]: 401,
  [ErrorCode.TOKEN_MISSING]: 401,
  [ErrorCode.REFRESH_TOKEN_EXPIRED]: 401,
  [ErrorCode.REFRESH_TOKEN_INVALID]: 401,
  [ErrorCode.REFRESH_TOKEN_REVOKED]: 401,
  [ErrorCode.PASSWORD_INCORRECT]: 401,
  [ErrorCode.PASSWORD_WEAK]: 400,

  // 权限相关
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: 403,
  [ErrorCode.ROLE_NOT_FOUND]: 404,
  [ErrorCode.PERMISSION_NOT_FOUND]: 404,
  [ErrorCode.ROLE_ALREADY_EXISTS]: 409,
  [ErrorCode.PERMISSION_ALREADY_EXISTS]: 409,

  // 资源相关
  [ErrorCode.ARTICLE_NOT_FOUND]: 404,
  [ErrorCode.ARTICLE_ALREADY_EXISTS]: 409,
  [ErrorCode.CATEGORY_NOT_FOUND]: 404,
  [ErrorCode.CATEGORY_ALREADY_EXISTS]: 409,
  [ErrorCode.RESOURCE_LOCKED]: 423,

  // 业务逻辑
  [ErrorCode.BUSINESS_ERROR]: 400,
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.TOO_MANY_REQUESTS]: 429,
};

/**
 * 错误码对应的错误消息映射
 */
export const ErrorCodeToMessage: Record<number, string> = {
  [ErrorCode.SUCCESS]: '操作成功',
  [ErrorCode.UNKNOWN_ERROR]: '未知错误',
  [ErrorCode.INVALID_PARAMS]: '参数错误',
  [ErrorCode.NOT_FOUND]: '资源不存在',
  [ErrorCode.ALREADY_EXISTS]: '资源已存在',
  [ErrorCode.OPERATION_FAILED]: '操作失败',
  [ErrorCode.DATABASE_ERROR]: '数据库错误',
  [ErrorCode.NETWORK_ERROR]: '网络错误',
  [ErrorCode.TIMEOUT]: '请求超时',

  // 用户相关
  [ErrorCode.USER_NOT_FOUND]: '用户不存在',
  [ErrorCode.USER_ALREADY_EXISTS]: '用户已存在',
  [ErrorCode.USER_DISABLED]: '用户已被禁用',
  [ErrorCode.USERNAME_TAKEN]: '用户名已被占用',
  [ErrorCode.EMAIL_TAKEN]: '邮箱已被注册',
  [ErrorCode.PHONE_TAKEN]: '手机号已被注册',
  [ErrorCode.INVALID_USER_STATUS]: '无效的用户状态',

  // 认证相关
  [ErrorCode.UNAUTHORIZED]: '未授权',
  [ErrorCode.INVALID_CREDENTIALS]: '用户名或密码错误',
  [ErrorCode.TOKEN_EXPIRED]: 'Token已过期',
  [ErrorCode.TOKEN_INVALID]: 'Token无效',
  [ErrorCode.TOKEN_MISSING]: '缺少Token',
  [ErrorCode.REFRESH_TOKEN_EXPIRED]: 'Refresh Token已过期',
  [ErrorCode.REFRESH_TOKEN_INVALID]: 'Refresh Token无效',
  [ErrorCode.REFRESH_TOKEN_REVOKED]: 'Refresh Token已被撤销',
  [ErrorCode.PASSWORD_INCORRECT]: '密码错误',
  [ErrorCode.PASSWORD_WEAK]: '密码强度不足',

  // 权限相关
  [ErrorCode.FORBIDDEN]: '无权访问',
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: '权限不足',
  [ErrorCode.ROLE_NOT_FOUND]: '角色不存在',
  [ErrorCode.PERMISSION_NOT_FOUND]: '权限不存在',
  [ErrorCode.ROLE_ALREADY_EXISTS]: '角色已存在',
  [ErrorCode.PERMISSION_ALREADY_EXISTS]: '权限已存在',

  // 资源相关
  [ErrorCode.ARTICLE_NOT_FOUND]: '文章不存在',
  [ErrorCode.ARTICLE_ALREADY_EXISTS]: '文章已存在',
  [ErrorCode.CATEGORY_NOT_FOUND]: '分类不存在',
  [ErrorCode.CATEGORY_ALREADY_EXISTS]: '分类已存在',
  [ErrorCode.RESOURCE_LOCKED]: '资源已被锁定',

  // 业务逻辑
  [ErrorCode.BUSINESS_ERROR]: '业务错误',
  [ErrorCode.VALIDATION_ERROR]: '数据验证失败',
  [ErrorCode.CONFLICT]: '数据冲突',
  [ErrorCode.TOO_MANY_REQUESTS]: '请求过于频繁',
};
