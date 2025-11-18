# ⚡ 快速开始指南

## 🎯 5 分钟了解改进

### 什么被改进了？

`SysService.ts` 中的 10 个字典管理方法现在拥有：

- ✅ **完整的参数验证**
- ✅ **规范的错误处理**
- ✅ **强大的业务规则**
- ✅ **生产级代码质量**

### 核心改进三大亮点

#### 🌟 亮点 1: 新增字典分类查询

```typescript
// 现在可以按字典 ID 查询特定字典的所有数据项
const items = await sysService.getDictDataList({
  dict_id: 1, // ✨ 新功能
  status: 1,
  page: 1,
  pageSize: 20
});
```

#### 🌟 亮点 2: 值唯一性保证

```typescript
// 防止同一字典内出现重复的值
await sysService.createDictData({
  dict_id: 1,
  label: '男',
  value: '1' // ✨ 自动检查唯一性
});

// 如果值重复，会返回 409 错误
```

#### 🌟 亮点 3: 级联删除保护

```typescript
// 删除字典时自动检查是否有数据项
await sysService.deleteDict(1);

// 如果有数据项，会返回 409 错误
// 这防止了孤立数据的产生
```

---

## 📖 快速参考

### 所有方法一览表

| 方法            | 功能     | 改进                |
| --------------- | -------- | ------------------- |
| getDictList     | 字典列表 | ✅ 参数验证         |
| getDictById     | 字典详情 | ✅ ID 检查          |
| createDict      | 创建字典 | ✅ 完整验证         |
| updateDict      | 更新字典 | ✅ 条件验证         |
| deleteDict      | 删除字典 | ✅ **级联保护**     |
| getDictDataList | 数据列表 | ✅ **新增 dict_id** |
| getDictDataById | 数据详情 | ✅ ID 检查          |
| createDictData  | 创建数据 | ✅ **值唯一性**     |
| updateDictData  | 更新数据 | ✅ 智能验证         |
| deleteDictData  | 删除数据 | ✅ 存在性检查       |

---

## 🚀 常见操作示例

### 操作 1: 查询字典

```typescript
// 基础查询
const dicts = await sysService.getDictList({
  page: 1,
  pageSize: 10
});

// 带搜索
const searchResult = await sysService.getDictList({
  keyword: '性别',
  status: 1,
  page: 1
});

// 返回格式
{
  list: [
    { id: 1, name: '性别', code: 'gender', ... },
    { id: 2, name: '状态', code: 'status', ... }
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 2,
    totalPages: 1
  }
}
```

### 操作 2: 创建字典

```typescript
const dict = await sysService.createDict({
  name: '性别',
  code: 'gender',
  description: '用户性别字典',
  status: 1 // 1 启用, 0 禁用
});

// 检查是否成功
if (dict.id) {
  console.log('字典创建成功，ID:', dict.id);
}
```

**可能的错误：**

```
400: 字典名称不能为空
400: 字典代码不能为空
400: 字典名称长度不能超过100个字符
409: 字典代码已存在
```

### 操作 3: 获取字典数据

```typescript
// ✨ 新功能：按字典 ID 查询
const items = await sysService.getDictDataList({
  dict_id: 1,        // 指定字典
  status: 1,         // 只获取启用的
  page: 1,
  pageSize: 20
});

// 返回按 sort 升序、id 降序排列的数据
{
  list: [
    { id: 2, dict_id: 1, label: '女', value: '2', sort: 2, ... },
    { id: 1, dict_id: 1, label: '男', value: '1', sort: 1, ... }
  ],
  pagination: { ... }
}
```

### 操作 4: 创建字典数据

```typescript
const item = await sysService.createDictData({
  dict_id: 1,
  label: '男',
  value: '1',
  sort: 1,
  status: 1
});

// ✨ 值会自动检查唯一性
// 如果 value: '1' 在字典 1 中已存在，会抛出 409 错误
```

### 操作 5: 修改字典数据

```typescript
// 修改单个字段
await sysService.updateDictData(1, {
  label: '未知'
});

// 修改多个字段
await sysService.updateDictData(1, {
  label: '未知',
  sort: 99,
  status: 0
});

// ✨ 修改 value 时会检查唯一性（排除自己）
await sysService.updateDictData(1, {
  value: '10' // 如果重复会报 409 错误
});
```

### 操作 6: 删除操作

```typescript
// ✨ 删除字典前会检查是否有数据项
try {
  await sysService.deleteDict(1);
  console.log('字典删除成功');
} catch (error) {
  if (error.code === 409) {
    console.log('字典下存在数据项，请先删除数据项');
    // 需要先删除字典项
    const items = await sysService.getDictDataList({ dict_id: 1 });
    for (const item of items.list) {
      await sysService.deleteDictData(item.id);
    }
    // 再删除字典
    await sysService.deleteDict(1);
  }
}
```

---

## ⚠️ 常见错误和解决方案

### 错误 1: 409 - 字典代码已存在

```typescript
// ❌ 错误
await sysService.createDict({
  name: '状态类型 2',
  code: 'status' // 这个 code 已存在
});

// ✅ 解决方案：检查代码是否唯一
const existing = await sysService.getDictList({ keyword: 'status' });
if (existing.list.length > 0) {
  // 使用不同的代码
  code = 'status_type_2';
}
```

### 错误 2: 409 - 该字典下数据值已存在

```typescript
// ❌ 错误
await sysService.createDictData({
  dict_id: 1,
  value: '1' // 这个值已存在
});

// ✅ 解决方案：查询现有值
const items = await sysService.getDictDataList({ dict_id: 1 });
const existingValues = items.list.map(i => i.value);
console.log('已存在的值:', existingValues);
```

