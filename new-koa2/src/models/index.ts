const { sequelize } = require('../config/database');
import Example from './Example';
import User from './User';
import Menu from './Menus';

// 定义模型
const models = {
  Example: Example(sequelize),
  User: User(sequelize),
  Menu: Menu(sequelize)
};

// 设置关联关系
Object.keys(models).forEach(modelName => {
  if ((models as any)[modelName].associate) {
    (models as any)[modelName].associate(models);
  }
});

// 同步数据库（仅在开发环境）
const syncDatabase = async (force: boolean = false): Promise<void> => {
  try {
    if (process.env['NODE_ENV'] === 'development') {
      await sequelize.sync({ force });
      console.log('数据库同步完成');
    }
  } catch (error) {
    console.error('数据库同步失败:', error);
    throw error; // 重新抛出错误以便上层处理
  }
};

export { sequelize, models, syncDatabase };

export default models;
