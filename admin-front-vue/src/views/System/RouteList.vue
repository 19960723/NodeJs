<template>
  <div class="route-list">
    <div class="page-header">
      <h2>路由管理</h2>
      <p>管理系统路由和菜单配置</p>
    </div>

    <div class="page-content">
      <!-- 搜索表单 -->
      <BaseForm
        :form-items="searchFormItems"
        :model="searchForm"
        :inline="true"
        @submit="handleSearch"
        @reset="handleReset"
      >
        <template #actions>
          <el-button type="primary" @click="handleCreate">
            <el-icon><Plus /></el-icon>
            新增路由
          </el-button>
        </template>
      </BaseForm>

      <!-- 数据表格 -->
      <BaseTable
        :columns="tableColumns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        default-expand-all
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
      >
        <template #type="{ row }">
          <el-tag
            :type="row.type === 'menu' ? 'primary' : row.type === 'button' ? 'success' : 'info'"
          >
            {{ row.type === 'menu' ? '菜单' : row.type === 'button' ? '按钮' : '接口' }}
          </el-tag>
        </template>

        <template #status="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>

        <template #hidden="{ row }">
          <el-tag v-if="row.hidden" type="warning">隐藏</el-tag>
          <span v-else>显示</span>
        </template>

        <template #actions="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="success" size="small" @click="handleCreateChild(row)">
            添加子路由
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </BaseTable>
    </div>

    <!-- 路由表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="800px"
      @close="handleDialogClose"
    >
      <BaseForm
        ref="formRef"
        :form-items="formItems"
        :model="formData"
        :rules="formRules"
        :col-span="12"
        @submit="handleSubmit"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseTable from '@/components/BaseTable.vue'
import { routeApi } from '@/api/route'
import type { DynamicRoute, FormItem, TableColumn } from '@/types'

// 响应式数据
const loading = ref(false)
const dialogVisible = ref(false)
const formRef = ref()

// 搜索表单
const searchForm = reactive({
  name: '',
  status: '',
  type: ''
})

const searchFormItems: FormItem[] = [
  {
    prop: 'name',
    label: '路由名称',
    type: 'input',
    placeholder: '请输入路由名称'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'inactive' }
    ]
  },
  {
    prop: 'type',
    label: '类型',
    type: 'select',
    placeholder: '请选择类型',
    options: [
      { label: '菜单', value: 'menu' },
      { label: '按钮', value: 'button' },
      { label: '接口', value: 'api' }
    ]
  }
]

// 表格配置
const tableColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '路由名称', width: 150 },
  { prop: 'title', label: '标题', width: 120 },
  { prop: 'path', label: '路径', width: 200 },
  { prop: 'component', label: '组件', width: 150 },
  { prop: 'type', label: '类型', width: 80 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'hidden', label: '显示', width: 80 },
  { prop: 'sort', label: '排序', width: 80 },
  { prop: 'permission', label: '权限标识', width: 120 },
  { prop: 'actions', label: '操作', width: 200, fixed: 'right' }
]

