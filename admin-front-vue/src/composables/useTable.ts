import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface UseTableOptions {
  immediate?: boolean
  defaultPageSize?: number
}

interface PaginationState {
  page: number
  pageSize: number
  total: number
}

/**
 * 表格管理 Hook
 */
export function useTable<T = any>(
  fetchApi: (params: any) => Promise<{ list: T[]; total: number }>,
  options: UseTableOptions = {}
) {
  const { immediate = true, defaultPageSize = 10 } = options

  // 状态
  const loading = ref(false)
  const tableData = ref<T[]>([])
  const selectedRows = ref<T[]>([])

  // 分页状态
  const pagination = reactive<PaginationState>({
    page: 1,
    pageSize: defaultPageSize,
    total: 0
  })

  // 搜索参数
  const searchParams = ref<Record<string, any>>({})

  // 加载数据
  const loadData = async (params?: Record<string, any>) => {
    try {
      loading.value = true

      const requestParams = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...searchParams.value,
        ...params
      }

      const response = await fetchApi(requestParams)

      tableData.value = response.list
      pagination.total = response.total
    } catch (error: any) {
      ElMessage.error(error.message || '数据加载失败')
      tableData.value = []
      pagination.total = 0
    } finally {
      loading.value = false
    }
  }

  // 刷新数据
  const refresh = () => {
    loadData()
  }

  // 重置并加载数据
  const reset = () => {
    pagination.page = 1
    searchParams.value = {}
    loadData()
  }

  // 搜索
  const search = (params: Record<string, any>) => {
    pagination.page = 1
    searchParams.value = { ...params }
    loadData()
  }

  // 页码变化
  const handleCurrentChange = (page: number) => {
    pagination.page = page
    loadData()
  }

  // 页面大小变化
  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.page = 1
    loadData()
  }

  // 选择变化
  const handleSelectionChange = (selection: T[]) => {
    selectedRows.value = selection
  }

  // 删除确认
  const confirmDelete = async (
    title: string,
    content: string,
    deleteApi: () => Promise<void>
  ) => {
    try {
      await ElMessageBox.confirm(content, title, {
        type: 'warning'
      })

      await deleteApi()
      ElMessage.success('删除成功')
      
      // 如果当前页没有数据了，回到上一页
      if (tableData.value.length === 1 && pagination.page > 1) {
        pagination.page--
      }
      
      await loadData()
    } catch (error: any) {
      if (error !== 'cancel') {
        ElMessage.error(error.message || '删除失败')
      }
    }
  }

  // 批量删除确认
  const confirmBatchDelete = async (
    deleteApi: (ids: any[]) => Promise<void>,
    getIdFn: (row: T) => any = (row: any) => row.id
  ) => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要删除的数据')
      return
    }

    try {
      await ElMessageBox.confirm(
        `确定要删除选中的 ${selectedRows.value.length} 条数据吗？`,
        '批量删除确认',
        {
          type: 'warning'
        }
      )

      const ids = selectedRows.value.map(getIdFn)
      await deleteApi(ids)
      ElMessage.success('批量删除成功')
      
      // 清空选择
      selectedRows.value = []
      
      await loadData()
    } catch (error: any) {
      if (error !== 'cancel') {
        ElMessage.error(error.message || '批量删除失败')
      }
    }
  }

  // 导出数据
  const exportData = async (
    exportApi: (params: any) => Promise<Blob>,
    filename: string
  ) => {
    try {
      loading.value = true
      
      const blob = await exportApi({
        ...searchParams.value
      })
      
      // 创建下载链接
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      
      // 清理资源
      window.URL.revokeObjectURL(url)
      
      ElMessage.success('导出成功')
    } catch (error: any) {
      ElMessage.error(error.message || '导出失败')
    } finally {
      loading.value = false
    }
  }

  // 初始化加载
  if (immediate) {
    loadData()
  }

  return {
    // 状态
    loading,
    tableData,
    selectedRows,
    pagination,
    searchParams,

    // 方法
    loadData,
    refresh,
    reset,
    search,
    handleCurrentChange,
    handleSizeChange,
    handleSelectionChange,
    confirmDelete,
    confirmBatchDelete,
    exportData
  }
}
