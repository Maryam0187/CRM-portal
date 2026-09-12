'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('working_hours', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      businessId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'businesses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dayOfWeek: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '0=Sunday, 1=Monday, ..., 6=Saturday',
      },
      openTime: {
        type: Sequelize.STRING(5),
        allowNull: false,
        comment: 'Format: HH:MM',
      },
      closeTime: {
        type: Sequelize.STRING(5),
        allowNull: false,
        comment: 'Format: HH:MM',
      },
      isClosed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('working_hours', ['businessId', 'dayOfWeek']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('working_hours');
  },
};
