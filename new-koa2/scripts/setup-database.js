#!/usr/bin/env node

/**
 * 数据库设置脚本
 * 用于创建数据库和用户
 */

const mysql = require('mysql2/promise');
const { config } = require('../dist/config/database');

async function setupDatabase() {
  console.log('🔧 开始设置数据库...');

  // 获取配置
  const env = process.env.NODE_ENV || 'development';
  const dbConfig = config[env];

  if (!dbConfig) {
    console.error(`❌ 未找到环境 ${env} 的数据库配置`);
    process.exit(1);
  }

  console.log(`📊 使用配置: ${env}`);
  console.log(`🏠 主机: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`📚 数据库: ${dbConfig.database}`);
  console.log(`👤 用户: ${dbConfig.username}`);

  // 连接到MySQL服务器（不指定数据库）
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password
  });

  try {
    console.log('✅ 连接到MySQL服务器成功');

    // 创建数据库
    console.log(`📝 创建数据库: ${dbConfig.database}`);
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    // 创建测试数据库
    const testDbName = dbConfig.database.replace('_dev', '_test');
    console.log(`📝 创建测试数据库: ${testDbName}`);
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS \`${testDbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    console.log('✅ 数据库创建完成');
    console.log('🎉 数据库设置完成！');
    console.log('');
    console.log('📋 下一步:');
    console.log('1. 运行 npm run dev 启动应用');
    console.log('2. 应用将自动同步数据库表结构');
    console.log('3. 访问 http://localhost:3000/api-docs/ 查看API文档');
  } catch (error) {
    console.error('❌ 数据库设置失败:', error.message);

    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('💡 提示: 请检查数据库用户名和密码');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 提示: 请确保MySQL服务正在运行');
    }

    process.exit(1);
  } finally {
    await connection.end();
  }
}

// 运行设置
if (require.main === module) {
  setupDatabase().catch(console.error);
}

module.exports = { setupDatabase };
