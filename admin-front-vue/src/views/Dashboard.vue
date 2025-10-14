<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col v-for="(card, index) in statCards" :key="index" :xs="24" :sm="12" :md="6">
        <div class="stat-card" :style="{ borderLeftColor: card.color }">
          <div class="stat-content">
            <div class="stat-info">
              <h3 class="stat-title">{{ card.title }}</h3>
              <p class="stat-value">{{ card.value }}</p>
              <div v-if="card.change" class="stat-change">
                <el-icon
                  :class="[
                    'change-icon',
                    card.change.type === 'increase' ? 'increase' : 'decrease'
                  ]"
                >
                  <ArrowUp v-if="card.change.type === 'increase'" />
                  <ArrowDown v-else />
                </el-icon>
                <span
                  :class="[
                    'change-value',
                    card.change.type === 'increase' ? 'increase' : 'decrease'
                  ]"
                >
                  {{ Math.abs(card.change.value) }}%
                </span>
                <span class="change-text">较昨日</span>
              </div>
            </div>
            <div class="stat-icon" :style="{ color: card.color }">
              <el-icon size="32">
                <component :is="card.icon" />
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="charts-row">
      <!-- 用户增长趋势 -->
      <el-col :xs="24" :lg="12">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h4>用户增长趋势</h4>
              <el-button-group size="small">
                <el-button
                  v-for="period in ['7天', '30天', '90天']"
                  :key="period"
                  :type="selectedPeriod === period ? 'primary' : 'default'"
                  @click="selectedPeriod = period"
                >
                  {{ period }}
                </el-button>
              </el-button-group>
            </div>
          </template>
          <base-chart
            :option="userGrowthOption"
            :loading="chartLoading"
            height="300px"
            @click="handleChartClick"
          />
        </el-card>
      </el-col>

      <!-- 销售统计 -->
      <el-col :xs="24" :lg="12">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h4>销售统计</h4>
              <el-select v-model="salesType" size="small" style="width: 100px">
                <el-option label="日" value="day" />
                <el-option label="月" value="month" />
                <el-option label="年" value="year" />
              </el-select>
            </div>
          </template>
          <base-chart :option="salesOption" :loading="chartLoading" height="300px" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts-row">
      <!-- 访问量统计 -->
      <el-col :xs="24" :lg="16">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <h4>访问量统计</h4>
          </template>
          <base-chart :option="visitStatsOption" :loading="chartLoading" height="350px" />
        </el-card>
      </el-col>

      <!-- 热门页面 -->
      <el-col :xs="24" :lg="8">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <h4>热门页面</h4>
          </template>
          <div class="popular-pages">
            <div v-for="(page, index) in popularPages" :key="index" class="page-item">
              <div class="page-info">
                <h5 class="page-title">{{ page.title }}</h5>
                <p class="page-path">{{ page.path }}</p>
              </div>
              <div class="page-stats">
                <span class="page-visits">{{ page.visits }}</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: page.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 系统信息 -->
    <el-row :gutter="20" class="system-row">
      <el-col :xs="24" :lg="16">
        <el-card class="system-card" shadow="hover">
          <template #header>
            <h4>系统信息</h4>
          </template>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="system-item">
                <h5>服务器信息</h5>
                <p>操作系统: {{ systemInfo.server?.os || '-' }}</p>
                <p>架构: {{ systemInfo.server?.arch || '-' }}</p>
                <p>Node版本: {{ systemInfo.server?.nodeVersion || '-' }}</p>
                <p>运行时间: {{ formatUptime(systemInfo.server?.uptime) }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="system-item">
                <h5>内存使用</h5>
                <el-progress
                  :percentage="memoryUsagePercent"
                  :color="getProgressColor(memoryUsagePercent)"
                />
                <p class="usage-text">
                  {{ formatBytes(systemInfo.memory?.used) }} /
                  {{ formatBytes(systemInfo.memory?.total) }}
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="system-item">
                <h5>磁盘使用</h5>
                <el-progress
                  :percentage="diskUsagePercent"
                  :color="getProgressColor(diskUsagePercent)"
                />
                <p class="usage-text">
                  {{ formatBytes(systemInfo.disk?.used) }} /
                  {{ formatBytes(systemInfo.disk?.total) }}
                </p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 在线用户 -->
      <el-col :xs="24" :lg="8">
        <el-card class="online-users-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h4>在线用户</h4>
              <el-badge :value="onlineUsers.count" type="success">
                <el-icon><User /></el-icon>
              </el-badge>
            </div>
          </template>
          <div class="online-users-list">
            <div v-for="user in onlineUsers.users" :key="user.id" class="online-user">
              <el-avatar :size="32" :src="user.avatar">
                <el-icon><User /></el-icon>
              </el-avatar>
              <div class="user-info">
                <p class="username">{{ user.username }}</p>
                <p class="last-activity">{{ formatTime(user.lastActivity) }}</p>
              </div>
              <div class="online-indicator"></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { dashboardApi } from '@/api/dashboard'
import BaseChart from '@/components/BaseChart.vue'
import type { StatCard, ChartData } from '@/types'
import dayjs from '@/utils/dayjs'

// 响应式数据
const loading = ref(false)
const chartLoading = ref(false)
const selectedPeriod = ref('30天')
const salesType = ref('day')

// 统计卡片数据
const statCards = ref<StatCard[]>([
  {
    title: '用户总数',
    value: '12,345',
    icon: 'User',
    color: '#409eff',
    change: { value: 12, type: 'increase' }
  },
  {
    title: '订单总数',
    value: '8,234',
    icon: 'ShoppingCart',
    color: '#67c23a',
    change: { value: 8, type: 'increase' }
  },
  {
    title: '销售额',
    value: '¥234,567',
    icon: 'Money',
    color: '#e6a23c',
    change: { value: 5, type: 'decrease' }
  },
  {
    title: '访问量',
    value: '45,678',
    icon: 'View',
    color: '#f56c6c',
    change: { value: 15, type: 'increase' }
  }
])

// 热门页面数据
const popularPages = ref([
  { title: '用户管理', path: '/user', visits: 1234, percentage: 85 },
  { title: '数据统计', path: '/dashboard', visits: 987, percentage: 68 },
  { title: '系统设置', path: '/settings', visits: 654, percentage: 45 },
  { title: '权限管理', path: '/permission', visits: 432, percentage: 30 }
])

// 系统信息
const systemInfo = reactive({
  server: {
    os: 'Linux',
    arch: 'x64',
    nodeVersion: '18.17.0',
    uptime: 86400000
  },
  memory: {
    total: 8589934592,
    used: 3435973836,
    free: 5153960756
  },
  disk: {
    total: 107374182400,
    used: 64424509440,
    free: 42949672960
  }
})

// 在线用户
const onlineUsers = reactive({
  count: 8,
  users: [
    { id: 1, username: '管理员', avatar: '', lastActivity: new Date().toISOString() },
    {
      id: 2,
      username: '张三',
      avatar: '',
      lastActivity: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: 3,
      username: '李四',
      avatar: '',
      lastActivity: new Date(Date.now() - 600000).toISOString()
    }
  ]
})

// 计算属性
const memoryUsagePercent = computed(() => {
  if (!systemInfo.memory?.total) return 0
  return Math.round((systemInfo.memory.used / systemInfo.memory.total) * 100)
})

const diskUsagePercent = computed(() => {
  if (!systemInfo.disk?.total) return 0
  return Math.round((systemInfo.disk.used / systemInfo.disk.total) * 100)
})

// 用户增长趋势图表配置
const userGrowthOption = computed(() => ({
  title: {
    show: false
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from({ length: 30 }, (_, i) =>
      dayjs()
        .subtract(29 - i, 'day')
        .format('MM-DD')
    )
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '新增用户',
      type: 'line',
      smooth: true,
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 20),
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(64, 158, 255, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(64, 158, 255, 0.05)'
            }
          ]
        }
      },
      lineStyle: {
        color: '#409eff'
      },
      itemStyle: {
        color: '#409eff'
      }
    }
  ]
}))

