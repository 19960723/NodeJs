# 登录API使用指南

本文档介绍重构后的登录API的使用方法，包括验证码验证、用户名密码验证等功能。

## API端点

### 1. 获取验证码

```
GET /api/captcha?type=image&width=150&height=50
```

**参数：**

- `type` (可选): 验证码类型
  - `math`: 数学验证码 (默认)
  - `string`: 字符串验证码
  - `image`: SVG图片验证码
  - `math-image`: 数学公式SVG图片验证码
- `width` (可选): 图片宽度，默认150
- `height` (可选): 图片高度，默认50
- `fontSize` (可选): 字体大小，默认50
- `size` (可选): 验证码字符长度，默认4
- `color` (可选): 是否彩色，默认true
- `noise` (可选): 噪声线条数量，默认2
- `background` (可选): 背景色，默认#f0f0f0

**文本验证码响应示例：**

```json
{
  "success": true,
  "message": "获取验证码成功",
  "data": {
    "sessionId": "abc123def456",
    "question": "3 + 5 = ?",
    "type": "math",
    "expiresIn": 300
  }
}
```

**图片验证码响应示例：**

```json
{
  "success": true,
  "message": "获取验证码成功",
  "data": {
    "sessionId": "abc123def456",
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' width='150' height='50'>...</svg>",
    "type": "image",
    "expiresIn": 300
  }
}
```

### 1.1 直接获取SVG图片

```
GET /api/captcha/image/:sessionId?type=image&width=150&height=50
```

**说明：** 此接口直接返回SVG图片，可以在HTML中作为img标签的src使用。

**响应：** 直接返回SVG格式的图片数据，Content-Type为`image/svg+xml`

### 2. 用户登录

```
POST /api/users/login
```

**请求体：**

```json
{
  "username": "user@example.com",
  "password": "password123",
  "captcha": {
    "sessionId": "abc123def456",
    "answer": "8"
  }
}
```

**成功响应：**

```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "user@example.com",
      "avatar": null,
      "status": "active",
      "lastLoginAt": "2025-01-15T10:30:00.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "tokenType": "Bearer",
      "expiresIn": "1h"
    }
  }
}
```

## 错误处理

### 验证码相关错误

**验证码错误：**

```json
{
  "success": false,
  "message": "验证码错误，还有 2 次尝试机会",
  "code": "CAPTCHA_WRONG",
  "remainingAttempts": 2
}
```

**验证码过期：**

```json
{
  "success": false,
  "message": "验证码已过期",
  "code": "CAPTCHA_EXPIRED"
}
```

**验证码不存在：**

```json
{
  "success": false,
  "message": "验证码不存在或已过期",
  "code": "CAPTCHA_NOT_FOUND"
}
```

### 用户认证错误

**用户名或密码错误：**

```json
{
  "success": false,
  "message": "用户名或密码错误",
  "code": "INVALID_CREDENTIALS"
}
```

**账户状态异常：**

```json
{
  "success": false,
  "message": "账户未激活，请检查邮箱激活链接",
  "code": "ACCOUNT_DISABLED",
  "userStatus": "inactive"
}
```

## 前端集成示例

### JavaScript/Ajax 示例

