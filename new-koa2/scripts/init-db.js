const { sequelize } = require('../src/models');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  console.log('开始运行数据库迁移...');

  const migrationsDir = path.join(__dirname, '../src/migrations');
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter(file => file.endsWith('.js'))
    .sort();

  for (const file of migrationFiles) {
    console.log(`运行迁移: ${file}`);
    const migration = require(path.join(migrationsDir, file));

    try {
      await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
      console.log(`✓ 迁移 ${file} 完成`);
    } catch (error) {
      console.error(`✗ 迁移 ${file} 失败:`, error.message);
      // 继续执行其他迁移
    }
  }
}

async function runSeeders() {
  console.log('开始运行种子数据...');

  const seedersDir = path.join(__dirname, '../src/seeders');

  if (!fs.existsSync(seedersDir)) {
    console.log('种子数据目录不存在，跳过');
    return;
  }

  const seederFiles = fs
    .readdirSync(seedersDir)
    .filter(file => file.endsWith('.js'))
    .sort();

  for (const file of seederFiles) {
    console.log(`运行种子数据: ${file}`);
    const seeder = require(path.join(seedersDir, file));

    try {
      await seeder.up(sequelize.getQueryInterface(), sequelize.constructor);
      console.log(`✓ 种子数据 ${file} 完成`);
    } catch (error) {
      console.error(`✗ 种子数据 ${file} 失败:`, error.message);
      // 继续执行其他种子数据
    }
  }
}

async function initDatabase() {
  try {
    console.log('开始初始化数据库...');

    // 测试数据库连接
    await sequelize.authenticate();
    console.log('✓ 数据库连接成功');

    // 运行迁移
    await runMigrations();

    // 运行种子数据
    await runSeeders();

    console.log('✓ 数据库初始化完成');
  } catch (error) {
    console.error('✗ 数据库初始化失败:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase, runMigrations, runSeeders };
