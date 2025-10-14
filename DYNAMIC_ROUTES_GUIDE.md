# 动态路由系统使用指南

本文档介绍如何使用前后端项目中的动态路由系统。

## 系统概述

动态路由系统允许通过后端 API 动态配置前端路由和菜单，实现基于角色的权限控制。

### 主要特性

- 🔐 基于角色的权限控制
- 📱 动态菜单生成
- 🛣️ 动态路由配置
- 🎯 细粒度权限控制
- 🔄 实时权限更新

## 数据库结构

### 核心表结构

1. **roles** - 角色表

   - 存储系统角色信息
   - 支持角色层级和排序

2. **routes** - 路由表

   - 存储路由配置信息
   - 支持树形结构（父子关系）
   - 包含菜单、按钮、API 三种类型

3. **UserRoles** - 用户角色关联表

   - 多对多关系：用户 ↔ 角色

4. **RoleRoutes** - 角色路由关联表
   - 多对多关系：角色 ↔ 路由

## 后端 API

### 路由管理 API

```
GET /api/routes/user-routes     # 获取用户可访问的路由
GET /api/routes/tree           # 获取路由树结构
GET /api/routes                # 获取路由列表（分页）
POST /api/routes               # 创建路由
PUT /api/routes/:id            # 更新路由
DELETE /api/routes/:id         # 删除路由
GET /api/routes/:id            # 获取路由详情
```

### 角色管理 API

```
GET /api/roles/all             # 获取所有角色（下拉选择用）
GET /api/roles                 # 获取角色列表（分页）
POST /api/roles                # 创建角色
PUT /api/roles/:id             # 更新角色
DELETE /api/roles/:id          # 删除角色
GET /api/roles/:id             # 获取角色详情
POST /api/roles/:id/routes     # 分配路由权限给角色
```

## 前端实现

### 路由 Store

`src/store/route.ts` 提供了完整的动态路由状态管理：

- `getUserRoutes()` - 获取用户动态路由
- `convertToVueRoutes()` - 转换为 Vue 路由配置
- `generateRoutes()` - 生成并返回动态路由
- `resetRoutes()` - 重置路由状态

### 路由守卫

在 `src/router/index.ts` 中实现了动态路由加载：

1. 检查用户登录状态
2. 获取用户信息和权限
3. 动态加载用户可访问的路由
4. 添加路由到 Vue Router
5. 进行权限验证

### 组件映射

在路由 Store 中配置组件映射表：

```typescript
const componentMap: Record<string, any> = {
  BasicLayout: () => import("@/layouts/BasicLayout.vue"),
  Dashboard: () => import("@/views/Dashboard.vue"),
  "User/UserList": () => import("@/views/User/UserList.vue"),
  // ... 更多组件映射
};
```

## 使用步骤

### 1. 初始化数据库

```bash
cd Koa2
npm run db:init
```

这将创建必要的表结构并插入初始数据。

### 2. 启动后端服务

```bash
cd Koa2
npm run dev
```

### 3. 启动前端服务

```bash
cd admin-front-vue
npm run dev
```

### 4. 登录系统

使用初始管理员账户登录（根据你的用户数据）。

### 5. 配置角色和路由

1. 访问"系统管理" → "角色管理"
2. 创建或编辑角色
3. 为角色分配路由权限
4. 访问"系统管理" → "路由管理"
5. 创建或编辑路由配置

## 路由配置说明

### 路由字段说明

- **name**: 路由名称（唯一标识）
- **path**: 路由路径
- **component**: 组件路径（需在 componentMap 中配置）
- **title**: 显示标题
- **icon**: 图标名称
- **parentId**: 父路由 ID（用于构建树形结构）
- **type**: 类型（menu/button/api）
- **permission**: 权限标识
- **hidden**: 是否在菜单中隐藏
- **keepAlive**: 是否缓存组件
- **sort**: 排序值

### 示例路由配置

```json
{
  "name": "UserManagement",
  "path": "/user",
  "component": "BasicLayout",
  "title": "用户管理",
  "icon": "User",
  "parentId": null,
  "type": "menu",
  "permission": null,
  "hidden": false,
  "keepAlive": false,
  "sort": 2
}
```

## 权限控制

### 角色权限

- 通过角色分配路由权限
- 用户可以拥有多个角色
- 权限取并集

### 路由权限

- 每个路由可以设置权限标识
- 支持菜单级和按钮级权限控制
- 前端路由守卫自动验证权限

### 前端权限验证

```typescript
// 在组件中使用
const userStore = useUserStore();

// 检查权限
if (userStore.hasPermission("user:create")) {
  // 显示创建按钮
}

// 检查角色
if (userStore.hasRole("admin")) {
  // 显示管理员功能
}
```

## 注意事项

### 1. 组件懒加载

确保所有动态路由对应的组件都配置了懒加载：

```typescript
const componentMap = {
  "User/UserList": () => import("@/views/User/UserList.vue"),
};
```

### 2. 路由缓存

- 设置 `keepAlive: true` 的路由会被缓存
- 需要在组件中正确处理缓存逻辑

### 3. 权限更新

- 用户权限更改后需要重新登录生效
- 或者实现实时权限更新机制

### 4. 404 处理

- 404 路由会在动态路由加载完成后添加
- 确保 404 路由在最后添加

## 扩展功能

### 1. 添加新的路由类型

在路由表的 type 字段中添加新类型，并在前端相应处理。

### 2. 实现按钮级权限

```vue
<template>
  <el-button v-if="hasPermission('user:delete')" @click="deleteUser">
    删除
  </el-button>
</template>
```

### 3. 实现 API 级权限

在后端中间件中验证 API 权限：

```javascript
const checkPermission = (permission) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    if (user.permissions.includes(permission)) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { message: "权限不足" };
    }
  };
};
```

## 故障排除

### 1. 路由不显示

- 检查用户是否有对应权限
- 检查路由配置是否正确
- 检查组件映射是否配置

### 2. 权限验证失败

- 检查用户角色分配
- 检查角色路由权限分配
- 检查权限标识是否正确

### 3. 页面刷新后路由丢失

- 检查路由守卫逻辑
- 确保动态路由在每次刷新后重新加载

## 总结

动态路由系统提供了灵活的权限控制机制，通过后端配置即可实现前端路由和菜单的动态管理。系统支持角色权限、路由权限等多种权限控制方式，能够满足大多数企业级应用的权限管理需求。
