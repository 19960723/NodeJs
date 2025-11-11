import 'dotenv/config';
import { sequelize } from '../src/models';
import logger from '../src/utils/logger';

/**
 * 数据库同步脚本
 * 用于手动同步模型到数据库
 */

const syncOptions = {
  // force: false - 不删除已存在的表，只会更新
  // alter: true - 会尝试修改现有表结构以匹配模型定义
  alter: true,
  force: false
};

async function syncDatabase() {
  try {
    logger.info('开始同步数据库...');
    logger.info('同步选项:', syncOptions);

    // 测试数据库连接
    await sequelize.authenticate();
    logger.info('✓ 数据库连接成功');

    // 同步所有模型
    await sequelize.sync(syncOptions);

    logger.info('✓ 数据库同步完成');
    logger.info('所有模型已同步到数据库');

    // 显示所有表
    const [tables] = await sequelize.query('SHOW TABLES');
    logger.info('当前数据库表:', tables);
  } catch (error: any) {
    logger.error('✗ 数据库同步失败:', error.message);
    logger.error('详细错误:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    logger.info('数据库连接已关闭');
  }
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.includes('--force')) {
  syncOptions.force = true;
  syncOptions.alter = false;
  console.warn('⚠️  警告：使用 --force 模式会删除所有现有表和数据！');
  console.warn('⚠️  将在 3 秒后执行...');

  setTimeout(() => {
    syncDatabase();
  }, 3000);
} else if (args.includes('--alter')) {
  syncOptions.alter = true;
  syncOptions.force = false;
  syncDatabase();
} else {
  console.log('使用方法:');
  console.log('  npm run db:sync         - 不修改现有表（默认）');
  console.log('  npm run db:sync:alter   - 修改现有表结构以匹配模型');
  console.log('  npm run db:sync:force   - 删除并重建所有表（⚠️ 会丢失数据）');
  console.log('');
  syncDatabase();
}

export default syncDatabase;
