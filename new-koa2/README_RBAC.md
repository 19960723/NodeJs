# 🔐 RBAC 权限管理系统 - 完整实现

## 📋 系统概述

本项目已完整实现基于角色的访问控制（RBAC）权限管理系统，支持：

- ✅ 用户-角色-菜单三层权限模型
- ✅ 灵活的权限检查中间件
- ✅ 菜单、按钮级别的细粒度权限控制
- ✅ RESTful API 接口
- ✅ 树形菜单结构
- ✅ 自动化初始化脚本

## 🏗️ 系统架构

```
┌─────────┐      ┌──────────┐      ┌──────────┐
│  User   │ ←──→ │   Role   │ ←──→ │   Menu   │
│  用户   │      │   角色   │      │ 菜单权限 │
└─────────┘      └──────────┘      └──────────┘
     ↓                ↓                  ↓
 UserRole        RoleMenu          权限标识
 (关联表)        (关联表)           (perms)
```

## 📂 项目结构

```
src/
├── models/                    # 数据模型
│   ├── User.ts               # 用户模型
│   ├── Role.ts               # 角色模型
│   ├── Menus.ts              # 菜单/权限模型
│   ├── UserRole.ts           # 用户-角色关联表
│   ├── RoleMenu.ts           # 角色-菜单关联表
│   └── index.ts              # 模型注册和关联关系配置
│
├── repositories/              # 数据访问层
│   ├── UserRepository.ts
│   ├── RoleRepository.ts     # ✨ 角色数据访问
│   └── MenuRepository.ts     # ✨ 菜单数据访问
│
├── services/                  # 业务逻辑层
│   ├── UserService.ts        # ✨ 用户服务（含角色管理）
│   ├── AuthService.ts        # ✨ 认证服务（返回权限信息）
│   ├── RoleService.ts        # ✨ 角色服务
│   └── MenuService.ts        # ✨ 菜单服务
│
├── controllers/               # 控制器层
│   ├── userController.ts     # ✨ 用户控制器（含角色分配）
│   ├── roleController.ts     # ✨ 角色控制器
│   └── menuController.ts     # ✨ 菜单控制器
│
├── routes/                    # 路由配置
│   ├── userRoutes.ts         # ✨ 用户路由（含角色管理接口）
│   ├── roleRoutes.ts         # ✨ 角色路由
│   ├── menuRoutes.ts         # ✨ 菜单路由
│   └── index.ts              # 路由汇总
│
├── middleware/                # 中间件
│   ├── auth.ts               # JWT 认证中间件
│   └── permission.ts         # ✨ 权限检查中间件
│
└── types/
    └── index.ts              # 类型定义

scripts/
└── init-rbac.js              # ✨ RBAC 初始化脚本

docs/
└── RBAC权限管理系统.md        # ✨ 详细使用文档

✨ 表示本次新增或完善的文件
```

## 🗄️ 数据库表结构

### users (用户表)

| 字段        | 类型         | 说明           |
| ----------- | ------------ | -------------- |
| id          | INT          | 主键           |
| username    | VARCHAR(64)  | 用户名（唯一） |
| password    | VARCHAR(255) | 密码哈希       |
| nickname    | VARCHAR(64)  | 昵称           |
| avatar      | VARCHAR(255) | 头像URL        |
| lastLoginAt | DATETIME     | 最后登录时间   |
| created_at  | DATETIME     | 创建时间       |
| updated_at  | DATETIME     | 更新时间       |

### roles (角色表)

| 字段        | 类型        | 说明                 |
| ----------- | ----------- | -------------------- |
| id          | INT         | 主键                 |
| name        | VARCHAR(64) | 角色名称（唯一）     |
| code        | VARCHAR(64) | 角色代码（唯一）     |
| description | TEXT        | 角色描述             |
| status      | TINYINT     | 状态：1-启用，0-禁用 |
| created_at  | DATETIME    | 创建时间             |
| updated_at  | DATETIME    | 更新时间             |

### menus (菜单/权限表)

| 字段       | 类型         | 说明                   |
| ---------- | ------------ | ---------------------- |
| id         | INT          | 主键                   |
| parent_id  | INT          | 父菜单ID               |
| name       | VARCHAR(64)  | 菜单名称               |
| path       | VARCHAR(255) | 路由路径               |
| type       | ENUM         | M=目录, C=菜单, A=按钮 |
| perms      | VARCHAR(128) | 权限标识               |
| component  | VARCHAR(255) | 前端组件路径           |
| icon       | VARCHAR(64)  | 图标                   |
| order      | INT          | 排序                   |
| status     | ENUM         | active/inactive        |
| isShow     | TINYINT      | 是否显示：0-否，1-是   |
| isCache    | TINYINT      | 是否缓存：0-否，1-是   |
| params     | VARCHAR(255) | 路由参数               |
| created_at | DATETIME     | 创建时间               |
| updated_at | DATETIME     | 更新时间               |

