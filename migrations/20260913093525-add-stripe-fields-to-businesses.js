'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('businesses', 'stripeCustomerId', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'planBillingCycle'
    });
    
    await queryInterface.addColumn('businesses', 'stripeSubscriptionId', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'stripeCustomerId'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('businesses', 'stripeCustomerId');
    await queryInterface.removeColumn('businesses', 'stripeSubscriptionId');
  }
};
