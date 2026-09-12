import sequelize from '@/lib/db';
import Business from './Business';
import User from './User';
import Service from './Service';
import Staff from './Staff';
import WorkingHours from './WorkingHours';
import Booking from './Booking';
import Lead from './Lead';
import Contact from './Contact';
import DealStage from './DealStage';
import Deal from './Deal';
import Task from './Task';

// Bookings Module associations
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

// Sales CRM Module associations
Business.hasMany(Lead, { foreignKey: 'businessId', as: 'leads' });
Lead.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });
Lead.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Business.hasMany(Contact, { foreignKey: 'businessId', as: 'contacts' });
Contact.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

Business.hasMany(DealStage, { foreignKey: 'businessId', as: 'dealStages' });
DealStage.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

Business.hasMany(Deal, { foreignKey: 'businessId', as: 'deals' });
Deal.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });
Deal.belongsTo(DealStage, { foreignKey: 'stageId', as: 'stage' });
Deal.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Deal.belongsTo(Contact, { foreignKey: 'contactId', as: 'contact' });
Deal.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });

Business.hasMany(Task, { foreignKey: 'businessId', as: 'tasks' });
Task.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });
Task.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignedTo' });
Task.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });
Task.belongsTo(Deal, { foreignKey: 'dealId', as: 'deal' });

export {
  sequelize,
  Business,
  User,
  Service,
  Staff,
  WorkingHours,
  Booking,
  Lead,
  Contact,
  DealStage,
  Deal,
  Task,
};