```javascript
// 1. 获取文本验证码
async function getCaptcha() {
  try {
    const response = await fetch('/api/captcha?type=math');
    const result = await response.json();

    if (result.success) {
      // 显示验证码问题
      document.getElementById('captcha-question').textContent =
        result.data.question;
      // 保存sessionId用于登录
      window.captchaSessionId = result.data.sessionId;
    }
  } catch (error) {
    console.error('获取验证码失败:', error);
  }
}

// 1.1 获取图片验证码
async function getImageCaptcha() {
  try {
    const response = await fetch('/api/captcha?type=image&width=150&height=50');
    const result = await response.json();

    if (result.success) {
      // 显示SVG验证码图片
      document.getElementById('captcha-image').innerHTML = result.data.svg;
      // 保存sessionId用于登录
      window.captchaSessionId = result.data.sessionId;
    }
  } catch (error) {
    console.error('获取图片验证码失败:', error);
  }
}

// 1.2 使用直接图片接口
function loadImageCaptcha(sessionId) {
  const imgElement = document.getElementById('captcha-img');
  imgElement.src = `/api/captcha/image/${sessionId}?type=image&width=150&height=50`;
  window.captchaSessionId = sessionId;
}

// 1.3 刷新图片验证码
async function refreshImageCaptcha() {
  try {
    if (!window.captchaSessionId) {
      await getImageCaptcha();
      return;
    }

    const response = await fetch('/api/captcha/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId: window.captchaSessionId,
        type: 'image',
        width: 150,
        height: 50
      })
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById('captcha-image').innerHTML = result.data.svg;
    }
  } catch (error) {
    console.error('刷新验证码失败:', error);
  }
}

// 2. 用户登录
async function login(username, password, captchaAnswer) {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        captcha: {
          sessionId: window.captchaSessionId,
          answer: captchaAnswer
        }
      })
    });

    const result = await response.json();

    if (result.success) {
      // 保存令牌
      localStorage.setItem('accessToken', result.data.tokens.accessToken);
      localStorage.setItem('refreshToken', result.data.tokens.refreshToken);

      // 跳转到主页
      window.location.href = '/dashboard';
    } else {
      // 处理错误
      alert(result.message);

      // 如果是验证码错误，可能需要刷新验证码
      if (result.code && result.code.startsWith('CAPTCHA_')) {
        getCaptcha(); // 重新获取验证码
      }
    }
  } catch (error) {
    console.error('登录失败:', error);
  }
}
```

### Vue.js 示例