// 销售统计图表配置
const salesOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [2340, 1890, 2560, 2100, 3200, 2800, 3100, 2900, 3400, 3100, 2800, 3600],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#67c23a'
            },
            {
              offset: 1,
              color: '#85ce61'
            }
          ]
        }
      }
    }
  ]
}))

// 访问量统计图表配置
const visitStatsOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['PV', 'UV']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: Array.from({ length: 7 }, (_, i) =>
      dayjs()
        .subtract(6 - i, 'day')
        .format('MM-DD')
    )
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'PV',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      itemStyle: { color: '#409eff' }
    },
    {
      name: 'UV',
      type: 'line',
      data: [620, 732, 701, 734, 1090, 1130, 1120],
      smooth: true,
      itemStyle: { color: '#67c23a' }
    }
  ]
}))

// 工具函数
const formatUptime = (uptime: number) => {
  if (!uptime) return '-'
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  return `${days}天${hours}小时`
}

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatTime = (time: string) => {
  return dayjs(time).fromNow()
}

const getProgressColor = (percentage: number) => {
  if (percentage < 60) return '#67c23a'
  if (percentage < 80) return '#e6a23c'
  return '#f56c6c'
}

// 事件处理
const handleChartClick = (params: any) => {
  ElMessage.info(`点击了: ${params.name} - ${params.value}`)
}

