'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('businesses', 'plan', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'free',
      after: 'currency'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('businesses', 'plan');
  }
};
