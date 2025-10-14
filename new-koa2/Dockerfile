# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装所有依赖（包括开发依赖，用于构建）
RUN npm ci && npm cache clean --force

# 复制 TypeScript 配置文件
COPY tsconfig.json ./

# 复制源代码
COPY src/ ./src/

# 构建 TypeScript 项目
RUN npm run build

# 删除开发依赖
RUN npm prune --production

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 创建必要的目录并设置权限
RUN mkdir -p /app/logs && chown -R nodejs:nodejs /app

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# 启动应用
CMD ["npm", "start"]
