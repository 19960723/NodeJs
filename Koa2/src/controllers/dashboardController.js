const { User } = require('../models');
const logger = require('../utils/logger');
const { success } = require('../utils/response');
const os = require('os');

/**
 * 获取统计卡片数据
 */
const getStatCards = async ctx => {
  try {
    // 获取用户总数
    const totalUsers = await User.count();

    // 获取今日新增用户
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayUsers = await User.count({
      where: {
        createdAt: {
          [User.sequelize.Sequelize.Op.gte]: today
        }
      }
    });

    // 获取活跃用户数
    const activeUsers = await User.count({
      where: {
        status: 'active'
      }
    });

    const stats = [
      {
        title: '用户总数',
        value: totalUsers,
        icon: 'User',
        color: '#409eff',
        change: {
          value: todayUsers,
          type: 'increase'
        }
      },
      {
        title: '活跃用户',
        value: activeUsers,
        icon: 'UserFilled',
        color: '#67c23a'
      },
      {
        title: '今日新增',
        value: todayUsers,
        icon: 'TrendCharts',
        color: '#e6a23c'
      },
      {
        title: '系统状态',
        value: '正常',
        icon: 'CircleCheck',
        color: '#67c23a'
      }
    ];

    success(ctx, stats, '获取统计数据成功');
  } catch (error) {
    logger.error('获取统计数据失败:', error);
    throw error;
  }
};

/**
 * 获取用户增长趋势
 */
const getUserGrowthTrend = async ctx => {
  try {
    const { days = 30 } = ctx.query;
    const dates = [];
    const data = [];

    // 生成日期数组
    for (let i = parseInt(days) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // 获取每日新增用户数据
    for (const date of dates) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const count = await User.count({
        where: {
          createdAt: {
            [User.sequelize.Sequelize.Op.gte]: startDate,
            [User.sequelize.Sequelize.Op.lt]: endDate
          }
        }
      });
      data.push(count);
    }

    success(ctx, { dates, data }, '获取用户增长趋势成功');
  } catch (error) {
    logger.error('获取用户增长趋势失败:', error);
    throw error;
  }
};

/**
 * 获取销售数据（模拟数据）
 */
const getSalesData = async ctx => {
  try {
    const { type = 'day' } = ctx.query;

    let labels = [];
    let data = [];

    switch (type) {
      case 'day':
        // 最近7天
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          labels.push(date.toLocaleDateString());
          data.push(Math.floor(Math.random() * 1000) + 100);
        }
        break;
      case 'month':
        // 最近12个月
        for (let i = 11; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          labels.push(
            `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          );
          data.push(Math.floor(Math.random() * 10000) + 1000);
        }
        break;
      case 'year':
        // 最近5年
        for (let i = 4; i >= 0; i--) {
          const year = new Date().getFullYear() - i;
          labels.push(year.toString());
          data.push(Math.floor(Math.random() * 100000) + 10000);
        }
        break;
    }

    success(ctx, { labels, data }, '获取销售数据成功');
  } catch (error) {
    logger.error('获取销售数据失败:', error);
    throw error;
  }
};

/**
 * 获取访问量统计（模拟数据）
 */
const getVisitStats = async ctx => {
  try {
    const { days = 7 } = ctx.query;

    const pv = [];
    const uv = [];

    for (let i = parseInt(days) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      pv.push({
        name: date.toLocaleDateString(),
        value: Math.floor(Math.random() * 1000) + 100
      });

      uv.push({
        name: date.toLocaleDateString(),
        value: Math.floor(Math.random() * 500) + 50
      });
    }

    success(ctx, { pv, uv }, '获取访问量统计成功');
  } catch (error) {
    logger.error('获取访问量统计失败:', error);
    throw error;
  }
};

/**
 * 获取热门页面（模拟数据）
 */
const getPopularPages = async ctx => {
  try {
    const pages = [
      { path: '/dashboard', title: '仪表盘', visits: 1234, percentage: 35.2 },
      { path: '/users', title: '用户管理', visits: 856, percentage: 24.4 },
      { path: '/login', title: '登录页面', visits: 654, percentage: 18.6 },
      { path: '/profile', title: '个人资料', visits: 432, percentage: 12.3 },
      { path: '/settings', title: '系统设置', visits: 321, percentage: 9.5 }
    ];

    success(ctx, pages, '获取热门页面成功');
  } catch (error) {
    logger.error('获取热门页面失败:', error);
    throw error;
  }
};

/**
 * 获取系统信息
 */
const getSystemInfo = async ctx => {
  try {
    const memoryUsage = process.memoryUsage();

    const systemInfo = {
      server: {
        os: `${os.type()} ${os.release()}`,
        arch: os.arch(),
        nodeVersion: process.version,
        uptime: Math.floor(process.uptime())
      },
      memory: {
        total: Math.round(os.totalmem() / 1024 / 1024),
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        free: Math.round(os.freemem() / 1024 / 1024)
      },
      disk: {
        // 模拟数据，实际应用中可以使用相关库获取真实磁盘信息
        total: 100000,
        used: 45000,
        free: 55000
      }
    };

    success(ctx, systemInfo, '获取系统信息成功');
  } catch (error) {
    logger.error('获取系统信息失败:', error);
    throw error;
  }
};

/**
 * 获取实时在线用户（模拟数据）
 */
const getOnlineUsers = async ctx => {
  try {
    // 获取最近活跃的用户
    const users = await User.findAll({
      where: {
        status: 'active',
        lastLoginAt: {
          [User.sequelize.Sequelize.Op.gte]: new Date(
            Date.now() - 24 * 60 * 60 * 1000
          ) // 24小时内
        }
      },
      limit: 10,
      order: [['lastLoginAt', 'DESC']]
    });

    const onlineData = {
      count: users.length,
      users: users.map(user => ({
        id: user.id,
        username: user.username,
        lastActivity: user.lastLoginAt
      }))
    };

    success(ctx, onlineData, '获取在线用户成功');
  } catch (error) {
    logger.error('获取在线用户失败:', error);
    throw error;
  }
};

module.exports = {
  getStatCards,
  getUserGrowthTrend,
  getSalesData,
  getVisitStats,
  getPopularPages,
  getSystemInfo,
  getOnlineUsers
};
