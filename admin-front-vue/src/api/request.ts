import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'
import router from '@/router'
import type { ApiResponse } from '@/types'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求队列
const pendingMap = new Map()

// 生成请求key
const generateReqKey = (config: AxiosRequestConfig): string => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 添加请求
const addPending = (config: AxiosRequestConfig): void => {
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(requestKey)) {
        pendingMap.set(requestKey, cancel)
      }
    })
}

// 移除请求
const removePending = (config: AxiosRequestConfig): void => {
  const requestKey = generateReqKey(config)
  if (pendingMap.has(requestKey)) {
    const cancel = pendingMap.get(requestKey)
    cancel(requestKey)
    pendingMap.delete(requestKey)
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 取消重复请求
    removePending(config)
    addPending(config)

    // 添加token
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 移除请求
    removePending(response.config)

    const { code, message, data } = response.data

    // 请求成功
    if (code === 200 || code === 0) {
      return data
    }

    // token过期
    if (code === 401) {
      ElMessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const userStore = useUserStore()
        userStore.logout().then(() => {
          router.push('/login')
        })
      })
      return Promise.reject(new Error(message))
    }

    // 权限不足
    if (code === 403) {
      ElMessage.error('权限不足')
      return Promise.reject(new Error(message))
    }

    // 其他错误
    ElMessage.error(message || '请求失败')
    return Promise.reject(new Error(message || '请求失败'))
  },
  (error: AxiosError) => {
    // 移除请求
    if (error.config) {
      removePending(error.config)
    }

    // 请求被取消
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message)
      return Promise.reject(error)
    }

    // 网络错误
    if (!error.response) {
      ElMessage.error('网络连接异常，请检查网络')
      return Promise.reject(error)
    }

    // HTTP错误状态码处理
    const { status } = error.response
    switch (status) {
      case 400:
        ElMessage.error('请求参数错误')
        break
      case 401:
        ElMessage.error('未授权，请重新登录')
        const userStore = useUserStore()
        userStore.logout().then(() => {
          router.push('/login')
        })
        break
      case 403:
        ElMessage.error('拒绝访问')
        break
      case 404:
        ElMessage.error('请求地址出错')
        break
      case 408:
        ElMessage.error('请求超时')
        break
      case 500:
        ElMessage.error('服务器内部错误')
        break
      case 501:
        ElMessage.error('服务未实现')
        break
      case 502:
        ElMessage.error('网关错误')
        break
      case 503:
        ElMessage.error('服务不可用')
        break
      case 504:
        ElMessage.error('网关超时')
        break
      case 505:
        ElMessage.error('HTTP版本不受支持')
        break
      default:
        ElMessage.error(`连接错误${status}`)
    }

    return Promise.reject(error)
  }
)

// 导出封装的请求方法
export const request = {
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config })
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { params, ...config })
  },

  upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default service
