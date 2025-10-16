const axios = require('axios');

// 测试登录接口的脚本
async function testLogin() {
  const baseURL = 'http://localhost:3000';

  console.log('🧪 开始测试登录接口...\n');

  // 测试用例1: 正确的JSON格式
  console.log('测试用例1: 正确的JSON格式');
  try {
    const response = await axios.post(
      `${baseURL}/api/auth/login`,
      {
        username: 'admin',
        password: 'password'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ 成功:', response.data);
  } catch (error) {
    console.log('❌ 失败:', error.response?.data || error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // 测试用例2: 错误的JSON格式（包含转义字符错误）
  console.log('测试用例2: 错误的JSON格式（包含转义字符错误）');
  try {
    const response = await axios.post(
      `${baseURL}/api/auth/login`,
      '{"username": "admin\\", "password": "password"}', // 错误的转义字符
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ 成功:', response.data);
  } catch (error) {
    console.log('❌ 失败:', error.response?.data || error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // 测试用例3: 缺少Content-Type头部
  console.log('测试用例3: 缺少Content-Type头部');
  try {
    const response = await axios.post(`${baseURL}/api/auth/login`, {
      username: 'admin',
      password: 'password'
    });
    console.log('✅ 成功:', response.data);
  } catch (error) {
    console.log('❌ 失败:', error.response?.data || error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // 测试用例4: 空的请求体
  console.log('测试用例4: 空的请求体');
  try {
    const response = await axios.post(
      `${baseURL}/api/auth/login`,
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ 成功:', response.data);
  } catch (error) {
    console.log('❌ 失败:', error.response?.data || error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // 测试用例5: 缺少必需字段
  console.log('测试用例5: 缺少必需字段');
  try {
    const response = await axios.post(
      `${baseURL}/api/auth/login`,
      {
        username: 'admin'
        // 缺少password字段
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ 成功:', response.data);
  } catch (error) {
    console.log('❌ 失败:', error.response?.data || error.message);
  }
}

// 运行测试
testLogin().catch(console.error);
