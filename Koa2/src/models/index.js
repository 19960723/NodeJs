const { sequelize } = require('../config/database');
const User = require('./User');
const Role = require('./Role');
const Route = require('./Route');

// 定义模型关联关系
const models = {
  User: User(sequelize),
  Role: Role(sequelize),
  Route: Route(sequelize)
};

// 设置关联关系
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// 同步数据库（仅在开发环境）
const syncDatabase = async (force = false) => {
  try {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.DB_SYNC === 'true'
    ) {
      await sequelize.sync({ force });
      console.log('数据库同步完成');
    }
  } catch (error) {
    console.error('数据库同步失败:', error);
  }
};

module.exports = {
  sequelize,
  models,
  syncDatabase,
  ...models
};
