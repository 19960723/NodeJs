/**
 * Express 应用程序入口文件
 * 配置中间件、路由和错误处理
 */

// 核心依赖
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";

// 自定义模块
import { swaggerSpec } from "./swagger";
import errorHandler from "./middlewares/errorHandler";
import appRoutes from "./routes/app";
import userRoutes from "./routes/user";
import categoryRoutes from "./routes/category";
import deepseekRoutes from "./routes/deepseek";
import healthRoutes from "./routes/health";
import redisRoutes from "./routes/redis";
import logger from "./utils/logger";
import { initRedis } from "./config/redis";
import { rateLimiter, RateLimitPresets } from "./middlewares/rateLimiter";
import { cache, CachePresets } from "./middlewares/cache";

// 初始化环境变量
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

/**
 * 创建上传目录
 * 确保文件上传功能所需的目录存在
 */
const uploadDir = path.join(__dirname, "../uploads");
if (!require("fs").existsSync(uploadDir)) {
  require("fs").mkdirSync(uploadDir, { recursive: true });
}

/**
 * 速率限制配置
 * 防止API被滥用
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟窗口期
  max: 100, // 每个IP在窗口期内最多100个请求
});

// ===== 中间件配置 =====

// 请求体解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 安全相关
app.use(cors()); // 跨域资源共享
app.use(helmet()); // 安全头设置
app.use(compression()); // HTTP响应压缩
app.use(limiter); // 请求速率限制

// 日志记录
app.use(morgan("dev")); // HTTP请求日志

// 静态资源服务
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ===== API文档配置 =====
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ===== 路由配置 =====

// 应用相关路由（带缓存）
app.use("/api/apps", cache(CachePresets.MEDIUM).middleware(), appRoutes);

// 用户相关路由（带登录限流）
app.use("/api/user", rateLimiter("LOGIN", "ip").middleware(), userRoutes);

// 分类相关路由（带缓存）
app.use("/api/category", cache(CachePresets.LONG).middleware(), categoryRoutes);

// AI相关路由（带API限流）
app.use("/api/ai", rateLimiter("API", "user").middleware(), deepseekRoutes);

// 健康检查（不限流，不缓存）
app.use("/api/healthz", healthRoutes);

// Redis 管理路由（严格限流）
app.use("/api/redis", rateLimiter("STRICT", "user").middleware(), redisRoutes);

// ===== 错误处理 =====

// 全局错误处理中间件
app.use(errorHandler);

// 404错误处理
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "请求的资源不存在",
  });
});

/**
 * 服务器启动函数
 * 处理异步初始化操作
 */
const startServer = async () => {
  try {
    // 初始化 Redis 连接
    const redisConnected = await initRedis();
    if (redisConnected) {
      logger.info("Redis 连接成功");
    } else {
      logger.warn("Redis 连接失败，但服务器将继续启动");
    }

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      logger.info(
        `API Documentation available at http://localhost:${port}/api-docs`
      );
      logger.info(
        `Health check available at http://localhost:${port}/api/healthz`
      );
    });
  } catch (error) {
    logger.error("Server failed to start:", error);
    process.exit(1);
  }
};

// 启动服务器
startServer();
