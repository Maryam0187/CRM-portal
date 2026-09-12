import sequelize from '@/lib/db';
import Organization from './Organization';
import User from './User';
import Contact from './Contact';
import Lead from './Lead';
import DealStage from './DealStage';
import Deal from './Deal';
import Task from './Task';

// Define associations
Organization.hasMany(User, { foreignKey: 'organizationId', as: 'users' });
User.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

Organization.hasMany(Contact, { foreignKey: 'organizationId', as: 'contacts' });
Contact.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

Organization.hasMany(Lead, { foreignKey: 'organizationId', as: 'leads' });
Lead.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Lead.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Organization.hasMany(DealStage, { foreignKey: 'organizationId', as: 'dealStages' });
DealStage.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

Organization.hasMany(Deal, { foreignKey: 'organizationId', as: 'deals' });
Deal.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Deal.belongsTo(DealStage, { foreignKey: 'stageId', as: 'stage' });
Deal.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Deal.belongsTo(Contact, { foreignKey: 'contactId', as: 'contact' });
Deal.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });

Organization.hasMany(Task, { foreignKey: 'organizationId', as: 'tasks' });
Task.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
Task.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignedTo' });
Task.belongsTo(Lead, { foreignKey: 'leadId', as: 'lead' });
Task.belongsTo(Deal, { foreignKey: 'dealId', as: 'deal' });

export {
  sequelize,
  Organization,
  User,
  Contact,
  Lead,
  DealStage,
  Deal,
  Task,
};
