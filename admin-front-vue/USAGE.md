# 使用指南

## 📋 项目概览

这是一个基于 Vue3 + TypeScript 的企业级后台管理系统前端项目，包含完整的用户管理、权限控制、数据展示等功能模块。

## 🎯 核心功能演示

### 1. 用户认证流程

```typescript
// 登录示例
const loginForm = {
  username: 'admin',
  password: '123456'
}

// 使用 userStore 进行登录
const userStore = useUserStore()
await userStore.login(loginForm)
```

### 2. 权限控制使用

```vue
<template>
  <!-- 基于角色的权限控制 -->
  <el-button v-if="userStore.hasRole('admin')" type="danger">
    删除用户
  </el-button>
  
  <!-- 基于权限的控制 -->
  <el-button v-if="userStore.hasPermission('user:create')" type="primary">
    新增用户
  </el-button>
</template>
```

### 3. BaseTable 组件使用

```vue
<template>
  <base-table
    :data="tableData"
    :columns="tableColumns"
    :loading="loading"
    :total="total"
    :current-page="pagination.page"
    :page-size="pagination.pageSize"
    :show-selection="true"
    @add="handleAdd"
    @edit="handleEdit"
    @delete="handleDelete"
    @refresh="loadData"
  >
    <!-- 自定义列插槽 -->
    <template #status="{ row }">
      <el-tag :type="row.status ? 'success' : 'danger'">
        {{ row.status ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </base-table>
</template>

<script setup lang="ts">
import type { TableColumn } from '@/types'

const tableColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '名称', minWidth: 120 },
  { prop: 'status', label: '状态', width: 100, slot: 'status' }
]
</script>
```

### 4. BaseForm 组件使用

```vue
<template>
  <base-form
    :model-value="formData"
    :form-items="formItems"
    :rules="formRules"
    :loading="loading"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import type { FormItem } from '@/types'

const formItems: FormItem[] = [
  {
    prop: 'name',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    required: true,
    span: 12
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    required: true,
    span: 12
  },
  {
    prop: 'role',
    label: '角色',
    type: 'select',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '用户', value: 'user' }
    ],
    required: true,
    span: 12
  }
]
</script>
```

### 5. BaseChart 组件使用

```vue
<template>
  <base-chart
    :option="chartOption"
    :loading="chartLoading"
    height="400px"
    @click="handleChartClick"
  />
</template>

<script setup lang="ts">
const chartOption = computed(() => ({
  title: { text: '用户增长趋势' },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: { type: 'value' },
  series: [{
    name: '用户数',
    type: 'line',
    data: [120, 132, 101, 134, 90, 230]
  }]
}))
</script>
```

## 🔧 API 接口使用

### 1. 基础请求

```typescript
import { request } from '@/api/request'

// GET 请求
const data = await request.get('/api/users', { page: 1, size: 10 })

// POST 请求
const result = await request.post('/api/users', { name: '张三', email: 'zhangsan@example.com' })

// PUT 请求
const updated = await request.put('/api/users/1', { name: '李四' })

// DELETE 请求
await request.delete('/api/users/1')
```

### 2. 文件上传

```typescript
// 单文件上传
const formData = new FormData()
formData.append('file', file)
const response = await request.upload('/api/upload', formData)

// 使用用户API上传头像
import { userApi } from '@/api/user'
const result = await userApi.uploadAvatar(file)
```

## 🎨 样式和主题

### 1. 使用 SCSS 变量

```scss
// 在组件中使用预定义变量
.my-component {
  color: $primary-color;
  background: $background-color-base;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-base;
}
```

### 2. 使用工具类

```vue
<template>
  <!-- 间距工具类 -->
  <div class="p-3 m-2">
    <!-- 文本工具类 -->
    <p class="text-primary text-center">主要文本</p>
    <!-- Flex 工具类 -->
    <div class="d-flex justify-content-between align-items-center">
      <span>左侧</span>
      <span>右侧</span>
    </div>
  </div>
</template>
```

### 3. 主题切换

```typescript
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

// 切换主题
appStore.toggleTheme()

// 设置指定主题
appStore.setTheme('dark')
```

## 🛠 工具函数使用

### 1. 时间格式化

```typescript
import { formatDate, formatRelativeTime } from '@/utils'

// 格式化时间
const formatted = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 相对时间
const relative = formatRelativeTime(new Date())
```

### 2. 文件处理

```typescript
import { formatFileSize, downloadFile, getFileExtension } from '@/utils'

// 格式化文件大小
const size = formatFileSize(1024 * 1024) // "1 MB"

// 下载文件
downloadFile(blob, 'filename.xlsx')

// 获取文件扩展名
const ext = getFileExtension('document.pdf') // "pdf"
```

### 3. 数据验证

