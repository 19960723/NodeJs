# 数据库同步快速参考

## 🚀 快速开始

### 修改 Model 后同步数据库

#### 情况 1：添加新字段或修改字段属性

```bash
npm run db:sync:alter
```

✅ 最常用，安全，不会丢失数据

#### 情况 2：创建新表

```bash
npm run dev
```

✅ 启动应用时自动创建

#### 情况 3：需要删除字段或复杂结构变更

```bash
# 创建迁移文件
npx sequelize-cli migration:generate --name your-change-description

# 编辑生成的迁移文件，然后运行
npm run db:migrate
```

✅ 最安全，可回滚

#### 情况 4：开发初期，想完全重建（⚠️ 会删除所有数据）

```bash
npm run db:sync:force
```

⚠️ 危险操作，会清空所有数据

---

## 📋 完整命令列表

| 命令                    | 说明                 | 安全性  | 数据影响       |
| ----------------------- | -------------------- | ------- | -------------- |
| `npm run dev`           | 启动应用（自动同步） | ✅ 安全 | 不影响现有数据 |
| `npm run db:sync`       | 标准同步             | ✅ 安全 | 不影响现有数据 |
| `npm run db:sync:alter` | 修改表结构           | ✅ 安全 | 不影响现有数据 |
| `npm run db:sync:force` | 强制重建             | ⚠️ 危险 | 删除所有数据   |
| `npm run db:migrate`    | 运行迁移             | ✅ 安全 | 按迁移文件执行 |

---

## 💡 实战示例

### 示例 1：给 User 表添加 phone 字段

**步骤：**

1. 修改 `src/models/User.ts`：

```typescript
phone: {
  type: DataTypes.STRING(20),
  allowNull: true,
  comment: '手机号'
}
```

2. 同步数据库：

```bash
npm run db:sync:alter
```

3. 验证：

```bash
# MySQL 命令行
DESCRIBE users;
```

### 示例 2：创建新表 Product

**步骤：**

1. 创建 `src/models/Product.ts`：

```typescript
import { DataTypes, Model, Sequelize } from 'sequelize';

interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  description?: string;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '产品名称'
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '价格'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '产品描述'
      }
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return Product;
};
```

2. 在 `src/models/index.ts` 中注册：

```typescript
import Product from './Product';

const models = {
  // ... 其他模型
  Product: Product(sequelize)
};
```

3. 同步数据库：

```bash
npm run db:sync:alter
# 或
npm run dev
```

### 示例 3：使用 Migration 删除字段（生产环境）

**步骤：**

1. 创建迁移文件：

```bash
npx sequelize-cli migration:generate --name remove-old-field-from-users
```

2. 编辑生成的文件（如 `src/migrations/20231110120000-remove-old-field-from-users.js`）：

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'old_field');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'old_field', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
```

3. 运行迁移：

```bash
npm run db:migrate
```

4. 如果需要回滚：

```bash
npm run db:migrate:undo
```

---

## 🎯 选择哪种方法？

### 开发环境 → 使用 `db:sync:alter`

```bash
npm run db:sync:alter
```

- ✅ 快速方便
- ✅ 适合频繁修改
- ✅ 不会丢失数据

### 生产环境 → 使用 Migrations

```bash
npx sequelize-cli migration:generate --name your-change
# 编辑迁移文件
npm run db:migrate
```

- ✅ 版本控制
- ✅ 可回滚
- ✅ 团队协作

### 开发初期/测试 → 使用 `db:sync:force`

```bash
npm run db:sync:force
```

- ⚠️ 会删除所有数据
- ✅ 完全重建表结构
- ✅ 适合原型开发

---

## ⚠️ 注意事项

### ❌ 不要在生产环境使用 sync

```javascript
// ❌ 危险：永远不要在生产环境这样做
await sequelize.sync({ force: true });
await sequelize.sync({ alter: true });
```

### ✅ 生产环境使用 Migrations

```javascript
// ✅ 安全：使用迁移
npm run db:migrate
```

### 📝 记住

1. **开发环境**：可以使用 `sync:alter`，快速迭代
2. **生产环境**：必须使用 `migrations`，保证安全
3. **团队协作**：统一使用 `migrations`，提交到 Git
4. **数据安全**：重要数据前先备份

---

## 🔗 更多信息

详细文档请查看：[DATABASE_SYNC.md](../DATABASE_SYNC.md)

## 🆘 常见问题

### Q: 修改了模型，但数据库没变化？

```bash
# 尝试 alter 同步
npm run db:sync:alter
```

### Q: 需要删除字段？

```bash
# 使用 migration
npx sequelize-cli migration:generate --name remove-field
# 然后编辑迁移文件
npm run db:migrate
```

### Q: 想重置整个数据库？

```bash
# 方法1：使用 force（会删除数据）
npm run db:sync:force

# 方法2：手动删除数据库
mysql -u root -p
DROP DATABASE koa2_dev;
CREATE DATABASE koa2_dev;
# 然后运行
npm run dev
```

---

**最后更新：** 2025-11-10
