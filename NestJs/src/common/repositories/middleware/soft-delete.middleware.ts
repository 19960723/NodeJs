/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
import { Prisma } from '@prisma/client';

/**
 * 软删除排除列表
 * 默认情况下，所有模型都被视为支持软删除（必须包含 deletedAt 字段）。
 * 如果某个模型不包含 deletedAt 字段（例如关联表），请将其添加到此列表中，
 * 否则执行 delete 操作时会报错。
 */
const ignoreSoftDeleteModels: string[] = [
  // 示例：不需要软删除的关联表或日志表
  // 'UserRole',
  // 'RolePermission',
];

export const SoftDeleteExtension = Prisma.defineExtension({
  name: 'soft-delete',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          model &&
          !ignoreSoftDeleteModels.includes(model) &&
          ['findFirst', 'findMany', 'count'].includes(operation)
        ) {
          const argsAny = args as any;
          argsAny.where = argsAny.where || {};
          // 如果显式指定了 deletedAt，则不干预
          if (argsAny.where.deletedAt === undefined) {
            argsAny.where.deletedAt = null;
          }
        }
        return query(args);
      },
    },
  },
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        args: Prisma.Args<M, 'delete'>,
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);
        const model = (context as any).$name;

        if (!ignoreSoftDeleteModels.includes(model)) {
          return (context as any).update({
            ...args,
            data: { deletedAt: new Date() },
          });
        }
        return (context as any).delete(args);
      },
      async deleteMany<M, A>(
        this: M,
        args: Prisma.Args<M, 'deleteMany'>,
      ): Promise<Prisma.Result<M, A, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);
        const model = (context as any).$name;

        if (!ignoreSoftDeleteModels.includes(model)) {
          // deleteMany 的 args 可能包含 data 吗？通常不包含。
          // updateMany 需要 data。
          const newArgs = { ...args } as any;
          return (context as any).updateMany({
            ...newArgs,
            data: { ...newArgs.data, deletedAt: new Date() },
          });
        }
        return (context as any).deleteMany(args);
      },
      async findUnique<M, A>(
        this: M,
        args: Prisma.Args<M, 'findUnique'>,
      ): Promise<Prisma.Result<M, A, 'findUnique'>> {
        const context = Prisma.getExtensionContext(this);
        const model = (context as any).$name;

        if (!ignoreSoftDeleteModels.includes(model)) {
          // findUnique 不支持非唯一字段过滤，必须转为 findFirst
          // 检查是否有显式 deletedAt
          const where = (args as any).where || {};
          if (where.deletedAt === undefined) {
            // 转换为 findFirst
            return (context as any).findFirst({
              ...args,
              where: { ...where, deletedAt: null },
            });
          }
        }
        return (context as any).findUnique(args);
      },
    },
  },
});
