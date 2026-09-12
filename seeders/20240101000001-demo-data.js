'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create two demo businesses
    const businessId1 = await queryInterface.bulkInsert('businesses', [
      {
        name: 'Downtown Studio',
        slug: 'downtown-studio',
        category: 'salon',
        description: 'Modern beauty studio offering haircuts, styling, and wellness services',
        location: 'City Center',
        currency: 'USD',
        phone: '+1 555-0100',
        email: 'hello@downtownstudio.com',
        enableBookings: true,
        enableSales: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: ['id'] });

    const businessId2 = await queryInterface.bulkInsert('businesses', [
      {
        name: 'Premier Services',
        slug: 'premier-services',
        category: 'cleaning',
        description: 'Professional cleaning and maintenance for homes and offices',
        location: 'Metro Area',
        currency: 'USD',
        phone: '+1 555-0200',
        email: 'contact@premierservices.com',
        enableBookings: true,
        enableSales: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: ['id'] });

    // Create owner users
    await queryInterface.bulkInsert('users', [
      {
        businessId: businessId1,
        email: 'sarah@downtownstudio.com',
        password: hashedPassword,
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        email: 'john@premierservices.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Smith',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Services for Downtown Studio (salon)
    await queryInterface.bulkInsert('services', [
      { businessId: businessId1, name: 'Haircut & Style', duration: 45, price: 65.00, currency: 'USD', active: true, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId1, name: 'Hair Coloring', duration: 120, price: 150.00, currency: 'USD', active: true, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId1, name: 'Manicure', duration: 30, price: 35.00, currency: 'USD', active: true, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Services for Premier Services (cleaning)
    await queryInterface.bulkInsert('services', [
      { businessId: businessId2, name: 'House Cleaning', duration: 120, price: 120.00, currency: 'USD', active: true, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, name: 'Office Cleaning', duration: 180, price: 180.00, currency: 'USD', active: true, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, name: 'Deep Clean', duration: 240, price: 250.00, currency: 'USD', active: true, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Staff
    await queryInterface.bulkInsert('staff', [
      { businessId: businessId1, name: 'Any Stylist', userId: null, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, name: 'Team Member', userId: null, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Working hours (Mon-Sat)
    for (let day = 1; day <= 6; day++) {
      await queryInterface.bulkInsert('working_hours', [
        { businessId: businessId1, dayOfWeek: day, openTime: '09:00', closeTime: '19:00', isClosed: false, createdAt: new Date(), updatedAt: new Date() },
        { businessId: businessId2, dayOfWeek: day, openTime: '08:00', closeTime: '18:00', isClosed: false, createdAt: new Date(), updatedAt: new Date() },
      ]);
    }
    // Sunday closed
    await queryInterface.bulkInsert('working_hours', [
      { businessId: businessId1, dayOfWeek: 0, openTime: '09:00', closeTime: '19:00', isClosed: true, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, dayOfWeek: 0, openTime: '08:00', closeTime: '18:00', isClosed: true, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Sample bookings
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await queryInterface.bulkInsert('bookings', [
      {
        businessId: businessId1, serviceId: 1, staffId: 1, customerName: 'Emma Wilson', customerEmail: 'emma@example.com',
        bookingDate: tomorrow, startTime: '10:00', endTime: '10:45', status: 'confirmed', paymentStatus: 'pending',
        price: 65.00, currency: 'USD', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        businessId: businessId2, serviceId: 4, staffId: 2, customerName: 'Mike Davis', customerEmail: 'mike@example.com',
        bookingDate: tomorrow, startTime: '14:00', endTime: '16:00', status: 'confirmed', paymentStatus: 'pending',
        price: 120.00, currency: 'USD', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);

    // CRM: Deal stages
    await queryInterface.bulkInsert('deal_stages', [
      { businessId: businessId1, name: 'New', order: 1, color: '#3B82F6', createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId1, name: 'Qualified', order: 2, color: '#10B981', createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId1, name: 'Proposal', order: 3, color: '#F59E0B', createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId1, name: 'Won', order: 4, color: '#059669', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // CRM: Contacts
    await queryInterface.bulkInsert('contacts', [
      { businessId: businessId1, firstName: 'Corporate', lastName: 'Client', email: 'contact@bizcorp.com', company: 'BizCorp Inc', notes: 'Enterprise account', createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, firstName: 'Property', lastName: 'Manager', email: 'pm@realestate.com', company: 'Metro Properties', notes: 'Recurring contracts', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // CRM: Leads
    await queryInterface.bulkInsert('leads', [
      { businessId: businessId1, ownerId: 1, firstName: 'Alice', lastName: 'Brown', email: 'alice@event.com', company: 'Event Solutions', status: 'qualified', source: 'Referral', createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, ownerId: 2, firstName: 'Bob', lastName: 'Taylor', email: 'bob@facility.com', company: 'Facility Management Co', status: 'contacted', source: 'Website', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // CRM: Deals
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    await queryInterface.bulkInsert('deals', [
      { businessId: businessId1, stageId: 2, ownerId: 1, contactId: 1, name: 'BizCorp Monthly Contract', value: 5000.00, expectedCloseDate: futureDate, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, stageId: 3, ownerId: 2, contactId: 2, name: 'Metro Properties Cleaning Package', value: 12000.00, expectedCloseDate: futureDate, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // CRM: Tasks
    const tomorrow2 = new Date();
    tomorrow2.setDate(tomorrow2.getDate() + 1);
    await queryInterface.bulkInsert('tasks', [
      { businessId: businessId1, assignedToId: 1, dealId: 1, title: 'Prepare contract proposal', status: 'in_progress', priority: 'high', dueDate: tomorrow2, createdAt: new Date(), updatedAt: new Date() },
      { businessId: businessId2, assignedToId: 2, dealId: 2, title: 'Schedule site inspection', status: 'todo', priority: 'medium', dueDate: tomorrow2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
    await queryInterface.bulkDelete('deals', null, {});
    await queryInterface.bulkDelete('deal_stages', null, {});
    await queryInterface.bulkDelete('leads', null, {});
    await queryInterface.bulkDelete('contacts', null, {});
    await queryInterface.bulkDelete('bookings', null, {});
    await queryInterface.bulkDelete('working_hours', null, {});
    await queryInterface.bulkDelete('staff', null, {});
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('businesses', null, {});
  },
};
