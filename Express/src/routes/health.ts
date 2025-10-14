import { Router, Request, Response } from 'express'
import { prismaHealthCheck } from '../services/prisma'
import { redisHealthCheck, getRedisInfo } from '../config/redis'
import { redisService } from '../services/redis'
import logger from '../utils/logger'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const start = Date.now()

  // 数据库健康检查
  const dbOk = await prismaHealthCheck()

  // Redis 健康检查
  const redisOk = await redisHealthCheck()

  // 整体健康状态
  const healthy = dbOk && redisOk
  const durationMs = Date.now() - start

  const payload = {
    status: healthy ? 'ok' : 'degraded',
    uptimeSec: Math.floor(process.uptime()),
    durationMs,
    checks: {
      app: true,
      db: dbOk,
      redis: redisOk
    }
  }

  res.status(healthy ? 200 : 503).json(payload)
})

/**
 * 详细的健康检查接口
 */
router.get('/detailed', async (_req: Request, res: Response) => {
  const start = Date.now()

  try {
    // 数据库检查
    const dbOk = await prismaHealthCheck()
    
    // Redis 检查
    const redisOk = await redisHealthCheck()
    const redisInfo = await getRedisInfo()
    
    // Redis 服务统计
    let redisStats = null
    if (redisOk) {
      try {
        const dbSize = await redisService.dbSize()
        redisStats = {
          dbSize,
          connected: true,
          ...redisInfo
        }
      } catch (error) {
        logger.error('获取 Redis 统计信息失败:', error)
        redisStats = { connected: false, error: error.message }
      }
    }

    // 内存使用情况
    const memoryUsage = process.memoryUsage()
    
    // CPU 使用情况
    const cpuUsage = process.cpuUsage()

    const healthy = dbOk && redisOk
    const durationMs = Date.now() - start

    const payload = {
      status: healthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptimeSec: Math.floor(process.uptime()),
      durationMs,
      checks: {
        app: {
          status: true,
          version: process.env.npm_package_version || '1.0.0',
          nodeVersion: process.version,
          environment: process.env.NODE_ENV || 'development'
        },
        database: {
          status: dbOk,
          type: 'PostgreSQL (Prisma)'
        },
        redis: {
          status: redisOk,
          stats: redisStats
        }
      },
      system: {
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system
        },
        platform: process.platform,
        arch: process.arch
      }
    }

    res.status(healthy ? 200 : 503).json(payload)
  } catch (error) {
    logger.error('详细健康检查失败:', error)
    res.status(500).json({
      status: 'error',
      message: '健康检查失败',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

/**
 * 存活检查（简单的 ping）
 */
router.get('/alive', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  })
})

/**
 * 就绪检查（检查所有依赖服务）
 */
router.get('/ready', async (_req: Request, res: Response) => {
  try {
    const dbOk = await prismaHealthCheck()
    const redisOk = await redisHealthCheck()
    
    const ready = dbOk && redisOk

    if (ready) {
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString(),
        services: {
          database: dbOk,
          redis: redisOk
        }
      })
    } else {
      res.status(503).json({
        status: 'not ready',
        timestamp: new Date().toISOString(),
        services: {
          database: dbOk,
          redis: redisOk
        }
      })
    }
  } catch (error) {
    logger.error('就绪检查失败:', error)
    res.status(503).json({
      status: 'not ready',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

export default router