```vue
<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>用户名/邮箱:</label>
        <input v-model="form.username" type="text" required />
      </div>

      <div class="form-group">
        <label>密码:</label>
        <input v-model="form.password" type="password" required />
      </div>

      <div class="form-group">
        <label>验证码类型:</label>
        <select v-model="captchaType" @change="getCaptcha">
          <option value="math">数学验证码</option>
          <option value="image">图片验证码</option>
          <option value="math-image">数学图片验证码</option>
        </select>
      </div>

      <div class="form-group">
        <label>验证码:</label>
        <div class="captcha-container">
          <!-- 文本验证码 -->
          <span v-if="captchaType === 'math'" class="captcha-question">
            {{ captcha.question }}
          </span>

          <!-- 图片验证码 -->
          <div
            v-else-if="captchaType === 'image' || captchaType === 'math-image'"
            class="captcha-image"
            v-html="captcha.svg"
          ></div>

          <input
            v-model="form.captchaAnswer"
            type="text"
            required
            placeholder="请输入验证码"
          />
          <button type="button" @click="refreshCaptcha" class="refresh-btn">
            刷新
          </button>
        </div>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        captchaAnswer: ''
      },
      captcha: {
        sessionId: '',
        question: '',
        svg: ''
      },
      captchaType: 'image', // 默认使用图片验证码
      loading: false
    };
  },

  mounted() {
    this.getCaptcha();
  },

  methods: {
    async getCaptcha() {
      try {
        const params = new URLSearchParams({
          type: this.captchaType,
          width: '150',
          height: '50'
        });

        const response = await this.$http.get(`/api/captcha?${params}`);
        if (response.data.success) {
          this.captcha = response.data.data;
        }
      } catch (error) {
        console.error('获取验证码失败:', error);
        this.$message.error('获取验证码失败');
      }
    },

    async refreshCaptcha() {
      if (!this.captcha.sessionId) {
        await this.getCaptcha();
        return;
      }

      try {
        const response = await this.$http.post('/api/captcha/refresh', {
          sessionId: this.captcha.sessionId,
          type: this.captchaType,
          width: 150,
          height: 50
        });

        if (response.data.success) {
          this.captcha = response.data.data;
          this.form.captchaAnswer = '';
        }
      } catch (error) {
        console.error('刷新验证码失败:', error);
        this.$message.error('刷新验证码失败');
        // 如果刷新失败，重新获取
        await this.getCaptcha();
      }
    },

    async handleLogin() {
      this.loading = true;

      try {
        const response = await this.$http.post('/api/users/login', {
          username: this.form.username,
          password: this.form.password,
          captcha: {
            sessionId: this.captcha.sessionId,
            answer: this.form.captchaAnswer
          }
        });

        if (response.data.success) {
          // 保存令牌
          this.$store.commit('setTokens', response.data.data.tokens);
          this.$store.commit('setUser', response.data.data.user);

          // 跳转
          this.$router.push('/dashboard');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          this.$message.error(errorData.message);

          // 验证码错误时刷新验证码
          if (errorData.code && errorData.code.startsWith('CAPTCHA_')) {
            this.refreshCaptcha();
          }
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.captcha-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-image {
  border: 1px solid #ddd;
  padding: 5px;
  background: white;
  border-radius: 4px;
}

.captcha-question {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  min-width: 100px;
  text-align: center;
}

.refresh-btn {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-btn:hover {
  background: #0056b3;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

### HTML 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>登录页面</title>
    <style>
      .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .form-group {
        margin-bottom: 15px;
      }
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .form-group input,
      .form-group select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
      }
      .captcha-container {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .captcha-display {
        flex: 1;
        min-height: 50px;
        border: 1px solid #ddd;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .refresh-btn {
        padding: 8px 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .refresh-btn:hover {
        background: #0056b3;
      }
      .login-btn {
        width: 100%;
        padding: 10px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      .login-btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }
    </style>
  </head>
  <body>
    <div class="login-container">
      <h2>用户登录</h2>
      <form id="loginForm">
        <div class="form-group">
          <label for="username">用户名/邮箱:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div class="form-group">
          <label for="captchaType">验证码类型:</label>
          <select id="captchaType" name="captchaType" onchange="loadCaptcha()">
            <option value="math">数学验证码</option>
            <option value="image">图片验证码</option>
            <option value="math-image">数学图片验证码</option>
          </select>
        </div>

        <div class="form-group">
          <label>验证码:</label>
          <div class="captcha-container">
            <div id="captchaDisplay" class="captcha-display"></div>
            <button
              type="button"
              class="refresh-btn"
              onclick="refreshCaptcha()"
            >
              刷新
            </button>
          </div>
          <input
            type="text"
            id="captchaAnswer"
            name="captchaAnswer"
            placeholder="请输入验证码"
            required
            style="margin-top: 10px;"
          />
        </div>

        <button type="submit" class="login-btn" id="loginBtn">登录</button>
      </form>
    </div>

    <script>
      let captchaSessionId = '';
      let currentCaptchaType = 'math';

      // 页面加载时获取验证码
      window.onload = function () {
        loadCaptcha();
      };

      // 加载验证码
      async function loadCaptcha() {
        currentCaptchaType = document.getElementById('captchaType').value;
        try {
          const response = await fetch(
            `/api/captcha?type=${currentCaptchaType}&width=150&height=50`
          );
          const result = await response.json();

          if (result.success) {
            captchaSessionId = result.data.sessionId;
            const display = document.getElementById('captchaDisplay');

            if (currentCaptchaType === 'math') {
              display.innerHTML = `<strong>${result.data.question}</strong>`;
            } else {
              display.innerHTML = result.data.svg;
            }

            // 清空答案输入框
            document.getElementById('captchaAnswer').value = '';
          } else {
            alert('获取验证码失败');
          }
        } catch (error) {
          console.error('获取验证码失败:', error);
          alert('获取验证码失败');
        }
      }

      // 刷新验证码
      async function refreshCaptcha() {
        if (!captchaSessionId) {
          await loadCaptcha();
          return;
        }

        try {
          const response = await fetch('/api/captcha/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sessionId: captchaSessionId,
              type: currentCaptchaType,
              width: 150,
              height: 50
            })
          });

          const result = await response.json();
          if (result.success) {
            const display = document.getElementById('captchaDisplay');

            if (currentCaptchaType === 'math') {
              display.innerHTML = `<strong>${result.data.question}</strong>`;
            } else {
              display.innerHTML = result.data.svg;
            }

            document.getElementById('captchaAnswer').value = '';
          } else {
            alert('刷新验证码失败');
          }
        } catch (error) {
          console.error('刷新验证码失败:', error);
          await loadCaptcha(); // 如果刷新失败，重新获取
        }
      }

      // 处理登录表单提交
      document
        .getElementById('loginForm')
        .addEventListener('submit', async function (e) {
          e.preventDefault();

          const loginBtn = document.getElementById('loginBtn');
          loginBtn.disabled = true;
          loginBtn.textContent = '登录中...';

          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const captchaAnswer = document.getElementById('captchaAnswer').value;

          try {
            const response = await fetch('/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username,
                password,
                captcha: {
                  sessionId: captchaSessionId,
                  answer: captchaAnswer
                }
              })
            });

            const result = await response.json();

            if (result.success) {
              // 保存令牌到localStorage
              localStorage.setItem(
                'accessToken',
                result.data.tokens.accessToken
              );
              localStorage.setItem(
                'refreshToken',
                result.data.tokens.refreshToken
              );

              alert('登录成功！');
              // 跳转到主页
              window.location.href = '/dashboard';
            } else {
              alert(result.message);

              // 如果是验证码错误，刷新验证码
              if (result.code && result.code.startsWith('CAPTCHA_')) {
                refreshCaptcha();
              }
            }
          } catch (error) {
            console.error('登录失败:', error);
            alert('登录失败，请重试');
          } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = '登录';
          }
        });
    </script>
  </body>
</html>
```

