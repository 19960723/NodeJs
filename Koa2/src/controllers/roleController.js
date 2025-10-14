const { Role, Route, User } = require('../models');
const logger = require('../utils/logger');
const {
  success,
  badRequest,
  notFound,
  conflict
} = require('../utils/response');

/**
 * 获取角色列表
 */
const getRoles = async ctx => {
  try {
    const { page = 1, pageSize = 10, name, status } = ctx.query;
    const offset = (page - 1) * pageSize;

    const whereClause = {};
    if (name) {
      whereClause.name = {
        [Role.sequelize.Sequelize.Op.like]: `%${name}%`
      };
    }
    if (status) {
      whereClause.status = status;
    }

    const { count, rows } = await Role.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      order: [
        ['sort', 'ASC'],
        ['createdAt', 'DESC']
      ]
    });

    success(
      ctx,
      {
        list: rows.map(role => role.toJSON()),
        total: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      },
      '获取角色列表成功'
    );
  } catch (error) {
    logger.error('获取角色列表失败:', error);
    throw error;
  }
};

/**
 * 创建角色
 */
const createRole = async ctx => {
  try {
    const roleData = ctx.request.body;

    // 检查角色名称是否已存在
    const existingRole = await Role.findOne({
      where: {
        [Role.sequelize.Sequelize.Op.or]: [
          { name: roleData.name },
          { code: roleData.code }
        ]
      }
    });
    if (existingRole) {
      return conflict(ctx, '角色名称或编码已存在');
    }

    const role = await Role.create(roleData);

    logger.info(`创建角色: ${role.name}`);

    success(ctx, role.toJSON(), '创建角色成功');
  } catch (error) {
    logger.error('创建角色失败:', error);
    throw error;
  }
};

/**
 * 更新角色
 */
const updateRole = async ctx => {
  try {
    const { id } = ctx.params;
    const updateData = ctx.request.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return notFound(ctx, '角色不存在');
    }

    // 系统角色不允许修改
    if (role.isSystem) {
      return badRequest(ctx, '系统角色不允许修改');
    }

    // 检查角色名称或编码是否已存在（排除当前角色）
    if (updateData.name || updateData.code) {
      const whereClause = {
        id: { [Role.sequelize.Sequelize.Op.ne]: id }
      };

      const orConditions = [];
      if (updateData.name && updateData.name !== role.name) {
        orConditions.push({ name: updateData.name });
      }
      if (updateData.code && updateData.code !== role.code) {
        orConditions.push({ code: updateData.code });
      }

      if (orConditions.length > 0) {
        whereClause[Role.sequelize.Sequelize.Op.or] = orConditions;

        const existingRole = await Role.findOne({ where: whereClause });
        if (existingRole) {
          return conflict(ctx, '角色名称或编码已存在');
        }
      }
    }

    await role.update(updateData);

    logger.info(`更新角色: ${role.name}`);

    success(ctx, role.toJSON(), '更新角色成功');
  } catch (error) {
    logger.error('更新角色失败:', error);
    throw error;
  }
};

/**
 * 删除角色
 */
const deleteRole = async ctx => {
  try {
    const { id } = ctx.params;

    const role = await Role.findByPk(id);
    if (!role) {
      return notFound(ctx, '角色不存在');
    }

    // 系统角色不允许删除
    if (role.isSystem) {
      return badRequest(ctx, '系统角色不允许删除');
    }

    // 检查是否有用户使用该角色
    const userCount = await User.count({
      include: [
        {
          model: Role,
          as: 'roles',
          where: { id }
        }
      ]
    });

    if (userCount > 0) {
      return badRequest(ctx, '该角色下还有用户，无法删除');
    }

    await role.destroy();

    logger.info(`删除角色: ${role.name}`);

    success(ctx, null, '删除角色成功');
  } catch (error) {
    logger.error('删除角色失败:', error);
    throw error;
  }
};

/**
 * 获取角色详情
 */
const getRoleById = async ctx => {
  try {
    const { id } = ctx.params;

    const role = await Role.findByPk(id, {
      include: [
        {
          model: Route,
          as: 'routes',
          attributes: ['id', 'name', 'title', 'path']
        }
      ]
    });

    if (!role) {
      return notFound(ctx, '角色不存在');
    }

    success(ctx, role.toJSON(), '获取角色详情成功');
  } catch (error) {
    logger.error('获取角色详情失败:', error);
    throw error;
  }
};

/**
 * 分配路由权限给角色
 */
const assignRoutes = async ctx => {
  try {
    const { id } = ctx.params;
    const { routeIds } = ctx.request.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return notFound(ctx, '角色不存在');
    }

    // 验证路由是否存在
    if (routeIds && routeIds.length > 0) {
      const routes = await Route.findAll({
        where: { id: routeIds }
      });

      if (routes.length !== routeIds.length) {
        return badRequest(ctx, '部分路由不存在');
      }
    }

    // 更新角色路由关联
    await role.setRoutes(routeIds || []);

    logger.info(
      `角色 ${role.name} 分配路由权限: ${routeIds?.join(',') || '无'}`
    );

    success(ctx, null, '分配路由权限成功');
  } catch (error) {
    logger.error('分配路由权限失败:', error);
    throw error;
  }
};

/**
 * 获取所有角色（简化版本，用于下拉选择）
 */
const getAllRoles = async ctx => {
  try {
    const roles = await Role.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'code', 'description'],
      order: [
        ['sort', 'ASC'],
        ['name', 'ASC']
      ]
    });

    success(
      ctx,
      roles.map(role => role.toJSON()),
      '获取所有角色成功'
    );
  } catch (error) {
    logger.error('获取所有角色失败:', error);
    throw error;
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById,
  assignRoutes,
  getAllRoles
};