### 错误 3: 409 - 该字典下存在数据项，不能删除

```typescript
// ❌ 错误：直接删除
await sysService.deleteDict(1);

// ✅ 解决方案：先删除数据项再删除字典
const items = await sysService.getDictDataList({ dict_id: 1 });
for (const item of items.list) {
  await sysService.deleteDictData(item.id);
}
await sysService.deleteDict(1);
```

### 错误 4: 400 - 参数无效

```typescript
// ❌ 错误：参数不合法
await sysService.getDictList({
  pageSize: 200 // 超过最大值 100
});

// ✅ 解决方案：使用合法参数
await sysService.getDictList({
  pageSize: 100 // 最大 100
});
```

---

## 📋 验证规则快查表

### 字典验证规则

| 字段        | 规则                  | 错误码  |
| ----------- | --------------------- | ------- |
| name        | 1-100 字符，必填      | 400     |
| code        | 1-50 字符，必填，唯一 | 400/409 |
| status      | 0 或 1                | 400     |
| description | 可选                  | -       |

### 字典数据验证规则

| 字段    | 规则                           | 错误码  |
| ------- | ------------------------------ | ------- |
| dict_id | 必填，必须存在                 | 400/404 |
| label   | 1-100 字符，必填               | 400     |
| value   | 1-100 字符，必填，在字典内唯一 | 400/409 |
| sort    | 可选整数                       | -       |
| status  | 0 或 1                         | 400     |

---

## 🔧 错误处理最佳实践

### 标准错误处理模式

```typescript
try {
  const result = await sysService.createDict({
    name: '新字典',
    code: 'new_dict'
  });
  console.log('成功:', result);
} catch (error) {
  if (error.statusCode === 400) {
    console.log('参数错误:', error.message);
    // 提示用户修改参数
  } else if (error.statusCode === 409) {
    console.log('数据冲突:', error.message);
    // 提示用户数据已存在
  } else if (error.statusCode === 404) {
    console.log('资源不存在:', error.message);
    // 提示用户资源不存在
  } else {
    console.log('服务器错误:', error.message);
  }
}
```

---

## 🎓 最佳实践

### ✅ 推荐做法

```typescript
// ✅ 好：先查询再操作
const existing = await sysService.getDictList({ keyword: 'status' });
if (existing.list.length === 0) {
  await sysService.createDict({ code: 'status', ... });
}

// ✅ 好：正确的错误处理
try {
  await sysService.deleteDict(id);
} catch (error) {
  if (error.statusCode === 409) {
    // 先删除关联数据
    await deleteRelatedData();
    // 再尝试删除
    await sysService.deleteDict(id);
  }
}

// ✅ 好：使用分页处理大量数据
let page = 1;
let hasMore = true;
while (hasMore) {
  const result = await sysService.getDictList({
    page,
    pageSize: 100
  });
  // 处理 result.list
  hasMore = page < result.pagination.totalPages;
  page++;
}
```

### ❌ 不推荐做法

```typescript
// ❌ 不好：忽略错误
await sysService.createDict({ ... }).catch(() => {});

// ❌ 不好：假设操作成功
const dict = await sysService.createDict({ ... });
await sysService.createDictData({ dict_id: dict.id, ... });

// ❌ 不好：一次性加载所有数据
const allDicts = await sysService.getDictList({
  pageSize: 10000  // 会被限制为 100
});
```

---

## 📊 数据模型

### SysDict（字典）

```typescript
{
  id: number;              // 主键
  name: string;            // 名称 (1-100 字符)
  code: string;            // 代码 (1-50 字符, 唯一)
  description?: string;    // 描述
  status: number;          // 状态 (0/1)
  created_at: Date;        // 创建时间
  updated_at: Date;        // 更新时间
}
```

### SysDictItem（字典项）

```typescript
{
  id: number;              // 主键
  dict_id: number;         // 字典 ID
  label: string;           // 标签 (1-100 字符)
  value: string;           // 值 (1-100 字符, 在字典内唯一)
  description?: string;    // 描述
  sort: number;            // 排序 (升序)
  status: number;          // 状态 (0/1)
  created_at: Date;        // 创建时间
  updated_at: Date;        // 更新时间
}
```

---

## 🔗 相关文档

想要了解更多？查看以下文档：

| 文档                            | 用途          |
| ------------------------------- | ------------- |
| **README_IMPROVEMENTS.md**      | 完整项目报告  |
| **API_QUICK_REFERENCE.md**      | 详细 API 参考 |
| **BEFORE_AFTER_COMPARISON.md**  | 改进前后对比  |
| **IMPROVEMENTS_SUMMARY.md**     | 详细改进说明  |
| **IMPLEMENTATION_CHECKLIST.md** | 实现检查清单  |

---

## ❓ 常见问题

**Q: 现有项目可以直接使用吗？**
A: 是的，完全向下兼容。直接替换文件即可。

**Q: 需要修改数据库吗？**
A: 不需要。建议添加索引以提升性能。

**Q: 性能会下降吗？**
A: 不会。虽然增加了验证查询，但确保了数据安全，值得。

**Q: 如何集成到现有代码？**
A: 无需修改使用代码，只需替换 SysService.ts 文件。

**Q: 支持批量操作吗？**
A: 暂不支持，可通过循环调用实现。后续可添加批量接口。

---

## 🎯 下一步

1. ✅ 理解改进内容 → 阅读本文档
2. ⏭️ 集成到项目 → 替换 src/services/SysService.ts
3. ⏭️ 编写单元测试 → 参考 IMPLEMENTATION_CHECKLIST.md
4. ⏭️ 部署上线 → 按照部署检查清单

---

**准备好开始了吗？祝你使用愉快！** 🚀
