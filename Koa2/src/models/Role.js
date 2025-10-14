const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Role = sequelize.define(
    'Role',
    {
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
      }
    },
    {
      tableName: 'roles',
      timestamps: true,
      paranoid: true,
      comment: '角色表'
    }
  );

  // 定义关联关系
  Role.associate = models => {
    // 与用户的多对多关系
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
      foreignKey: 'roleId',
      otherKey: 'userId',
      as: 'users'
    });

    // 与路由的多对多关系
    Role.belongsToMany(models.Route, {
      through: 'RoleRoutes',
      foreignKey: 'roleId',
      otherKey: 'routeId',
      as: 'routes'
    });
  };

  // 实例方法
  Role.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  };

  return Role;
};
