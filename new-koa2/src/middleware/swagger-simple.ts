import { Context, Next } from 'koa';
import swaggerSpec from '../config/swagger';

/**
 * 简单的Swagger JSON端点中间件
 */
export const swaggerJsonMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  if (ctx.path === '/api-docs.json') {
    ctx.type = 'application/json';
    ctx.body = swaggerSpec;
    return;
  }
  await next();
};

/**
 * Swagger重定向中间件
 */
export const swaggerRedirectMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  if (ctx.path === '/api-docs') {
    ctx.redirect('/api-docs/');
    return;
  }
  await next();
};

/**
 * 简单的Swagger UI HTML页面
 */
export const swaggerHtmlMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  if (ctx.path.startsWith('/api-docs/')) {
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Koa2 API 文档</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
    <style>
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { color: #3b4151; }
        .swagger-ui .info .description { color: #3b4151; }
        .swagger-ui .scheme-container { background: #f7f7f7; padding: 10px; border-radius: 4px; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js"></script>
    <script>
        window.onload = function() {
            SwaggerUIBundle({
                url: '/api-docs.json',
                dom_id: '#swagger-ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIBundle.presets.standalone
                ],
                layout: "StandaloneLayout",
                docExpansion: "none",
                defaultModelsExpandDepth: 2,
                defaultModelExpandDepth: 2,
                displayRequestDuration: true,
                filter: true,
                showExtensions: true,
                showCommonExtensions: true,
                tryItOutEnabled: true
            });
        };
    </script>
</body>
</html>`;

    ctx.type = 'text/html';
    ctx.body = html;
    return;
  }
  await next();
};
