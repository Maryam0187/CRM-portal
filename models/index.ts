import sequelize from '@/lib/db';
import Business from './Business';
import User from './User';
import Service from './Service';
import Staff from './Staff';
import WorkingHours from './WorkingHours';
import Booking from './Booking';

// Define associations
Business.hasMany(User, { foreignKey: 'businessId', as: 'users' });
User.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

Business.hasMany(Service, { foreignKey: 'businessId', as: 'services' });
Service.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

Business.hasMany(Staff, { foreignKey: 'businessId', as: 'staff' });
Staff.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });
Staff.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Business.hasMany(WorkingHours, { foreignKey: 'businessId', as: 'workingHours' });
WorkingHours.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

Business.hasMany(Booking, { foreignKey: 'businessId', as: 'bookings' });
Booking.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });
Booking.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Booking.belongsTo(Staff, { foreignKey: 'staffId', as: 'staff' });

export {
  sequelize,
  Business,
  User,
  Service,
  Staff,
  WorkingHours,
  Booking,
};
