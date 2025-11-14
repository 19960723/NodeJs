import { DataTypes, Sequelize } from 'sequelize';

const SysDict = (sequelize: Sequelize) => {
  return sequelize.define(
    'SysDict',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '字典名称'
      },
      code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '字典编号'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '字典描述'
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '状态：1-启用，0-禁用'
      }
    },
    {
      tableName: 'sys_dict',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '字典表'
    }
  );
};

export { SysDict };
export default SysDict;
