import { Sequelize } from 'sequelize';

let sequelize: Sequelize | null = null;

function getSequelizeInstance(): Sequelize {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME || 'crm_portal',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || 'password',
      {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
  }
  return sequelize;
}

export default getSequelizeInstance();
