<template>
  <div class="user-list">
    <!-- 搜索区域 -->
    <el-card class="search-card" shadow="never">
      <el-form ref="searchFormRef" :model="searchForm" :inline="true" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="searchForm.email"
            placeholder="请输入邮箱"
            clearable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
            style="width: 120px"
          >
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="searchForm.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 240px"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card class="table-card" shadow="never">
      <base-table
        :data="tableData"
        :columns="tableColumns"
        :loading="loading"
        :total="total"
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :show-selection="true"
        @add="handleAdd"
        @edit="handleEdit"
        @delete="handleDelete"
        @batch-delete="handleBatchDelete"
        @selection-change="handleSelectionChange"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @refresh="loadData"
      >
        <!-- 自定义列 -->
        <template #avatar="{ row }">
          <el-avatar :src="row.avatar" :size="40">
            <el-icon><User /></el-icon>
          </el-avatar>
        </template>

        <template #status="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(row)"
          />
        </template>

        <template #roles="{ row }">
          <el-tag
            v-for="role in row.roles"
            :key="role"
            type="primary"
            size="small"
            class="role-tag"
          >
            {{ role }}
          </el-tag>
        </template>

        <template #action="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="warning" size="small" @click="handleResetPassword(row)">
            重置密码
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </base-table>
    </el-card>

    <!-- 用户表单弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      :close-on-click-modal="false"
    >
      <user-form
        v-if="dialogVisible"
        :model-value="currentUser"
        :loading="formLoading"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userApi } from '@/api/user'
import BaseTable from '@/components/BaseTable.vue'
import UserForm from './UserForm.vue'
import type { UserInfo, TableColumn, PageParams } from '@/types'
import dayjs from '@/utils/dayjs'

// 路由
const router = useRouter()

// 响应式数据
const loading = ref(false)
const formLoading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)

// 搜索表单
const searchFormRef = ref()
const searchForm = reactive({
  username: '',
  email: '',
  status: undefined as number | undefined,
  createTime: [] as string[]
})

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10
})

// 表格数据
const tableData = ref<UserInfo[]>([])
const total = ref(0)
const selectedRows = ref<UserInfo[]>([])

// 当前用户数据
const currentUser = ref<Partial<UserInfo>>({})

// 表格列配置
const tableColumns: TableColumn[] = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    sortable: true
  },
  {
    prop: 'avatar',
    label: '头像',
    width: 80,
    slot: 'avatar'
  },
  {
    prop: 'username',
    label: '用户名',
    minWidth: 120,
    sortable: true
  },
  {
    prop: 'nickname',
    label: '昵称',
    minWidth: 120
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: 180
  },
  {
    prop: 'phone',
    label: '手机号',
    minWidth: 140
  },
  {
    prop: 'roles',
    label: '角色',
    minWidth: 120,
    slot: 'roles'
  },
  {
    prop: 'status',
    label: '状态',
    width: 80,
    slot: 'status'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 160,
    sortable: true,
    formatter: row => dayjs(row.createTime).format('YYYY-MM-DD HH:mm')
  }
]

// 计算属性
const dialogTitle = computed(() => (isEdit.value ? '编辑用户' : '新增用户'))

// 加载数据
const loadData = async () => {
  try {
    loading.value = true

    const params: PageParams & typeof searchForm = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm
    }

    // 处理时间范围
    if (searchForm.createTime && searchForm.createTime.length === 2) {
      params.startTime = searchForm.createTime[0]
      params.endTime = searchForm.createTime[1]
    }

    const response = await userApi.getUserList(params)

    tableData.value = response.list
    total.value = response.total
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchFormRef.value?.resetFields()
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  currentUser.value = {
    status: 1,
    roles: []
  }
  isEdit.value = false
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: UserInfo) => {
  currentUser.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

// 删除
const handleDelete = async (row: UserInfo) => {
  try {
    await ElMessageBox.confirm(`确定要删除用户"${row.username}"吗？`, '删除确认', {
      type: 'warning'
    })

    await userApi.deleteUser(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '删除失败')
    }
  }
}

// 批量删除
const handleBatchDelete = async (rows: UserInfo[]) => {
  try {
    await ElMessageBox.confirm(`确定要删除选中的 ${rows.length} 个用户吗？`, '批量删除确认', {
      type: 'warning'
    })

    const ids = rows.map(row => row.id)
    await userApi.batchDeleteUsers(ids)
    ElMessage.success('批量删除成功')
    loadData()
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '批量删除失败')
    }
  }
}

// 重置密码
const handleResetPassword = async (row: UserInfo) => {
  try {
    await ElMessageBox.confirm(`确定要重置用户"${row.username}"的密码吗？`, '重置密码确认', {
      type: 'warning'
    })

    const result = await userApi.resetPassword(row.id)

    await ElMessageBox.alert(`新密码：${result.password}`, '重置密码成功', {
      type: 'success',
      confirmButtonText: '我知道了'
    })
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '重置密码失败')
    }
  }
}

// 状态变更
const handleStatusChange = async (row: UserInfo) => {
  try {
    await userApi.updateUser(row.id, { status: row.status })
    ElMessage.success(`用户已${row.status ? '启用' : '禁用'}`)
  } catch (error: any) {
    // 恢复状态
    row.status = row.status ? 0 : 1
    ElMessage.error(error.message || '状态更新失败')
  }
}

// 表单提交
const handleSubmit = async (formData: Partial<UserInfo>) => {
  try {
    formLoading.value = true

    if (isEdit.value) {
      await userApi.updateUser(currentUser.value.id!, formData)
      ElMessage.success('更新成功')
    } else {
      await userApi.createUser(formData)
      ElMessage.success('创建成功')
    }

    dialogVisible.value = false
    loadData()
  } catch (error: any) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    formLoading.value = false
  }
}

// 取消
const handleCancel = () => {
  dialogVisible.value = false
}

// 选择变更
const handleSelectionChange = (selection: UserInfo[]) => {
  selectedRows.value = selection
}

// 页面大小变更
const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.page = 1
  loadData()
}

// 当前页变更
const handleCurrentChange = (page: number) => {
  pagination.page = page
  loadData()
}

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.user-list {
  .search-card {
    margin-bottom: 16px;

    :deep(.el-card__body) {
      padding-bottom: 2px;
    }
  }

  .table-card {
    :deep(.el-card__body) {
      padding: 0;
    }
  }

  .role-tag {
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
</style>
