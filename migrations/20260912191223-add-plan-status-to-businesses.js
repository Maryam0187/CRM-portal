'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('businesses', 'planStatus', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'active',
      after: 'plan'
    });
    
    await queryInterface.addColumn('businesses', 'planBillingCycle', {
      type: Sequelize.STRING(20),
      allowNull: true,
      after: 'planStatus'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('businesses', 'planStatus');
    await queryInterface.removeColumn('businesses', 'planBillingCycle');
  }
};
