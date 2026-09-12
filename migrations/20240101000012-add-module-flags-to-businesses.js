'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('businesses', 'enableBookings', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
    
    await queryInterface.addColumn('businesses', 'enableSales', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    // Update default currency to USD (global default)
    await queryInterface.changeColumn('businesses', 'currency', {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('businesses', 'enableBookings');
    await queryInterface.removeColumn('businesses', 'enableSales');
  },
};
