import OpenAI from "openai";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || "your-api-key",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
});

// 流式响应事件类型
interface StreamEvent {
  event: "message" | "done" | "error";
  data?: any;
  error?: string;
}

// 处理AI对话请求
export const chat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, model = "deepseek-chat" } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        code: 400,
        message: "请求参数错误，messages数组是必需的",
      });
    }

    // 调用DeepSeek API
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: req.body.temperature || 0.7,
      max_tokens: req.body.max_tokens || 1024,
    });

    const responseMessage =
      completion.choices[0]?.message?.content || "无响应内容";

    logger.info("AI回复:", { responseMessage });

    // 返回AI回复，同时保留完整的对话历史
    res.json({
      code: 200,
      message: "请求成功",
      data: {
        id: completion.id,
        object: completion.object,
        created: completion.created,
        model: completion.model,
        choices: completion.choices,
        usage: completion.usage,
        // 添加AI回复到对话历史中
        messages: [
          ...messages,
          {
            role: "assistant",
            content: responseMessage,
          },
        ],
      },
    });
  } catch (error: any) {
    logger.error("DeepSeek API调用错误:", error);
    res.status(500).json({
      code: 500,
      message: "AI服务调用失败",
      error: error.message || "未知错误",
    });
  }
};

// 处理AI对话请求（流式响应）
export const chatStream = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, model = "deepseek-chat" } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        code: 400,
        message: "请求参数错误，messages数组是必需的",
      });
    }

    // 设置流式响应头
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    // 记录完整的对话历史
    const conversationHistory = [...messages];
    let fullResponse = "";
    
    logger.info("开始流式对话", { model });
    
    // 创建流式请求
    const stream = await openai.chat.completions.create({
      model,
      messages,
      temperature: req.body.temperature || 0.7,
      max_tokens: req.body.max_tokens || 1024,
      stream: true, // 启用流式响应
    });
    
    // 处理流式数据
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      
      if (content) {
        fullResponse += content;
        
        // 发送消息片段
        res.write(`data: ${JSON.stringify({
          event: "message",
          content,
          fullResponse
        })}\n\n`);
      }
    }
    
    // 对话完成
    conversationHistory.push({
      role: "assistant",
      content: fullResponse
    });
    
    // 发送完成信号
    res.write(`data: ${JSON.stringify({
      event: "done",
      fullResponse,
      messages: conversationHistory
    })}\n\n`);
    
    // 结束响应
    res.end();
    
  } catch (error: any) {
    logger.error("DeepSeek API调用错误:", error);
    
    // 发送错误信号
    if (!res.headersSent) {
      res.setHeader("Content-Type", "text/event-stream");
      res.write(`data: ${JSON.stringify({
        event: "error",
        error: error.message || "未知错误"
      })}\n\n`);
      res.end();
    }
  }
};

// 处理带会话ID的对话请求（用于维护多用户会话）
export const chatWithSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId, messages, model = "deepseek-chat" } = req.body;

    // 检查必需参数
    if (!sessionId) {
      return res.status(400).json({
        code: 400,
        message: "请求参数错误，sessionId是必需的",
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        code: 400,
        message: "请求参数错误，messages必须是一个数组",
      });
    }

    // 在实际应用中，这里应该从数据库或缓存中获取该会话的历史对话
    // 为了示例简单，我们直接使用提供的messages
    logger.info("会话开始", { sessionId, model, messagesLength: Array.isArray(messages) ? messages.length : 0 });

    // 调用DeepSeek API
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: req.body.temperature || 0.7,
      max_tokens: req.body.max_tokens || 1024,
    });

    const responseMessage =
      completion.choices[0]?.message?.content || "无响应内容";

    logger.info("AI回复:", { responseMessage });

    // 在实际应用中，这里应该将新的对话历史保存到数据库或缓存中
    const updatedMessages = [
      ...messages,
      {
        role: "assistant",
        content: responseMessage,
      },
    ];

    res.json({
      code: 200,
      message: "请求成功",
      data: {
        sessionId,
        id: completion.id,
        object: completion.object,
        created: completion.created,
        model: completion.model,
        choices: completion.choices,
        usage: completion.usage,
        // 返回更新后的对话历史
        messages: updatedMessages,
      },
    });
  } catch (error: any) {
    logger.error("DeepSeek API调用错误:", error);
    res.status(500).json({
      code: 500,
      message: "AI服务调用失败",
      error: error.message || "未知错误",
    });
  }
};

// 获取可用的模型列表
export const getModels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const models = await openai.models.list();

    res.json({
      code: 200,
      message: "获取模型列表成功",
      data: models.data,
    });
  } catch (error: any) {
    console.error("获取模型列表错误:", error);
    res.status(500).json({
      code: 500,
      message: "获取模型列表失败",
      error: error.message || "未知错误",
    });
  }
};
