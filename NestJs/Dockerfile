# ==========================================
# 阶段 1: 构建阶段 (Builder)
# ==========================================
# 使用 DaoCloud 镜像源加速 Node.js 基础镜像拉取
FROM m.daocloud.io/docker.io/library/node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 1. 换源并安装 pnpm
# 使用淘宝镜像源加速 npm 包下载
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com

# 2. 复制依赖锁文件
COPY package.json pnpm-lock.yaml ./

# 3. 安装依赖
# --frozen-lockfile: 严格按照 lock 文件安装，不更新版本
RUN pnpm install --frozen-lockfile

# 4. 生成 Prisma Client
# 这一步必须在 build 之前，因为代码里引用了 @prisma/client
COPY prisma ./prisma
RUN pnpm prisma generate

# 5. 复制源代码并构建
COPY . .
RUN pnpm build

# ==========================================
# 阶段 2: 运行阶段 (Runner)
# ==========================================
FROM m.daocloud.io/docker.io/library/node:20-alpine AS runner

WORKDIR /app

# 1. 换源并安装 pnpm (运行时也需要 pnpm 来执行 prisma 命令或 script)
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com

# 2. 复制依赖文件并仅安装生产依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# 3. 复制构建产物 (从 builder 阶段)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# 4. 复制启动脚本并赋予权限
COPY start.sh ./
RUN chmod +x start.sh

# 环境变量默认值 (会被 docker-compose 覆盖)
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动容器
CMD ["./start.sh"]
