import request from 'supertest';
import app from '../src/app';

describe('Health Check API', () => {
  describe('GET /api/health', () => {
    it('应该返回基础健康状态', async () => {
      const response = await request(app.callback())
        .get('/api/health')
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.message).toBe('服务运行正常');
      expect(response.body.data).toHaveProperty('status', 'healthy');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('version');
      expect(response.body.data).toHaveProperty('environment');
    });
  });

  describe('GET /api/health/detailed', () => {
    it('应该返回详细健康状态', async () => {
      const response = await request(app.callback())
        .get('/api/health/detailed')
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data).toHaveProperty('services');
      expect(response.body.data.services).toHaveProperty('database');
      expect(response.body.data.services).toHaveProperty('memory');
      expect(response.body.data.services).toHaveProperty('cpu');
    });
  });
});
