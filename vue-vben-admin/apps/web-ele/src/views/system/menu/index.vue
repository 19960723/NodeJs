<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, VbenButton, useVbenDrawer } from '@vben/common-ui';
import { IconifyIcon, Plus } from '@vben/icons';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getAllMenusApi, deleteMenu } from '#/api/core/menu';
import MenuFormDrawer from './modules/form.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { $t } from '#/locales';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: MenuFormDrawer,
  destroyOnClose: true,
});

function getMenuTypeOptions() {
  return [
    {
      type: 'primary',
      label: $t('system.menu.typeCatalog'),
      value: 'M',
    },
    { type: 'success', label: $t('system.menu.typeMenu'), value: 'C' },
    { type: 'danger', label: $t('system.menu.typeButton'), value: 'A' },
  ];
}
const columns = [
  {
    title: $t('system.menu.menuName'),
    field: 'name',
    minWidth: 150,
    align: 'left',
    treeNode: true,
    slots: { default: 'name' },
  },
  {
    title: $t('system.menu.menuType'),
    field: 'type',
    minWidth: 100,
    cellRender: { name: 'CellTag', options: getMenuTypeOptions() },
  },
  {
    title: $t('system.menu.icon'),
    field: 'icon',
    minWidth: 80,
    align: 'center',
    slots: { default: 'icon' },
  },
  {
    title: $t('system.menu.path'),
    field: 'path',
    minWidth: 150,
    align: 'left',
  },
  {
    title: $t('system.menu.component'),
    field: 'component',
    minWidth: 150,
    align: 'left',
  },
  {
    title: $t('system.menu.authCode'),
    field: 'perms',
    minWidth: 150,
    align: 'left',
  },
  {
    title: $t('system.menu.status'),
    field: 'status',
    minWidth: 100,
    cellRender: { name: 'CellTag' },
  },
  {
    title: $t('system.menu.order'),
    field: 'order',
    minWidth: 100,
  },
  {
    align: 'left',
    fixed: 'right',
    title: $t('system.menu.operation'),
    width: 200,
    slots: { default: 'action' },
  },
];
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    height: 'auto',
    columns: columns as VxeTableGridOptions['columns'],
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => {
          const data = (await getAllMenusApi()) as any;
          const items = Array.isArray(data) ? data : (data?.items ?? []);
          return { items };
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      zoom: true,
    },
    treeConfig: {
      childrenField: 'children',
      transform: false,
    },
  },
});

function onCreate(row: any) {
  if (row) {
    formDrawerApi.setData({ parent_id: row.id }).open();
  } else {
    formDrawerApi.open();
  }
}
function onEdit(row: any) {
  formDrawerApi.setData(row).open();
}
function onRefresh() {
  gridApi.query();
}

async function onDelete(row: any) {
  try {
    await ElMessageBox.confirm(
      `确定要删除菜单"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    );

    await deleteMenu(row.id);
    ElMessage.success('删除菜单成功');
    gridApi.reload();
  } catch (error: any) {
    // 用户取消删除或删除失败
    if (error !== 'cancel') {
      ElMessage.error(error?.message || '删除失败');
    }
  }
}
</script>

<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <Grid>
      <template #toolbar-tools>
        <VbenButton type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.menu.name')]) }}
        </VbenButton>
      </template>
      <template #name="{ row }">
        <div class="flex items-center justify-start gap-2">
          <span>{{ $t(row.name) }}</span>
        </div>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-start gap-2">
          <VbenButton
            v-if="row.type !== 'A'"
            size="small"
            variant="link"
            @click="onCreate(row)"
          >
            {{ $t('ui.actionTitle.create') }}
          </VbenButton>
          <VbenButton size="small" variant="link" @click="onEdit(row)">
            {{ $t('ui.actionTitle.edit') }}
          </VbenButton>
          <VbenButton
            size="small"
            variant="link"
            class="text-red-600 hover:text-red-700"
            @click="onDelete(row)"
          >
            {{ $t('ui.actionTitle.delete') }}
          </VbenButton>
        </div>
      </template>
      <template #icon="{ row }">
        <div class="flex w-full items-center justify-center gap-1">
          <div class="size-5 flex-shrink-0">
            <IconifyIcon :icon="row.icon" class="size-full" />
          </div>
        </div>
      </template>
    </Grid>
  </Page>
</template>
<style></style>
