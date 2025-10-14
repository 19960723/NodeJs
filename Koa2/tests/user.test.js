const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');
const { generateAccessToken } = require('../src/utils/jwt');

describe('User API', () => {
  // 测试数据
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: '123456'
  };

  const testUser2 = {
    username: 'testuser2',
    email: 'test2@example.com',
    password: '123456'
  };

  beforeEach(async () => {
    // 清理测试数据
    await User.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    // 清理测试数据
    await User.destroy({ where: {}, force: true });
  });

  describe('POST /api/users/register', () => {
    it('应该成功注册新用户', async () => {
      const response = await request(app.callback())
        .post('/api/users/register')
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('注册成功');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user.username).toBe(testUser.username);
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('应该拒绝重复的用户名或邮箱', async () => {
      // 先创建一个用户
      await User.create(testUser);

      const response = await request(app.callback())
        .post('/api/users/register')
        .send(testUser)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('用户名或邮箱已存在');
    });

    it('应该验证输入数据', async () => {
      const invalidUser = {
        username: 'ab', // 太短
        email: 'invalid-email', // 无效邮箱
        password: '123' // 太短
      };

      const response = await request(app.callback())
        .post('/api/users/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('数据验证失败');
      expect(response.body.errors).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      // 创建测试用户
      await User.create(testUser);
    });

    it('应该成功登录', async () => {
      const response = await request(app.callback())
        .post('/api/users/login')
        .send({
          identifier: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('登录成功');
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.tokens).toHaveProperty('accessToken');
      expect(response.body.data.tokens).toHaveProperty('refreshToken');
    });

    it('应该拒绝错误的密码', async () => {
      const response = await request(app.callback())
        .post('/api/users/login')
        .send({
          identifier: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('用户名或密码错误');
    });

    it('应该拒绝不存在的用户', async () => {
      const response = await request(app.callback())
        .post('/api/users/login')
        .send({
          identifier: 'nonexistent@example.com',
          password: testUser.password
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('用户名或密码错误');
    });
  });

  describe('GET /api/users/me', () => {
    let user;
    let token;

    beforeEach(async () => {
      user = await User.create(testUser);
      token = generateAccessToken({
        id: user.id,
        username: user.username,
        email: user.email
      });
    });

    it('应该返回当前用户信息', async () => {
      const response = await request(app.callback())
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.id).toBe(user.id);
      expect(response.body.data.user.username).toBe(user.username);
      expect(response.body.data.user.email).toBe(user.email);
    });

    it('应该拒绝未认证的请求', async () => {
      const response = await request(app.callback())
        .get('/api/users/me')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('缺少认证令牌');
    });

    it('应该拒绝无效的令牌', async () => {
      const response = await request(app.callback())
        .get('/api/users/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('无效的令牌');
    });
  });

  describe('PUT /api/users/profile', () => {
    let user;
    let token;

    beforeEach(async () => {
      user = await User.create(testUser);
      token = generateAccessToken({
        id: user.id,
        username: user.username,
        email: user.email
      });
    });

    it('应该成功更新用户信息', async () => {
      const updateData = {
        username: 'newusername',
        avatar: 'https://example.com/avatar.jpg'
      };

      const response = await request(app.callback())
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.username).toBe(updateData.username);
      expect(response.body.data.user.avatar).toBe(updateData.avatar);
    });

    it('应该拒绝重复的用户名', async () => {
      // 创建另一个用户
      await User.create(testUser2);

      const response = await request(app.callback())
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ username: testUser2.username })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('用户名已被使用');
    });
  });
});
