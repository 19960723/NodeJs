import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '分类接口文档',
            version: '1.0.0',
            description: '基于 Express + Prisma 的分类管理 API'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: ['./src/routes/*.ts'] // 👈 你的路由文件路径
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
