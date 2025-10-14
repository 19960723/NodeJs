import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

/**
 * Swagger配置选项
 */
const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Koa2 API 文档',
    version: '1.0.0',
    description: '基于Koa2的企业级后端API接口文档',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '开发环境'
    },
    {
      url: 'https://api.example.com',
      description: '生产环境'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      // 通用响应结构
      ApiResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            description: '响应状态码'
          },
          message: {
            type: 'string',
            description: '响应消息'
          },
          data: {
            type: 'object',
            description: '响应数据'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: '响应时间戳'
          }
        }
      },
      // 分页响应结构
      PaginatedResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            example: 200
          },
          message: {
            type: 'string',
            example: '获取数据成功'
          },
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object'
                }
              },
              pagination: {
                type: 'object',
                properties: {
                  page: {
                    type: 'integer',
                    description: '当前页码'
                  },
                  pageSize: {
                    type: 'integer',
                    description: '每页数量'
                  },
                  total: {
                    type: 'integer',
                    description: '总记录数'
                  },
                  totalPages: {
                    type: 'integer',
                    description: '总页数'
                  }
                }
              }
            }
          }
        }
      },
      // 错误响应结构
      ErrorResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            description: '错误状态码'
          },
          message: {
            type: 'string',
            description: '错误消息'
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: '错误字段'
                },
                message: {
                  type: 'string',
                  description: '错误消息'
                },
                type: {
                  type: 'string',
                  description: '错误类型'
                }
              }
            }
          }
        }
      },
      // Example模型
      Example: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: '示例ID'
          },
          name: {
            type: 'string',
            description: '示例名称',
            example: '示例名称'
          },
          description: {
            type: 'string',
            description: '示例描述',
            example: '这是一个示例描述'
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive'],
            description: '示例状态',
            example: 'active'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: '创建时间'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: '更新时间'
          }
        }
      },
      // 创建Example请求
      CreateExampleRequest: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            description: '示例名称',
            example: '新示例'
          },
          description: {
            type: 'string',
            maxLength: 500,
            description: '示例描述',
            example: '这是一个新的示例描述'
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive'],
            default: 'active',
            description: '示例状态',
            example: 'active'
          }
        }
      },
      // 更新Example请求
      UpdateExampleRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            description: '示例名称',
            example: '更新的示例名称'
          },
          description: {
            type: 'string',
            maxLength: 500,
            description: '示例描述',
            example: '更新的示例描述'
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive'],
            description: '示例状态',
            example: 'inactive'
          }
        }
      },
      // 分页查询参数
      PaginationQuery: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            minimum: 1,
            default: 1,
            description: '页码',
            example: 1
          },
          pageSize: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10,
            description: '每页数量',
            example: 10
          },
          sortBy: {
            type: 'string',
            description: '排序字段',
            example: 'createdAt'
          },
          sortOrder: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            default: 'DESC',
            description: '排序方向',
            example: 'DESC'
          }
        }
      },
      // 健康检查响应
      HealthCheck: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['healthy', 'unhealthy'],
            description: '服务状态'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: '检查时间'
          },
          uptime: {
            type: 'number',
            description: '运行时间（秒）'
          },
          version: {
            type: 'string',
            description: '版本号'
          },
          environment: {
            type: 'string',
            description: '环境'
          }
        }
      },
      // 详细健康检查响应
      DetailedHealthCheck: {
        allOf: [
          {
            $ref: '#/components/schemas/HealthCheck'
          },
          {
            type: 'object',
            properties: {
              services: {
                type: 'object',
                properties: {
                  database: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        enum: ['healthy', 'unhealthy']
                      },
                      message: {
                        type: 'string'
                      },
                      error: {
                        type: 'string'
                      }
                    }
                  },
                  memory: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        enum: ['healthy', 'unhealthy']
                      },
                      usage: {
                        type: 'object',
                        properties: {
                          rss: {
                            type: 'string'
                          },
                          heapTotal: {
                            type: 'string'
                          },
                          heapUsed: {
                            type: 'string'
                          },
                          external: {
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  cpu: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        enum: ['healthy', 'unhealthy']
                      },
                      usage: {
                        type: 'object',
                        properties: {
                          user: {
                            type: 'number'
                          },
                          system: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  tags: [
    {
      name: 'Health',
      description: '健康检查相关接口'
    },
    {
      name: 'Examples',
      description: '示例数据管理接口'
    }
  ]
};

/**
 * Swagger JSDoc选项
 */
const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

/**
 * 生成Swagger规范
 */
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
