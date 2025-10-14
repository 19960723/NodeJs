import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';

interface ExampleAttributes {
  id?: number;
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

interface ExampleInstance extends Model<ExampleAttributes>, ExampleAttributes {}

/**
 * 示例模型
 */
const Example = (sequelize: Sequelize): ModelCtor<ExampleInstance> => {
  const ExampleModel = sequelize.define<ExampleInstance>(
    'Example',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '名称'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '描述'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        comment: '状态'
      }
    },
    {
      tableName: 'examples',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      comment: '示例表'
    }
  );

  return ExampleModel;
};

export { Example, ExampleInstance, ExampleAttributes };
export default Example;
