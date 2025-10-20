import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';

export interface RoleMenuAttributes {
  id?: number;
  role_id: number;
  menu_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoleMenuInstance
  extends Model<RoleMenuAttributes>,
    RoleMenuAttributes {}

/**
 * 角色菜单关联表
 * 实现角色和菜单的多对多关系
 */
export const RoleMenu = (sequelize: Sequelize): ModelCtor<RoleMenuInstance> => {
  const RoleMenuModel = sequelize.define<RoleMenuInstance>(
    'RoleMenu',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '菜单ID',
        references: {
          model: 'menus',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      tableName: 'role_menus',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '角色菜单关联表',
      indexes: [
        {
          unique: true,
          fields: ['role_id', 'menu_id'],
          name: 'uk_role_menu'
        },
        {
          fields: ['role_id'],
          name: 'idx_role_id'
        },
        {
          fields: ['menu_id'],
          name: 'idx_menu_id'
        }
      ]
    }
  );

  return RoleMenuModel;
};

export default RoleMenu;
