import dayjs from '@/utils/dayjs'
import type { FormItem } from '@/types'

/**
 * 格式化时间
 * @param date 日期
 * @param format 格式
 * @returns 格式化后的时间字符串
 */
export function formatDate(date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/**
 * 格式化相对时间
 * @param date 日期
 * @returns 相对时间字符串
 */
export function formatRelativeTime(date: string | number | Date): string {
  return dayjs(date).fromNow()
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 格式化数字，添加千分位分隔符
 * @param num 数字
 * @returns 格式化后的数字字符串
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 生成随机字符串
 * @param length 长度
 * @returns 随机字符串
 */
export function randomString(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成UUID
 * @returns UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间
 * @param immediate 是否立即执行
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (this: any, ...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }

    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let previous = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 获取URL参数
 * @param name 参数名
 * @param url URL字符串
 * @returns 参数值
 */
export function getUrlParam(name: string, url?: string): string | null {
  const urlStr = url || window.location.href
  const regex = new RegExp('[?&]' + name + '=([^&#]*)', 'i')
  const results = regex.exec(urlStr)
  return results ? decodeURIComponent(results[1]) : null
}

/**
 * 设置URL参数
 * @param name 参数名
 * @param value 参数值
 * @param url URL字符串
 * @returns 新的URL字符串
 */
export function setUrlParam(name: string, value: string, url?: string): string {
  const urlStr = url || window.location.href
  const regex = new RegExp('([?&])' + name + '=([^&]*)', 'i')
  const separator = urlStr.indexOf('?') !== -1 ? '&' : '?'

  if (regex.test(urlStr)) {
    return urlStr.replace(regex, '$1' + name + '=' + encodeURIComponent(value))
  } else {
    return urlStr + separator + name + '=' + encodeURIComponent(value)
  }
}

/**
 * 下载文件
 * @param blob Blob对象或URL
 * @param filename 文件名
 */
export function downloadFile(blob: Blob | string, filename: string): void {
  const url = typeof blob === 'string' ? blob : URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  if (typeof blob !== 'string') {
    URL.revokeObjectURL(url)
  }
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<boolean>
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const success = document.execCommand('copy')
      textArea.remove()
      return success
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

/**
 * 获取文件扩展名
 * @param filename 文件名
 * @returns 扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否有效
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号格式
 * @param phone 手机号
 * @returns 是否有效
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证身份证号格式
 * @param idCard 身份证号
 * @returns 是否有效
 */
export function isValidIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 获取图片信息
 * @param file 图片文件
 * @returns Promise<{width: number, height: number}>
 */
export function getImageInfo(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

/**
 * 树形数据转换为平铺数据
 * @param tree 树形数据
 * @param childrenKey 子节点键名
 * @returns 平铺数据
 */
export function treeToFlat<T extends Record<string, any>>(
  tree: T[],
  childrenKey = 'children'
): T[] {
  const result: T[] = []

  function traverse(nodes: T[], parent?: T) {
    nodes.forEach(node => {
      const item = { ...node }
      if (parent) {
        item.parentId = parent.id
      }
      delete item[childrenKey]
      result.push(item)

      if (node[childrenKey] && node[childrenKey].length > 0) {
        traverse(node[childrenKey], node)
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 平铺数据转换为树形数据
 * @param flat 平铺数据
 * @param options 配置选项
 * @returns 树形数据
 */
export function flatToTree<T extends Record<string, any>>(
  flat: T[],
  options: {
    idKey?: string
    parentIdKey?: string
    childrenKey?: string
    rootValue?: any
  } = {}
): T[] {
  const {
    idKey = 'id',
    parentIdKey = 'parentId',
    childrenKey = 'children',
    rootValue = null
  } = options

  const tree: T[] = []
  const map = new Map<any, T>()

  // 创建映射
  flat.forEach(item => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  // 构建树结构
  flat.forEach(item => {
    const node = map.get(item[idKey])
    const parentId = item[parentIdKey]

    if (parentId === rootValue || parentId === undefined || parentId === null) {
      tree.push(node!)
    } else {
      const parent = map.get(parentId)
      if (parent) {
        parent[childrenKey].push(node!)
      }
    }
  })

  return tree
}

/**
 * 生成表单验证规则
 * @param formItems 表单项配置
 * @returns 验证规则对象
 */
export function generateFormRules(formItems: FormItem[]): Record<string, any[]> {
  const rules: Record<string, any[]> = {}

  formItems.forEach(item => {
    if (item.rules) {
      rules[item.prop] = item.rules
    } else {
      const itemRules: any[] = []

      // 必填验证
      if (item.required) {
        itemRules.push({
          required: true,
          message: `请${item.type === 'select' ? '选择' : '输入'}${item.label}`,
          trigger: item.type === 'select' ? 'change' : 'blur'
        })
      }

      // 邮箱验证
      if (item.type === 'input' && item.prop.includes('email')) {
        itemRules.push({
          type: 'email',
          message: '请输入正确的邮箱格式',
          trigger: 'blur'
        })
      }

      // 手机号验证
      if (item.type === 'input' && (item.prop.includes('phone') || item.prop.includes('mobile'))) {
        itemRules.push({
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        })
      }

      // 长度验证
      if (item.minLength || item.maxLength) {
        itemRules.push({
          min: item.minLength || 0,
          max: item.maxLength || Infinity,
          message: `长度在 ${item.minLength || 0} 到 ${item.maxLength || '无限制'} 个字符`,
          trigger: 'blur'
        })
      }

      if (itemRules.length > 0) {
        rules[item.prop] = itemRules
      }
    }
  })

  return rules
}
