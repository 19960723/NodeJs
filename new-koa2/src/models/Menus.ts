import {
  DataTypes,
  Model,
  Sequelize,
  ModelCtor,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin
} from 'sequelize';
import { RoleInstance } from './Role';

interface MenusAttributes {
  id?: number;
  parent_id?: number | null;
  name: string;
  path: string;
  type?: 'M' | 'C' | 'A'; // [M=目录, C=菜单, A=按钮]
  perms?: string | null;
  component?: string | null;
  params?: string | null;
  isCache?: 0 | 1;
  isShow?: 0 | 1;
  icon?: string | null;
  order?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface MenuInstance extends Model<MenusAttributes>, MenusAttributes {
  // 与Role的关联方法
  getRoles?: BelongsToManyGetAssociationsMixin<RoleInstance>;
  addRole?: BelongsToManyAddAssociationMixin<RoleInstance, number>;
  setRoles?: BelongsToManySetAssociationsMixin<RoleInstance, number>;
  removeRole?: BelongsToManyAddAssociationMixin<RoleInstance, number>;
}

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
      // [M=目录, C=菜单, A=按钮]
      type: {
        type: DataTypes.ENUM('M', 'C', 'A'),
        defaultValue: 'M',
        comment: '菜单类型'
      },
      perms: {
        type: DataTypes.STRING(128),
        allowNull: true,
        comment: '权限标识'
      },
      component: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '前端组件'
      },
      params: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '路由参数'
      },
      isCache: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: '是否缓存 [0=否, 1=是]'
      },
      isShow: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: '是否显示 [0=否, 1=是]'
      },
      icon: {
        type: DataTypes.STRING(64),
        allowNull: true,
        comment: '图标'
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '排序'
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: '状态 [0=否, 1=是]'
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
