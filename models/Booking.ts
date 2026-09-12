import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

interface BookingAttributes {
  id: number;
  businessId: number;
  serviceId: number;
  staffId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  price: number;
  currency: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> 
  implements BookingAttributes {
  public id!: number;
  public businessId!: number;
  public serviceId!: number;
  public staffId?: number;
  public customerName!: string;
  public customerEmail!: string;
  public customerPhone!: string;
  public bookingDate!: Date;
  public startTime!: string;
  public endTime!: string;
  public status!: BookingStatus;
  public paymentStatus!: PaymentStatus;
  public price!: number;
  public currency!: string;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
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
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    staffId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id',
      },
    },
    customerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: 'Format: HH:MM',
    },
    endTime: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: 'Format: HH:MM',
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BookingStatus)),
      allowNull: false,
      defaultValue: BookingStatus.PENDING,
    },
    paymentStatus: {
      type: DataTypes.ENUM(...Object.values(PaymentStatus)),
      allowNull: false,
      defaultValue: PaymentStatus.PENDING,
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
    indexes: [
      {
        fields: ['businessId'],
      },
      {
        fields: ['bookingDate'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

export default Booking;
