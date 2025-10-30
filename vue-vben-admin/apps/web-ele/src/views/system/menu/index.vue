<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, VbenButton, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getAllMenusApi, deleteMenu } from '#/api/core/menu';
import MenuFormDrawer from './modules/form.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: MenuFormDrawer,
  destroyOnClose: true,
});

function getMenuTypeOptions() {
  return [
    {
      type: 'primary',
      label: '目录',
      value: 'M',
    },
    { type: 'success', label: '菜单', value: 'C' },
    { type: 'danger', label: '按钮', value: 'A' },
  ];
}
const columns = [
  {
    title: '菜单名称',
    field: 'name',
    minWidth: 150,
    align: 'left',
    treeNode: true,
  },
  {
    title: '菜单类型',
    field: 'type',
    minWidth: 100,
    cellRender: { name: 'CellTag', options: getMenuTypeOptions() },
  },
  {
    title: '路由路径',
    field: 'path',
    minWidth: 150,
    align: 'left',
  },
  {
    title: '组件路径',
    field: 'component',
    minWidth: 150,
    align: 'left',
  },
  {
    title: '权限标识',
    field: 'perms',
    minWidth: 150,
    align: 'left',
  },
  {
    title: '状态',
    field: 'status',
    minWidth: 100,
    cellRender: { name: 'CellTag' },
  },
  {
    title: '排序',
    field: 'order',
    minWidth: 100,
  },
  {
    align: 'left',
    fixed: 'right',
    title: '操作',
    width: 150,
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
          新增菜单
        </VbenButton>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-start gap-2">
          <VbenButton
            v-if="row.type !== 'A'"
            size="small"
            variant="link"
            @click="onCreate(row)"
          >
            新增
          </VbenButton>
          <VbenButton size="small" variant="link" @click="onEdit(row)">
            编辑
          </VbenButton>
          <VbenButton
            size="small"
            variant="link"
            class="text-red-600 hover:text-red-700"
            @click="onDelete(row)"
          >
            删除
          </VbenButton>
        </div>
      </template>
    </Grid>
  </Page>
</template>
<style></style>
