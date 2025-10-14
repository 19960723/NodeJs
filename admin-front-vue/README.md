# Vue3 后台管理系统

基于 Vue3 + TypeScript + Vite 构建的现代化后台管理系统，采用 Composition API + `<script setup>` 语法，符合企业级开发规范。

## ✨ 特性

- 🚀 **最新技术栈**：Vue3 + TypeScript + Vite + Pinia + Vue Router
- 📦 **组件库**：Element Plus，按需引入，支持主题定制
- 🎨 **现代化UI**：响应式设计，支持暗色主题
- 🔐 **权限管理**：完整的权限控制方案，支持路由级和按钮级权限
- 📊 **数据可视化**：集成 ECharts，提供丰富的图表组件
- 🛠 **开发工具**：ESLint + Prettier + Husky，保证代码质量
- 🌍 **多环境支持**：开发、测试、生产环境配置
- 📱 **移动端适配**：响应式布局，支持移动端访问

## 🛠 技术栈

- **框架**：Vue 3.4+
- **语言**：TypeScript 5.0+
- **构建工具**：Vite 5.0+
- **路由管理**：Vue Router 4.0+
- **状态管理**：Pinia 2.1+
- **HTTP 客户端**：Axios 1.6+
- **UI 组件库**：Element Plus 2.6+
- **图标**：Element Plus Icons
- **图表库**：ECharts 5.5+ + Vue-ECharts 6.7+
- **样式处理**：Sass/SCSS
- **代码规范**：ESLint + Prettier
- **Git 钩子**：Husky + lint-staged
- **日期处理**：Day.js 1.11+
- **工具库**：Lodash-es 4.17+

## 📁 项目结构

```
admin-front-vue/
├── public/                     # 静态资源
│   └── vite.svg
├── src/
│   ├── api/                    # API 接口管理
│   │   ├── request.ts          # Axios 封装
│   │   ├── user.ts            # 用户相关接口
│   │   └── dashboard.ts       # 仪表盘接口
│   ├── assets/                # 静态资源
│   ├── components/            # 公共组件
│   │   ├── BaseTable.vue      # 表格组件
│   │   ├── BaseForm.vue       # 表单组件
│   │   ├── BaseChart.vue      # 图表组件
│   │   └── SidebarItem.vue    # 侧边栏菜单项
│   ├── composables/           # Vue3 Hooks
│   ├── layouts/               # 布局组件
│   │   ├── BasicLayout.vue    # 基础布局
│   │   └── BlankLayout.vue    # 空白布局
│   ├── router/                # 路由配置
│   │   └── index.ts           # 路由主文件
│   ├── store/                 # Pinia 状态管理
│   │   ├── index.ts           # Store 入口
│   │   ├── user.ts           # 用户状态
│   │   └── app.ts            # 应用状态
│   ├── styles/               # 全局样式
│   │   ├── index.scss        # 样式入口
│   │   ├── variables.scss    # SCSS 变量
│   │   └── reset.scss        # 样式重置
│   ├── types/                # TypeScript 类型定义
│   │   └── index.ts          # 全局类型
│   ├── utils/                # 工具函数
│   │   └── index.ts          # 工具函数集合
│   ├── views/                # 页面组件
│   │   ├── Login.vue         # 登录页
│   │   ├── Dashboard.vue     # 仪表盘
│   │   ├── User/            # 用户管理
│   │   │   ├── UserList.vue  # 用户列表
│   │   │   └── UserForm.vue  # 用户表单
│   │   ├── 403.vue          # 403 错误页
│   │   └── 404.vue          # 404 错误页
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── .eslintrc.cjs            # ESLint 配置
├── .prettierrc              # Prettier 配置
├── .gitignore               # Git 忽略文件
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0 (推荐) 或 npm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
# 开发环境
pnpm dev

# 或
npm run dev
```

### 构建生产版本

```bash
# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build:prod

# 或使用 npm
npm run build:test
npm run build:prod
```

### 代码检查和格式化

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

## 🔧 配置说明

### 环境变量

项目支持多环境配置，在根目录下创建对应的环境文件：

- `.env.development` - 开发环境
- `.env.test` - 测试环境
- `.env.production` - 生产环境

```bash
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080

# API 路径前缀
VITE_APP_BASE_API=/api

# 文件上传地址
VITE_UPLOAD_URL=http://localhost:8080/upload

# 应用标题
VITE_APP_TITLE=后台管理系统

# 应用版本
VITE_APP_VERSION=1.0.0
```

### 路由配置

路由采用自动导入和权限控制：

```typescript
// 静态路由 - 无需权限
export const constantRoutes = [
  // 登录、404等页面
]

// 动态路由 - 需要权限验证
export const asyncRoutes = [
  // 业务页面
]
```

### 权限控制

支持两种权限控制方式：

1. **路由级权限**：在路由 meta 中配置 `roles` 或 `permissions`
2. **组件级权限**：使用 `v-if="userStore.hasPermission('xxx')"` 指令

## 📦 核心功能

### 1. 用户认证

- 登录/登出
- Token 自动刷新
- 路由守卫
- 权限验证

### 2. 布局系统

- 响应式侧边栏
- 面包屑导航
- 主题切换
- 移动端适配

### 3. 表格组件 (BaseTable)

- 数据展示
- 分页
- 排序
- 筛选
- 批量操作
- 自定义列

### 4. 表单组件 (BaseForm)

- 动态表单生成
- 表单验证
- 文件上传
- 多种输入类型支持

### 5. 图表组件 (BaseChart)

- ECharts 集成
- 响应式图表
- 多种图表类型
- 主题支持

## 🎨 主题定制

项目支持亮色/暗色主题切换，可在以下文件中自定义主题：

- `src/styles/variables.scss` - SCSS 变量
- `src/styles/index.scss` - 全局样式

## 📱 移动端适配

项目采用响应式设计，支持以下断点：

- xs: < 480px (手机)
- sm: < 768px (平板)
- md: < 992px (小屏桌面)
- lg: < 1200px (中屏桌面)
- xl: >= 1200px (大屏桌面)

## 🔍 代码规范

项目使用 ESLint + Prettier 保证代码质量：

- **ESLint**：代码质量检查
- **Prettier**：代码格式化
- **Husky**：Git hooks
- **lint-staged**：暂存文件检查

提交代码时会自动进行代码检查和格式化。

## 📚 开发指南

### 新增页面

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 根据需要添加权限控制

### 新增API

1. 在 `src/api/` 下创建对应的 API 文件
2. 使用统一的请求封装 `request`
3. 添加 TypeScript 类型定义

### 新增组件

1. 在 `src/components/` 下创建组件
2. 添加 TypeScript 支持
3. 编写组件文档和示例

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ECharts](https://echarts.apache.org/)

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
