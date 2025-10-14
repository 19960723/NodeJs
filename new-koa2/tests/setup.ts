// Jest 测试环境设置
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_NAME = 'koa2_test';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'password';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';

// 设置测试超时时间
jest.setTimeout(30000);

// 全局测试钩子
beforeAll(async () => {
  // 这里可以添加全局测试前的设置
});

afterAll(async () => {
  // 这里可以添加全局测试后的清理
});

// 抑制控制台输出（可选）
if (!process.env.VERBOSE_TESTS) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}
