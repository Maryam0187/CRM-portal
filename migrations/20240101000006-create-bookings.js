'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
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
      serviceId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      staffId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'staff',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      customerName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      customerEmail: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      customerPhone: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bookingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.STRING(5),
        allowNull: false,
        comment: 'Format: HH:MM',
      },
      endTime: {
        type: Sequelize.STRING(5),
        allowNull: false,
        comment: 'Format: HH:MM',
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      paymentStatus: {
        type: Sequelize.ENUM('pending', 'paid', 'refunded'),
        allowNull: false,
        defaultValue: 'pending',
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'AED',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    await queryInterface.addIndex('bookings', ['businessId']);
    await queryInterface.addIndex('bookings', ['bookingDate']);
    await queryInterface.addIndex('bookings', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookings');
  },
};
