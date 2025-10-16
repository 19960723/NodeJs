// 调试登录接口的脚本
const axios = require('axios');

async function debugLogin() {
  const baseURL = 'http://localhost:3000';

  console.log('🔍 调试登录接口...\n');

  // 测试用例: 正确的请求
  console.log('发送请求到: POST /api/auth/login');
  console.log(
    '请求体:',
    JSON.stringify(
      {
        username: 'admin',
        password: 'password'
      },
      null,
      2
    )
  );
  console.log('\n');

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
        },
        validateStatus: function (status) {
          return true; // 接受所有状态码
        }
      }
    );

    console.log('响应状态:', response.status);
    console.log('响应头:', response.headers);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ 请求失败:');
    if (error.response) {
      console.error('状态码:', error.response.status);
      console.error('响应数据:', error.response.data);
      console.error('响应头:', error.response.headers);
    } else if (error.request) {
      console.error('没有收到响应');
      console.error('请求:', error.request);
    } else {
      console.error('错误信息:', error.message);
    }
    console.error('完整错误:', error);
  }
}

// 运行调试
debugLogin().catch(console.error);
