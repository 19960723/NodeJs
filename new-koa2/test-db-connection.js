#!/usr/bin/env node

/**
 * 数据库连接测试脚本
 */

const { testConnection } = require('./dist/config/database');

async function testDatabaseConnection() {
  console.log('🔍 测试数据库连接...');

  try {
    const connected = await testConnection();

    if (connected) {
      console.log('✅ 数据库连接成功！');
      console.log('🎉 可以启动应用了');
      process.exit(0);
    } else {
      console.log('❌ 数据库连接失败');
      console.log('💡 请检查数据库配置和MySQL服务状态');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    process.exit(1);
  }
}

testDatabaseConnection();
