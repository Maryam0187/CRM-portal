import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

export enum BusinessCategory {
  BARBER = 'barber',
  SALON = 'salon',
  NAILS = 'nails',
  MASSAGE = 'massage',
  SPA = 'spa',
  CLEANING = 'cleaning',
  CAR_DETAILING = 'car_detailing',
  AC_CLEANING = 'ac_cleaning',
  PEST_CONTROL = 'pest_control',
  HANDYMAN = 'handyman',
  PHOTOGRAPHER = 'photographer',
  TUTOR = 'tutor',
  YOGA = 'yoga',
  COOKING_CLASS = 'cooking_class',
  FOOD_TOUR = 'food_tour',
}

interface BusinessAttributes {
  id: number;
  name: string;
  slug: string;
  category: BusinessCategory;
  description?: string;
  location: string;
  phone?: string;
  email?: string;
  currency: string;
  plan: string;
  planStatus: string;
  planBillingCycle?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  enableBookings: boolean;
  enableSales: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BusinessCreationAttributes extends Optional<BusinessAttributes, 'id'> {}

class Business extends Model<BusinessAttributes, BusinessCreationAttributes> 
  implements BusinessAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;
  public category!: BusinessCategory;
  public description?: string;
  public location!: string;
  public phone?: string;
  public email?: string;
  public currency!: string;
  public plan!: string;
  public planStatus!: string;
  public planBillingCycle?: string;
  public stripeCustomerId?: string;
  public stripeSubscriptionId?: string;
  public enableBookings!: boolean;
  public enableSales!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(BusinessCategory)),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
    },
    plan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'free',
    },
    planStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'active',
    },
    planBillingCycle: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    stripeCustomerId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    enableBookings: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    enableSales: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'businesses',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['slug'],
      },
    ],
  }
);

export default Business;
