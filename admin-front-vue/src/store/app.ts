import { defineStore } from 'pinia'
import type { MenuItem } from '@/types'

interface AppState {
  // 侧边栏是否收起
  sidebarCollapsed: boolean
  // 设备类型
  device: 'desktop' | 'mobile'
  // 菜单列表
  menus: MenuItem[]
  // 面包屑导航
  breadcrumbs: Array<{ title: string; path?: string }>
  // 全局loading
  loading: boolean
  // 主题模式
  theme: 'light' | 'dark'
  // 语言
  language: 'zh-CN' | 'en-US'
  // 页面标题
  title: string
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
    device: 'desktop',
    menus: [],
    breadcrumbs: [],
    loading: false,
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    language: (localStorage.getItem('language') as 'zh-CN' | 'en-US') || 'zh-CN',
    title: import.meta.env.VITE_APP_TITLE || '后台管理系统'
  }),

  getters: {
    // 获取当前设备是否为移动端
    isMobile: (state) => state.device === 'mobile',
    
    // 获取当前主题是否为暗色
    isDark: (state) => state.theme === 'dark',
    
    // 获取侧边栏状态
    isSidebarCollapsed: (state) => state.sidebarCollapsed || state.device === 'mobile'
  },

  actions: {
    // 切换侧边栏
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      localStorage.setItem('sidebarCollapsed', String(this.sidebarCollapsed))
    },

    // 设置侧边栏状态
    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed
      localStorage.setItem('sidebarCollapsed', String(collapsed))
    },

    // 设置设备类型
    setDevice(device: 'desktop' | 'mobile') {
      this.device = device
      // 移动端自动收起侧边栏
      if (device === 'mobile') {
        this.sidebarCollapsed = true
      }
    },

    // 设置菜单
    setMenus(menus: MenuItem[]) {
      this.menus = menus
    },

    // 设置面包屑
    setBreadcrumbs(breadcrumbs: Array<{ title: string; path?: string }>) {
      this.breadcrumbs = breadcrumbs
    },

    // 设置全局loading
    setLoading(loading: boolean) {
      this.loading = loading
    },

    // 切换主题
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', this.theme)
      this.applyTheme()
    },

    // 设置主题
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      localStorage.setItem('theme', theme)
      this.applyTheme()
    },

    // 应用主题
    applyTheme() {
      const root = document.documentElement
      if (this.theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    },

    // 设置语言
    setLanguage(language: 'zh-CN' | 'en-US') {
      this.language = language
      localStorage.setItem('language', language)
    },

    // 设置页面标题
    setTitle(title: string) {
      this.title = title
      document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    },

    // 初始化应用
    initApp() {
      // 应用主题
      this.applyTheme()
      
      // 检测设备类型
      this.checkDevice()
      
      // 监听窗口大小变化
      window.addEventListener('resize', this.handleResize)
    },

    // 检测设备类型
    checkDevice() {
      const isMobile = window.innerWidth < 768
      this.setDevice(isMobile ? 'mobile' : 'desktop')
    },

    // 处理窗口大小变化
    handleResize() {
      this.checkDevice()
    },

    // 重置状态
    reset() {
      this.menus = []
      this.breadcrumbs = []
      this.loading = false
    }
  }
})
