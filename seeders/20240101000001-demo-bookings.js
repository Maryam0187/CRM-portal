'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create demo businesses
    const [salonId] = await queryInterface.bulkInsert('businesses', [
      {
        name: 'Elite Beauty Salon',
        slug: 'elite-beauty-salon',
        category: 'salon',
        description: 'Premium beauty salon in Dubai Marina offering haircuts, styling, and coloring',
        location: 'Dubai Marina',
        phone: '+971 50 123 4567',
        email: 'info@elitebeauty.ae',
        currency: 'AED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    const [cleanerId] = await queryInterface.bulkInsert('businesses', [
      {
        name: 'SparkleClean Home Services',
        slug: 'sparkleclean-home',
        category: 'cleaning',
        description: 'Professional home and office cleaning services across Dubai',
        location: 'Dubai',
        phone: '+971 50 765 4321',
        email: 'book@sparkleclean.ae',
        currency: 'AED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    const businessId1 = salonId || 1;
    const businessId2 = cleanerId || 2;

    // Create users (owners)
    await queryInterface.bulkInsert('users', [
      {
        businessId: businessId1,
        email: 'owner@elitebeauty.ae',
        password: hashedPassword,
        firstName: 'Sarah',
        lastName: 'Ahmed',
        role: 'owner',
        phone: '+971 50 123 4567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        email: 'owner@sparkleclean.ae',
        password: hashedPassword,
        firstName: 'Mohammed',
        lastName: 'Ali',
        role: 'owner',
        phone: '+971 50 765 4321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create services for salon
    await queryInterface.bulkInsert('services', [
      {
        businessId: businessId1,
        name: 'Haircut',
        description: 'Professional haircut and styling',
        duration: 45,
        price: 80.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Hair Coloring',
        description: 'Full hair coloring service',
        duration: 120,
        price: 250.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Manicure',
        description: 'Classic manicure',
        duration: 30,
        price: 60.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Pedicure',
        description: 'Relaxing pedicure',
        duration: 45,
        price: 80.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create services for cleaning
    await queryInterface.bulkInsert('services', [
      {
        businessId: businessId2,
        name: 'Basic Home Cleaning',
        description: 'Standard cleaning for apartments up to 2 bedrooms',
        duration: 120,
        price: 150.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        name: 'Deep Cleaning',
        description: 'Thorough deep cleaning service',
        duration: 180,
        price: 250.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        name: 'AC Cleaning',
        description: 'Air conditioning unit cleaning',
        duration: 60,
        price: 120.00,
        currency: 'AED',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create staff for salon
    await queryInterface.bulkInsert('staff', [
      {
        businessId: businessId1,
        userId: null,
        name: 'Maria',
        email: 'maria@elitebeauty.ae',
        phone: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        userId: null,
        name: 'Leila',
        email: 'leila@elitebeauty.ae',
        phone: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create staff for cleaning
    await queryInterface.bulkInsert('staff', [
      {
        businessId: businessId2,
        userId: null,
        name: 'Team A',
        email: null,
        phone: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        userId: null,
        name: 'Team B',
        email: null,
        phone: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create working hours for salon (closed Friday)
    const salonHours = [
      { day: 0, open: '10:00', close: '20:00', closed: false }, // Sunday
      { day: 1, open: '10:00', close: '20:00', closed: false }, // Monday
      { day: 2, open: '10:00', close: '20:00', closed: false }, // Tuesday
      { day: 3, open: '10:00', close: '20:00', closed: false }, // Wednesday
      { day: 4, open: '10:00', close: '20:00', closed: false }, // Thursday
      { day: 5, open: '00:00', close: '00:00', closed: true },  // Friday - CLOSED
      { day: 6, open: '10:00', close: '20:00', closed: false }, // Saturday
    ];

    await queryInterface.bulkInsert('working_hours', salonHours.map(h => ({
      businessId: businessId1,
      dayOfWeek: h.day,
      openTime: h.open,
      closeTime: h.close,
      isClosed: h.closed,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));

    // Create working hours for cleaning (7 days)
    const cleanerHours = [
      { day: 0, open: '08:00', close: '18:00', closed: false },
      { day: 1, open: '08:00', close: '18:00', closed: false },
      { day: 2, open: '08:00', close: '18:00', closed: false },
      { day: 3, open: '08:00', close: '18:00', closed: false },
      { day: 4, open: '08:00', close: '18:00', closed: false },
      { day: 5, open: '08:00', close: '18:00', closed: false },
      { day: 6, open: '08:00', close: '18:00', closed: false },
    ];

    await queryInterface.bulkInsert('working_hours', cleanerHours.map(h => ({
      businessId: businessId2,
      dayOfWeek: h.day,
      openTime: h.open,
      closeTime: h.close,
      isClosed: h.closed,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));

    // Create sample bookings
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    await queryInterface.bulkInsert('bookings', [
      {
        businessId: businessId1,
        serviceId: 1,
        staffId: 1,
        customerName: 'Fatima Hassan',
        customerEmail: 'fatima@example.com',
        customerPhone: '+971 50 111 2222',
        bookingDate: today.toISOString().split('T')[0],
        startTime: '14:00',
        endTime: '14:45',
        status: 'confirmed',
        paymentStatus: 'pending',
        price: 80.00,
        currency: 'AED',
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        serviceId: 2,
        staffId: 2,
        customerName: 'Aisha Al Maktoum',
        customerEmail: 'aisha@example.com',
        customerPhone: '+971 50 222 3333',
        bookingDate: tomorrow.toISOString().split('T')[0],
        startTime: '11:00',
        endTime: '13:00',
        status: 'confirmed',
        paymentStatus: 'pending',
        price: 250.00,
        currency: 'AED',
        notes: 'Blonde highlights please',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        serviceId: 5,
        staffId: 3,
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        customerPhone: '+971 50 333 4444',
        bookingDate: today.toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '12:00',
        status: 'confirmed',
        paymentStatus: 'pending',
        price: 150.00,
        currency: 'AED',
        notes: '2 bedroom apartment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

    // ===== SALES CRM MODULE DATA =====
    // Add deal stages for both businesses
    await queryInterface.bulkInsert('deal_stages', [
      {
        businessId: businessId1,
        name: 'New',
        order: 1,
        color: '#3B82F6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Qualified',
        order: 2,
        color: '#10B981',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Proposal',
        order: 3,
        color: '#F59E0B',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Won',
        order: 4,
        color: '#059669',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        name: 'Lost',
        order: 5,
        color: '#EF4444',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Add contacts for CRM
    await queryInterface.bulkInsert('contacts', [
      {
        businessId: businessId1,
        firstName: 'Luxury',
        lastName: 'Hotel Manager',
        email: 'manager@luxuryhotel.ae',
        phone: '+971 50 888 9999',
        company: 'Luxury Hotel Dubai',
        title: 'Operations Manager',
        notes: 'Corporate client for staff beauty services',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        firstName: 'Property',
        lastName: 'Manager',
        email: 'pm@dubaiproperties.ae',
        phone: '+971 50 777 8888',
        company: 'Dubai Properties',
        title: 'Property Manager',
        notes: 'Manages 50+ villas, recurring cleaning contracts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Add leads
    await queryInterface.bulkInsert('leads', [
      {
        businessId: businessId1,
        ownerId: 1,
        firstName: 'Sarah',
        lastName: 'Wedding',
        email: 'sarah@weddingplanner.ae',
        phone: '+971 50 555 6666',
        company: 'Perfect Weddings',
        title: 'Wedding Planner',
        status: 'qualified',
        source: 'Referral',
        notes: 'Needs salon services for 10 brides - bulk booking',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        ownerId: 2,
        firstName: 'Ahmed',
        lastName: 'Building',
        email: 'ahmed@construction.ae',
        phone: '+971 50 444 5555',
        company: 'Dubai Construction',
        title: 'Site Manager',
        status: 'contacted',
        source: 'Website',
        notes: 'Post-construction deep cleaning for new buildings',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Add deals
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    await queryInterface.bulkInsert('deals', [
      {
        businessId: businessId1,
        stageId: 2,
        ownerId: 1,
        contactId: 1,
        name: 'Luxury Hotel Monthly Contract',
        value: 5000.00,
        expectedCloseDate: futureDate,
        notes: 'Monthly beauty services for hotel spa staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        stageId: 3,
        ownerId: 2,
        contactId: 2,
        name: 'Dubai Properties Cleaning Contract',
        value: 15000.00,
        expectedCloseDate: futureDate,
        notes: '50 villas monthly cleaning - bulk contract',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Add tasks
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await queryInterface.bulkInsert('tasks', [
      {
        businessId: businessId1,
        assignedToId: 1,
        leadId: 1,
        title: 'Follow up with Wedding Planner',
        description: 'Send proposal for bulk bridal packages',
        status: 'todo',
        priority: 'high',
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId1,
        assignedToId: 1,
        dealId: 1,
        title: 'Prepare Hotel Contract',
        description: 'Draft monthly service agreement',
        status: 'in_progress',
        priority: 'high',
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        businessId: businessId2,
        assignedToId: 2,
        dealId: 2,
        title: 'Site visit Dubai Properties',
        description: 'Inspect villas and provide quote',
        status: 'todo',
        priority: 'medium',
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
