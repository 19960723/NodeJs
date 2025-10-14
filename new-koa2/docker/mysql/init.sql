-- 初始化数据库脚本
CREATE DATABASE IF NOT EXISTS koa2_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS koa2_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户并授权
CREATE USER IF NOT EXISTS 'koa2user'@'%' IDENTIFIED BY 'koa2password';
GRANT ALL PRIVILEGES ON koa2_dev.* TO 'koa2user'@'%';
GRANT ALL PRIVILEGES ON koa2_test.* TO 'koa2user'@'%';

FLUSH PRIVILEGES;
