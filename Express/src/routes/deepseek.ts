/**
 * @file DeepSeek AI 路由
 * @description 提供 DeepSeek AI 的对话与模型相关接口：基础对话、流式对话、会话对话与模型列表。
 */

import { Router } from "express";
import { chat, chatStream, chatWithSession, getModels } from "../controllers/deepseek";

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: DeepSeek AI 对话服务接口集合
 */

const router = Router();

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: AI 对话接口 - 支持上下文的对话
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: array
 *                 description: 对话消息数组
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                     content:
 *                       type: string
 *               model:
 *                 type: string
 *                 default: deepseek-chat
 *                 description: 使用的模型名称
 *               temperature:
 *                 type: number
 *                 default: 0.7
 *                 minimum: 0
 *                 maximum: 2
 *                 description: 响应的随机性程度
 *     responses:
 *       200:
 *         description: 成功返回 AI 的回复内容
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: AI 的回复内容
 *       400:
 *         description: 请求参数错误
 */
// 基础对话
router.post("/chat", chat);

/**
 * @swagger
 * /api/ai/chat/stream:
 *   post:
 *     summary: AI 对话接口 - 支持流式响应，实时返回 AI 回复
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: array
 *                 description: 对话消息数组
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                     content:
 *                       type: string
 *               model:
 *                 type: string
 *                 default: deepseek-chat
 *                 description: 使用的模型名称
 *               temperature:
 *                 type: number
 *                 default: 0.7
 *                 minimum: 0
 *                 maximum: 2
 *                 description: 响应的随机性程度
 *     responses:
 *       200:
 *         description: 成功返回流式的 AI 回复内容
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               description: 流式返回的文本内容
 *       400:
 *         description: 请求参数错误
 */
// 流式对话
router.post("/chat/stream", chatStream);

/**
 * @swagger
 * /api/ai/chat/session:
 *   post:
 *     summary: AI 会话对话接口 - 支持多用户会话管理
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - messages
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: 会话 ID，用于区分不同对话
 *               messages:
 *                 type: array
 *                 description: 对话消息数组
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                     content:
 *                       type: string
 *               model:
 *                 type: string
 *                 default: deepseek-chat
 *                 description: 使用的模型名称
 *               temperature:
 *                 type: number
 *                 default: 0.7
 *                 minimum: 0
 *                 maximum: 2
 *                 description: 响应的随机性程度
 *     responses:
 *       200:
 *         description: 成功返回 AI 的回复内容和会话上下文
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: AI 的回复内容
 *                 sessionContext:
 *                   type: object
 *                   description: 会话上下文信息
 *       400:
 *         description: 请求参数错误
 */
// 会话对话（多用户会话管理）
router.post("/chat/session", chatWithSession);

/**
 * @swagger
 * /api/ai/models:
 *   get:
 *     summary: 获取可用的 AI 模型列表
 *     tags: [AI]
 *     responses:
 *       200:
 *         description: 成功返回可用的 AI 模型列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 模型ID
 *                   name:
 *                     type: string
 *                     description: 模型名称
 *                   maxTokens:
 *                     type: integer
 *                     description: 模型支持的最大 token 数量
 *                   description:
 *                     type: string
 *                     description: 模型描述
 */
// 获取模型列表
router.get("/models", getModels);

export default router;
