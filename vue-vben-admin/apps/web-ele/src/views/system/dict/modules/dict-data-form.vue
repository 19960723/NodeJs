<script lang="ts" setup>
import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { ref, computed } from 'vue';
import { $t } from '#/locales';
import { createDictDataApi, updateDictDataApi } from '#/api/core/sys';
import { ElMessage } from 'element-plus';

const emit = defineEmits<{
  success: [];
}>();
const formData = ref<any>({});
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      const values = modalApi.getData<any>();
      formData.value = values;
      if (formData.value) {
        formApi.setValues(formData.value);
      } else {
        formApi.resetForm();
        formData.value = undefined;
      }
    }
  },
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    // 锁定 Modal，防止重复提交
    modalApi.lock();
    // 调用 API
    (formData.value?.id
      ? updateDictDataApi(formData.value?.dictId, formData.value?.id, values)
      : createDictDataApi(formData.value?.dictId, values)
    )
      .then(() => {
        ElMessage.success(
          formData.value.id ? '更新字典数据成功' : '创建字典数据成功',
        );
        emit('success');
        modalApi.close();
      })
      .catch((error) => {
        ElMessage.error(error?.message || '操作失败');
        modalApi.unlock(); // 解锁 Modal
      });
  },
});
const formSchema = [
  {
    component: 'Input',
    fieldName: 'label',
    label: '名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'value',
    label: '数据值',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: $t('common.enabled'), value: 1 },
        { label: $t('common.disabled'), value: 0 },
      ],
    },
    defaultValue: 1,
    fieldName: 'status',
    label: $t('system.role.status'),
  },
  {
    component: 'Textarea',
    componentProps: {
      rows: 4,
      showCount: true,
      maxLength: 200,
    },
    fieldName: 'description',
    label: $t('system.role.description'),
  },
];
const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
});

// 计算 Modal 标题
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
