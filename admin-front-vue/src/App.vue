<template>
  <div id="app" v-loading="appStore.loading" element-loading-text="加载中...">
    <!-- 全局loading -->
    <!-- <el-loading-service v-if="appStore.loading" :fullscreen="true" text="加载中..." /> -->

    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'

// 获取store
const appStore = useAppStore()
</script>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
