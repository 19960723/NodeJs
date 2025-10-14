import { request } from './request'
import type { StatCard, ChartData } from '@/types'

// Dashboard相关API
export const dashboardApi = {
  // 获取统计卡片数据
  getStatCards(): Promise<StatCard[]> {
    return request.get('/api/dashboard/statistics')
  },

  // 获取用户增长趋势
  getUserGrowthTrend(days: number = 30): Promise<{
    dates: string[]
    data: number[]
  }> {
    return request.get('/api/dashboard/analytics/users', { days })
  },

  // 获取销售数据
  getSalesData(type: 'day' | 'month' | 'year' = 'day'): Promise<{
    labels: string[]
    data: number[]
  }> {
    return request.get('/api/dashboard/analytics/sales', { type })
  },

  // 获取访问量统计
  getVisitStats(days: number = 7): Promise<{
    pv: ChartData[]
    uv: ChartData[]
  }> {
    return request.get('/api/dashboard/analytics/visits', { days })
  },

  // 获取热门页面
  getPopularPages(): Promise<
    Array<{
      path: string
      title: string
      visits: number
      percentage: number
    }>
  > {
    return request.get('/api/dashboard/analytics/pages')
  },

  // 获取系统信息
  getSystemInfo(): Promise<{
    server: {
      os: string
      arch: string
      nodeVersion: string
      uptime: number
    }
    memory: {
      total: number
      used: number
      free: number
    }
    disk: {
      total: number
      used: number
      free: number
    }
  }> {
    return request.get('/api/dashboard/system')
  },

  // 获取实时在线用户
  getOnlineUsers(): Promise<{
    count: number
    users: Array<{
      id: number
      username: string
      lastActivity: string
    }>
  }> {
    return request.get('/api/dashboard/users/online')
  }
}
