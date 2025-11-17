<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { VbenButton } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import DictDataFormModel from './dict-data-form.vue';
import { getDictDataListApi, deleteDictDataApi } from '#/api/core/sys';
import { ElMessageBox, ElMessage } from 'element-plus';

const emit = defineEmits<{
  success: [];
}>();
const dict_info = ref<any>({});
const [Drawer, drawerApi] = useVbenDrawer({
  footer: false,
  onOpenChange(isOpen) {
    if (isOpen) {
      dict_info.value = drawerApi.getData<any>();
      console.log(dict_info.value);
    }
  },
});
const [Grid, gridApi] = useVbenVxeGrid({
  // formOptions: {
  //   fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
  //   schema: [
  //     {
  //       component: 'Input',
  //       fieldName: 'keyword',
  //       label: '名称',
  //     },
  //   ],
  //   submitOnChange: true,
  //   showCollapseButton: false,
  // },
  gridOptions: {
    columns: [
      {
        title: '名称',
        field: 'name',
        minWidth: 150,
      },
      {
        title: '数据值',
        field: 'value',
        minWidth: 150,
      },
      {
        title: '操作',
        field: 'action',
        slots: { default: 'action' },
        minWidth: 150,
      },
    ],

    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) => {
          return await getDictDataListApi(dict_info.value.id, {
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    height: 'auto',
    keepSource: true,
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      zoom: true,
    },
    rowConfig: {
      keyField: 'id',
    },
  },
});

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: DictDataFormModel,
  destroyOnClose: true,
});

const dict_title = computed(() => {
  return `字典数据 -【${dict_info.value.name}】`;
});

function onCreate() {
  formModalApi.setData({}).open();
}
function onEdit(row: any) {
  formModalApi.setData(row).open();
}
async function onDelete(row: any) {
  try {
    await ElMessageBox.confirm(
      `确定要删除字典数据"${row.name}"吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    );

    await deleteDictDataApi(row.id);
    ElMessage.success('删除字典数据成功');
    gridApi.reload();
  } catch (error: any) {
    // 用户取消删除或删除失败
    if (error !== 'cancel') {
      ElMessage.error(error?.message || '删除失败');
    }
  }
}
function onRefresh() {
  gridApi.reload();
}
</script>
<template>
  <Drawer :title="dict_title" class="w-full max-w-[800px]" auto-content-height>
    <FormModal @success="onRefresh" />
    <Grid>
      <template #toolbar-tools>
        <VbenButton type="primary" @click="onCreate">
          <Plus />
          新增
        </VbenButton>
      </template>
      <template #action="{ row }">
        <div class="flex items-center justify-center gap-2">
          <VbenButton size="small" variant="link" @click="onEdit(row)"
            >编辑</VbenButton
          >
          <VbenButton size="small" variant="link" @click="onDelete(row)"
            >删除</VbenButton
          >
        </div>
      </template>
    </Grid>
  </Drawer>
</template>
