# 角色菜单授权功能说明

## 概述

本次完善了 RoleMenu（角色菜单关联）的授权逻辑，实现了完整的 RBAC 角色菜单权限管理功能。

## 新增功能

### 1. RoleService 新增方法

#### `getRoleMenus(id: number)`

- 功能：获取角色的所有菜单权限
- 参数：角色ID
- 返回：角色信息、菜单列表和菜单ID数组

```typescript
// 响应示例
{
  roleId: 1,
  roleName: "管理员",
  menus: [...],
  menuIds: [1, 2, 3, 4]
}
```

#### `assignMenusToRole(id: number, menuIds: number[])`

- 功能：为角色分配菜单权限（替换模式）
- 参数：角色ID、菜单ID数组
- 验证：
  - 角色是否存在
  - 角色是否启用
  - 菜单ID是否有效
  - 菜单是否存在且启用
- 返回：分配结果

```typescript
// 请求示例
{
  menuIds: [1, 2, 3, 4, 5]
}

// 响应示例
{
  roleId: 1,
  menuIds: [1, 2, 3, 4, 5],
  message: "菜单权限分配成功"
}
```

### 2. RoleController 新增方法

#### `getRoleMenus(ctx: Context)`

- 路由：GET `/api/role/:id/menus`
- 功能：获取角色的菜单权限

#### `assignMenusToRole(ctx: Context)`

- 路由：POST `/api/role/:id/menus`
- 功能：为角色分配菜单权限

### 3. RoleRepository 新增方法

#### `findActiveRoles()`

- 功能：获取所有启用的角色

#### `updateStatus(id: number, status: number)`

- 功能：更新角色状态

## API 使用示例

### 获取角色菜单权限

```bash
GET /api/role/1/menus
Authorization: Bearer <token>
```

响应：

```json
{
  "code": 200,
  "message": "获取角色菜单权限成功",
  "data": {
    "roleId": 1,
    "roleName": "管理员",
    "menus": [
      {
        "id": 1,
        "name": "系统管理",
        "path": "/system",
        "type": "M",
        "icon": "system"
      }
    ],
    "menuIds": [1, 2, 3]
  }
}
```

### 分配菜单权限

```bash
POST /api/role/1/menus
Authorization: Bearer <token>
Content-Type: application/json

{
  "menuIds": [1, 2, 3, 4, 5]
}
```

响应：

```json
{
  "code": 200,
  "message": "分配菜单权限成功",
  "data": {
    "roleId": 1,
    "menuIds": [1, 2, 3, 4, 5],
    "message": "菜单权限分配成功"
  }
}
```

## 业务逻辑说明

### 权限分配流程

1. **验证角色**
   - 检查角色是否存在
   - 检查角色是否启用（只有启用的角色才能分配权限）

2. **验证菜单ID**
   - 去重处理
   - 验证ID格式（必须是正整数）
   - 检查菜单是否存在
   - 检查菜单是否启用

3. **分配权限**
   - 使用 Sequelize 的 `setMenus` 方法
   - 自动删除旧权限，添加新权限
   - 保证数据一致性

### 数据验证

- **角色状态验证**：只有启用状态（status=1）的角色才能分配权限
- **菜单状态验证**：只能分配启用状态（status=1）的菜单
- **ID有效性验证**：自动过滤无效的ID（非数字、负数、零等）
- **去重处理**：自动去除重复的菜单ID

## 注意事项

1. **替换模式**：`assignMenusToRole` 方法会完全替换角色现有的菜单权限
2. **级联删除**：删除角色或菜单时，会自动删除 role_menus 表中的关联记录
3. **唯一性约束**：role_menus 表对 (role_id, menu_id) 有唯一约束，防止重复授权
4. **权限验证**：所有操作都需要认证（auth 中间件）

## 数据库设计

### role_menus 表结构

```sql
CREATE TABLE role_menus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_id INT NOT NULL,
  menu_id INT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  UNIQUE KEY uk_role_menu (role_id, menu_id),
  KEY idx_role_id (role_id),
  KEY idx_menu_id (menu_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
);
```

## 扩展建议

如果后续需要更细粒度的权限控制，可以考虑：

1. 添加权限类型字段（只读、可写、可删除等）
2. 添加生效时间和过期时间
3. 支持增量添加/删除权限（不替换）
4. 添加权限继承机制

但目前的实现已经满足基本的 RBAC 需求。
