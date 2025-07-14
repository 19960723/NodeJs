// utils/result.ts

/**
 * 統一成功返回格式
 * @param data 返回數據（默認為 null）
 * @param message 描述消息（默認為 'success'）
 */
export function success(data: any = null, message = "success") {
  return {
    code: 0,
    message,
    data,
  };
}

/**
 * 統一失敗返回格式
 * @param message 錯誤信息（默認為 'error'）
 * @param code 狀態碼（默認為 1）
 */
export function error(message = "error", code = 1) {
  return {
    code,
    message,
    data: null,
  };
}
