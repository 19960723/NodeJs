# SysService API 快速参考

## 目录

1. [字典管理 API](#字典管理-api)
2. [字典数据 API](#字典数据-api)
3. [错误代码](#错误代码)

---

## 字典管理 API

### 获取字典列表

```typescript
async getDictList(query: {
  page?: number;           // 页码，默认 1
  pageSize?: number;       // 每页数量，默认 10（1-100）
  status?: number;         // 状态：0 禁用，1 启用
  keyword?: string;        // 关键词，最多 50 字符（搜索名称、代码、描述）
}): Promise<{
  list: SysDict[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }
}>
```

**示例：**

```typescript
const result = await sysService.getDictList({
  page: 1,
  pageSize: 10,
  status: 1,
  keyword: '性别'
});
```

---

### 获取字典详情

```typescript
async getDictById(id: number): Promise<SysDict>
```

**错误：**

- `400` - 字典 ID 无效
- `404` - 字典不存在

**示例：**

```typescript
const dict = await sysService.getDictById(1);
```

---

### 创建字典

```typescript
async createDict(data: {
  name: string;           // 字典名称（1-100 字符），必填
  code: string;           // 字典代码（1-50 字符），必填，全局唯一
  description?: string;   // 字典描述
  status?: number;        // 状态：0 禁用，1 启用（默认 1）
}): Promise<SysDict>
```

**验证规则：**

- `name` 和 `code` 不能为空
- `code` 在系统中必须唯一
- `status` 只能是 0 或 1

**错误：**

- `400` - 参数无效或格式错误
- `409` - 字典代码已存在

**示例：**

```typescript
const dict = await sysService.createDict({
  name: '性别',
  code: 'gender',
  description: '用户性别字典',
  status: 1
});
```

---

### 更新字典

```typescript
async updateDict(id: number, data: {
  name?: string;          // 字典名称（1-100 字符）
  description?: string;   // 字典描述
  status?: number;        // 状态：0 禁用，1 启用
}): Promise<[number]>
```

**验证规则：**

- 只能更新提供的字段
- `code` 不能修改
- `name` 如果提供，必须不为空

**错误：**

- `400` - 参数无效
- `404` - 字典不存在

**示例：**

```typescript
await sysService.updateDict(1, {
  name: '用户性别',
  status: 1
});
```

---

### 删除字典

```typescript
async deleteDict(id: number): Promise<number>
```

**检查项：**

- ✅ 字典 ID 有效性
- ✅ 字典存在性
- ✅ **重要：字典下不能存在数据项**

**错误：**

- `400` - 字典 ID 无效
- `404` - 字典不存在
- `409` - 字典下存在数据项，不能删除

**示例：**

```typescript
// 先删除所有字典数据项，再删除字典
await sysService.deleteDictData(itemId);
await sysService.deleteDict(1);
```

---

## 字典数据 API

### 获取字典数据列表

```typescript
async getDictDataList(query: {
  page?: number;           // 页码，默认 1
  pageSize?: number;       // 每页数量，默认 10（1-100）
  dict_id?: number;        // 字典 ID，可选（提供时验证字典存在）
  status?: number;         // 状态：0 禁用，1 启用
  keyword?: string;        // 关键词，最多 50 字符（搜索标签、值）
}): Promise<{
  list: SysDictItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }
}>
```

**排序规则：**

- 优先按 sort 字段升序（推荐设置 1, 2, 3...）
- 次按 id 降序

**示例：**

```typescript
// 获取性别字典的所有启用项
const result = await sysService.getDictDataList({
  dict_id: 1,
  status: 1,
  page: 1,
  pageSize: 20
});

// 搜索特定关键词
const searchResult = await sysService.getDictDataList({
  keyword: '男',
  page: 1
});
```

---

### 获取字典数据详情

```typescript
async getDictDataById(id: number): Promise<SysDictItem>
```

**错误：**

- `400` - 字典数据 ID 无效
- `404` - 字典数据不存在

**示例：**

```typescript
const item = await sysService.getDictDataById(1);
```

---

### 创建字典数据

```typescript
async createDictData(data: {
  dict_id: number;        // 字典 ID，必填
  label: string;          // 标签（1-100 字符），必填
  value: string | number; // 值（1-100 字符），必填，在该字典内唯一
  description?: string;   // 描述
  sort?: number;          // 排序号（默认 0）
  status?: number;        // 状态：0 禁用，1 启用（默认 1）
}): Promise<SysDictItem>
```

**验证规则：**

- `dict_id` 对应的字典必须存在
- `label` 和 `value` 不能为空
- `value` 在该字典内必须唯一
- `status` 只能是 0 或 1

**错误：**

- `400` - 参数无效或格式错误
- `404` - 字典不存在
- `409` - 值已存在

**示例：**

```typescript
const item1 = await sysService.createDictData({
  dict_id: 1,
  label: '男',
  value: '1',
  sort: 1,
  status: 1
});

const item2 = await sysService.createDictData({
  dict_id: 1,
  label: '女',
  value: '2',
  sort: 2,
  status: 1
});
```

---

### 更新字典数据

```typescript
async updateDictData(id: number, data: {
  label?: string;         // 标签（1-100 字符）
  value?: string;         // 值（1-100 字符，在字典内唯一）
  description?: string;   // 描述
  sort?: number;          // 排序号
  status?: number;        // 状态：0 禁用，1 启用
}): Promise<[number]>
```

**验证规则：**

- 只能更新提供的字段
- `label` 和 `value` 如果提供，必须不为空
- `value` 唯一性检查排除自己
- `dict_id` 不能修改

**错误：**

- `400` - 参数无效
- `404` - 字典数据不存在
- `409` - 值已存在

**示例：**

```typescript
await sysService.updateDictData(1, {
  label: '未知',
  status: 0
});
```

---

### 删除字典数据

```typescript
async deleteDictData(id: number): Promise<number>
```

**错误：**

- `400` - 字典数据 ID 无效
- `404` - 字典数据不存在

**示例：**

```typescript
await sysService.deleteDictData(1);
```

---

## 错误代码

| 代码 | 含义         | 场景                     |
| ---- | ------------ | ------------------------ |
| 400  | 请求参数错误 | 空值、格式错误、长度超限 |
| 404  | 资源不存在   | 字典/数据项不存在        |
| 409  | 数据冲突     | 重复代码/值、级联冲突    |
| 500  | 服务器错误   | 数据库异常等             |

---

## 常见业务流程

### 初始化字典系统

```typescript
// 1. 创建字典
const genderDict = await sysService.createDict({
  name: '性别',
  code: 'gender',
  status: 1
});

// 2. 添加字典项
await sysService.createDictData({
  dict_id: genderDict.id,
  label: '男',
  value: '1',
  sort: 1
});

await sysService.createDictData({
  dict_id: genderDict.id,
  label: '女',
  value: '2',
  sort: 2
});

// 3. 查询验证
const items = await sysService.getDictDataList({
  dict_id: genderDict.id
});
console.log(items);
```

### 修改字典项排序

```typescript
// 更新排序号
await sysService.updateDictData(itemId, { sort: 5 });

// 重新查询（会按 sort 升序、id 降序排列）
const items = await sysService.getDictDataList({ dict_id: dictId });
```

### 禁用字典项

```typescript
// 禁用单个项
await sysService.updateDictData(itemId, { status: 0 });

// 或禁用整个字典
await sysService.updateDict(dictId, { status: 0 });
```

### 删除字典（完整流程）

```typescript
const dictId = 1;

// 1. 获取所有数据项
const items = await sysService.getDictDataList({
  dict_id: dictId,
  pageSize: 100 // 一次性获取所有
});

// 2. 删除所有数据项
for (const item of items.list) {
  await sysService.deleteDictData(item.id);
}

// 3. 删除字典
await sysService.deleteDict(dictId);
```

---

## 性能优化建议

1. **缓存策略**

   ```typescript
   // 字典数据适合缓存，因为更新不频繁
   // 建议：缓存时间 24 小时
   ```

2. **数据库索引**

   ```sql
   CREATE INDEX idx_sysdict_code ON sys_dict(code);
   CREATE INDEX idx_sysdict_status ON sys_dict(status);
   CREATE INDEX idx_sysdictitem_dict_id ON sys_dict_item(dict_id);
   CREATE INDEX idx_sysdictitem_value ON sys_dict_item(value);
   ```

3. **查询优化**
   - 分页：使用 limit 和 offset，最大页面大小 100
   - 搜索：仅在需要时使用 keyword，限制为 50 字符
   - 排序：优先使用 sort 字段

---

## 完整 TypeScript 类型定义

```typescript
interface SysDict {
  id: number;
  name: string;
  code: string;
  description?: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

interface SysDictItem {
  id: number;
  dict_id: number;
  label: string;
  value: string;
  description?: string;
  sort: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
```

---

**最后更新：** 2025-11-18
