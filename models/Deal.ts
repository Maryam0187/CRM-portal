import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

interface DealAttributes {
  id: number;
  organizationId: number;
  stageId: number;
  ownerId?: number;
  contactId?: number;
  leadId?: number;
  name: string;
  value?: number;
  expectedCloseDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DealCreationAttributes extends Optional<DealAttributes, 'id'> {}

class Deal extends Model<DealAttributes, DealCreationAttributes> implements DealAttributes {
  public id!: number;
  public organizationId!: number;
  public stageId!: number;
  public ownerId?: number;
  public contactId?: number;
  public leadId?: number;
  public name!: string;
  public value?: number;
  public expectedCloseDate?: Date;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Deal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'id',
      },
    },
    stageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'deal_stages',
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    contactId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'contacts',
        key: 'id',
      },
    },
    leadId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'leads',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    expectedCloseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'deals',
    timestamps: true,
    indexes: [
      {
        fields: ['organizationId'],
      },
      {
        fields: ['stageId'],
      },
      {
        fields: ['ownerId'],
      },
    ],
  }
);

export default Deal;
