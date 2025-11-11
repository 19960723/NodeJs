# 数据库同步指南

当你修改了 `src/models` 中的模型定义后，需要将这些更改同步到数据库中。本文档介绍了几种同步方法。

## 📋 目录

- [同步方法对比](#同步方法对比)
- [方法一：自动同步（开发环境）](#方法一自动同步开发环境)
- [方法二：手动同步脚本](#方法二手动同步脚本)
- [方法三：Sequelize Migrations（推荐）](#方法三sequelize-migrations推荐)
- [常见问题](#常见问题)

---

## 🔄 同步方法对比

| 方法             | 优点                   | 缺点             | 适用场景           |
| ---------------- | ---------------------- | ---------------- | ------------------ |
| **自动同步**     | 简单方便，无需额外操作 | 可能不够精确     | 开发环境快速迭代   |
| **手动同步脚本** | 可控性强，支持多种模式 | 需要手动执行     | 开发环境模型更新   |
| **Migrations**   | 版本控制，可回滚，安全 | 需要编写迁移文件 | 生产环境，团队协作 |

---

## 方法一：自动同步（开发环境）

### ✅ 适用场景

- 开发环境快速开发
- 模型频繁变更
- 本地测试

### 🚀 使用方法

项目在开发环境下启动时会**自动同步**数据库：

```bash
npm run dev
```

### ⚙️ 工作原理

在 `src/app.ts` 中，开发环境下会自动调用 `syncDatabase()`：

```typescript
if (config.app.env === 'development') {
  await syncDatabase(); // 默认 alter: false, force: false
}
```

在 `src/models/index.ts` 中的实现：

```typescript
await sequelize.sync({ force: false });
```

### ⚠️ 注意事项

- 只在 `NODE_ENV=development` 时生效
- 默认不会修改已存在的表结构
- 只会创建不存在的新表

---

## 方法二：手动同步脚本

### ✅ 适用场景

- 需要精确控制同步行为
- 需要修改现有表结构
- 需要重建表（清空数据）

### 🚀 使用方法

#### 1. 标准同步（不修改现有表）

```bash
npm run db:sync
```

只会创建不存在的表，不会修改已有表结构。

#### 2. Alter 同步（修改表结构）⭐ 推荐

```bash
npm run db:sync:alter
```

**功能：**

- 会尝试修改现有表结构以匹配模型定义
- 添加新字段
- 修改字段类型
- **不会删除字段**（Sequelize 的 alter 限制）
- **不会删除数据**

**最适合的场景：**

- 向表中添加新字段
- 修改字段类型或属性
- 开发环境下的模型更新

#### 3. Force 同步（删除重建）⚠️ 危险

```bash
npm run db:sync:force
```

**警告：** 这会删除所有现有表和数据！

**功能：**

- 删除所有表
- 根据模型重新创建表
- **所有数据将丢失**

**适用场景：**

- 开发初期，数据不重要
- 需要完全重建数据库结构
- 测试环境重置

### 📝 示例场景

#### 场景 1：添加新字段到现有表

**模型修改：** 在 `User.ts` 中添加新字段

```typescript
phone: {
  type: DataTypes.STRING(20),
  allowNull: true,
  comment: '手机号'
}
```

**同步命令：**

```bash
npm run db:sync:alter
```

#### 场景 2：创建新表

**新建模型：** 创建 `src/models/Product.ts`

**同步命令：**

```bash
npm run db:sync
# 或
npm run dev  # 启动应用时自动同步
```

#### 场景 3：完全重建数据库

```bash
npm run db:sync:force
```

---

## 方法三：Sequelize Migrations（推荐）

### ✅ 适用场景

- 生产环境
- 团队协作开发
- 需要版本控制
- 需要回滚功能

### 🎯 为什么使用 Migrations？

1. **版本控制**：每次数据库更改都有记录
2. **可回滚**：出问题可以回退到之前的版本
3. **团队协作**：团队成员可以共享相同的数据库更改
4. **生产安全**：不会意外删除数据

### 📝 创建 Migration

#### 1. 创建迁移文件目录

项目已配置在 `.sequelizerc` 中：

```javascript
{
  'migrations-path': path.resolve('src', 'migrations')
}
```

#### 2. 创建迁移文件

```bash
# 创建迁移文件
npx sequelize-cli migration:generate --name add-phone-to-users
```

这会在 `src/migrations/` 中创建一个文件，例如：
`20231110120000-add-phone-to-users.js`

#### 3. 编写迁移代码

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: '手机号'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phone');
  }
};
```

#### 4. 运行迁移

```bash
# 执行迁移
npm run db:migrate

# 回滚最后一次迁移
npm run db:migrate:undo

# 回滚所有迁移
npm run db:migrate:undo:all
```

### 📚 常用 Migration 操作

#### 创建表

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
};
```

#### 添加字段

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('users', 'phone', {
    type: Sequelize.STRING(20),
    allowNull: true
  });
};
```

#### 修改字段

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  });
};
```

#### 删除字段

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('users', 'old_field');
};
```

#### 添加索引

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.addIndex('users', ['email'], {
    name: 'users_email_index',
    unique: true
  });
};
```

---

## 🔧 常见问题

### Q1: 修改了模型，但表结构没有更新？

**原因：** 默认的 `sync()` 不会修改已存在的表。

**解决方案：**

```bash
npm run db:sync:alter
```

### Q2: 需要删除某个字段，但 alter 不起作用？

**原因：** Sequelize 的 `alter: true` 不会删除字段。

**解决方案：**
使用 Migration：

```bash
npx sequelize-cli migration:generate --name remove-old-field
```

编写迁移文件：

```javascript
up: async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('table_name', 'old_field');
};
```

### Q3: 开发环境下如何快速重置数据库？

**方案 1：使用 force 同步（会丢失数据）**

```bash
npm run db:sync:force
```

**方案 2：手动删除数据库后重新创建**

```bash
# MySQL 命令行
DROP DATABASE koa2_dev;
CREATE DATABASE koa2_dev;

# 然后运行
npm run dev
```

### Q4: 生产环境如何安全更新数据库？

**推荐流程：**

1. 在开发环境编写并测试 Migration
2. 提交 Migration 文件到版本控制
3. 在生产环境部署代码
4. 在生产环境运行 Migration：

```bash
NODE_ENV=production npm run db:migrate
```

5. 如有问题，可以回滚：

```bash
NODE_ENV=production npm run db:migrate:undo
```

### Q5: 多个开发者协作时如何同步数据库？

**推荐工作流：**

1. **使用 Migration 管理所有数据库更改**
2. 提交 Migration 文件到 Git
3. 其他开发者拉取代码后运行：

```bash
npm run db:migrate
```

4. 不要使用 `sync()` 在共享环境中

### Q6: 如何查看当前数据库结构？

**MySQL 命令：**

```bash
# 连接数据库
mysql -u root -p

# 选择数据库
USE koa2_dev;

# 查看所有表
SHOW TABLES;

# 查看表结构
DESCRIBE users;

# 查看建表语句
SHOW CREATE TABLE users;
```

---

## 🎯 推荐的工作流程

### 开发环境（快速迭代）

```bash
# 1. 修改 models 文件
# 2. 同步数据库
npm run db:sync:alter

# 或直接启动开发服务器（会自动同步）
npm run dev
```

### 准生产/生产环境（严格控制）

```bash
# 1. 修改 models 文件
# 2. 创建 Migration
npx sequelize-cli migration:generate --name your-migration-name

# 3. 编写 Migration 代码
# 4. 测试 Migration
npm run db:migrate

# 5. 如有问题，回滚
npm run db:migrate:undo

# 6. 确认无误后，提交到版本控制
git add src/migrations/
git commit -m "Add migration: your-migration-name"
```

---

## 📚 相关命令速查

```bash
# 开发服务器（自动同步）
npm run dev

# 手动同步命令
npm run db:sync              # 标准同步
npm run db:sync:alter        # 修改表结构
npm run db:sync:force        # 强制重建（危险）

# Migration 命令
npm run db:migrate           # 运行迁移
npm run db:migrate:undo      # 回滚迁移

# 种子数据
npm run db:seed              # 运行种子数据
npm run db:seed:undo         # 回滚种子数据

# 初始化脚本
npm run db:init              # 初始化数据库
npm run rbac:init            # 初始化 RBAC 数据
```

---

## 🔗 相关文档

- [Sequelize Sync 文档](https://sequelize.org/docs/v6/core-concepts/model-basics/#synchronization-in-production)
- [Sequelize Migrations 文档](https://sequelize.org/docs/v6/other-topics/migrations/)
- [项目 README](./README.md)
- [RBAC 配置指南](./README_RBAC.md)

---

## ✨ 总结

| 场景             | 推荐方法   | 命令                    |
| ---------------- | ---------- | ----------------------- |
| 开发环境快速测试 | 自动同步   | `npm run dev`           |
| 添加新字段       | Alter 同步 | `npm run db:sync:alter` |
| 删除字段         | Migration  | `npm run db:migrate`    |
| 完全重建（开发） | Force 同步 | `npm run db:sync:force` |
| 生产环境         | Migration  | `npm run db:migrate`    |
| 团队协作         | Migration  | `npm run db:migrate`    |

**核心原则：**

- 🚀 开发环境：追求效率，可使用 `sync:alter`
- 🛡️ 生产环境：追求安全，必须使用 `migrations`
- 🤝 团队协作：统一使用 `migrations`，提交到版本控制
