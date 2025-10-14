<template>
  <div class="blank-layout">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 空白布局，用于登录页等不需要侧边栏的页面
</script>

<style lang="scss" scoped>
.blank-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
