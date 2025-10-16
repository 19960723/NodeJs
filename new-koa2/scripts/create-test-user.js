require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize } = require('../src/config/database');
const User = require('../src/models/User').default;

async function createTestUser() {
  try {
    console.log('正在连接数据库...');
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 初始化模型
    const UserModel = User(sequelize);

    // 同步表结构
    await UserModel.sync();
    console.log('用户表已同步');

    // 检查是否已存在admin用户
    const existingUser = await UserModel.findOne({
      where: { username: 'admin' }
    });

    if (existingUser) {
      console.log('⚠️  admin用户已存在');
      console.log('用户信息:', {
        id: existingUser.id,
        username: existingUser.username,
        nickname: existingUser.nickname
      });

      // 更新密码为简单密码用于测试
      const hashedPassword = await bcrypt.hash('password', 10);
      await existingUser.update({ password: hashedPassword });
      console.log('✅ 已更新admin用户密码为: password');
    } else {
      // 创建新的admin用户
      const hashedPassword = await bcrypt.hash('password', 10);
      const newUser = await UserModel.create({
        username: 'admin',
        password: hashedPassword,
        nickname: '管理员'
      });

      console.log('✅ 成功创建测试用户:');
      console.log({
        id: newUser.id,
        username: newUser.username,
        nickname: newUser.nickname
      });
    }

    console.log('\n测试用户登录信息:');
    console.log('用户名: admin');
    console.log('密码: password');

    await sequelize.close();
    console.log('\n数据库连接已关闭');
  } catch (error) {
    console.error('❌ 创建测试用户失败:', error);
    console.error('错误详情:', error.message);
    console.error('错误堆栈:', error.stack);
    process.exit(1);
  }
}

createTestUser();
