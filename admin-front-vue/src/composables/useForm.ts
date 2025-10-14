import { ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

interface UseFormOptions {
  resetAfterSubmit?: boolean
  showSuccessMessage?: boolean
  successMessage?: string
}

/**
 * 表单管理 Hook
 */
export function useForm<T extends Record<string, any>>(
  initialData: T,
  options: UseFormOptions = {}
) {
  const {
    resetAfterSubmit = false,
    showSuccessMessage = true,
    successMessage = '操作成功'
  } = options

  // 表单引用
  const formRef = ref<FormInstance>()

  // 表单数据
  const formData = reactive<T>({ ...initialData })

  // 原始数据（用于重置）
  const originalData = { ...initialData }

  // 加载状态
  const loading = ref(false)

  // 重置表单
  const resetForm = () => {
    Object.assign(formData, originalData)
    nextTick(() => {
      formRef.value?.clearValidate()
    })
  }

  // 验证表单
  const validateForm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!formRef.value) {
        resolve(false)
        return
      }

      formRef.value.validate((valid) => {
        resolve(valid)
      })
    })
  }

  // 验证指定字段
  const validateField = (props: string | string[]): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!formRef.value) {
        resolve(false)
        return
      }

      formRef.value.validateField(props, (valid) => {
        resolve(valid)
      })
    })
  }

  // 清除验证
  const clearValidate = (props?: string | string[]) => {
    formRef.value?.clearValidate(props)
  }

  // 提交表单
  const submitForm = async (
    submitApi: (data: T) => Promise<any>,
    beforeSubmit?: (data: T) => T | Promise<T>
  ) => {
    try {
      // 验证表单
      const isValid = await validateForm()
      if (!isValid) {
        return false
      }

      loading.value = true

      // 处理提交数据
      let submitData = { ...formData }
      if (beforeSubmit) {
        submitData = await beforeSubmit(submitData)
      }

      // 调用提交接口
      const result = await submitApi(submitData)

      // 显示成功消息
      if (showSuccessMessage) {
        ElMessage.success(successMessage)
      }

      // 重置表单
      if (resetAfterSubmit) {
        resetForm()
      }

      return result
    } catch (error: any) {
      ElMessage.error(error.message || '提交失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 设置表单数据
  const setFormData = (data: Partial<T>) => {
    Object.assign(formData, data)
  }

  // 获取表单数据
  const getFormData = (): T => {
    return { ...formData }
  }

  // 设置字段值
  const setFieldValue = (field: keyof T, value: any) => {
    formData[field] = value
  }

  // 获取字段值
  const getFieldValue = (field: keyof T) => {
    return formData[field]
  }

  // 检查表单是否有变化
  const hasChanges = (): boolean => {
    return JSON.stringify(formData) !== JSON.stringify(originalData)
  }

  // 标记字段错误
  const setFieldError = (field: string, message: string) => {
    formRef.value?.setFields([
      {
        field,
        message
      }
    ])
  }

  // 批量设置字段错误
  const setFieldErrors = (errors: Record<string, string>) => {
    const fields = Object.entries(errors).map(([field, message]) => ({
      field,
      message
    }))
    formRef.value?.setFields(fields)
  }

  return {
    // 引用
    formRef,

    // 状态
    formData,
    loading,

    // 方法
    resetForm,
    validateForm,
    validateField,
    clearValidate,
    submitForm,
    setFormData,
    getFormData,
    setFieldValue,
    getFieldValue,
    hasChanges,
    setFieldError,
    setFieldErrors
  }
}
