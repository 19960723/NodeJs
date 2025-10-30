<script setup lang="ts">
/**
 * 角色表单组件
 * 参照官方示例：playground/src/views/system/role/modules/form.vue
 */
import { computed, nextTick, ref } from 'vue';
import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { createRoles, updateRole } from '#/api/core/user';
import { ElMessage } from 'element-plus';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<any>();
const id = ref<number>();

// 表单 Schema
const formSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色名称',
    },
    fieldName: 'name',
    label: '角色名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入角色编码',
    },
    fieldName: 'code',
    label: '角色编码',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    defaultValue: 1,
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'Textarea',
    componentProps: {
      placeholder: '请输入角色描述',
      rows: 4,
      showCount: true,
      maxLength: 200,
    },
    fieldName: 'description',
    label: '角色描述',
  },
];

// 创建表单
const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
});

// 创建 Modal
const [Modal, modalApi] = useVbenModal({
  // 🔥 官方推荐：onConfirm 中处理提交逻辑
  async onConfirm() {
    // 验证表单
    const { valid } = await formApi.validate();
    if (!valid) return;

    // 获取表单值
    const values = await formApi.getValues();

    // 锁定 Modal，防止重复提交
    modalApi.lock();

    // 调用 API
    (id.value ? updateRole(id.value, values) : createRoles(values))
      .then(() => {
        ElMessage.success(id.value ? '更新角色成功' : '创建角色成功');
        emit('success');
        modalApi.close();
      })
      .catch((error) => {
        ElMessage.error(error?.message || '操作失败');
        modalApi.unlock(); // 解锁 Modal
      });
  },

  // 🔥 官方推荐：onOpenChange 中处理数据初始化
  async onOpenChange(isOpen) {
    if (isOpen) {
      // 获取父组件通过 setData 传递的数据
      const data = modalApi.getData<any>();

      // 重置表单
      formApi.resetForm();

      if (data && data.id) {
        // 编辑模式
        formData.value = data;
        id.value = data.id;
      } else {
        // 新增模式
        formData.value = undefined;
        id.value = undefined;
      }

      // 等待 Vue 刷新 DOM（表单字段挂载）
      await nextTick();

      // 设置表单值
      if (data && data.id) {
        formApi.setValues(data);
      }
    }
  },
});

// 计算 Modal 标题
const modalTitle = computed(() => {
  return formData.value?.id ? '编辑角色' : '新增角色';
});
</script>

<template>
  <Modal :title="modalTitle">
    <Form />
  </Modal>
</template>
