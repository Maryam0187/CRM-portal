import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

interface StaffAttributes {
  id: number;
  businessId: number;
  userId?: number;
  name: string;
  email?: string;
  phone?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaffCreationAttributes extends Optional<StaffAttributes, 'id'> {}

class Staff extends Model<StaffAttributes, StaffCreationAttributes> 
  implements StaffAttributes {
  public id!: number;
  public businessId!: number;
  public userId?: number;
  public name!: string;
  public email?: string;
  public phone?: string;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Staff.init(
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'staff',
    timestamps: true,
    indexes: [
      {
        fields: ['businessId'],
      },
    ],
  }
);

export default Staff;
