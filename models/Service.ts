import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

interface ServiceAttributes {
  id: number;
  businessId: number;
  name: string;
  description?: string;
  duration: number;
  price: number;
  currency: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> 
  implements ServiceAttributes {
  public id!: number;
  public businessId!: number;
  public name!: string;
  public description?: string;
  public duration!: number;
  public price!: number;
  public currency!: string;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Duration in minutes',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'AED',
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'services',
    timestamps: true,
    indexes: [
      {
        fields: ['businessId'],
      },
    ],
  }
);

export default Service;