### user_roles (用户-角色关联表)

| 字段       | 类型     | 说明           |
| ---------- | -------- | -------------- |
| id         | INT      | 主键           |
| user_id    | INT      | 用户ID（外键） |
| role_id    | INT      | 角色ID（外键） |
| created_at | DATETIME | 创建时间       |
| updated_at | DATETIME | 更新时间       |

### role_menus (角色-菜单关联表)

| 字段       | 类型     | 说明           |
| ---------- | -------- | -------------- |
| id         | INT      | 主键           |
| role_id    | INT      | 角色ID（外键） |
| menu_id    | INT      | 菜单ID（外键） |
| created_at | DATETIME | 创建时间       |
| updated_at | DATETIME | 更新时间       |

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 配置数据库

```bash
# 复制环境变量配置文件
cp env.template .env

# 编辑 .env 文件，配置数据库连接
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=koa2_db
```

### 3. 初始化数据库

```bash
# 同步数据库表结构
npm run dev

# 初始化 RBAC 系统（创建默认角色和菜单）
npm run rbac:init
```

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm run build
npm start
```

## 📡 API 接口清单

### 认证接口

```
POST   /api/auth/login          # 登录（返回角色、权限、菜单）
POST   /api/auth/register       # 注册
POST   /api/auth/refresh        # 刷新令牌
POST   /api/auth/logout         # 登出
```

### 用户管理接口

```
GET    /api/user/              # 获取当前用户信息
GET    /api/user/:id           # 获取指定用户信息
PUT    /api/user/:id           # 更新用户信息
DELETE /api/user/:id           # 删除用户
GET    /api/user/:id/roles     # 获取用户的角色列表
POST   /api/user/:id/roles     # 为用户分配角色（覆盖）
POST   /api/user/:id/roles/add # 为用户添加角色
DELETE /api/user/:id/roles/:roleId  # 移除用户的角色
```

### 角色管理接口

```
GET    /api/roles              # 获取所有角色
GET    /api/roles/:id          # 获取角色详情
POST   /api/roles              # 创建角色
PUT    /api/roles/:id          # 更新角色
DELETE /api/roles/:id          # 删除角色
GET    /api/roles/:id/menus    # 获取角色的菜单权限
POST   /api/roles/:id/menus    # 为角色分配菜单权限
GET    /api/roles/:id/users    # 获取拥有该角色的用户
```

### 菜单管理接口

```
GET    /api/menus              # 获取所有菜单（树形）
GET    /api/menus/user         # 获取当前用户的菜单
GET    /api/menus/user/permissions  # 获取当前用户的权限列表
GET    /api/menus/buttons      # 获取所有按钮权限
GET    /api/menus/type/:type   # 根据类型获取菜单
GET    /api/menus/:id          # 获取菜单详情
GET    /api/menus/:id/roles    # 获取菜单关联的角色
POST   /api/menus              # 创建菜单
PUT    /api/menus/:id          # 更新菜单
DELETE /api/menus/:id          # 删除菜单
PUT    /api/menus/order/batch  # 批量更新菜单排序
```

## 🔒 权限中间件使用

### 基础认证

```typescript
import { auth } from './middleware/auth';

// 需要登录
router.get('/api/profile', auth, handler);
```

### 权限检查

```typescript
import { checkPermission } from './middleware/permission';

// 需要特定权限
router.post('/api/users', auth, checkPermission('system:user:add'), handler);
```

### 角色检查

```typescript
import {
  checkRole,
  checkAdmin,
  checkSuperAdmin
} from './middleware/permission';

// 需要特定角色
router.get('/api/admin/data', auth, checkRole('admin'), handler);

// 需要管理员
router.get('/api/admin/logs', auth, checkAdmin, handler);

// 需要超级管理员
router.delete('/api/system/reset', auth, checkSuperAdmin, handler);
```

### 多权限检查

```typescript
import {
  checkAnyPermission,
  checkAllPermissions
} from './middleware/permission';

// 满足任一权限即可（OR）
router.get(
  '/api/dashboard',
  auth,
  checkAnyPermission(['dashboard:view', 'dashboard:admin']),
  handler
);

// 必须拥有所有权限（AND）
router.post(
  '/api/sensitive',
  auth,
  checkAllPermissions(['admin:access', 'sensitive:write']),
  handler
);
```

## 💡 使用示例

### 登录获取权限

```typescript
// 请求
POST /api/auth/login
{
  "username": "admin",
  "password": "123456"
}

