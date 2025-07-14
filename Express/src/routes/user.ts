import { Router } from "express";
import {
  login,
  register,
  logout,
  getAllUsers,
  getUserList,
  createUser,
  getUserById,
  updateUser,
  getProfile,
  deleteUser,
} from "../controllers/user";
const router = Router();
import { authMiddleware } from "../middlewares/authMiddleware";
router.post("/login", login); //登录
router.post("/register", register); // 注册新用户  createUser
router.post("/logout", authMiddleware, logout); // 登出（清除 token）

router.get("/profile", authMiddleware, getProfile); // 获取当前用户信息
router.post("/:id", authMiddleware, getUserById); // 获取指定用户
router.put("/update", authMiddleware, updateUser); // 更新当前用户资料
router.get("/list", authMiddleware, getUserList); // 获取用户列表（分页）
router.get("/all", authMiddleware, getAllUsers); // 获取所有用户列表（
router.delete("/:id", authMiddleware, deleteUser); // 	删除用户

// router.post('/createUser', createUser)

export default router;
