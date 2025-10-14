const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 创建角色表
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: '角色名称'
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: '角色编码'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '角色描述'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        comment: '状态'
      },
      sort: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '排序'
      },
      isSystem: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: '是否系统角色'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    });

    // 创建路由表
    await queryInterface.createTable('routes', {
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
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    });

    // 创建用户角色关联表
    await queryInterface.createTable('UserRoles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // 创建角色路由关联表
    await queryInterface.createTable('RoleRoutes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      routeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'routes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // 添加索引
    await queryInterface.addIndex('UserRoles', ['userId', 'roleId'], {
      unique: true,
      name: 'user_role_unique'
    });

    await queryInterface.addIndex('RoleRoutes', ['roleId', 'routeId'], {
      unique: true,
      name: 'role_route_unique'
    });

    await queryInterface.addIndex('routes', ['parentId']);
    await queryInterface.addIndex('routes', ['status']);
    await queryInterface.addIndex('routes', ['type']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoleRoutes');
    await queryInterface.dropTable('UserRoles');
    await queryInterface.dropTable('routes');
    await queryInterface.dropTable('roles');
  }
};