## 安全特性

1. **验证码保护**: 防止暴力破解攻击
2. **会话管理**: 验证码有5分钟有效期
3. **尝试限制**: 每个验证码最多尝试3次
4. **状态检查**: 登录时检查账户状态
5. **日志记录**: 详细的登录日志记录
6. **JWT令牌**: 安全的身份认证机制

## 验证码类型说明

| 类型         | 描述          | 适用场景         | 示例            |
| ------------ | ------------- | ---------------- | --------------- |
| `math`       | 简单数学运算  | 轻量级验证       | "3 + 5 = ?"     |
| `string`     | 随机字符串    | 基础文本验证     | "A3F9"          |
| `image`      | SVG图片验证码 | 标准图片验证     | 彩色字符图片    |
| `math-image` | 数学公式图片  | 数学运算图片验证 | "2+3=" 图片形式 |

## 配置参数说明

### 图片验证码配置

- `width`: 图片宽度 (默认: 150px)
- `height`: 图片高度 (默认: 50px)
- `fontSize`: 字体大小 (默认: 50px)
- `size`: 字符数量 (默认: 4个字符)
- `color`: 是否彩色 (默认: true)
- `noise`: 噪声线条数 (默认: 2条)
- `background`: 背景色 (默认: #f0f0f0)

## 注意事项

1. **验证码有效期**: 5分钟，过期需重新获取
2. **尝试限制**: 每个验证码最多尝试3次，超过后需重新获取
3. **登录字段**: 用户名字段支持邮箱或用户名登录
4. **会话更新**: 登录成功后会更新用户的最后登录时间
5. **安全协议**: 建议在生产环境中使用HTTPS协议
6. **图片格式**: SVG格式验证码，可直接在HTML中显示
7. **浏览器兼容**: SVG验证码支持所有现代浏览器
8. **性能考虑**: 图片验证码比文本验证码消耗更多服务器资源
9. **无障碍访问**: 建议提供音频验证码选项以支持视障用户
10. **缓存策略**: 验证码图片应设置no-cache头部防止缓存

## 故障排除

### 常见问题

1. **验证码显示异常**
   - 检查SVG内容是否正确嵌入HTML
   - 确认Content-Type设置为image/svg+xml

2. **验证码验证失败**
   - 检查sessionId是否正确传递
   - 确认答案大小写匹配（系统自动转为小写）

3. **图片验证码不显示**
   - 检查浏览器是否支持SVG
   - 确认网络连接正常

4. **频繁刷新验证码**
   - 检查验证码是否过期
   - 确认尝试次数是否超限
