const crypto = require('crypto');
const svgCaptcha = require('svg-captcha');

/**
 * 验证码服务
 * 简单的内存存储实现，生产环境建议使用Redis
 */
class CaptchaService {
  constructor() {
    // 内存存储验证码，生产环境应使用Redis
    this.captchaStore = new Map();

    // 验证码过期时间（5分钟）
    this.CAPTCHA_EXPIRE_TIME = 5 * 60 * 1000;

    // 定期清理过期验证码
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000); // 每分钟清理一次
  }

  /**
   * 生成简单的数学验证码
   * @returns {Object} 包含问题和答案的对象
   */
  generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question, answer;

    switch (operator) {
      case '+':
        question = `${num1} + ${num2} = ?`;
        answer = num1 + num2;
        break;
      case '-':
        question = `${num1} - ${num2} = ?`;
        answer = num1 - num2;
        break;
      case '*':
        question = `${num1} × ${num2} = ?`;
        answer = num1 * num2;
        break;
    }

    return { question, answer: answer.toString() };
  }

  /**
   * 生成随机字符串验证码
   * @param {number} length 验证码长度
   * @returns {string} 验证码字符串
   */
  generateStringCaptcha(length = 4) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 生成SVG图片验证码
   * @param {Object} options 配置选项
   * @returns {Object} 包含SVG和答案的对象
   */
  generateSvgCaptcha(options = {}) {
    const defaultOptions = {
      size: 4, // 验证码长度
      ignoreChars: '0o1iIl', // 忽略容易混淆的字符
      noise: 2, // 噪声线条数量
      color: true, // 彩色验证码
      background: '#f0f0f0', // 背景色
      width: 150, // 图片宽度
      height: 50, // 图片高度
      fontSize: 50, // 字体大小
      charPreset: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789' // 字符集
    };

    const config = { ...defaultOptions, ...options };

    // 配置svg-captcha
    svgCaptcha.options.charPreset = config.charPreset;

    const captcha = svgCaptcha.create({
      size: config.size,
      ignoreChars: config.ignoreChars,
      noise: config.noise,
      color: config.color,
      background: config.background,
      width: config.width,
      height: config.height,
      fontSize: config.fontSize
    });

    return {
      svg: captcha.data,
      answer: captcha.text.toLowerCase() // 转为小写便于验证
    };
  }

  /**
   * 生成数学公式SVG验证码
   * @param {Object} options 配置选项
   * @returns {Object} 包含SVG和答案的对象
   */
  generateMathSvgCaptcha(options = {}) {
    const defaultOptions = {
      mathMin: 1,
      mathMax: 9,
      mathOperator: '+',
      color: true,
      background: '#f0f0f0',
      width: 150,
      height: 50,
      fontSize: 45
    };

    const config = { ...defaultOptions, ...options };

    const captcha = svgCaptcha.createMathExpr({
      mathMin: config.mathMin,
      mathMax: config.mathMax,
      mathOperator: config.mathOperator,
      color: config.color,
      background: config.background,
      width: config.width,
      height: config.height,
      fontSize: config.fontSize
    });

    return {
      svg: captcha.data,
      answer: captcha.text.toString()
    };
  }

  /**
   * 创建验证码
   * @param {string} type 验证码类型 ('math' | 'string' | 'image' | 'math-image')
   * @param {string} sessionId 会话ID
   * @param {Object} options 配置选项
   * @returns {Object} 验证码信息
   */
  createCaptcha(type = 'math', sessionId = null, options = {}) {
    // 生成会话ID
    if (!sessionId) {
      sessionId = crypto.randomBytes(16).toString('hex');
    }

    let captchaData;

    switch (type) {
      case 'math':
        captchaData = this.generateMathCaptcha();
        break;
      case 'string': {
        const code = this.generateStringCaptcha();
        captchaData = {
          question: code,
          answer: code.toLowerCase()
        };
        break;
      }
      case 'image':
        captchaData = this.generateSvgCaptcha(options);
        break;
      case 'math-image':
        captchaData = this.generateMathSvgCaptcha(options);
        break;
      default:
        captchaData = this.generateMathCaptcha();
    }

    // 存储验证码
    this.captchaStore.set(sessionId, {
      answer: captchaData.answer,
      createdAt: Date.now(),
      attempts: 0,
      maxAttempts: 3
    });

    // 根据类型返回不同的数据结构
    if (type === 'image' || type === 'math-image') {
      return {
        sessionId,
        svg: captchaData.svg,
        type,
        expiresIn: this.CAPTCHA_EXPIRE_TIME / 1000
      };
    } else {
      return {
        sessionId,
        question: captchaData.question,
        type,
        expiresIn: this.CAPTCHA_EXPIRE_TIME / 1000
      };
    }
  }

  /**
   * 验证验证码
   * @param {string} sessionId 会话ID
   * @param {string} answer 用户输入的答案
   * @returns {Object} 验证结果
   */
  verifyCaptcha(sessionId, answer) {
    const captchaData = this.captchaStore.get(sessionId);

    if (!captchaData) {
      return {
        success: false,
        message: '验证码不存在或已过期',
        code: 'CAPTCHA_NOT_FOUND'
      };
    }

    // 检查是否过期
    if (Date.now() - captchaData.createdAt > this.CAPTCHA_EXPIRE_TIME) {
      this.captchaStore.delete(sessionId);
      return {
        success: false,
        message: '验证码已过期',
        code: 'CAPTCHA_EXPIRED'
      };
    }

    // 检查尝试次数
    if (captchaData.attempts >= captchaData.maxAttempts) {
      this.captchaStore.delete(sessionId);
      return {
        success: false,
        message: '验证码尝试次数过多',
        code: 'CAPTCHA_MAX_ATTEMPTS'
      };
    }

    // 增加尝试次数
    captchaData.attempts++;

    // 验证答案（不区分大小写）
    const userAnswer = answer.toString().toLowerCase().trim();
    const correctAnswer = captchaData.answer.toLowerCase().trim();

    if (userAnswer === correctAnswer) {
      // 验证成功，删除验证码
      this.captchaStore.delete(sessionId);
      return {
        success: true,
        message: '验证码验证成功',
        code: 'CAPTCHA_SUCCESS'
      };
    } else {
      // 验证失败
      const remainingAttempts = captchaData.maxAttempts - captchaData.attempts;

      if (remainingAttempts <= 0) {
        this.captchaStore.delete(sessionId);
        return {
          success: false,
          message: '验证码错误，已达到最大尝试次数',
          code: 'CAPTCHA_MAX_ATTEMPTS'
        };
      }

      return {
        success: false,
        message: `验证码错误，还有 ${remainingAttempts} 次尝试机会`,
        code: 'CAPTCHA_WRONG',
        remainingAttempts
      };
    }
  }

  /**
   * 刷新验证码
   * @param {string} sessionId 会话ID
   * @param {string} type 验证码类型
   * @param {Object} options 配置选项
   * @returns {Object} 新的验证码信息
   */
  refreshCaptcha(sessionId, type = 'math', options = {}) {
    // 删除旧的验证码
    this.captchaStore.delete(sessionId);

    // 生成新的验证码
    return this.createCaptcha(type, sessionId, options);
  }

  /**
   * 清理过期的验证码
   */
  cleanup() {
    const now = Date.now();
    for (const [sessionId, data] of this.captchaStore.entries()) {
      if (now - data.createdAt > this.CAPTCHA_EXPIRE_TIME) {
        this.captchaStore.delete(sessionId);
      }
    }
  }

  /**
   * 获取验证码统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    return {
      totalCaptchas: this.captchaStore.size,
      expireTime: this.CAPTCHA_EXPIRE_TIME / 1000
    };
  }

  /**
   * 销毁服务
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.captchaStore.clear();
  }
}

// 创建单例实例
const captchaService = new CaptchaService();

module.exports = captchaService;
