<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';
import { useVbenDrawer } from '@vben/common-ui';
import { computed, ref } from 'vue';
import { $t } from '#/locales';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const formSchema = [
  {
    component: 'Upload',
    componentProps: {
      accept: '.png,.jpg,.jpeg',
      listType: 'picture-card',
      maxCount: 1,
      action: '#', // 你需要替换为实际的上传地址
    },
    fieldName: 'avatar',
    label: '头像',
    formItemClass: 'avatar-upload',
    renderComponentContent: () => {
      return {
        default: () => '添加',
      };
    },
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    fieldName: 'gender',
    label: '性别',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '姓名',
  },
  {
    component: 'Divider',
    fieldName: 'divider1',
    formItemClass: 'col-span-2 md:col-span-2 pb-0',
    hideLabel: true,
  },
  {
    component: 'Input',
    fieldName: 'username',
    label: '员工编号',
  },

  {
    component: 'Input',
    fieldName: 'phone',
    label: '手机号',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '邮箱',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
  },

  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    formItemClass: 'col-span-2 md:col-span-2',
  },
];

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const formData = ref<any>();

const [Form, formApi] = useVbenForm({
  commonConfig: {
    colon: true,
    formItemClass: 'col-span-2 md:col-span-1',
  },
  wrapperClass: 'grid-cols-2 gap-x-4',
  schema: formSchema,
  showDefaultActions: false,
});
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.close();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<any>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      } else {
        formApi.resetForm();
      }
    }
  },
});
const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit')
    : $t('ui.actionTitle.create');
});
</script>

<template>
  <Drawer :title="getDrawerTitle" class="w-full max-w-[800px]">
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
  </Drawer>
</template>

<style scoped>
:deep(.avatar-upload .el-upload),
:deep(.avatar-upload .el-upload-list__item) {
  width: 100px;
  height: 100px;
}
</style>
