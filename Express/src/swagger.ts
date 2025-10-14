import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Y Express API 文档',
            version: '1.0.0',
            description: '基于 Express + Prisma + Redis 的后端服务 API 文档'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: ['./src/routes/*.ts'] // 👈 你的路由文件路径
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
