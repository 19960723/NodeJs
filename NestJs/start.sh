#!/bin/sh

# 等待数据库启动 (简单版，生产环境建议用 wait-for-it.sh)
echo "🚀 Starting application..."

# 执行数据库迁移 (仅在第一次部署或 schema 变更时需要)
# 注意：在多实例部署时，migration 可能会冲突，最好在 CD 流程中单独执行
echo "📦 Running database migrations..."
npx prisma migrate deploy

# 如果是第一次运行，可能需要 seeding
# echo "🌱 Seeding database..."
# npx prisma db seed

# 启动应用
echo "🔥 Starting NestJS server..."

if [ -f "dist/src/main.js" ]; then
    node dist/src/main.js
else
    node dist/main.js
fi

