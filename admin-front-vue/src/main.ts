import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// 引入样式
import 'element-plus/theme-chalk/index.css'
import '@/styles/index.scss'

// 引入dayjs配置
import '@/utils/dayjs'

// 引入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建应用实例
const app = createApp(App)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')

// 初始化应用
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
appStore.initApp()