// 响应
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "username": "admin",
      "nickname": "管理员",
      "avatar": null,
      "roles": [
        {
          "id": 1,
          "code": "super_admin",
          "name": "超级管理员"
        }
      ],
      "permissions": [
        "system:view",
        "system:user:view",
        "system:user:add",
        "system:user:edit",
        "system:user:delete",
        "system:role:view",
        "system:role:add",
        ...
      ],
      "menus": [
        {
          "id": 1,
          "name": "系统管理",
          "path": "/system",
          "icon": "setting",
          "children": [
            {
              "id": 2,
              "name": "用户管理",
              "path": "/system/user",
              "icon": "user"
            },
            ...
          ]
        }
      ]
    }
  }
}
```

### 为用户分配角色

```typescript
// 请求
POST /api/user/2/roles
Authorization: Bearer <token>
{
  "roleIds": [2, 3]  // 管理员、普通用户
}

// 响应
{
  "code": 200,
  "message": "分配角色成功",
  "data": {
    "id": 2,
    "username": "zhangsan",
    "roles": [
      { "id": 2, "code": "admin", "name": "管理员" },
      { "id": 3, "code": "user", "name": "普通用户" }
    ]
  }
}
```

### 为角色分配菜单权限

```typescript
// 请求
POST /api/roles/3/menus
Authorization: Bearer <token>
{
  "menuIds": [1, 2, 3, 4, 5]
}

// 响应
{
  "code": 200,
  "message": "分配权限成功",
  "data": {
    "id": 3,
    "name": "普通用户",
    "code": "user",
    "menus": [
      { "id": 1, "name": "系统管理", "perms": "system:view" },
      { "id": 2, "name": "用户管理", "perms": "system:user:view" },
      ...
    ]
  }
}
```

## 🎯 默认角色说明

运行 `npm run rbac:init` 后会创建以下默认角色：

| 角色代码    | 角色名称   | 权限范围                 |
| ----------- | ---------- | ------------------------ |
| super_admin | 超级管理员 | 所有权限（包括菜单管理） |
| admin       | 管理员     | 除菜单管理外的所有权限   |
| user        | 普通用户   | 只有查看权限（:view）    |
| guest       | 访客       | 无任何权限               |

## 📝 权限标识规范

采用三段式命名：`模块:功能:操作`

```
system:user:view      # 查看用户
system:user:add       # 添加用户
system:user:edit      # 编辑用户
system:user:delete    # 删除用户

system:role:view      # 查看角色
system:role:add       # 添加角色
system:role:edit      # 编辑角色
system:role:delete    # 删除角色
system:role:assign    # 分配权限

system:menu:view      # 查看菜单
system:menu:add       # 添加菜单
system:menu:edit      # 编辑菜单
system:menu:delete    # 删除菜单
```

## 🎨 前端集成示例

### Vue 3 + Pinia

```typescript
// store/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    permissions: [],
    menus: []
  }),

  actions: {
    async login(credentials) {
      const res = await axios.post('/api/auth/login', credentials);
      this.userInfo = res.data.user;
      this.permissions = res.data.user.permissions;
      this.menus = res.data.user.menus;
      localStorage.setItem('token', res.data.accessToken);
    },

    hasPermission(perm) {
      return this.permissions.includes(perm);
    }
  }
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiredPerm = to.meta.permission;

  if (requiredPerm && !userStore.hasPermission(requiredPerm)) {
    next('/403');
  } else {
    next();
  }
});

// 按钮权限指令
app.directive('permission', {
  mounted(el, binding) {
    const userStore = useUserStore();
    if (!userStore.hasPermission(binding.value)) {
      el.style.display = 'none';
    }
  }
});

// 使用
<button v-permission="'system:user:add'">添加用户</button>
```

## 📚 详细文档

完整的使用文档请参考：[docs/RBAC权限管理系统.md](./docs/RBAC权限管理系统.md)

## ✅ 功能清单

- [x] 用户-角色-菜单三层模型
- [x] 用户角色管理（分配、添加、移除）
- [x] 角色菜单权限管理
- [x] 菜单树形结构支持
- [x] 按钮级权限控制
- [x] JWT认证集成
- [x] 权限检查中间件
- [x] 角色检查中间件
- [x] 多权限检查（AND/OR逻辑）
- [x] 登录返回完整权限信息
- [x] RESTful API接口
- [x] 自动化初始化脚本
- [x] 完整的使用文档

## 🛠️ 技术栈

- **框架**: Koa2
- **语言**: TypeScript
- **ORM**: Sequelize
- **数据库**: MySQL
- **认证**: JWT (jsonwebtoken)
- **加密**: bcryptjs

## 📄 许可证

MIT License

## 👨‍💻 贡献

欢迎提交 Issue 和 Pull Request！

---

**🎉 RBAC权限管理系统已完整实现，开箱即用！**
