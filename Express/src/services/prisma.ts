import { PrismaClient } from '../generated/prisma'

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined
}

const prismaClient = global.__prisma__ || new PrismaClient()
if (process.env.NODE_ENV !== 'production') {
  global.__prisma__ = prismaClient
}

export const prismaHealthCheck = async () => {
  try {
    await prismaClient.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

export default prismaClient