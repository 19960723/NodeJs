<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="size"
    v-bind="$attrs"
  >
    <el-row :gutter="gutter">
      <el-col
        v-for="item in formItems"
        :key="item.prop"
        :span="item.span || defaultSpan"
        :xs="item.xs || 24"
        :sm="item.sm"
        :md="item.md"
        :lg="item.lg"
        :xl="item.xl"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          :required="item.required"
          :rules="item.rules"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :clearable="item.clearable !== false"
            :show-password="item.showPassword"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :maxlength="item.maxlength"
            :show-word-limit="item.showWordLimit"
            v-bind="item.attrs"
          />

          <!-- 数字输入框 -->
          <el-input-number
            v-else-if="item.type === 'number'"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :min="item.min"
            :max="item.max"
            :step="item.step"
            :precision="item.precision"
            :controls-position="item.controlsPosition"
            style="width: 100%"
            v-bind="item.attrs"
          />

          <!-- 文本域 -->
          <el-input
            v-else-if="item.type === 'textarea'"
            v-model="modelValue[item.prop]"
            type="textarea"
            :placeholder="item.placeholder"
            :rows="item.rows || 3"
            :maxlength="item.maxlength"
            :show-word-limit="item.showWordLimit"
            :disabled="item.disabled"
            :readonly="item.readonly"
            v-bind="item.attrs"
          />

          <!-- 选择器 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :multiple="item.multiple"
            :filterable="item.filterable"
            :remote="item.remote"
            :remote-method="item.remoteMethod"
            style="width: 100%"
            v-bind="item.attrs"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </el-select>

          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="modelValue[item.prop]"
            :type="item.dateType || 'date'"
            :placeholder="item.placeholder"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :disabled="item.disabled"
            :clearable="item.clearable !== false"
            :format="item.format"
            :value-format="item.valueFormat"
            style="width: 100%"
            v-bind="item.attrs"
          />

          <!-- 时间选择器 -->
          <el-time-picker
            v-else-if="item.type === 'time'"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :clearable="item.clearable !== false"
            :format="item.format"
            :value-format="item.valueFormat"
            style="width: 100%"
            v-bind="item.attrs"
          />

          <!-- 开关 -->
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="modelValue[item.prop]"
            :disabled="item.disabled"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"
            v-bind="item.attrs"
          />

          <!-- 单选框组 -->
          <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="modelValue[item.prop]"
            :disabled="item.disabled"
            v-bind="item.attrs"
          >
            <el-radio
              v-for="option in item.options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-radio>
          </el-radio-group>

          <!-- 多选框组 -->
          <el-checkbox-group
            v-else-if="item.type === 'checkbox'"
            v-model="modelValue[item.prop]"
            :disabled="item.disabled"
            v-bind="item.attrs"
          >
            <el-checkbox
              v-for="option in item.options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>

          <!-- 上传 -->
          <el-upload
            v-else-if="item.type === 'upload'"
            :action="item.action"
            :headers="item.headers"
            :multiple="item.multiple"
            :accept="item.accept"
            :limit="item.limit"
            :file-list="modelValue[item.prop]"
            :disabled="item.disabled"
            :before-upload="item.beforeUpload"
            :on-success="(response: any, file: any, fileList: any) => handleUploadSuccess(response, file, fileList, item)"
            :on-error="item.onError"
            :on-remove="(file: any, fileList: any) => handleUploadRemove(file, fileList, item)"
            v-bind="item.attrs"
          >
            <el-button type="primary">
              <el-icon><Upload /></el-icon>
              {{ item.uploadText || '上传文件' }}
            </el-button>
          </el-upload>

          <!-- 自定义插槽 -->
          <slot
            v-else-if="item.type === 'slot'"
            :name="item.slotName"
            :item="item"
            :value="modelValue[item.prop]"
            :setValue="(value: any) => setValue(item.prop, value)"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 表单按钮 -->
    <el-form-item v-if="showButtons" class="form-buttons">
      <slot name="buttons">
        <el-button
          type="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          {{ submitText }}
        </el-button>
        <el-button
          @click="handleReset"
        >
          {{ resetText }}
        </el-button>
        <el-button
          v-if="showCancel"
          @click="handleCancel"
        >
          {{ cancelText }}
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormItem } from '@/types'

interface Props {
  // 表单数据
  modelValue: Record<string, any>
  // 表单项配置
  formItems: FormItem[]
  // 验证规则
  rules?: Record<string, any>
  // 标签宽度
  labelWidth?: string | number
  // 标签位置
  labelPosition?: 'left' | 'right' | 'top'
  // 表单尺寸
  size?: 'large' | 'default' | 'small'
  // 栅格间隔
  gutter?: number
  // 默认列跨度
  defaultSpan?: number
  // 加载状态
  loading?: boolean
  // 显示按钮
  showButtons?: boolean
  // 显示取消按钮
  showCancel?: boolean
  // 按钮文本
  submitText?: string
  resetText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  labelWidth: '100px',
  labelPosition: 'right',
  size: 'default',
  gutter: 20,
  defaultSpan: 24,
  loading: false,
  showButtons: true,
  showCancel: false,
  submitText: '提交',
  resetText: '重置',
  cancelText: '取消'
})

// 定义事件
const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  submit: [value: Record<string, any>]
  reset: []
  cancel: []
}>()

// 表单引用
const formRef = ref()

// 设置值
const setValue = (prop: string, value: any) => {
  const newValue = { ...props.modelValue }
  newValue[prop] = value
  emit('update:modelValue', newValue)
}

// 处理上传成功
const handleUploadSuccess = (response: any, file: any, fileList: any, item: FormItem) => {
  setValue(item.prop, fileList)
  item.onSuccess?.(response, file, fileList)
}

// 处理上传移除
const handleUploadRemove = (file: any, fileList: any, item: FormItem) => {
  setValue(item.prop, fileList)
  item.onRemove?.(file, fileList)
}

// 处理提交
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    emit('submit', props.modelValue)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 处理重置
const handleReset = () => {
  formRef.value?.resetFields()
  emit('reset')
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
}

// 验证表单
const validate = () => {
  return formRef.value?.validate()
}

// 验证指定字段
const validateField = (props: string | string[]) => {
  return formRef.value?.validateField(props)
}

// 重置表单
const resetFields = () => {
  formRef.value?.resetFields()
}

// 清空验证信息
const clearValidate = (props?: string | string[]) => {
  formRef.value?.clearValidate(props)
}

// 暴露方法
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
  formRef
})
</script>

<style lang="scss" scoped>
.form-buttons {
  text-align: center;
  margin-top: 20px;
  
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
