import { Prisma } from '@prisma/client';

export const softDeleteExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'soft-delete',
    query: {
      $allModels: {
        async delete({ model, args, query }) {
          // 动态检测：检查模型是否有 deletedAt 字段
          // 注意：dmmf 是 Prisma Client 的内部属性，类型定义中可能未公开，需要断言
          const dmmf = (Prisma as any).dmmf;
          const hasDeletedAt = dmmf?.datamodel.models
            .find((m: any) => m.name === model)
            ?.fields.some((f: any) => f.name === 'deletedAt');

          if (hasDeletedAt) {
            return (client as any)[model].update({
              ...args,
              data: { deletedAt: new Date() },
            });
          }

          return query(args);
        },
        async deleteMany({ model, args, query }) {
          const dmmf = (Prisma as any).dmmf;
          const hasDeletedAt = dmmf?.datamodel.models
            .find((m: any) => m.name === model)
            ?.fields.some((f: any) => f.name === 'deletedAt');

          if (hasDeletedAt) {
            return (client as any)[model].updateMany({
              ...args,
              data: { deletedAt: new Date() },
            });
          }
          return query(args);
        },
        async findMany({ model, args, query }) {
          const dmmf = (Prisma as any).dmmf;
          const hasDeletedAt = dmmf?.datamodel.models
            .find((m: any) => m.name === model)
            ?.fields.some((f: any) => f.name === 'deletedAt');

          if (hasDeletedAt) {
            args.where = { deletedAt: null, ...args.where };
          }
          return query(args);
        },
        async findFirst({ model, args, query }) {
          const dmmf = (Prisma as any).dmmf;
          const hasDeletedAt = dmmf?.datamodel.models
            .find((m: any) => m.name === model)
            ?.fields.some((f: any) => f.name === 'deletedAt');

          if (hasDeletedAt) {
            args.where = { deletedAt: null, ...args.where };
          }
          return query(args);
        },
        async findUnique({ model, args, query }) {
          const dmmf = (Prisma as any).dmmf;
          const hasDeletedAt = dmmf?.datamodel.models
            .find((m: any) => m.name === model)
            ?.fields.some((f: any) => f.name === 'deletedAt');

          if (hasDeletedAt) {
            // findUnique 必须转为 findFirst 才能加额外的 where 条件
            return (client as any)[model].findFirst({
              where: { ...args.where, deletedAt: null },
            });
          }
          return query(args);
        },
      },
    },
  });
});
