<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="/vite.svg" alt="logo" class="logo" />
        <h1 class="title">{{ appStore.title }}</h1>
        <p class="subtitle">欢迎登录后台管理系统</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        size="large"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item prop="answer">
          <div class="captcha-input">
            <el-input
              v-model="loginForm.answer"
              placeholder="请输入验证码"
              prefix-icon="Key"
              clearable
              @clear="loginForm.sessionId = ''"
            />
            <div class="captcha-image" @click="refreshCaptcha" title="点击刷新验证码">
              <img v-if="captchaUrl" :src="captchaUrl" alt="验证码" />
              <div v-else class="captcha-loading">点击获取</div>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleLogin"
            class="login-btn"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <p>
          还没有账号？
          <el-link type="primary" :underline="false">立即注册</el-link>
        </p>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { userApi } from '@/api/user'
import type { LoginParams } from '@/types'

// 路由
const router = useRouter()
const route = useRoute()

// Store
const userStore = useUserStore()
const appStore = useAppStore()

// 表单引用
const loginFormRef = ref()

// 登录表单数据
const loginForm = reactive<LoginParams>({
  username: '',
  password: '',
  answer: '',
  sessionId: ''
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  answer: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码长度为 4 位', trigger: 'blur' }
  ]
}

// 状态
const loading = ref(false)
const rememberMe = ref(false)
const captchaUrl = ref('')

// 处理登录
const handleLogin = async () => {
  try {
    // 表单验证
    await loginFormRef.value?.validate()

    loading.value = true

    // 调用登录接口
    await userStore.login(loginForm)

    ElMessage.success('登录成功')

    // 跳转到目标页面
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error: any) {
    ElMessage.error(error.message || '登录失败')

    // 登录失败后刷新验证码
    await refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// 刷新验证码
const refreshCaptcha = async () => {
  try {
    // 调用获取验证码API
    const result = await userApi.getCaptcha({
      type: 'image',
      width: 100,
      height: 40
    })
    console.log('验证码获取成功:', result)
    // 设置验证码ID和图片URL
    loginForm.sessionId = result.sessionId
    // 直接使用SVG数据创建图片URL
    if (result.svg) {
      const svgBlob = new Blob([result.svg], { type: 'image/svg+xml' })
      captchaUrl.value = URL.createObjectURL(svgBlob)
    }
  } catch (error: any) {
    console.error('获取验证码失败:', error)
    ElMessage.error(error.message || '获取验证码失败')

    // 生成一个临时的sessionId用于回退
    const tempSessionId = Date.now().toString()
    loginForm.sessionId = tempSessionId

    // 如果API调用失败，回退到直接使用图片URL
    captchaUrl.value = `/api/captcha/image/${tempSessionId}?type=math-image&width=100&height=40`
  }
}

// 组件挂载时
onMounted(async () => {
  // 如果已登录，直接跳转
  if (userStore.isLoggedIn) {
    router.push('/')
    return
  }

  // 从本地存储恢复记住的用户名
  const savedUsername = localStorage.getItem('rememberedUsername')
  if (savedUsername) {
    loginForm.username = savedUsername
    rememberMe.value = true
  }

  // 初始化验证码
  await refreshCaptcha()
})

// 监听记住我选项
watch(
  () => rememberMe.value,
  newVal => {
    if (newVal) {
      localStorage.setItem('rememberedUsername', loginForm.username)
    } else {
      localStorage.removeItem('rememberedUsername')
    }
  }
)
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.login-box {
  position: relative;
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;

  .logo {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 8px 0;
  }

  .subtitle {
    font-size: 14px;
    color: #909399;
    margin: 0;
  }
}

.login-form {
  .captcha-input {
    display: flex;
    gap: 12px;

    .el-input {
      flex: 1;
    }

    .captcha-image {
      width: 100px;
      height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      cursor: pointer;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        border-color: #409eff;
      }

      .captcha-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 12px;
        color: #909399;
        background-color: #f5f7fa;
      }
    }
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .login-btn {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
  }
}

.login-footer {
  text-align: center;
  margin-top: 20px;

  p {
    font-size: 14px;
    color: #909399;
    margin: 0;
  }
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 6s ease-in-out infinite;

    &.circle-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    &.circle-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 10%;
      animation-delay: 2s;
    }

    &.circle-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

// 响应式设计
@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 30px 20px;
  }

  .login-header {
    .title {
      font-size: 20px;
    }
  }
}
</style>
