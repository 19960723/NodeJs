<script lang="ts" setup>
import { useVbenModal, useVbenForm } from '@vben/common-ui';
import { ref, computed } from 'vue';
import { $t } from '#/locales';
import { ElMessage } from 'element-plus';
import { createVideoClassApi, updateVideoClassApi } from '#/api/core/knowledge';
import type { VbenFormSchema } from '#/adapter/form';

const emit = defineEmits<{
  success: [];
}>();
const formData = ref<any>();

const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'name',
    label: '分类名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'description',
    label: '分类描述',
    componentProps: {
      type: 'textarea',
      rows: 3,
    },
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
];

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
});
const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    // 锁定 Modal，防止重复提交
    modalApi.lock();
    // 调用 API
    (formData.value?.id
      ? updateVideoClassApi(formData.value?.id, values)
      : createVideoClassApi(values)
    )
      .then(() => {
        ElMessage.success(formData.value?.id ? '更新分类成功' : '创建分类成功');
        emit('success');
        modalApi.close();
      })
      .catch((error) => {
        ElMessage.error(error?.message || '操作失败');
        modalApi.unlock(); // 解锁 Modal
      });
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<any>();
      if (data && data.id) {
        formApi.setValues(data);
        formData.value = data;
      } else {
        formApi.resetForm();
        formData.value = undefined;
      }
    }
  },
});
const modalTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit')
    : $t('ui.actionTitle.create');
});
</script>
<template>
  <Modal :title="modalTitle">
    <Form />
  </Modal>
</template>
