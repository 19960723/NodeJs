my-express-app/
├── app/
│   ├── controllers/       # 控制器：处理请求响应
│   ├── models/            # 数据模型：如 Mongoose 定义
│   ├── routes/            # 路由：统一收口
│   ├── services/          # 服务层：封装业务逻辑
│   ├── validators/        # 参数校验逻辑（如使用 Joi）
│   └── middlewares/       # 中间件（鉴权、异常、日志等）
├── config/
│   ├── index.js           # 配置入口：根据环境加载
│   └── default.js         # 默认配置（也可以有 dev.js, prod.js）
├── core/
│   ├── response.js        # 统一响应封装
│   └── error-handler.js   # 全局错误处理
├── logs/                  # 存储日志文件
├── public/                # 静态资源目录
├── .env                   # 环境变量配置
├── app.js                 # 应用启动入口
├── package.json
└── README.md
