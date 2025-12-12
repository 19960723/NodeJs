import { Prisma } from '@prisma/client';

export function SoftDeleteMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const softDeleteModels = [
      'User',
      'Role',
      'Permission',
      'Category',
      'Article',
      'Dict',
      'DictItem',
    ];

    if (params.model && softDeleteModels.includes(params.model)) {
      if (params.action === 'delete') {
        // Delete 变为 Update
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }
      if (params.action === 'deleteMany') {
        // DeleteMany 变为 UpdateMany
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }

      // 过滤已删除的数据
      if (['findUnique', 'findFirst', 'findMany'].includes(params.action)) {
        if (params.action === 'findUnique') {
          // findUnique 不能直接加非 unique 字段过滤，转为 findFirst
          params.action = 'findFirst';
        }
        if (!params.args) params.args = {};
        if (!params.args.where) params.args.where = {};

        // 如果显式指定了 deletedAt，则不干预（允许查询回收站）
        if (params.args.where.deletedAt === undefined) {
          params.args.where.deletedAt = null;
        }
      }
    }
    return next(params);
  };
}
