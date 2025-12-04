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
    label: $t('system.menu.typeCatalog'),
    value: 'M',
  },
  {
    label: $t('system.menu.typeMenu'),
    value: 'C',
  },
  {
    label: $t('system.menu.typeButton'),
    value: 'A',
  },
];
const formSchema = [
  {
    label: $t('system.menu.menuType'),
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
    fieldName: 'parentId',
    label: $t('system.menu.parent'),
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
    fieldName: 'title',
    label: $t('system.menu.menuName'),
    rules: 'required',
  },

  {
    component: 'Input',
    fieldName: 'path',
    label: $t('system.menu.path'),
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
    label: $t('system.menu.component'),
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
    label: $t('system.menu.authCode'),
  },
  {
    component: 'IconPicker',
    componentProps: {
      prefix: 'carbon',
    },
    dependencies: {
      show: (values: any) => {
        return ['M', 'C'].includes(values.type);
      },
      triggerFields: ['type'],
    },
    fieldName: 'icon',
    label: $t('system.menu.icon'),
  },
  {
    component: 'Input',
    fieldName: 'sort',
    label: $t('system.menu.order'),
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
    label: $t('system.menu.status'),
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
  return formData.value?.id
    ? $t('ui.actionTitle.edit')
    : $t('ui.actionTitle.create');
});
</script>

<template>
  <Drawer :title="getDrawerTitle">
    <Form class="mx-4" />
  </Drawer>
</template>
