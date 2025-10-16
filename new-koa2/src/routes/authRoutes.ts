import Router from 'koa-router';
import { login, refresh, logout, codes } from '../controllers/authController';

const router = new Router({ prefix: '/api' });

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 用户登录
 *     description: 用户使用用户名和密码登录系统，返回 accessToken 和 refreshToken
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 密码
 *           examples:
 *             login:
 *               summary: 登录请求示例
 *               value:
 *                 username: "admin"
 *                 password: "password"
 *     responses:
 *       200:
 *         description: 登录成功，返回令牌和用户基本信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: 访问令牌
 *                 refreshToken:
 *                   type: string
 *                   description: 刷新令牌
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     nickname:
 *                       type: string
 *       401:
 *         description: 用户名或密码错误
 */
router.post('/auth/login', ...login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: 刷新 accessToken
 *     description: 使用 refreshToken 获取新的 accessToken
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: 刷新令牌
 *     responses:
 *       200:
 *         description: 新的 accessToken 颁发
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: 刷新令牌无效或已过期
 */
router.post('/auth/refresh', ...refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 用户登出
 *     description: 用户主动登出，并使令牌失效
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: 登出成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 登出成功
 */
router.post('/auth/logout', ...logout);

/**
 * @swagger
 * /api/auth/codes:
 *   post:
 *     summary: 获取验证码
 *     description: 获取用于登录或注册的验证码（如短信或邮箱验证码）
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               target:
 *                 type: string
 *                 description: 手机号或邮箱，根据实际需求
 *               type:
 *                 type: string
 *                 description: 验证码类型（如 'login', 'register' 等）
 *     responses:
 *       200:
 *         description: 验证码发送成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 验证码发送成功
 *       400:
 *         description: 请求参数错误
 */
router.post('/auth/codes', ...codes);

export default router;
