require('dotenv').config();

// 尝试导入 logger，如果失败则使用 console（用于 CLI 环境）
let logger;
try {
  logger = require('../utils/logger');
} catch (error) {
  logger = {
    debug: console.log,
    info: console.log,
    error: console.error
  };
}

// 数据库配置
const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'koa2_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging:
      process.env.NODE_ENV === 'development' ? sql => logger.debug(sql) : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true
    }
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'koa2_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true
    }
  }
};

// 如果是 CLI 调用，直接导出配置
if (process.argv.some(arg => arg.includes('sequelize'))) {
  module.exports = config;
} else {
  // 应用运行时，导出完整的数据库模块
  const { Sequelize } = require('sequelize');

  const env = process.env.NODE_ENV || 'development';
  const dbConfig = config[env];

  // 创建 Sequelize 实例
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      pool: dbConfig.pool,
      define: dbConfig.define
    }
  );

  // 测试数据库连接
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      logger.info(`数据库连接成功 (${env})`);
      return true;
    } catch (error) {
      logger.error('数据库连接失败:', error);
      return false;
    }
  };

  module.exports = {
    sequelize,
    testConnection,
    config
  };
}
