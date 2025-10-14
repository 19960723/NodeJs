const { Route, Role, User } = require('../models');
const logger = require('../utils/logger');
const {
  success,
  badRequest,
  notFound,
  conflict
} = require('../utils/response');

/**
 * 获取用户可访问的路由（动态路由）
 */
const getUserRoutes = async ctx => {
  try {
    const userId = ctx.state.user.id;

    // 获取用户的所有角色及其路由
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          where: { status: 'active' },
          required: false,
          include: [
            {
              model: Route,
              as: 'routes',
              where: {
                status: 'active',
                type: 'menu'
              },
              required: false
            }
          ]
        }
      ]
    });

    if (!user) {
      return notFound(ctx, '用户不存在');
    }

    // 收集所有路由
    const routeSet = new Set();
    user.roles.forEach(role => {
      role.routes.forEach(route => {
        routeSet.add(JSON.stringify(route.toJSON()));
      });
    });

    // 转换为数组并解析
    const routes = Array.from(routeSet).map(routeStr => JSON.parse(routeStr));

    // 构建路由树
    const routeTree = Route.buildTree(routes);

    success(ctx, routeTree, '获取用户路由成功');
  } catch (error) {
    logger.error('获取用户路由失败:', error);
    throw error;
  }
};

/**
 * 获取所有路由列表（管理员功能）
 */
const getRoutes = async ctx => {
  try {
    const { page = 1, pageSize = 10, name, status, type } = ctx.query;
    const offset = (page - 1) * pageSize;

    const whereClause = {};
    if (name) {
      whereClause.name = {
        [Route.sequelize.Sequelize.Op.like]: `%${name}%`
      };
    }
    if (status) {
      whereClause.status = status;
    }
    if (type) {
      whereClause.type = type;
    }

    const { count, rows } = await Route.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      order: [
        ['sort', 'ASC'],
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Route,
          as: 'parent',
          attributes: ['id', 'name', 'title']
        }
      ]
    });

    success(
      ctx,
      {
        list: rows.map(route => route.toJSON()),
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      },
      '获取路由列表成功'
    );
  } catch (error) {
    logger.error('获取路由列表失败:', error);
    throw error;
  }
};

/**
 * 获取路由树结构
 */
const getRouteTree = async ctx => {
  try {
    const routes = await Route.findAll({
      where: { status: 'active' },
      order: [
        ['sort', 'ASC'],
        ['createdAt', 'ASC']
      ]
    });

    const routeTree = Route.buildTree(routes.map(route => route.toJSON()));

    success(ctx, routeTree, '获取路由树成功');
  } catch (error) {
    logger.error('获取路由树失败:', error);
    throw error;
  }
};

/**
 * 创建路由
 */
const createRoute = async ctx => {
  try {
    const routeData = ctx.request.body;

    // 检查路由名称是否已存在
    const existingRoute = await Route.findOne({
      where: { name: routeData.name }
    });
    if (existingRoute) {
      return conflict(ctx, '路由名称已存在');
    }

    // 检查父路由是否存在
    if (routeData.parentId) {
      const parentRoute = await Route.findByPk(routeData.parentId);
      if (!parentRoute) {
        return badRequest(ctx, '父路由不存在');
      }
    }

    const route = await Route.create(routeData);

    logger.info(`创建路由: ${route.name}`);

    success(ctx, route.toJSON(), '创建路由成功');
  } catch (error) {
    logger.error('创建路由失败:', error);
    throw error;
  }
};

/**
 * 更新路由
 */
const updateRoute = async ctx => {
  try {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    const route = await Route.findByPk(id);
    if (!route) {
      return notFound(ctx, '路由不存在');
    }

    // 检查路由名称是否已存在（排除当前路由）
    if (updateData.name && updateData.name !== route.name) {
      const existingRoute = await Route.findOne({
        where: {
          name: updateData.name,
          id: { [Route.sequelize.Sequelize.Op.ne]: id }
        }
      });
      if (existingRoute) {
        return conflict(ctx, '路由名称已存在');
      }
    }

    // 检查父路由是否存在
    if (updateData.parentId && updateData.parentId !== route.parentId) {
      const parentRoute = await Route.findByPk(updateData.parentId);
      if (!parentRoute) {
        return badRequest(ctx, '父路由不存在');
      }

      // 防止循环引用
      if (updateData.parentId === id) {
        return badRequest(ctx, '不能将自己设为父路由');
      }
    }

    await route.update(updateData);

    logger.info(`更新路由: ${route.name}`);

    success(ctx, route.toJSON(), '更新路由成功');
  } catch (error) {
    logger.error('更新路由失败:', error);
    throw error;
  }
};

/**
 * 删除路由
 */
const deleteRoute = async ctx => {
  try {
    const { id } = ctx.params;

    const route = await Route.findByPk(id);
    if (!route) {
      return notFound(ctx, '路由不存在');
    }

    // 检查是否有子路由
    const childRoutes = await Route.findAll({
      where: { parentId: id }
    });
    if (childRoutes.length > 0) {
      return badRequest(ctx, '存在子路由，无法删除');
    }

    await route.destroy();

    logger.info(`删除路由: ${route.name}`);

    success(ctx, null, '删除路由成功');
  } catch (error) {
    logger.error('删除路由失败:', error);
    throw error;
  }
};

/**
 * 获取路由详情
 */
const getRouteById = async ctx => {
  try {
    const { id } = ctx.params;

    const route = await Route.findByPk(id, {
      include: [
        {
          model: Route,
          as: 'parent',
          attributes: ['id', 'name', 'title']
        },
        {
          model: Route,
          as: 'children',
          attributes: ['id', 'name', 'title']
        }
      ]
    });

    if (!route) {
      return notFound(ctx, '路由不存在');
    }

    success(ctx, route.toJSON(), '获取路由详情成功');
  } catch (error) {
    logger.error('获取路由详情失败:', error);
    throw error;
  }
};

module.exports = {
  getUserRoutes,
  getRoutes,
  getRouteTree,
  createRoute,
  updateRoute,
  deleteRoute,
  getRouteById
};
