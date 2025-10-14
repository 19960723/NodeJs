const Router = require('koa-router');
const captchaService = require('../services/captcha');
const logger = require('../utils/logger');
const { success, badRequest } = require('../utils/response');

const router = new Router();

/**
 * 获取验证码
 * GET /api/captcha
 */
router.get('/captcha', async ctx => {
  try {
    const {
      type = 'math',
      width,
      height,
      fontSize,
      size,
      color,
      noise,
      background
    } = ctx.query;

    // 验证类型参数
    if (!['math', 'string', 'image', 'math-image'].includes(type)) {
      return badRequest(
        ctx,
        '不支持的验证码类型，支持: math, string, image, math-image'
      );
    }

    // 构建配置选项
    const options = {};
    if (width) options.width = parseInt(width);
    if (height) options.height = parseInt(height);
    if (fontSize) options.fontSize = parseInt(fontSize);
    if (size) options.size = parseInt(size);
    if (color !== undefined) options.color = color === 'true';
    if (noise) options.noise = parseInt(noise);
    if (background) options.background = background;

    const captcha = captchaService.createCaptcha(type, null, options);

    logger.info(`生成验证码: ${captcha.sessionId}, 类型: ${type}`);

    // 如果是图片验证码，设置适当的Content-Type
    if (type === 'image' || type === 'math-image') {
      success(
        ctx,
        {
          sessionId: captcha.sessionId,
          svg: captcha.svg,
          type: captcha.type,
          expiresIn: captcha.expiresIn
        },
        '获取验证码成功'
      );
    } else {
      success(ctx, captcha, '获取验证码成功');
    }
  } catch (error) {
    logger.error('获取验证码失败:', error);
    throw error;
  }
});

/**
 * 直接获取SVG验证码图片
 * GET /api/captcha/image/:sessionId
 */
router.get('/captcha/image/:sessionId', async ctx => {
  try {
    const { sessionId } = ctx.params;
    const {
      type = 'image',
      width,
      height,
      fontSize,
      size,
      color,
      noise,
      background
    } = ctx.query;

    // 验证类型参数
    if (!['image', 'math-image'].includes(type)) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: '此接口只支持图片类型验证码: image, math-image'
      };
      return;
    }

    // 构建配置选项
    const options = {};
    if (width) options.width = parseInt(width);
    if (height) options.height = parseInt(height);
    if (fontSize) options.fontSize = parseInt(fontSize);
    if (size) options.size = parseInt(size);
    if (color !== undefined) options.color = color === 'true';
    if (noise) options.noise = parseInt(noise);
    if (background) options.background = background;

    const captcha = captchaService.createCaptcha(type, sessionId, options);

    logger.info(`生成SVG验证码: ${captcha.sessionId}, 类型: ${type}`);

    // 直接返回SVG图片
    ctx.type = 'image/svg+xml';
    ctx.body = captcha.svg;
  } catch (error) {
    logger.error('获取SVG验证码失败:', error);
    throw error;
  }
});

/**
 * 刷新验证码
 * POST /api/captcha/refresh
 */
router.post('/captcha/refresh', async ctx => {
  try {
    const {
      sessionId,
      type = 'math',
      width,
      height,
      fontSize,
      size,
      color,
      noise,
      background
    } = ctx.request.body;

    if (!sessionId) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: '缺少会话ID'
      };
      return;
    }

    // 验证类型参数
    if (!['math', 'string', 'image', 'math-image'].includes(type)) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: '不支持的验证码类型，支持: math, string, image, math-image'
      };
      return;
    }

    // 构建配置选项
    const options = {};
    if (width) options.width = parseInt(width);
    if (height) options.height = parseInt(height);
    if (fontSize) options.fontSize = parseInt(fontSize);
    if (size) options.size = parseInt(size);
    if (color !== undefined) options.color = color;
    if (noise) options.noise = parseInt(noise);
    if (background) options.background = background;

    const captcha = captchaService.refreshCaptcha(sessionId, type, options);

    logger.info(`刷新验证码: ${sessionId}, 类型: ${type}`);

    ctx.body = {
      success: true,
      message: '刷新验证码成功',
      data: captcha
    };
  } catch (error) {
    logger.error('刷新验证码失败:', error);
    throw error;
  }
});

/**
 * 验证验证码（独立接口，用于测试）
 * POST /api/captcha/verify
 */
router.post('/captcha/verify', async ctx => {
  try {
    const { sessionId, answer } = ctx.request.body;

    if (!sessionId || !answer) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: '缺少必要参数'
      };
      return;
    }

    const result = captchaService.verifyCaptcha(sessionId, answer);

    logger.info(`验证码验证: ${sessionId}, 结果: ${result.success}`);

    if (result.success) {
      ctx.body = {
        success: true,
        message: result.message
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: result.message,
        code: result.code,
        remainingAttempts: result.remainingAttempts
      };
    }
  } catch (error) {
    logger.error('验证验证码失败:', error);
    throw error;
  }
});

/**
 * 获取验证码统计信息
 * GET /api/captcha/stats
 */
router.get('/captcha/stats', async ctx => {
  try {
    const stats = captchaService.getStats();

    ctx.body = {
      success: true,
      message: '获取统计信息成功',
      data: stats
    };
  } catch (error) {
    logger.error('获取验证码统计失败:', error);
    throw error;
  }
});

module.exports = router;