```typescript
import { isValidEmail, isValidPhone, isValidIdCard } from '@/utils'

// 验证邮箱
const emailValid = isValidEmail('user@example.com')

// 验证手机号
const phoneValid = isValidPhone('13800138000')

// 验证身份证
const idCardValid = isValidIdCard('110101199001011234')
```

## 📱 响应式设计

### 1. 使用响应式断点

```vue
<template>
  <!-- 响应式列布局 -->
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      内容
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.my-component {
  // 移动端样式
  @media (max-width: $breakpoint-sm) {
    font-size: 14px;
  }
  
  // 桌面端样式
  @media (min-width: $breakpoint-lg) {
    font-size: 16px;
  }
}
</style>
```

### 2. 检测设备类型

```typescript
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

// 判断是否为移动端
if (appStore.isMobile) {
  // 移动端逻辑
}
```

## 🔐 权限管理最佳实践

### 1. 路由权限配置

```typescript
// 在路由配置中添加权限
{
  path: '/admin',
  component: AdminPage,
  meta: {
    title: '管理面板',
    roles: ['admin'], // 需要admin角色
    permissions: ['admin:view'] // 或需要特定权限
  }
}
```

### 2. 动态菜单生成

```typescript
// 根据用户权限过滤菜单
const filterMenus = (menus: MenuItem[], userRoles: string[]) => {
  return menus.filter(menu => {
    if (menu.meta?.roles) {
      return menu.meta.roles.some(role => userRoles.includes(role))
    }
    return true
  })
}
```

## 📊 数据展示最佳实践

### 1. 表格数据处理

```typescript
// 表格数据加载
const loadTableData = async () => {
  try {
    loading.value = true
    const response = await api.getList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchParams
    })
    
    tableData.value = response.list
    total.value = response.total
  } catch (error) {
    ElMessage.error('数据加载失败')
  } finally {
    loading.value = false
  }
}
```

### 2. 表单数据验证

```typescript
// 自定义验证规则
const validatePassword = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'))
  } else {
    callback()
  }
}

const formRules = {
  password: [{ validator: validatePassword, trigger: 'blur' }]
}
```

## 🚀 性能优化建议

### 1. 组件懒加载

```typescript
// 路由懒加载
const UserList = () => import('@/views/User/UserList.vue')

// 组件懒加载
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
```

### 2. 图片懒加载

```vue
<template>
  <el-image
    :src="imageUrl"
    lazy
    :preview-src-list="[imageUrl]"
    fit="cover"
  />
</template>
```

### 3. 防抖和节流

```typescript
import { debounce, throttle } from '@/utils'

// 搜索防抖
const handleSearch = debounce((keyword: string) => {
  // 搜索逻辑
}, 300)

// 滚动节流
const handleScroll = throttle(() => {
  // 滚动逻辑
}, 100)
```

## 🐛 常见问题解决

### 1. TypeScript 类型错误

```typescript
// 使用类型断言
const element = document.getElementById('myElement') as HTMLElement

// 使用可选链
const value = data?.user?.name

// 使用非空断言（确保值存在时）
const definiteValue = maybeValue!
```

### 2. 样式不生效

```vue
<!-- 确保使用 scoped 样式 -->
<style lang="scss" scoped>
.my-class {
  color: red;
}
</style>

<!-- 或使用深度选择器 -->
<style lang="scss" scoped>
:deep(.el-button) {
  margin: 10px;
}
</style>
```

### 3. 组件通信

```typescript
// 父子组件通信
// 子组件
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()

// 父组件
<ChildComponent @update="handleUpdate" @delete="handleDelete" />

// 兄弟组件通信（使用 Pinia）
const store = useMyStore()
store.updateData(newData)
```

## 📝 开发规范

### 1. 命名规范

- 文件名：PascalCase（组件）、camelCase（工具函数）
- 变量名：camelCase
- 常量名：UPPER_SNAKE_CASE
- CSS 类名：kebab-case

### 2. 代码组织

```typescript
// 推荐的 script setup 组织顺序
<script setup lang="ts">
// 1. 导入
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. 类型定义
interface Props {
  title: string
}

// 3. Props 和 Emits
const props = defineProps<Props>()
const emit = defineEmits<{
  submit: [data: any]
}>()

// 4. 响应式数据
const loading = ref(false)
const formData = ref({})

// 5. 计算属性
const isValid = computed(() => !!formData.value.name)

// 6. 方法
const handleSubmit = () => {
  // 逻辑
}

// 7. 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>
```

### 3. 注释规范

```typescript
/**
 * 用户信息接口
 * @param id 用户ID
 * @returns Promise<UserInfo>
 */
export async function getUserInfo(id: number): Promise<UserInfo> {
  return request.get(`/users/${id}`)
}
```

这个使用指南涵盖了项目的核心功能和最佳实践，帮助开发者快速上手并遵循规范进行开发。
