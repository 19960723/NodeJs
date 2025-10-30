<script lang="ts" setup>
import type { Recordable } from '@vben/types';
import { useVbenForm } from '#/adapter/form';
import { useVbenDrawer } from '@vben/common-ui';
import {
  getAllMenusApi,
  SystemMenuApi,
  createMenu,
  updateMenu,
} from '#/api/core/menu';
import { ref, computed, h } from 'vue';
import { ElMessage } from 'element-plus';
import { IconifyIcon } from '@vben/icons';
import { $t } from '#/locales';
import { getPopupContainer } from '@vben/utils';

const emit = defineEmits<{
  success: [];
}>();

const menuTypes = [
  {
    label: '目录',
    value: 'M',
  },
  {
    label: '菜单',
    value: 'C',
  },
  {
    label: '按钮',
    value: 'A',
  },
];
const formSchema = [
  {
    label: '菜单类型',
    fieldName: 'type',
    component: 'RadioGroup',
    rules: 'required',
    componentProps: {
      options: menuTypes.map((menu) => ({
        label: menu.label,
        value: menu.value,
      })),
    },
    defaultValue: 'M',
  },
  {
    component: 'ApiTreeSelect',
    fieldName: 'parent_id',
    label: '父级菜单',
    componentProps: {
      api: getAllMenusApi,
      class: 'w-full',
      filterTreeNode(input: string, node: Recordable<any>) {
        if (!input || input.length === 0) {
          return true;
        }
        const title: string = node.meta?.title ?? '';
        if (!title) return false;
        return title.includes(input) || $t(title).includes(input);
      },
      getPopupContainer,
      labelField: 'name',
      showSearch: true,
      treeDefaultExpandAll: true,
      valueField: 'id',
      childrenField: 'children',
    },
    renderComponentContent() {
      return {
        title({ label, meta }: { label: string; meta: Recordable<any> }) {
          const coms = [];
          if (!label) return '';
          if (meta?.icon) {
            coms.push(h(IconifyIcon, { class: 'size-4', icon: meta.icon }));
          }
          coms.push(h('span', { class: '' }, $t(label || '')));
          return h('div', { class: 'flex items-center gap-1' }, coms);
        },
      };
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '菜单名称',
    rules: 'required',
  },

  {
    component: 'Input',
    fieldName: 'path',
    label: '路由路径',
    rules: 'required',
    dependencies: {
      show: (values: any) => {
        return ['M', 'C'].includes(values.type);
      },
      triggerFields: ['type'],
    },
  },
  {
    component: 'Input',
    fieldName: 'component',
    label: '前端组件',
    rules: 'required',
    dependencies: {
      show: (values: any) => {
        return ['C'].includes(values.type);
      },
      triggerFields: ['type'],
    },
  },
  {
    component: 'Input',
    fieldName: 'perms',
    label: '权限标识',
  },
  {
    component: 'IconPicker',
    componentProps: {
      prefix: 'carbon',
    },
    dependencies: {
      show: (values) => {
        return ['M'].includes(values.type);
      },
      triggerFields: ['type'],
    },
    fieldName: 'icon',
    label: '图标',
  },
  {
    component: 'Input',
    fieldName: 'order',
    label: '排序',
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

const formData = ref<SystemMenuApi.SystemMenu>();

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values =
      await formApi.getValues<
        Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>
      >();
    try {
      await (formData.value?.id
        ? updateMenu(formData.value.id, values)
        : createMenu(values));
      ElMessage.success(formData.value?.id ? '更新菜单成功' : '创建菜单成功');
      emit('success');
      drawerApi.close();
    } finally {
      drawerApi.unlock();
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<SystemMenuApi.SystemMenu>();
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
  return formData.value?.id ? '编辑菜单' : '新增菜单';
});
</script>

<template>
  <Drawer :title="getDrawerTitle">
    <Form class="mx-4" />
  </Drawer>
</template>
