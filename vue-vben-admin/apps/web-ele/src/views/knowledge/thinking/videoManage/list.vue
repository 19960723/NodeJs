<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { VbenButton } from '@vben/common-ui';
import { Plus } from '@vben/icons';

const columns = [
  {
    title: '视频封面',
    field: 'title',
    minWidth: 120,
  },
  {
    title: '视频标题',
    field: 'title',
    minWidth: 200,
  },
  {
    title: '视频分类',
    field: 'className',
    minWidth: 120,
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
        label: '视频标题',
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
          // 替换为实际的API调用
          return {
            list: [],
            pagination: { total: 0 },
          };
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

function onCreate() {
  // 新增视频逻辑
}

function onEdit(row: any) {
  // 编辑视频逻辑
}

function onDelete(row: any) {
  // 删除视频逻辑
}

function onRefresh() {
  gridApi.reload();
}
</script>
<template>
  <Page auto-content-height title="视频管理">
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
            {{ row.status === 1 ? '已发布' : '草稿' }}
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
