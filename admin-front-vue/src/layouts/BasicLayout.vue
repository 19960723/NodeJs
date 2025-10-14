<template>
  <div class="basic-layout">
    <!-- 侧边栏 -->
    <div
      class="sidebar"
      :class="{ 'sidebar--collapsed': appStore.isSidebarCollapsed }"
    >
      <div class="sidebar__logo">
        <img src="/vite.svg" alt="logo" class="logo-img" />
        <h1 v-show="!appStore.isSidebarCollapsed" class="logo-title">
          {{ appStore.title }}
        </h1>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="appStore.isSidebarCollapsed"
        :unique-opened="true"
        router
        class="sidebar__menu"
      >
        <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :route="route"
        />
      </el-menu>
    </div>

    <!-- 主体内容 -->
    <div class="main-content">
      <!-- 顶部导航 -->
      <div class="header">
        <div class="header__left">
          <!-- 折叠按钮 -->
          <el-button
            type="text"
            @click="appStore.toggleSidebar()"
            class="collapse-btn"
          >
            <el-icon>
              <Fold v-if="!appStore.isSidebarCollapsed" />
              <Expand v-else />
            </el-icon>
          </el-button>

          <!-- 面包屑 -->
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item
              v-for="(item, index) in appStore.breadcrumbs"
              :key="index"
              :to="item.path ? { path: item.path } : undefined"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="header__right">
          <!-- 主题切换 -->
          <el-button
            type="text"
            @click="appStore.toggleTheme()"
            class="theme-btn"
          >
            <el-icon>
              <Sunny v-if="appStore.theme === 'light'" />
              <Moon v-else />
            </el-icon>
          </el-button>

          <!-- 用户信息 -->
          <el-dropdown @command="handleCommand" class="user-dropdown">
            <div class="user-info">
              <el-avatar :src="userStore.avatar" :size="32">
                <el-icon><User /></el-icon>
              </el-avatar>
              <span class="username">{{ userStore.nickname }}</span>
              <el-icon class="arrow-down"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  系统设置
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 页面内容 -->
      <div class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component
                :is="Component"
                v-if="route.meta?.keepAlive"
                :key="route.fullPath"
              />
            </keep-alive>
          </transition>
          <transition name="fade-transform" mode="out-in">
            <component
              :is="Component"
              v-if="!route.meta?.keepAlive"
              :key="route.fullPath"
            />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import SidebarItem from '@/components/SidebarItem.vue'
import { asyncRoutes } from '@/router'

// 获取当前路由
const route = useRoute()
const router = useRouter()

// 获取store
const appStore = useAppStore()
const userStore = useUserStore()

// 当前激活的菜单
const activeMenu = computed(() => {
  const { path } = route
  return path
})

// 菜单路由
const menuRoutes = computed(() => {
  return asyncRoutes.filter(route => !route.meta?.hidden)
})

// 处理用户下拉菜单命令
const handleCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人资料功能开发中...')
      break
    case 'settings':
      ElMessage.info('系统设置功能开发中...')
      break
    case 'logout':
      await handleLogout()
      break
  }
}

// 处理退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await userStore.logout()
    ElMessage.success('退出登录成功')
    router.push('/login')
  } catch (error) {
    // 用户取消操作
  }
}
</script>

<style lang="scss" scoped>
.basic-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 210px;
  background: #304156;
  transition: width 0.28s;
  
  &--collapsed {
    width: 64px;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    padding: 16px;
    color: #fff;
    
    .logo-img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }
    
    .logo-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      white-space: nowrap;
    }
  }
  
  &__menu {
    border-right: none;
    background: #304156;
    
    :deep(.el-menu-item) {
      color: #bfcbd9;
      
      &:hover {
        background: #263445;
        color: #fff;
      }
      
      &.is-active {
        background: #409eff;
        color: #fff;
      }
    }
    
    :deep(.el-sub-menu__title) {
      color: #bfcbd9;
      
      &:hover {
        background: #263445;
        color: #fff;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  
  &__left {
    display: flex;
    align-items: center;
    
    .collapse-btn {
      margin-right: 16px;
      font-size: 18px;
    }
    
    .breadcrumb {
      font-size: 14px;
    }
  }
  
  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .theme-btn {
      font-size: 18px;
    }
    
    .user-dropdown {
      cursor: pointer;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.3s;
      
      &:hover {
        background: #f5f7fa;
      }
      
      .username {
        font-size: 14px;
        color: #606266;
      }
      
      .arrow-down {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}

.content {
  flex: 1;
  padding: 20px;
  background: #f0f2f5;
  overflow: auto;
}

// 路由动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
