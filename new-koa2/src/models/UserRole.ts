import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';

export interface UserRoleAttributes {
  id?: number;
  user_id: number;
  role_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserRoleInstance
  extends Model<UserRoleAttributes>,
    UserRoleAttributes {}

export const UserRole = (sequelize: Sequelize): ModelCtor<UserRoleInstance> => {
  const UserRoleModel = sequelize.define<UserRoleInstance>(
    'UserRole',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户ID',
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '角色ID',
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      tableName: 'user_roles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '用户角色关联表',
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'role_id']
        }
      ]
    }
  );

  return UserRoleModel;
};

export default UserRole;
