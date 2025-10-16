import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';

interface MenusAttributes {
  id?: number;
  parent_id?: number | null;
  name: string;
  path: string;
  icon?: string | null;
  order?: number;
  status?: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

interface MenuInstance extends Model<MenusAttributes>, MenusAttributes {}

/**
 * 菜单模型
 */
const Menu = (sequelize: Sequelize): ModelCtor<MenuInstance> => {
  const MenuModel = sequelize.define<MenuInstance>(
    'Menu',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '父菜单ID'
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '菜单名称'
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '路由路径'
      },
      icon: {
        type: DataTypes.STRING(64),
        allowNull: true,
        comment: '图标'
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '排序'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        comment: '状态'
      }
    },
    {
      tableName: 'menus',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '菜单表'
    }
  );

  return MenuModel;
};

export { Menu, MenuInstance, MenusAttributes };
export default Menu;
