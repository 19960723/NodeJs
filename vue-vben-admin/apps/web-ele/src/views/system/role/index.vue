<script setup lang="ts">
/**
 * 角色管理页面
 * 职责：
 * 1. 列表展示和搜索
 * 2. 打开表单 Modal
 * 3. 监听表单提交成功，刷新列表
 * 4. 删除操作
 */
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { Page, VbenButton, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteRole, getRolePageList } from '#/api/core/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import RoleFormModal from './modules/form.vue';

// 创建 Modal
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: RoleFormModal,
  destroyOnClose: true, // 关闭时销毁组件
});

// 处理表单提交成功
function onRefresh() {
  gridApi.reload();
}

const columns = [
  // {
  //   align: 'center',
  //   title: 'ID',
  //   field: 'id',
  //   width: 80,
  // },
  {
    title: '角色名称',
    field: 'name',
    minWidth: 150,
  },
  {
    title: '角色编码',
    field: 'code',
    minWidth: 150,
  },
  {
    align: 'center',
    title: '状态',
    field: 'status',
    width: 100,
    slots: { default: 'status' },
  },
  {
    title: '角色描述',
    field: 'description',
    minWidth: 200,
  },
  {
    align: 'center',
    title: '创建时间',
    field: 'created_at',
    width: 180,
  },
  {
    align: 'center',
    fixed: 'right',
    title: '操作',
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
        fieldName: 'name',
        label: '角色名称',
      },
    ],
    submitOnChange: true,
    showCollapseButton: false,
  },
  gridOptions: {
    columns: columns as VxeTableGridOptions['columns'],
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getRolePageList({
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

// 新增角色
function onCreate() {
  formModalApi.setData({}).open(); // 🔥 使用 setData API
}

// 编辑角色
function onEdit(row: any) {
  formModalApi.setData(row).open(); // 🔥 使用 setData API
}

// 删除角色
async function onDelete(row: any) {
  try {
    await ElMessageBox.confirm(
      `确定要删除角色"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    );

    await deleteRole(row.id);
    ElMessage.success('删除角色成功');
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
    <FormModal @success="onRefresh" />
    <Grid>
      <template #toolbar-tools>
        <VbenButton type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增角色
        </VbenButton>
      </template>

      <!-- 状态列 -->
      <template #status="{ row }">
        <span
          :class="[
            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
            row.status === 1
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700',
          ]"
        >
          {{ row.status === 1 ? '启用' : '禁用' }}
        </span>
      </template>

      <!-- 操作列 -->
      <template #action="{ row }">
        <div class="flex items-center justify-center gap-2">
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

<style scoped lang="scss"></style>
