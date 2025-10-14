<template>
  <div class="base-table">
    <!-- 表格工具栏 -->
    <div v-if="showToolbar" class="table-toolbar">
      <div class="toolbar-left">
        <slot name="toolbar-left">
          <el-button v-if="showAdd" type="primary" @click="$emit('add')">
            <el-icon><Plus /></el-icon>
            新增
          </el-button>
          <el-button
            v-if="showBatchDelete && selectedRows.length > 0"
            type="danger"
            @click="$emit('batch-delete', selectedRows)"
          >
            <el-icon><Delete /></el-icon>
            批量删除
          </el-button>
        </slot>
      </div>

      <div class="toolbar-right">
        <slot name="toolbar-right">
          <el-button type="text" @click="refresh">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </slot>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="tableRef"
      :data="data"
      :loading="loading"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      v-bind="$attrs"
      class="data-table"
    >
      <!-- 选择列 -->
      <el-table-column v-if="showSelection" type="selection" width="55" align="center" />

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="70"
        align="center"
        :index="indexMethod"
      />

      <!-- 数据列 -->
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip !== false"
        :align="column.align || 'left'"
      >
        <template #default="scope" v-if="column.slot">
          <slot :name="column.slot" :row="scope.row" :column="scope.column" :index="scope.$index" />
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        v-if="showAction"
        label="操作"
        :width="actionWidth"
        :fixed="actionFixed"
        align="center"
      >
        <template #default="scope">
          <slot name="action" :row="scope.row" :index="scope.$index">
            <el-button
              v-if="showEdit"
              type="primary"
              size="small"
              @click="$emit('edit', scope.row, scope.$index)"
            >
              编辑
            </el-button>
            <el-button
              v-if="showDelete"
              type="danger"
              size="small"
              @click="$emit('delete', scope.row, scope.$index)"
            >
              删除
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="showPagination" class="table-pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@/types'

interface Props {
  // 表格数据
  data: any[]
  // 表格列配置
  columns: TableColumn[]
  // 加载状态
  loading?: boolean
  // 表格高度
  height?: string | number
  // 最大高度
  maxHeight?: string | number
  // 斑马纹
  stripe?: boolean
  // 边框
  border?: boolean
  // 尺寸
  size?: 'large' | 'default' | 'small'
  // 行key
  rowKey?: string

  // 工具栏
  showToolbar?: boolean
  showAdd?: boolean
  showBatchDelete?: boolean

  // 列显示控制
  showSelection?: boolean
  showIndex?: boolean
  showAction?: boolean

  // 操作列配置
  actionWidth?: string | number
  actionFixed?: string | boolean
  showEdit?: boolean
  showDelete?: boolean

  // 分页
  showPagination?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
  pageSizes?: number[]
  paginationLayout?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  stripe: true,
  border: true,
  size: 'default',
  rowKey: 'id',

  showToolbar: true,
  showAdd: true,
  showBatchDelete: true,

  showSelection: false,
  showIndex: true,
  showAction: true,

  actionWidth: 150,
  actionFixed: 'right',
  showEdit: true,
  showDelete: true,

  showPagination: true,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  paginationLayout: 'total, sizes, prev, pager, next, jumper'
})

// 定义事件
const emit = defineEmits<{
  add: []
  edit: [row: any, index: number]
  delete: [row: any, index: number]
  'batch-delete': [rows: any[]]
  'selection-change': [selection: any[]]
  'sort-change': [sort: { prop: string; order: string }]
  'size-change': [size: number]
  'current-change': [page: number]
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  refresh: []
}>()

// 表格引用
const tableRef = ref()

// 选中的行
const selectedRows = ref<any[]>([])

// 序号计算方法
const indexMethod = (index: number) => {
  return (props.currentPage - 1) * props.pageSize + index + 1
}

// 处理选择变化
const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection
  emit('selection-change', selection)
}

// 处理排序变化
const handleSortChange = (sort: { prop: string; order: string }) => {
  emit('sort-change', sort)
}

// 处理页面大小变化
const handleSizeChange = (size: number) => {
  emit('size-change', size)
  emit('update:pageSize', size)
}

// 处理当前页变化
const handleCurrentChange = (page: number) => {
  emit('current-change', page)
  emit('update:currentPage', page)
}

// 刷新
const refresh = () => {
  emit('refresh')
}

// 清空选择
const clearSelection = () => {
  tableRef.value?.clearSelection()
}

// 暴露方法
defineExpose({
  clearSelection,
  tableRef
})
</script>

<style lang="scss" scoped>
.base-table {
  background: #fff;
  border-radius: 4px;

  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;

    .toolbar-left {
      display: flex;
      gap: 8px;
    }

    .toolbar-right {
      display: flex;
      gap: 8px;
    }
  }

  .data-table {
    :deep(.el-table__header) {
      th {
        background: #fafafa;
        color: #606266;
        font-weight: 500;
      }
    }
  }

  .table-pagination {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    border-top: 1px solid #ebeef5;
  }
}
</style>
