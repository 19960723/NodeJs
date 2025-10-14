<template>
  <div class="role-list">
    <div class="page-header">
      <h2>角色管理</h2>
      <p>管理系统角色和权限分配</p>
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
            新增角色
          </el-button>
        </template>
      </BaseForm>

      <!-- 数据表格 -->
      <BaseTable
        :columns="tableColumns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
      >
        <template #status="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>

        <template #isSystem="{ row }">
          <el-tag v-if="row.isSystem" type="warning">系统角色</el-tag>
          <span v-else>普通角色</span>
        </template>

        <template #actions="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="success" size="small" @click="handleAssignRoutes(row)">
            分配权限
          </el-button>
          <el-button v-if="!row.isSystem" type="danger" size="small" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </BaseTable>
    </div>

    <!-- 角色表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      @close="handleDialogClose"
    >
      <BaseForm
        ref="formRef"
        :form-items="formItems"
        :model="formData"
        :rules="formRules"
        @submit="handleSubmit"
      />
    </el-dialog>

    <!-- 权限分配对话框 -->
    <el-dialog
      v-model="routeDialogVisible"
      title="分配路由权限"
      width="800px"
      @close="handleRouteDialogClose"
    >
      <el-tree
        ref="routeTreeRef"
        :data="routeTreeData"
        :props="{ children: 'children', label: 'title' }"
        node-key="id"
        show-checkbox
        check-strictly
        default-expand-all
      />
      <template #footer>
        <el-button @click="routeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleRouteSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseTable from '@/components/BaseTable.vue'
import { roleApi } from '@/api/role'
import { routeApi } from '@/api/route'
import type { RoleInfo, DynamicRoute, FormItem, TableColumn } from '@/types'

// 响应式数据
const loading = ref(false)
const dialogVisible = ref(false)
const routeDialogVisible = ref(false)
const formRef = ref()
const routeTreeRef = ref()

// 搜索表单
const searchForm = reactive({
  name: '',
  status: ''
})

const searchFormItems: FormItem[] = [
  {
    prop: 'name',
    label: '角色名称',
    type: 'input',
    placeholder: '请输入角色名称'
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
  }
]

// 表格配置
const tableColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '角色名称' },
  { prop: 'code', label: '角色编码' },
  { prop: 'description', label: '描述' },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'isSystem', label: '类型', width: 120 },
  { prop: 'sort', label: '排序', width: 80 },
  { prop: 'actions', label: '操作', width: 200, fixed: 'right' }
]

const tableData = ref<RoleInfo[]>([])
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
  code: '',
  description: '',
  sort: 0
})

const formItems: FormItem[] = [
  {
    prop: 'name',
    label: '角色名称',
    type: 'input',
    placeholder: '请输入角色名称'
  },
  {
    prop: 'code',
    label: '角色编码',
    type: 'input',
    placeholder: '请输入角色编码'
  },
  {
    prop: 'description',
    label: '描述',
    type: 'textarea',
    placeholder: '请输入角色描述'
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'number',
    placeholder: '请输入排序值'
  }
]

const formRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

// 路由权限相关
const currentRole = ref<RoleInfo | null>(null)
const routeTreeData = ref<DynamicRoute[]>([])

// 方法
const fetchData = async () => {
  loading.value = true
  try {
    const response = await roleApi.getRoles({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    tableData.value = response.list
    pagination.total = response.total
  } catch (error) {
    ElMessage.error('获取角色列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    name: '',
    status: ''
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
  dialogTitle.value = '新增角色'
  Object.assign(formData, {
    id: 0,
    name: '',
    code: '',
    description: '',
    sort: 0
  })
  dialogVisible.value = true
}

const handleEdit = (row: RoleInfo) => {
  dialogTitle.value = '编辑角色'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDelete = async (row: RoleInfo) => {
  try {
    await ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
      type: 'warning'
    })

    await roleApi.deleteRole(row.id)
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
      await roleApi.updateRole(formData.id, formData)
      ElMessage.success('更新成功')
    } else {
      await roleApi.createRole(formData)
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

const handleAssignRoutes = async (row: RoleInfo) => {
  currentRole.value = row

  try {
    // 获取路由树
    const routes = await routeApi.getRouteTree()
    routeTreeData.value = routes

    // 获取角色详情（包含已分配的路由）
    const roleDetail = await roleApi.getRoleById(row.id)
    const assignedRouteIds = roleDetail.routes?.map(r => r.id) || []

    routeDialogVisible.value = true

    // 设置已选中的路由
    setTimeout(() => {
      routeTreeRef.value?.setCheckedKeys(assignedRouteIds)
    }, 100)
  } catch (error) {
    ElMessage.error('获取路由信息失败')
  }
}

const handleRouteSubmit = async () => {
  if (!currentRole.value) return

  try {
    const checkedKeys = routeTreeRef.value?.getCheckedKeys() || []
    await roleApi.assignRoutes(currentRole.value.id, { routeIds: checkedKeys })
    ElMessage.success('权限分配成功')
    routeDialogVisible.value = false
  } catch (error) {
    ElMessage.error('权限分配失败')
  }
}

const handleRouteDialogClose = () => {
  currentRole.value = null
  routeTreeData.value = []
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.role-list {
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
