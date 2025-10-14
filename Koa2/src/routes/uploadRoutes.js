const Router = require('koa-router');
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs').promises;
const { authenticate } = require('../middleware/auth');
const { success, badRequest } = require('../utils/response');
const logger = require('../utils/logger');

const router = new Router({ prefix: '/api/upload' });

// 确保上传目录存在
const uploadDir = path.join(process.cwd(), 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// 配置multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB限制
  },
  fileFilter: (req, file, cb) => {
    // 只允许图片文件
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'), false);
    }
  }
});

// POST /api/upload/avatars - 上传头像
router.post('/avatars', authenticate, upload.single('file'), async ctx => {
  try {
    if (!ctx.request.file) {
      return badRequest(ctx, '请选择要上传的文件');
    }

    const file = ctx.request.file;
    const fileUrl = `/uploads/${file.filename}`;

    logger.info(`文件上传成功: ${file.originalname} -> ${file.filename}`);

    success(ctx, { url: fileUrl }, '文件上传成功');
  } catch (error) {
    logger.error('文件上传失败:', error);
    throw error;
  }
});

module.exports = router;
