<script setup lang="ts">
import { ref } from 'vue';
import { getAllMenusApi } from '#/api/core/menu';
import { assignRoleMenus, getRoleMenus } from '#/api/core/user';
import { useVbenDrawer } from '@vben/common-ui';
import { ElCheckbox, ElTree, ElMessage } from 'element-plus';
import { IconifyIcon } from '@vben/icons';
import type { ElTree as ElTreeType } from 'element-plus';

interface MenuItem {
  id: string | number;
  name: string;
  title: string;
  children?: MenuItem[];
}

interface RoleData {
  id: string | number;
  name: string;
  menuIds?: (string | number)[];
}

const emit = defineEmits<{
  success: [];
}>();

const [Drawer, drawerApi] = useVbenDrawer({
  title: '权限配置',
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = drawerApi.getData<RoleData>();
      roleData.value = data;

      await getRoleMenuList();

      if (menuList.value.length === 0) {
        await getMenuList();
      }

      // 设置已选中的菜单
      if (data?.menuIds) {
        checkedKeys.value = data.menuIds;
      }
    } else {
      // 关闭时重置
      checkedKeys.value = [];
    }
  },
});

const loading = ref(false);
const roleData = ref<RoleData>();
const menuList = ref<MenuItem[]>([]);
const checkedKeys = ref<(string | number)[]>([]);
const treeRefs = ref<Record<string, InstanceType<typeof ElTreeType>>>({});
const expandedMenus = ref<Record<string | number, boolean>>({});

// 设置树组件引用
function setTreeRef(id: string | number) {
  return (el: any) => {
    if (el) {
      treeRefs.value[id] = el;
    }
  };
}

// 切换展开/收起
function toggleExpand(menuId: string | number) {
  expandedMenus.value[menuId] = !expandedMenus.value[menuId];
}

// 判断是否展开
function isExpanded(menuId: string | number): boolean {
  return expandedMenus.value[menuId] !== false; // 默认展开
}

// 获取菜单列表
async function getMenuList() {
  loading.value = true;
  try {
    menuList.value = await getAllMenusApi();
  } finally {
    loading.value = false;
  }
}

// 获取角色菜单
async function getRoleMenuList() {
  const data = await getRoleMenus(roleData.value?.id as number);
  checkedKeys.value = data.permissionIds as number[];
}
// 获取顶级菜单的选中状态
function isMenuChecked(menuId: string | number): boolean {
  return checkedKeys.value.includes(menuId);
}

// 切换顶级菜单
function toggleMenu(menuId: string | number, menu: MenuItem) {
  const treeRef = treeRefs.value[menuId];
  if (!treeRef) return;

  const isChecked = isMenuChecked(menuId);

  if (isChecked) {
    // 取消选中：移除该菜单及所有子项
    checkedKeys.value = checkedKeys.value.filter(
      (key) => key !== menuId && !getAllChildIds(menu).includes(key),
    );
    treeRef.setCheckedKeys([]);
  } else {
    // 选中：添加该菜单及所有子项
    const allIds = [menuId, ...getAllChildIds(menu)];
    checkedKeys.value = [...new Set([...checkedKeys.value, ...allIds])];
    treeRef.setCheckedKeys(getAllChildIds(menu));
  }
}

// 切换全选
function toggleAll(menuId: string | number, menu: MenuItem) {
  const treeRef = treeRefs.value[menuId];
  if (!treeRef) return;

  const childIds = getAllChildIds(menu);
  const allChecked = childIds.every((id) => checkedKeys.value.includes(id));

  if (allChecked) {
    // 取消全选
    checkedKeys.value = checkedKeys.value.filter(
      (key) => !childIds.includes(key) && key !== menuId,
    );
    treeRef.setCheckedKeys([]);
  } else {
    // 全选
    checkedKeys.value = [
      ...new Set([...checkedKeys.value, menuId, ...childIds]),
    ];
    treeRef.setCheckedKeys(childIds);
  }
}

// 树节点选中变化
function handleTreeCheck(menuId: string | number, menu: MenuItem) {
  const treeRef = treeRefs.value[menuId];
  if (!treeRef) return;

  const checkedNodes = treeRef.getCheckedKeys() as (string | number)[];
  const childIds = getAllChildIds(menu);

  // 移除该菜单的旧选中状态
  checkedKeys.value = checkedKeys.value.filter(
    (key) => !childIds.includes(key) && key !== menuId,
  );

  // 添加新的选中状态
  if (checkedNodes.length > 0) {
    checkedKeys.value = [...checkedKeys.value, menuId, ...checkedNodes];
  }
}

// 获取所有子节点ID
function getAllChildIds(menu: MenuItem): (string | number)[] {
  const ids: (string | number)[] = [];

  function traverse(items?: MenuItem[]) {
    if (!items) return;
    for (const item of items) {
      ids.push(item.id);
      traverse(item.children);
    }
  }

  traverse(menu.children);
  return ids;
}

// 判断是否全选
function isAllChecked(menu: MenuItem): boolean {
  const childIds = getAllChildIds(menu);
  return (
    childIds.length > 0 &&
    childIds.every((id) => checkedKeys.value.includes(id))
  );
}

// 确认提交
async function handleConfirm() {
  try {
    // TODO: 调用分配权限 API
    await assignRoleMenus(
      roleData.value?.id as number,
      checkedKeys.value as number[],
    );
    ElMessage.success('分配权限成功');
    emit('success');
    drawerApi.close();
  } catch (error) {
    console.error('分配权限失败：', error);
  }
}
</script>
<template>
  <Drawer class="w-[750px]" :loading="loading">
    <div class="flex flex-wrap justify-between gap-4">
      <div v-for="item in menuList" :key="item.id" class="w-[calc(50%-0.5rem)]">
        <div class="rounded-md bg-[#add8e6] p-2">
          <div>
            <div class="flex w-full justify-between">
              <div>
                <ElCheckbox
                  :model-value="isMenuChecked(item.id)"
                  @change="toggleMenu(item.id, item)"
                >
                  {{ $t(item.title) }}
                </ElCheckbox>
              </div>
              <div>
                <ElCheckbox
                  :model-value="isAllChecked(item)"
                  @change="toggleAll(item.id, item)"
                >
                  {{ $t('common.all') }}
                </ElCheckbox>
              </div>
            </div>
            <div
              v-if="item.children?.length"
              class="flex items-center justify-end"
            >
              <IconifyIcon
                class="size-5 cursor-pointer transition-transform"
                :class="{ 'rotate-180': !isExpanded(item.id) }"
                icon="mdi:chevron-up"
                @click="toggleExpand(item.id)"
              />
            </div>
          </div>

          <div v-if="item.children?.length && isExpanded(item.id)">
            <ElTree
              :ref="setTreeRef(item.id)"
              :data="item.children"
              :props="{ label: 'title', children: 'children' }"
              node-key="id"
              show-checkbox
              :default-expand-all="true"
              @check="handleTreeCheck(item.id, item)"
              :default-checked-keys="checkedKeys"
            >
              <template #default="{ data }">
                <span>{{ $t(data.title) }}</span>
              </template>
            </ElTree>
          </div>
        </div>
      </div>
    </div>
  </Drawer>
</template>
<style scoped lang="scss">
:deep(.el-tree) {
  background-color: transparent;
}

:deep(.el-tree-node) {
  padding: 4px 0;
}

:deep(.el-tree-node__content:hover) {
  background-color: #626669;
}

:deep(.el-tree-node__content:active) {
  background-color: transparent;
}
</style>
