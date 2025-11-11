<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, VbenButton, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import UserFormDrawer from './modules/form.vue';
import { getUserListApi } from '#/api/core/user';
import { $t } from '#/locales';
const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: UserFormDrawer,
  destroyOnClose: true,
});

const columns = [
  {
    title: '序号',
    field: 'id',
    width: 80,
  },
  {
    title: '员工编号',
    field: 'username',
    minWidth: 150,
  },
  {
    title: '昵称',
    field: 'nickname',
    minWidth: 150,
  },
];
const [Grid, gridApi] = useVbenVxeGrid({
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
    </Grid>
  </Page>
</template>
