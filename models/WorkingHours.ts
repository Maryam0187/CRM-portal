import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

interface WorkingHoursAttributes {
  id: number;
  businessId: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WorkingHoursCreationAttributes extends Optional<WorkingHoursAttributes, 'id'> {}

class WorkingHours extends Model<WorkingHoursAttributes, WorkingHoursCreationAttributes> 
  implements WorkingHoursAttributes {
  public id!: number;
  public businessId!: number;
  public dayOfWeek!: number;
  public openTime!: string;
  public closeTime!: string;
  public isClosed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WorkingHours.init(
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
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '0=Sunday, 1=Monday, ..., 6=Saturday',
    },
    openTime: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: 'Format: HH:MM',
    },
    closeTime: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: 'Format: HH:MM',
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'working_hours',
    timestamps: true,
    indexes: [
      {
        fields: ['businessId', 'dayOfWeek'],
      },
    ],
  }
);

export default WorkingHours;
