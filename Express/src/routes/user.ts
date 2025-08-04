import { Router } from "express";
import {
  login,
  register,
  logout,
  getAllUsers,
  getUserList,
  // createUser,
  getUserById,
  updateUser,
  getProfile,
  deleteUser,
} from "../controllers/user";
const router = Router();
import { authMiddleware } from "../middlewares/authMiddleware";

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 用户登录
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: 登录成功
 */
router.post("/login", login); //登录
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: 注册新用户
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: test
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:.
 *                 type: string
 *                 example: 13200000000
 *     responses:
 *       200:
 *         description: 注册成功
 */
router.post("/register", register); // 注册新用户  createUser
/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: 用户登出
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 登出成功
 */
router.post("/logout", authMiddleware, logout); // 登出（清除 token）
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: 获取当前用户信息
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 */
router.get("/profile", authMiddleware, getProfile); // 获取当前用户信息
/**
 * @swagger
 * /api/user/{id}:
 *   post:
 *     summary: 获取指定用户信息
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: 获取成功
 */
router.post("/:id", authMiddleware, getUserById); // 获取指定用户
/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: 更新当前用户资料
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: 小龙
 *               phone:
 *                 type: string
 *                 example: 13800000000
 *     responses:
 *       200:
 *         description: 更新成功
 */
router.put("/update", authMiddleware, updateUser); // 更新当前用户资料
/**
 * @swagger
 * /api/user/list:
 *   get:
 *     summary: 获取用户列表（分页）
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: 获取成功
 */
router.get("/list", authMiddleware, getUserList); // 获取用户列表（分页）
/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: 获取所有用户列表
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 */
router.get("/all", authMiddleware, getAllUsers); // 获取所有用户列表（
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: 删除用户
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: 删除成功
 */
router.delete("/:id", authMiddleware, deleteUser); // 	删除用户

// router.post('/createUser', createUser)

export default router;
