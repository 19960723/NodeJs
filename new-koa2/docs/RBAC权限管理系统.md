# RBAC 权限管理系统使用文档

## 目录

- [系统架构](#系统架构)
- [数据模型](#数据模型)
- [快速开始](#快速开始)
- [API接口](#api接口)
- [权限中间件使用](#权限中间件使用)
- [最佳实践](#最佳实践)

## 系统架构

本系统采用 **RBAC (Role-Based Access Control)** 基于角色的访问控制模型，通过以下三层实现权限管理：

```
用户 (User) ←→ 角色 (Role) ←→ 菜单/权限 (Menu)
```

### 核心概念

1. **用户 (User)**: 系统使用者
2. **角色 (Role)**: 权限的集合，如"管理员"、"普通用户"等
3. **菜单 (Menu)**: 包含页面菜单和按钮权限，通过 `perms` 字段标识权限

## 数据模型

### 1. User (用户表)

```typescript
{
  id: number;
  username: string;
  password: string;
  nickname: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
```

### 2. Role (角色表)

```typescript
{
  id: number;
  name: string; // 角色名称
  code: string; // 角色代码 (如: admin, user)
  description: string; // 角色描述
  status: number; // 状态: 1-启用, 0-禁用
  created_at: Date;
  updated_at: Date;
}
```

### 3. Menu (菜单/权限表)

```typescript
{
  id: number;
  parent_id: number; // 父菜单ID
  name: string; // 菜单名称
  path: string; // 路由路径
  type: 'M' | 'C' | 'A'; // M=目录, C=菜单, A=按钮
  perms: string; // 权限标识 (如: system:user:add)
  component: string; // 前端组件路径
  icon: string; // 图标
  order: number; // 排序
  status: 'active' | 'inactive';
  isShow: 0 | 1; // 是否显示
  isCache: 0 | 1; // 是否缓存
  created_at: Date;
  updated_at: Date;
}
```

### 4. UserRole (用户角色关联表)

```typescript
{
  id: number;
  user_id: number;
  role_id: number;
}
```

### 5. RoleMenu (角色菜单关联表)

```typescript
{
  id: number;
  role_id: number;
  menu_id: number;
}
```

## 快速开始

### 1. 初始化权限数据

```bash
# 初始化RBAC系统（创建默认角色和菜单）
node scripts/init-rbac.js
```

这将创建以下默认角色：

- **super_admin**: 超级管理员（所有权限）
- **admin**: 管理员（除菜单管理外的所有权限）
- **user**: 普通用户（只读权限）
- **guest**: 访客（无权限）

### 2. 为用户分配角色

```typescript
// 通过API或直接操作数据库
const models = require('./src/models').models;

// 方法1: 使用模型关联方法
const user = await models.User.findByPk(1);
await user.addRole(roleId); // 添加单个角色
await user.setRoles([1, 2]); // 设置多个角色

// 方法2: 通过UserService
import UserService from './src/services/UserService';
const userService = new UserService(models.User);
await userService.assignRole(userId, roleId);
```

### 3. 登录时获取权限

```typescript
// 登录接口会自动返回用户的角色、权限和菜单
POST /api/auth/login
{
  "username": "admin",
  "password": "password"
}

// 响应
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "accessToken": "xxx",
    "refreshToken": "xxx",
    "user": {
      "id": 1,
      "username": "admin",
      "roles": [
        { "id": 1, "code": "admin", "name": "管理员" }
      ],
      "permissions": [
        "system:user:view",
        "system:user:add",
        "system:user:edit"
      ],
      "menus": [
        {
          "id": 1,
          "name": "系统管理",
          "path": "/system",
          "children": [...]
        }
      ]
    }
  }
}
```

## API接口

### 角色管理 API

```typescript
// 获取所有角色
GET /api/roles

// 获取角色详情
GET /api/roles/:id

// 获取角色及其菜单权限
GET /api/roles/:id/menus

// 创建角色
POST /api/roles
{
  "name": "编辑",
  "code": "editor",
  "description": "内容编辑人员",
  "status": 1
}

// 更新角色
PUT /api/roles/:id
{
  "name": "高级编辑",
  "description": "高级内容编辑人员"
}

// 删除角色
DELETE /api/roles/:id

// 为角色分配菜单权限
POST /api/roles/:id/menus
{
  "menuIds": [1, 2, 3, 4]
}
```

### 菜单管理 API

```typescript
// 获取所有菜单（树形结构）
GET /api/menus

// 获取当前用户的菜单
GET /api/menus/user

// 获取当前用户的权限列表
GET /api/menus/user/permissions

// 创建菜单
POST /api/menus
{
  "name": "文章管理",
  "path": "/content/article",
  "type": "C",
  "parent_id": 1,
  "perms": "content:article:view",
  "component": "content/article/index",
  "icon": "file",
  "order": 1
}

// 更新菜单
PUT /api/menus/:id

// 删除菜单
DELETE /api/menus/:id
```

### 用户管理 API

```typescript
// 为用户分配角色
POST /api/users/:id/roles
{
  "roleIds": [1, 2]
}

// 获取用户的角色
GET /api/users/:id/roles
```

## 权限中间件使用

### 1. 基础认证

```typescript
import { auth } from './middleware/auth';

// 需要登录才能访问
router.get('/api/profile', auth, async ctx => {
  // ctx.state.user 包含当前用户信息
  const userId = ctx.state.user.id;
});
```

### 2. 权限检查

```typescript
import { checkPermission } from './middleware/permission';

// 需要特定权限才能访问
router.post(
  '/api/users',
  auth,
  checkPermission('system:user:add'),
  userController.createUser
);

router.put(
  '/api/users/:id',
  auth,
  checkPermission('system:user:edit'),
  userController.updateUser
);

router.delete(
  '/api/users/:id',
  auth,
  checkPermission('system:user:delete'),
  userController.deleteUser
);
```

### 3. 角色检查

```typescript
import {
  checkRole,
  checkAdmin,
  checkSuperAdmin
} from './middleware/permission';

// 需要特定角色
router.post(
  '/api/articles',
  auth,
  checkRole('editor'),
  articleController.create
);

// 需要管理员角色
router.get('/api/system/logs', auth, checkAdmin, logController.getLogs);

// 需要超级管理员角色
router.delete(
  '/api/system/config',
  auth,
  checkSuperAdmin,
  configController.delete
);
```

### 4. 多权限检查

```typescript
import {
  checkAnyPermission,
  checkAllPermissions
} from './middleware/permission';

// 满足任一权限即可（OR逻辑）
router.get(
  '/api/dashboard',
  auth,
  checkAnyPermission(['dashboard:view', 'dashboard:admin']),
  dashboardController.index
);

// 必须同时拥有所有权限（AND逻辑）
router.post(
  '/api/sensitive-operation',
  auth,
  checkAllPermissions(['admin:access', 'sensitive:write']),
  sensitiveController.operate
);
```

## 权限标识规范

权限标识 (`perms`) 采用三段式命名：`模块:功能:操作`

### 示例

```
system:user:view      # 查看用户
system:user:add       # 添加用户
system:user:edit      # 编辑用户
system:user:delete    # 删除用户
system:user:export    # 导出用户

system:role:view      # 查看角色
system:role:add       # 添加角色
system:role:assign    # 分配权限

content:article:view  # 查看文章
content:article:add   # 添加文章
content:article:publish  # 发布文章
```

## 最佳实践

### 1. 菜单类型使用

- **M (目录)**: 顶级分类，如"系统管理"、"内容管理"
- **C (菜单)**: 具体页面，如"用户管理"、"文章列表"
- **A (按钮)**: 页面内的操作按钮，如"添加"、"删除"

### 2. 角色设计

```typescript
// ✅ 推荐：按职责划分
super_admin; // 超级管理员
admin; // 管理员
editor; // 编辑
viewer; // 查看者

// ❌ 避免：过于细粒度
user_can_add_article;
user_can_edit_article;
```

### 3. 权限粒度

```typescript
// ✅ 推荐：合理的权限粒度
system:user:view
system:user:add
system:user:edit
system:user:delete

// ❌ 避免：过于细粒度
system:user:view:username
system:user:view:email
system:user:view:phone
```

### 4. 前端路由守卫示例

```javascript
// Vue Router 示例
router.beforeEach((to, from, next) => {
  const userPermissions = store.state.user.permissions;
  const requiredPermission = to.meta.permission;

  if (requiredPermission && !userPermissions.includes(requiredPermission)) {
    next({ path: '/403' });
  } else {
    next();
  }
});

// 按钮权限控制
<button v-if="hasPermission('system:user:add')">添加用户</button>;
```

### 5. 动态菜单渲染

```javascript
// 前端根据后端返回的菜单树动态渲染
const menuTree = response.data.user.menus;

// 递归渲染菜单
function renderMenu(menus) {
  return menus.map(menu => ({
    path: menu.path,
    name: menu.name,
    icon: menu.icon,
    children: menu.children ? renderMenu(menu.children) : null
  }));
}
```

## 数据库查询示例

### 查询用户的所有权限

```typescript
const user = await models.User.findByPk(userId, {
  include: [
    {
      model: models.Role,
      as: 'roles',
      include: [
        {
          model: models.Menu,
          as: 'menus',
          attributes: ['perms']
        }
      ]
    }
  ]
});
```

### 查询角色的所有菜单

```typescript
const role = await models.Role.findByPk(roleId, {
  include: [
    {
      model: models.Menu,
      as: 'menus',
      through: { attributes: [] }
    }
  ]
});
```

## 常见问题

### Q: 如何添加新的权限？

A: 在菜单表中添加新的菜单项，并设置相应的 `perms` 字段，然后将该菜单分配给相应的角色。

### Q: 如何实现数据权限（如只能看自己的数据）？

A: 数据权限需要在业务层实现，可以在查询时添加 `where` 条件：

```typescript
// 普通用户只能查看自己的数据
const userId = ctx.state.user.id;
const isAdmin = await checkIfUserIsAdmin(userId);

const where = isAdmin ? {} : { user_id: userId };
const data = await models.Article.findAll({ where });
```

### Q: 如何实现角色继承？

A: 可以在角色表中添加 `parent_id` 字段，或在分配权限时自动继承父角色的权限。

## 总结

本RBAC权限管理系统提供了完整的权限控制方案：

- ✅ 用户-角色-菜单三层模型
- ✅ 灵活的权限检查中间件
- ✅ 支持菜单、按钮级权限控制
- ✅ RESTful API接口
- ✅ 树形菜单结构
- ✅ 完善的初始化脚本

通过合理使用这些功能，可以构建一个安全、灵活、易维护的权限管理系统。
