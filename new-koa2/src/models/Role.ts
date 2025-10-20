import {
  DataTypes,
  Model,
  Sequelize,
  ModelCtor,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin as AddManyMixin
} from 'sequelize';
import { UserInstance } from './User';
import { MenuInstance } from './Menus';

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
  // 与User的关联方法
  getUsers?: BelongsToManyGetAssociationsMixin<UserInstance>;
  addUser?: BelongsToManyAddAssociationMixin<UserInstance, number>;
  setUsers?: BelongsToManySetAssociationsMixin<UserInstance, number>;

  // 与Menu的关联方法
  getMenus?: BelongsToManyGetAssociationsMixin<MenuInstance>;
  addMenu?: BelongsToManyAddAssociationMixin<MenuInstance, number>;
  addMenus?: AddManyMixin<MenuInstance, number>;
  setMenus?: BelongsToManySetAssociationsMixin<MenuInstance, number>;
  removeMenu?: BelongsToManyAddAssociationMixin<MenuInstance, number>;
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
