import { Router } from "express";
import { chat, chatStream, chatWithSession, getModels } from "../controllers/deepseek";
const router = Router();

// AI对话接口（带上下文）
router.post("/chat", chat);

// AI对话接口（流式响应）
router.post("/chat/stream", chatStream);

// AI会话对话接口（带会话ID，用于多用户会话）
router.post("/chat/session", chatWithSession);

// 获取可用模型列表接口
router.get("/models", getModels);

export default router;
