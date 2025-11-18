<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { VbenButton } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import {
  getVideoClassListApi,
  deleteVideoClassApi,
} from '#/api/core/knowledge';
import EditFormModel from './modules/edit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const columns = [
  {
    title: '分类名称',
    field: 'name',
    minWidth: 150,
  },
  {
    title: '分类描述',
    field: 'description',
    minWidth: 200,
  },
  {
    title: '状态',
    field: 'status',
    minWidth: 100,
    slots: { default: 'status' },
  },
  {
    title: '操作',
    field: 'action',
    minWidth: 150,
    slots: { default: 'action' },
  },
];
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        component: 'Input',
        fieldName: 'keyword',
        label: '分类名称',
      },
    ],
    submitOnChange: true,
    showCollapseButton: false,
  },
  gridOptions: {
    columns: columns as VxeTableGridOptions['columns'],
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) => {
          return await getVideoClassListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
      response: {
        result: 'list',
        total: 'pagination.total',
        list: 'list',
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
  },
});

const [EditModal, editModalApi] = useVbenModal({
  connectedComponent: EditFormModel,
  destroyOnClose: true,
});

function onRefresh() {
  gridApi.reload();
}
function onCreate() {
  editModalApi.setData({}).open();
}
function onEdit(row: any) {
  editModalApi.setData(row).open();
}
async function onDelete(row: any) {
  try {
    await ElMessageBox.confirm(
      `确定要删除分类"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    );

    await deleteVideoClassApi(row.id);
    ElMessage.success('删除分类成功');
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
    <EditModal @success="onRefresh" />
    <Grid>
      <template #toolbar-tools>
        <VbenButton type="primary" @click="onCreate">
          <Plus />
          新增
        </VbenButton>
      </template>
      <template #status="{ row }">
        <div>
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </div>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-center gap-2">
          <VbenButton size="xs" variant="link" @click="onEdit(row)">
            编辑
          </VbenButton>
          <VbenButton size="xs" variant="link" @click="onDelete(row)">
            删除
          </VbenButton>
        </div>
      </template>
    </Grid>
  </Page>
</template>
