<template>
  <div class="base-chart" :style="{ height, width }">
    <v-chart
      ref="chartRef"
      :option="option"
      :loading="loading"
      :loading-options="loadingOptions"
      autoresize
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart
} from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent
} from 'echarts/components'

// 注册必要的组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart,
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent
])

interface Props {
  // 图表配置
  option: any
  // 图表宽度
  width?: string
  // 图表高度
  height?: string
  // 加载状态
  loading?: boolean
  // 加载配置
  loadingOptions?: any
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '300px',
  loading: false,
  loadingOptions: () => ({
    text: '加载中...',
    color: '#409eff',
    textColor: '#409eff',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    zlevel: 0
  })
})

// 定义事件
const emit = defineEmits<{
  click: [params: any]
}>()

// 图表引用
const chartRef = ref()

// 处理点击事件
const handleClick = (params: any) => {
  emit('click', params)
}

// 监听配置变化
watch(
  () => props.option,
  (newOption) => {
    if (chartRef.value) {
      chartRef.value.setOption(newOption, true)
    }
  },
  { deep: true }
)

// 获取图表实例
const getChartInstance = () => {
  return chartRef.value?.chart
}

// 重置图表
const resize = () => {
  chartRef.value?.resize()
}

// 暴露方法
defineExpose({
  getChartInstance,
  resize,
  chartRef
})
</script>

<style lang="scss" scoped>
.base-chart {
  width: 100%;
  min-height: 200px;
}
</style>
