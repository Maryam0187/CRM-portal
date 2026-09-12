import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/db';

interface OrganizationAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrganizationCreationAttributes extends Optional<OrganizationAttributes, 'id'> {}

class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes> 
  implements OrganizationAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Organization.init(
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
  },
  {
    sequelize,
    tableName: 'organizations',
    timestamps: true,
  }
);

export default Organization;
