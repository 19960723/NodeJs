<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, useVbenModal, useVbenDrawer } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { VbenButton } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import { getDictListApi, deleteDictApi } from '#/api/core/sys';
import EditFormModel from './modules/edit.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import DictDataModel from './modules/dict-data.vue';

const columns = [
  {
    title: '字典名称',
    field: 'name',
    minWidth: 150,
  },
  {
    title: '字典编号',
    field: 'code',
    minWidth: 150,
  },
  {
    title: '字典描述',
    field: 'description',
    minWidth: 150,
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
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: [
      {
        component: 'Input',
        fieldName: 'keyword',
        label: '字典名称',
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
        query: async ({ page }, formValues) => {
          return await getDictListApi({
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

const [DictDataConfigDrawer, dictDataConfigDrawerApi] = useVbenDrawer({
  connectedComponent: DictDataModel,
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
      `确定要删除字典"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    );

    await deleteDictApi(row.id);
    ElMessage.success('删除字典成功');
    gridApi.reload();
  } catch (error: any) {
    // 用户取消删除或删除失败
    if (error !== 'cancel') {
      ElMessage.error(error?.message || '删除失败');
    }
  }
}

async function onDictConfig(row: any) {
  dictDataConfigDrawerApi.setData(row).open();
}
</script>
<template>
  <Page auto-content-height>
    <EditModal @success="onRefresh" />
    <DictDataConfigDrawer @success="onRefresh" />
    <Grid>
      <template #toolbar-tools>
        <VbenButton type="primary" @click="onCreate">
          <Plus />
          新增
        </VbenButton>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-center gap-2">
          <VbenButton size="small" variant="link" @click="onEdit(row)">
            编辑
          </VbenButton>
          <VbenButton size="small" variant="link" @click="onDictConfig(row)">
            字典配置
          </VbenButton>
          <VbenButton size="small" variant="link" @click="onDelete(row)">
            删除
          </VbenButton>
        </div>
      </template>
    </Grid>
  </Page>
</template>
<style></style>