const tableData = ref<DynamicRoute[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 表单配置
const dialogTitle = ref('')
const formData = reactive({
  id: 0,
  name: '',
  path: '',
  component: '',
  redirect: '',
  title: '',
  icon: '',
  parentId: null as number | null,
  sort: 0,
  hidden: false,
  keepAlive: false,
  type: 'menu' as 'menu' | 'button' | 'api',
  permission: '',
  description: ''
})

// 路由树数据（用于选择父路由）
const routeTreeData = ref<DynamicRoute[]>([])

const formItems = computed((): FormItem[] => [
  {
    prop: 'name',
    label: '路由名称',
    type: 'input',
    placeholder: '请输入路由名称',
    span: 12
  },
  {
    prop: 'title',
    label: '标题',
    type: 'input',
    placeholder: '请输入标题',
    span: 12
  },
  {
    prop: 'path',
    label: '路径',
    type: 'input',
    placeholder: '请输入路径',
    span: 12
  },
  {
    prop: 'component',
    label: '组件',
    type: 'input',
    placeholder: '请输入组件路径',
    span: 12
  },
  {
    prop: 'redirect',
    label: '重定向',
    type: 'input',
    placeholder: '请输入重定向路径',
    span: 12
  },
  {
    prop: 'icon',
    label: '图标',
    type: 'input',
    placeholder: '请输入图标名称',
    span: 12
  },
  {
    prop: 'parentId',
    label: '父路由',
    type: 'select',
    placeholder: '请选择父路由',
    options: routeTreeData.value.map(route => ({
      label: route.title,
      value: route.id
    })),
    span: 12
  },
  {
    prop: 'type',
    label: '类型',
    type: 'select',
    placeholder: '请选择类型',
    options: [
      { label: '菜单', value: 'menu' },
      { label: '按钮', value: 'button' },
      { label: '接口', value: 'api' }
    ],
    span: 12
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'number',
    placeholder: '请输入排序值',
    span: 12
  },
  {
    prop: 'permission',
    label: '权限标识',
    type: 'input',
    placeholder: '请输入权限标识',
    span: 12
  },
  {
    prop: 'hidden',
    label: '是否隐藏',
    type: 'switch',
    span: 12
  },
  {
    prop: 'keepAlive',
    label: '是否缓存',
    type: 'switch',
    span: 12
  },
  {
    prop: 'description',
    label: '描述',
    type: 'textarea',
    placeholder: '请输入描述',
    span: 24
  }
])

const formRules = {
  name: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路径', trigger: 'blur' }]
}

// 方法
const fetchData = async () => {
  loading.value = true
  try {
    const response = await routeApi.getRoutes({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    tableData.value = response.list
    pagination.total = response.total
  } catch (error) {
    ElMessage.error('获取路由列表失败')
  } finally {
    loading.value = false
  }
}

const fetchRouteTree = async () => {
  try {
    const routes = await routeApi.getRouteTree()
    routeTreeData.value = routes
  } catch (error) {
    console.error('获取路由树失败:', error)
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    name: '',
    status: '',
    type: ''
  })
  handleSearch()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  fetchData()
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.page = 1
  fetchData()
}

const handleCreate = () => {
  dialogTitle.value = '新增路由'
  Object.assign(formData, {
    id: 0,
    name: '',
    path: '',
    component: '',
    redirect: '',
    title: '',
    icon: '',
    parentId: null,
    sort: 0,
    hidden: false,
    keepAlive: false,
    type: 'menu',
    permission: '',
    description: ''
  })
  dialogVisible.value = true
}

const handleCreateChild = (parent: DynamicRoute) => {
  dialogTitle.value = '新增子路由'
  Object.assign(formData, {
    id: 0,
    name: '',
    path: '',
    component: '',
    redirect: '',
    title: '',
    icon: '',
    parentId: parent.id,
    sort: 0,
    hidden: false,
    keepAlive: false,
    type: 'menu',
    permission: '',
    description: ''
  })
  dialogVisible.value = true
}

const handleEdit = (row: DynamicRoute) => {
  dialogTitle.value = '编辑路由'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = async (row: DynamicRoute) => {
  try {
    await ElMessageBox.confirm('确定要删除该路由吗？', '提示', {
      type: 'warning'
    })

    await routeApi.deleteRoute(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleSubmit = async () => {
  try {
    if (formData.id) {
      await routeApi.updateRoute(formData.id, formData)
      ElMessage.success('更新成功')
    } else {
      await routeApi.createRoute(formData)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchData()
  } catch (error) {
    ElMessage.error(formData.id ? '更新失败' : '创建失败')
  }
}

const handleDialogClose = () => {
  formRef.value?.resetFields()
}

onMounted(() => {
  fetchData()
  fetchRouteTree()
})
</script>

<style scoped>
.route-list {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: #666;
}

.page-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
