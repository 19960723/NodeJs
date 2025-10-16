import {
  DataTypes,
  Model,
  Sequelize,
  ModelCtor,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin
} from 'sequelize';
import { UserInstance } from './User';

export interface RoleAttributes {
  id?: number;
  name: string;
  code: string;
  description?: string | null;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoleInstance extends Model<RoleAttributes>, RoleAttributes {
  // 关联方法
  getUsers?: BelongsToManyGetAssociationsMixin<UserInstance>;
  addUser?: BelongsToManyAddAssociationMixin<UserInstance, number>;
}

export const Role = (sequelize: Sequelize): ModelCtor<RoleInstance> => {
  const RoleModel = sequelize.define<RoleInstance>(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        comment: '角色名称'
      },
      code: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        comment: '角色代码'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '角色描述'
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '状态：1-启用，0-禁用'
      }
    },
    {
      tableName: 'roles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '角色表'
    }
  );

  return RoleModel;
};

export default Role;
