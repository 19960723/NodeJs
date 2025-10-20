# ⚡ RBAC 权限系统 - 5分钟快速上手

## 第一步：安装依赖

```bash
npm install
# 或
pnpm install
```

## 第二步：配置数据库

编辑 `.env` 文件（如果没有，请复制 `env.template`）：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=koa2_db
```

## 第三步：初始化权限系统

```bash
# 启动服务（会自动同步数据库表）
npm run dev

# 在另一个终端窗口，初始化RBAC数据
npm run rbac:init
```

初始化后会创建：

- ✅ 4个默认角色（超级管理员、管理员、普通用户、访客）
- ✅ 完整的系统管理菜单
- ✅ 用户管理、角色管理、菜单管理权限

## 第四步：测试接口

### 1. 登录（使用测试账号）

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

响应会包含：

- `accessToken`: 访问令牌
- `user.roles`: 用户的角色列表
- `user.permissions`: 用户的权限列表
- `user.menus`: 用户的菜单树

### 2. 获取用户菜单

```bash
GET http://localhost:3000/api/menus/user
Authorization: Bearer <你的token>
```

### 3. 为用户分配角色

```bash
POST http://localhost:3000/api/user/1/roles
Authorization: Bearer <你的token>
Content-Type: application/json

{
  "roleIds": [1, 2]
}
```

### 4. 为角色分配菜单权限

```bash
POST http://localhost:3000/api/roles/1/menus
Authorization: Bearer <你的token>
Content-Type: application/json

{
  "menuIds": [1, 2, 3, 4, 5]
}
```

## 第五步：在代码中使用权限控制

### 基础认证

```typescript
import { auth } from './middleware/auth';

router.get('/api/profile', auth, async ctx => {
  // 用户必须登录
});
```

### 权限检查

```typescript
import { checkPermission } from './middleware/permission';

router.post(
  '/api/users',
  auth,
  checkPermission('system:user:add'), // 需要添加用户权限
  async ctx => {
    // 创建用户逻辑
  }
);
```

### 角色检查

```typescript
import { checkAdmin } from './middleware/permission';

router.get(
  '/api/admin/dashboard',
  auth,
  checkAdmin, // 需要管理员角色
  async ctx => {
    // 管理员面板
  }
);
```

## 🎯 默认角色权限

| 角色       | 代码        | 权限                   |
| ---------- | ----------- | ---------------------- |
| 超级管理员 | super_admin | 所有权限               |
| 管理员     | admin       | 除菜单管理外的所有权限 |
| 普通用户   | user        | 只读权限               |
| 访客       | guest       | 无权限                 |

## 📡 核心API接口

```bash
# 认证
POST   /api/auth/login          # 登录
POST   /api/auth/register       # 注册

# 用户管理
GET    /api/user/:id/roles      # 获取用户角色
POST   /api/user/:id/roles      # 为用户分配角色

# 角色管理
GET    /api/roles               # 获取所有角色
POST   /api/roles               # 创建角色
GET    /api/roles/:id/menus     # 获取角色权限
POST   /api/roles/:id/menus     # 为角色分配权限

# 菜单管理
GET    /api/menus               # 获取所有菜单（树形）
GET    /api/menus/user          # 获取当前用户菜单
POST   /api/menus               # 创建菜单
```

## 🔥 常见场景示例

### 场景1：添加新用户并分配角色

```bash
# 1. 创建用户
POST /api/auth/register
{
  "username": "zhangsan",
  "password": "123456",
  "nickname": "张三"
}

# 2. 为用户分配"普通用户"角色（角色ID=3）
POST /api/user/2/roles
{
  "roleIds": [3]
}
```

### 场景2：创建新角色并分配权限

```bash
# 1. 创建"编辑"角色
POST /api/roles
{
  "name": "编辑",
  "code": "editor",
  "description": "内容编辑人员",
  "status": 1
}

# 2. 为"编辑"角色分配菜单权限
POST /api/roles/5/menus
{
  "menuIds": [1, 2, 3]  # 选择需要的菜单ID
}
```

### 场景3：创建新菜单/权限

```bash
POST /api/menus
{
  "name": "文章管理",
  "path": "/content/article",
  "type": "C",             # C=菜单
  "parent_id": 1,          # 父菜单ID
  "perms": "content:article:view",
  "component": "content/article/index",
  "icon": "file",
  "order": 1,
  "status": "active"
}

# 创建按钮权限
POST /api/menus
{
  "name": "添加文章",
  "path": "",
  "type": "A",             # A=按钮
  "parent_id": 10,         # 所属菜单ID
  "perms": "content:article:add",
  "order": 1,
  "status": "active"
}
```

## 💡 提示

1. **首次使用**：运行 `npm run rbac:init` 初始化默认数据
2. **测试账号**：创建一个测试管理员账号用于测试
3. **权限标识**：遵循 `模块:功能:操作` 的命名规范
4. **菜单类型**：
   - M = 目录（顶级分类）
   - C = 菜单（页面）
   - A = 按钮（操作）

## 📚 更多信息

- 完整文档：[README_RBAC.md](./README_RBAC.md)
- 详细指南：[docs/RBAC权限管理系统.md](./docs/RBAC权限管理系统.md)
- API文档：启动服务后访问 `/api-docs`

## ❓ 常见问题

### Q: 初始化脚本执行失败？

A: 确保数据库连接配置正确，且数据库服务已启动。

### Q: 如何重置权限数据？

A: 重新运行 `npm run rbac:init`，脚本会跳过已存在的数据。

### Q: 如何添加自定义权限？

A: 在菜单管理中创建新菜单，设置 `perms` 字段，然后分配给相应角色。

### Q: 权限不生效？

A: 检查：

1. 用户是否已分配角色
2. 角色是否已分配菜单权限
3. 菜单的 `status` 是否为 `active`
4. 角色的 `status` 是否为 `1`

---

**🎉 现在你已经可以开始使用 RBAC 权限管理系统了！**
