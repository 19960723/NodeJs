const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = sequelize => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50],
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [6, 255],
          notEmpty: true
        }
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'banned'),
        defaultValue: 'active'
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'users',
      hooks: {
        beforeCreate: async user => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async user => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    }
  );

  // 实例方法
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    delete values.deletedAt;
    return values;
  };

  // 类方法
  User.findByEmailOrUsername = async function (identifier) {
    return await this.findOne({
      where: {
        [sequelize.Sequelize.Op.or]: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });
  };

  // 关联关系
  User.associate = models => {
    // 与角色的多对多关系
    User.belongsToMany(models.Role, {
      through: 'UserRoles',
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'roles'
    });
  };

  return User;
};
