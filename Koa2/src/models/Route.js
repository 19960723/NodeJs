const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Route = sequelize.define(
    'Route',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: '路由名称'
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '路由路径'
      },
      component: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '组件路径'
      },
      redirect: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '重定向路径'
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '路由标题'
      },
      icon: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '图标'
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '父路由ID'
      },
      sort: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '排序'
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: '是否隐藏'
      },
      keepAlive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: '是否缓存'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        comment: '状态'
      },
      type: {
        type: DataTypes.ENUM('menu', 'button', 'api'),
        defaultValue: 'menu',
        comment: '类型：菜单、按钮、接口'
      },
      permission: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '权限标识'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '描述'
      }
    },
    {
      tableName: 'routes',
      timestamps: true,
      paranoid: true,
      comment: '路由表'
    }
  );

  // 定义关联关系
  Route.associate = models => {
    // 自关联：父子路由关系
    Route.belongsTo(Route, {
      as: 'parent',
      foreignKey: 'parentId'
    });
    Route.hasMany(Route, {
      as: 'children',
      foreignKey: 'parentId'
    });

    // 与角色的多对多关系
    Route.belongsToMany(models.Role, {
      through: 'RoleRoutes',
      foreignKey: 'routeId',
      otherKey: 'roleId',
      as: 'roles'
    });
  };

  // 实例方法
  Route.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  };

  // 静态方法：获取用户可访问的路由
  Route.getUserRoutes = async function (userId) {
    const { User, Role } = sequelize.models;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          include: [
            {
              model: Route,
              as: 'routes',
              where: { status: 'active' },
              required: false
            }
          ]
        }
      ]
    });

    if (!user) return [];

    // 收集所有路由
    const routes = new Set();
    user.roles.forEach(role => {
      role.routes.forEach(route => {
        routes.add(route);
      });
    });

    return Array.from(routes);
  };

  // 静态方法：构建路由树
  Route.buildTree = function (routes, parentId = null) {
    const tree = [];

    routes
      .filter(route => route.parentId === parentId)
      .sort((a, b) => a.sort - b.sort)
      .forEach(route => {
        const children = Route.buildTree(routes, route.id);
        if (children.length > 0) {
          route.children = children;
        }
        tree.push(route);
      });

    return tree;
  };

  return Route;
};
