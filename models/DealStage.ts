import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

interface DealStageAttributes {
  id: number;
  businessId: number;
  name: string;
  order: number;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DealStageCreationAttributes extends Optional<DealStageAttributes, 'id'> {}

class DealStage extends Model<DealStageAttributes, DealStageCreationAttributes> 
  implements DealStageAttributes {
  public id!: number;
  public businessId!: number;
  public name!: string;
  public order!: number;
  public color?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DealStage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'businesses',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'deal_stages',
    timestamps: true,
    indexes: [
      {
        fields: ['businessId'],
      },
    ],
  }
);

export default DealStage;
