import { Context, Next } from 'koa';
import swaggerUi from 'swagger-ui-koa';
import swaggerSpec from '../config/swagger';

/**
 * Swagger UI 中间件
 */
export const swaggerUiMiddleware = swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    docExpansion: 'none',
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  },
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b4151; }
    .swagger-ui .info .description { color: #3b4151; }
    .swagger-ui .scheme-container { background: #f7f7f7; padding: 10px; border-radius: 4px; }
  `,
  customSiteTitle: 'Koa2 API 文档'
});

/**
 * Swagger JSON 端点中间件
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
 * Swagger 重定向中间件
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
