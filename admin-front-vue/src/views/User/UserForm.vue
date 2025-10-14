<template>
  <div class="user-form">
    <base-form
      :model-value="formData"
      :form-items="formItems"
      :rules="formRules"
      :loading="loading"
      :show-cancel="true"
      @update:model-value="updateFormData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <!-- 头像上传插槽 -->
      <template #avatar="{ value, setValue }">
        <div class="avatar-upload">
          <el-upload
            :action="uploadAction"
            :headers="uploadHeaders"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="(response: any) => handleAvatarSuccess(response, setValue)"
            :on-error="handleAvatarError"
          >
            <el-avatar :src="value" :size="80" class="avatar-uploader">
              <el-icon v-if="!value" class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-avatar>
          </el-upload>
          <div class="avatar-tip">
            <p>点击上传头像</p>
            <p>支持 JPG、PNG 格式，大小不超过 2MB</p>
          </div>
        </div>
      </template>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import BaseForm from '@/components/BaseForm.vue'
import type { UserInfo, FormItem } from '@/types'

interface Props {
  modelValue: Partial<UserInfo>
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// 定义事件
const emit = defineEmits<{
  'update:modelValue': [value: Partial<UserInfo>]
  submit: [value: Partial<UserInfo>]
  cancel: []
}>()

// Store
const userStore = useUserStore()

// 表单数据
const formData = ref<Partial<UserInfo>>({ ...props.modelValue })

// 上传配置
const uploadAction = computed(() => import.meta.env.VITE_UPLOAD_URL + '/avatar')
const uploadHeaders = computed(() => ({
  Authorization: `Bearer ${userStore.token}`
}))

// 表单项配置
const formItems: FormItem[] = [
  {
    prop: 'avatar',
    label: '头像',
    type: 'slot',
    slotName: 'avatar',
    span: 24
  },
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    span: 12,
    required: true
  },
  {
    prop: 'nickname',
    label: '昵称',
    type: 'input',
    placeholder: '请输入昵称',
    span: 12
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
    span: 12,
    required: true
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    placeholder: '请输入手机号',
    span: 12
  },
  {
    prop: 'password',
    label: '密码',
    type: 'input',
    placeholder: '请输入密码',
    showPassword: true,
    span: 12,
    required: true
  },
  {
    prop: 'confirmPassword',
    label: '确认密码',
    type: 'input',
    placeholder: '请再次输入密码',
    showPassword: true,
    span: 12,
    required: true
  },
  {
    prop: 'roles',
    label: '角色',
    type: 'select',
    placeholder: '请选择角色',
    multiple: true,
    options: [
      { label: '超级管理员', value: 'super_admin' },
      { label: '管理员', value: 'admin' },
      { label: '编辑者', value: 'editor' },
      { label: '查看者', value: 'viewer' }
    ],
    span: 12,
    required: true
  },
  {
    prop: 'status',
    label: '状态',
    type: 'switch',
    activeText: '启用',
    inactiveText: '禁用',
    activeValue: 1,
    inactiveValue: 0,
    span: 12
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'textarea',
    placeholder: '请输入备注信息',
    rows: 3,
    span: 24
  }
]

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  roles: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

// 是否为编辑模式
const isEdit = computed(() => !!props.modelValue.id)

// 监听 props 变化
watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = { ...newValue }
    
    // 编辑模式下不需要密码字段
    if (isEdit.value) {
      const passwordIndex = formItems.findIndex(item => item.prop === 'password')
      const confirmPasswordIndex = formItems.findIndex(item => item.prop === 'confirmPassword')
      
      if (passwordIndex !== -1) {
        formItems[passwordIndex].required = false
        formItems[passwordIndex].placeholder = '留空则不修改密码'
      }
      if (confirmPasswordIndex !== -1) {
        formItems[confirmPasswordIndex].required = false
        formItems[confirmPasswordIndex].placeholder = '留空则不修改密码'
      }
    }
  },
  { immediate: true, deep: true }
)

// 更新表单数据
const updateFormData = (value: Partial<UserInfo>) => {
  formData.value = value
  emit('update:modelValue', value)
}

// 头像上传前检查
const beforeAvatarUpload = (file: File) => {
  const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPGOrPNG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return false
  }
  return true
}

// 头像上传成功
const handleAvatarSuccess = (response: any, setValue: Function) => {
  if (response.code === 200) {
    setValue(response.data.url)
    ElMessage.success('头像上传成功')
  } else {
    ElMessage.error(response.message || '头像上传失败')
  }
}

// 头像上传失败
const handleAvatarError = () => {
  ElMessage.error('头像上传失败')
}

// 提交表单
const handleSubmit = (value: Partial<UserInfo>) => {
  // 过滤空密码
  const submitData = { ...value }
  if (isEdit.value && !submitData.password) {
    delete submitData.password
    delete submitData.confirmPassword
  }
  
  // 移除确认密码字段
  delete submitData.confirmPassword
  
  emit('submit', submitData)
}

// 取消
const handleCancel = () => {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.user-form {
  .avatar-upload {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .avatar-uploader {
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s;
      
      &:hover {
        border-color: #409eff;
      }
      
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }
    }
    
    .avatar-tip {
      p {
        margin: 0 0 4px 0;
        font-size: 14px;
        
        &:first-child {
          color: #606266;
          font-weight: 500;
        }
        
        &:last-child {
          color: #909399;
          font-size: 12px;
        }
      }
    }
  }
}

:deep(.el-upload) {
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
