import 'dotenv/config';
import { Sequelize } from 'sequelize';

// 尝试导入 logger，如果失败则使用 console（用于 CLI 环境）
let logger: any;
try {
  logger = require('../utils/logger').default;
} catch (error) {
  logger = {
    debug: console.log,
    info: console.log,
    error: console.error
  };
}

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging?: any;
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  define?: {
    timestamps: boolean;
    underscored: boolean;
    paranoid: boolean;
    freezeTableName: boolean;
  };
}

// 数据库配置
const config: Record<string, DatabaseConfig> = {
  development: {
    username: process.env['DB_USER'] || 'root',
    password: process.env['DB_PASSWORD'] || 'password',
    database: process.env['DB_NAME'] || 'koa2_dev',
    host: process.env['DB_HOST'] || 'localhost',
    port: Number(process.env['DB_PORT']) || 3306,
    dialect: 'mysql',
    logging:
      process.env['NODE_ENV'] === 'development'
        ? (sql: string) => logger.debug(sql)
        : false,
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
    username: process.env['DB_USER'] || 'root',
    password: process.env['DB_PASSWORD'] || 'password',
    database: process.env['DB_NAME'] || 'koa2_test',
    host: process.env['DB_HOST'] || 'localhost',
    port: Number(process.env['DB_PORT']) || 3306,
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
    username: process.env['DB_USER'] || '',
    password: process.env['DB_PASSWORD'] || '',
    database: process.env['DB_NAME'] || '',
    host: process.env['DB_HOST'] || '',
    port: Number(process.env['DB_PORT']) || 3306,
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
  const env = process.env['NODE_ENV'] || 'development';
  const dbConfig = config[env];

  if (!dbConfig) {
    throw new Error(`未找到环境 ${env} 的数据库配置`);
  }

  // 创建 Sequelize 实例
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect as any,
      logging: dbConfig.logging,
      ...(dbConfig.pool && { pool: dbConfig.pool }),
      ...(dbConfig.define && { define: dbConfig.define })
    }
  );

  // 测试数据库连接
  const testConnection = async (): Promise<boolean> => {
    try {
      await sequelize.authenticate();
      logger.info(`数据库连接成功 (${env})`);
      return true;
    } catch (error: any) {
      logger.error('数据库连接失败:', error.message);

      // 提供更详细的错误信息
      if (error.name === 'SequelizeAccessDeniedError') {
        logger.error('数据库认证失败，请检查用户名和密码');
        logger.error(
          `尝试连接: ${dbConfig.username}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
        );
      } else if (error.name === 'SequelizeConnectionError') {
        logger.error('数据库连接错误，请检查数据库是否运行');
      } else if (error.name === 'SequelizeHostNotFoundError') {
        logger.error('数据库主机未找到，请检查主机地址');
      }

      return false;
    }
  };

  module.exports = { sequelize, testConnection, config };
}
