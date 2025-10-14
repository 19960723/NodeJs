<template>
  <div>
    <!-- 单个菜单项 -->
    <el-menu-item
      v-if="!hasChildren"
      :index="resolvePath"
      @click="handleClick"
    >
      <el-icon v-if="route.meta?.icon">
        <component :is="route.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ route.meta?.title }}</span>
      </template>
    </el-menu-item>

    <!-- 子菜单 -->
    <el-sub-menu
      v-else
      :index="resolvePath"
    >
      <template #title>
        <el-icon v-if="route.meta?.icon">
          <component :is="route.meta.icon" />
        </el-icon>
        <span>{{ route.meta?.title }}</span>
      </template>
      
      <sidebar-item
        v-for="child in visibleChildren"
        :key="child.path"
        :route="child"
        :base-path="resolvePath"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  route: RouteRecordRaw
  basePath?: string
}

const props = withDefaults(defineProps<Props>(), {
  basePath: ''
})

const router = useRouter()

// 解析完整路径
const resolvePath = computed(() => {
  if (props.route.path.startsWith('/')) {
    return props.route.path
  }
  return `${props.basePath}/${props.route.path}`.replace(/\/+/g, '/')
})

// 可见的子路由
const visibleChildren = computed(() => {
  if (!props.route.children) return []
  return props.route.children.filter(child => !child.meta?.hidden)
})

// 是否有子菜单
const hasChildren = computed(() => {
  return visibleChildren.value.length > 0
})

// 处理点击事件
const handleClick = () => {
  if (props.route.path.startsWith('http')) {
    // 外部链接
    window.open(props.route.path, '_blank')
  } else {
    // 内部路由
    router.push(resolvePath.value)
  }
}
</script>
