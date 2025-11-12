<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, VbenButton, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import UserFormDrawer from './modules/form.vue';
import { deleteUser, getUserListApi } from '#/api/core/user';
import { $t } from '#/locales';
import { ElMessage, ElMessageBox } from 'element-plus';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: UserFormDrawer,
  destroyOnClose: true,
});

const columns = [
  {
    title: '序号',
    width: 80,
    type: 'seq',
  },
  {
    title: '员工编号',
    field: 'username',
    minWidth: 150,
    align: 'left',
  },
  {
    title: '姓名',
    field: 'name',
    minWidth: 150,
    align: 'left',
  },
  {
    title: '昵称',
    field: 'nickname',
    minWidth: 150,
    align: 'left',
  },
  {
    title: '手机号',
    field: 'phone',
    minWidth: 150,
    align: 'left',
  },
  {
    field: 'action',
    fixed: 'right',
    title: $t('system.role.operation'),
    width: 150,
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
        label: $t('system.user.userName'),
      },
    ],
    submitOnChange: true,
    showCollapseButton: false,
  },
  gridOptions: {
    height: 'auto',
    columns: columns as VxeTableGridOptions['columns'],
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getUserListApi({
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

function onRefresh() {
  gridApi.reload();
}
function onCreate() {
  formDrawerApi.open();
}
function onEdit(row: any) {
  formDrawerApi.setData(row).open();
}
async function onDelete(row: any) {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    );
    await deleteUser(row.id);
    ElMessage.success('删除用户成功');
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
          {{ $t('ui.actionTitle.create', [$t('system.user.name')]) }}
        </VbenButton>
      </template>
      <!-- 操作列 -->
      <template #action="{ row }">
        <div class="flex items-center justify-center gap-2">
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
    </Grid>
  </Page>
</template>
