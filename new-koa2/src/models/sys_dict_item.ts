import { DataTypes, Sequelize } from 'sequelize';

const SysDictItem = (sequelize: Sequelize) => {
  return sequelize.define(
    'SysDictItem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dict_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '字典ID'
      },
      label: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '字典项标签'
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '字典项值'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '字典项描述'
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '状态：1-启用，0-禁用'
      }
    },
    {
      tableName: 'sys_dict_item',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '字典项表'
    }
  );
};

export { SysDictItem };
export default SysDictItem;
