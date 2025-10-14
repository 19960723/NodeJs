<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-image">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="#f0f2f5" stroke="#d9d9d9" stroke-width="2"/>
          <text x="100" y="120" text-anchor="middle" font-size="48" font-weight="bold" fill="#909399">404</text>
        </svg>
      </div>
      
      <div class="error-info">
        <h1 class="error-title">页面未找到</h1>
        <p class="error-description">
          抱歉，您访问的页面不存在或已被删除。
        </p>
        
        <div class="error-actions">
          <el-button type="primary" @click="goHome">
            <el-icon><HomeFilled /></el-icon>
            返回首页
          </el-button>
          <el-button @click="goBack">
            <el-icon><Back /></el-icon>
            返回上页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f2f5;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-image {
  margin-bottom: 30px;
  
  svg {
    max-width: 100%;
    height: auto;
  }
}

.error-info {
  .error-title {
    font-size: 32px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 16px 0;
  }
  
  .error-description {
    font-size: 16px;
    color: #606266;
    margin: 0 0 30px 0;
    line-height: 1.6;
  }
  
  .error-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
      
      .el-button {
        width: 200px;
      }
    }
  }
}
</style>
