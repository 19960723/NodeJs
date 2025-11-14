<script setup lang="ts">
/**
 * 角色绑定用户组件
 * 参考 assign.vue 的实现方式
 */
import { ref, computed } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { ElMessage, ElTransfer } from 'element-plus';
import { assignRoleUsers, getRoleUsers, getUserListApi } from '#/api/core/user';

interface User {
  id: number;
  username: string;
  nickname?: string;
  name?: string;
  realname?: string;
  email?: string;
  disabled?: boolean;
}

interface RoleData {
  id: number;
  name: string;
}

const emit = defineEmits<{
  success: [];
}>();

const [Drawer, drawerApi] = useVbenDrawer({
  title: '绑定用户',
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = drawerApi.getData<RoleData>();
      roleData.value = data;
      loading.value = true;

      try {
        // 并行加载用户列表和已绑定用户
        await Promise.all([loadUserList(), loadRoleUsers()]);
      } finally {
        loading.value = false;
      }
    } else {
      // 关闭时重置
      selectedUserIds.value = [];
      userList.value = [];
      filterMethod.value = '';
    }
  },
});

const loading = ref(false);
const roleData = ref<RoleData>();
const userList = ref<User[]>([]);
const selectedUserIds = ref<number[]>([]);
const filterMethod = ref('');

// 转换用户列表为 Transfer 组件所需格式
const transferData = computed(() => {
  return userList.value.map((user) => ({
    key: user.id,
    label: user.nickname || user.name || user.username,
    disabled: user.disabled || false,
    email: user.email,
    username: user.username,
  }));
});

// Transfer 组件的过滤方法
function handleFilterMethod(query: string, item: any) {
  const searchText = query.toLowerCase();
  return (
    item.label.toLowerCase().includes(searchText) ||
    item.username?.toLowerCase().includes(searchText) ||
    item.email?.toLowerCase().includes(searchText)
  );
}

// 加载所有用户列表
async function loadUserList() {
  try {
    const result = await getUserListApi();
    // 根据API返回格式调整，可能是 result.list 或直接是 result
    userList.value = result.list || result || [];
  } catch (error: any) {
    ElMessage.error(error?.message || '加载用户列表失败');
    userList.value = [];
  }
}

// 加载角色已绑定的用户
async function loadRoleUsers() {
  if (!roleData.value?.id) return;

  try {
    const result = await getRoleUsers(roleData.value.id);
    // 根据API返回格式调整
    selectedUserIds.value = result.userIds || result || [];
  } catch (error: any) {
    ElMessage.error(error?.message || '加载已绑定用户失败');
    selectedUserIds.value = [];
  }
}

// 确认提交
async function handleConfirm() {
  if (!roleData.value?.id) return;

  drawerApi.lock();
  try {
    await assignRoleUsers(roleData.value.id, selectedUserIds.value);
    ElMessage.success('绑定用户成功');
    emit('success');
    drawerApi.close();
  } catch (error: any) {
    ElMessage.error(error?.message || '绑定用户失败');
    drawerApi.unlock();
  }
}
</script>

<template>
  <Drawer class="w-[850px]" :loading="loading">
    <div class="bind-user-container">
      <!-- 角色信息卡片 -->
      <div class="role-info-card">
        <div class="role-info-name">{{ roleData?.name }}</div>
      </div>

      <!-- 用户选择穿梭框 -->
      <ElTransfer
        v-model="selectedUserIds"
        :data="transferData"
        :titles="['可选用户', '已选用户']"
        :button-texts="['', '']"
        :filter-method="handleFilterMethod"
        filterable
        filter-placeholder="搜索用户"
        class="transfer-custom"
      >
        <template #default="{ option }">
          <span class="transfer-item-label">{{ option.label }}</span>
        </template>
      </ElTransfer>
    </div>
  </Drawer>
</template>

<style scoped lang="scss">
.bind-user-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

// 角色信息卡片样式
.role-info-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  .role-info-name {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.5px;
  }
}

// 穿梭框自定义样式
:deep(.el-transfer) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

:deep(.el-transfer-panel) {
  width: 340px;
  height: 550px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
}

:deep(.el-transfer-panel__header) {
  background: #f9fafb;
  border: none;
  padding: 14px 16px;
  .el-checkbox {
    font-weight: 500;
    color: #374151;
  }
}

:deep(.el-transfer-panel__body) {
  border: none;
}

:deep(.el-transfer-panel__filter) {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;

  .el-input__wrapper {
    border-radius: 8px;
    box-shadow: none;
    border: 1px solid #e5e7eb;
    transition: all 0.2s ease;

    &:hover {
      border-color: #667eea;
    }

    &.is-focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  .el-input__inner {
    font-size: 14px;
  }
}

:deep(.el-transfer-panel__list) {
  height: calc(100% - 100px);
  padding: 8px;
}

.transfer-item-label {
  font-size: 14px;
  color: #374151;
  transition: color 0.2s ease;
}

:deep(.el-transfer__buttons) {
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .el-button {
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    background: #667eea;
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    position: relative;

    &::before {
      content: '→';
      font-size: 18px;
      font-weight: bold;
      color: white;
    }

    &:first-child::before {
      content: '←';
    }

    &:hover {
      background: #5568d3;
      border-color: #5568d3;
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      background: #e5e7eb;
      border-color: #e5e7eb;
      box-shadow: none;
      transform: scale(1);

      &::before {
        color: #9ca3af;
      }
    }

    span {
      display: none;
    }
  }
}
</style>