// 加载数据
const loadData = async () => {
  try {
    loading.value = true
    chartLoading.value = true

    // 这里可以并发请求多个接口
    // const [stats, growth, sales, visits, pages, system, online] = await Promise.all([
    //   dashboardApi.getStatCards(),
    //   dashboardApi.getUserGrowthTrend(),
    //   dashboardApi.getSalesData(),
    //   dashboardApi.getVisitStats(),
    //   dashboardApi.getPopularPages(),
    //   dashboardApi.getSystemInfo(),
    //   dashboardApi.getOnlineUsers()
    // ])

    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
    chartLoading.value = false
  }
}

// 监听筛选条件变化
watch([selectedPeriod, salesType], () => {
  loadData()
})

// 组件挂载时加载数据
onMounted(() => {
  loadData()

  // 定时刷新在线用户数据
  setInterval(() => {
    // 这里可以调用接口刷新在线用户数据
  }, 30000)
})
</script>

<style lang="scss" scoped>
.dashboard {
  .stats-row {
    margin-bottom: 20px;
  }

  .charts-row {
    margin-bottom: 20px;
  }

  .system-row {
    margin-bottom: 20px;
  }
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #409eff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .stat-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-info {
    flex: 1;

    .stat-title {
      font-size: 14px;
      color: #909399;
      margin: 0 0 8px 0;
      font-weight: normal;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 8px 0;
    }

    .stat-change {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;

      .change-icon {
        &.increase {
          color: #67c23a;
        }

        &.decrease {
          color: #f56c6c;
        }
      }

      .change-value {
        font-weight: 500;

        &.increase {
          color: #67c23a;
        }

        &.decrease {
          color: #f56c6c;
        }
      }

      .change-text {
        color: #909399;
      }
    }
  }

  .stat-icon {
    opacity: 0.8;
  }
}

.chart-card {
  height: 100%;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
      font-size: 16px;
      color: #303133;
    }
  }
}

.popular-pages {
  .page-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .page-info {
      flex: 1;

      .page-title {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        margin: 0 0 4px 0;
      }

      .page-path {
        font-size: 12px;
        color: #909399;
        margin: 0;
      }
    }

    .page-stats {
      text-align: right;
      min-width: 60px;

      .page-visits {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
      }

      .progress-bar {
        width: 50px;
        height: 4px;
        background: #f0f0f0;
        border-radius: 2px;
        margin-top: 4px;

        .progress-fill {
          height: 100%;
          background: #409eff;
          border-radius: 2px;
          transition: width 0.3s;
        }
      }
    }
  }
}

.system-card {
  .system-item {
    h5 {
      font-size: 14px;
      color: #303133;
      margin: 0 0 12px 0;
    }

    p {
      font-size: 12px;
      color: #606266;
      margin: 0 0 6px 0;
    }

    .usage-text {
      font-size: 12px;
      color: #909399;
      margin-top: 8px;
      text-align: center;
    }
  }
}

.online-users-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
      font-size: 16px;
      color: #303133;
    }
  }

  .online-users-list {
    max-height: 300px;
    overflow-y: auto;

    .online-user {
      display: flex;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
      position: relative;

      &:last-child {
        border-bottom: none;
      }

      .user-info {
        flex: 1;
        margin-left: 12px;

        .username {
          font-size: 14px;
          color: #303133;
          margin: 0 0 4px 0;
        }

        .last-activity {
          font-size: 12px;
          color: #909399;
          margin: 0;
        }
      }

      .online-indicator {
        width: 8px;
        height: 8px;
        background: #67c23a;
        border-radius: 50%;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: #67c23a;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .stat-card {
    margin-bottom: 16px;
  }

  .chart-card {
    margin-bottom: 16px;
  }
}
</style>
