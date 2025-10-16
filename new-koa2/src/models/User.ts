import {
  DataTypes,
  Model,
  Sequelize,
  ModelCtor,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin
} from 'sequelize';
import { RoleInstance } from './Role';

export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  nickname?: string | null;
  avatar?: string | null;
  created_at?: Date;
  updated_at?: Date;
  lastLoginAt?: Date | null;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  // 关联方法
  getRoles?: BelongsToManyGetAssociationsMixin<RoleInstance>;
  addRole?: BelongsToManyAddAssociationMixin<RoleInstance, number>;
  setRoles?: BelongsToManySetAssociationsMixin<RoleInstance, number>;
}

const User = (sequelize: Sequelize): ModelCtor<UserInstance> => {
  const UserModel = sequelize.define<UserInstance>(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        comment: '用户名'
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '密码哈希'
      },
      nickname: {
        type: DataTypes.STRING(64),
        allowNull: true,
        comment: '昵称'
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '头像'
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '最后登录时间'
      }
    },
    {
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '用户表'
    }
  );

  return UserModel;
};

export { User };
export default User;
