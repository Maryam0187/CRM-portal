'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create demo organization
    const [orgId] = await queryInterface.bulkInsert('organizations', [
      {
        name: 'Acme Corporation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });

    const organizationId = orgId || 1;

    // Hash password for demo users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create demo users
    await queryInterface.bulkInsert('users', [
      {
        organizationId: organizationId,
        email: 'owner@acme.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Owner',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        email: 'sales@acme.com',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Sales',
        role: 'sales_rep',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        email: 'admin@acme.com',
        password: hashedPassword,
        firstName: 'Bob',
        lastName: 'Admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create deal stages
    await queryInterface.bulkInsert('deal_stages', [
      {
        organizationId: organizationId,
        name: 'New',
        order: 1,
        color: 'blue',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        name: 'Qualified',
        order: 2,
        color: 'yellow',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        name: 'Proposal',
        order: 3,
        color: 'purple',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        name: 'Negotiation',
        order: 4,
        color: 'orange',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        name: 'Won',
        order: 5,
        color: 'green',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        name: 'Lost',
        order: 6,
        color: 'red',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create contacts
    await queryInterface.bulkInsert('contacts', [
      {
        organizationId: organizationId,
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@techcorp.com',
        phone: '+1-555-0101',
        company: 'TechCorp Inc',
        title: 'CTO',
        notes: 'Key decision maker',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@innovate.io',
        phone: '+1-555-0102',
        company: 'Innovate Solutions',
        title: 'VP of Sales',
        notes: 'Very interested in our product',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        firstName: 'Carol',
        lastName: 'Williams',
        email: 'carol@startupxyz.com',
        phone: '+1-555-0103',
        company: 'Startup XYZ',
        title: 'CEO',
        notes: 'Fast growing startup',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create leads
    await queryInterface.bulkInsert('leads', [
      {
        organizationId: organizationId,
        ownerId: 2,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@enterprise.com',
        phone: '+1-555-0201',
        company: 'Enterprise Solutions',
        title: 'Director of IT',
        status: 'new',
        source: 'Website',
        notes: 'Filled out contact form',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        ownerId: 2,
        firstName: 'Emma',
        lastName: 'Davis',
        email: 'emma.davis@megacorp.com',
        phone: '+1-555-0202',
        company: 'MegaCorp',
        title: 'Procurement Manager',
        status: 'contacted',
        source: 'Referral',
        notes: 'Had initial call, very interested',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        ownerId: 2,
        firstName: 'Frank',
        lastName: 'Miller',
        email: 'frank@smallbiz.com',
        phone: '+1-555-0203',
        company: 'Small Business Co',
        title: 'Owner',
        status: 'qualified',
        source: 'Trade Show',
        notes: 'Ready to move forward',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create deals
    const futureDate1 = new Date();
    futureDate1.setDate(futureDate1.getDate() + 30);
    const futureDate2 = new Date();
    futureDate2.setDate(futureDate2.getDate() + 45);
    const futureDate3 = new Date();
    futureDate3.setDate(futureDate3.getDate() + 15);

    await queryInterface.bulkInsert('deals', [
      {
        organizationId: organizationId,
        stageId: 2,
        ownerId: 2,
        contactId: 1,
        name: 'TechCorp Implementation',
        value: 50000.00,
        expectedCloseDate: futureDate1,
        notes: 'Large enterprise deal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        stageId: 3,
        ownerId: 2,
        contactId: 2,
        name: 'Innovate Solutions Package',
        value: 25000.00,
        expectedCloseDate: futureDate2,
        notes: 'Mid-market opportunity',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        stageId: 4,
        ownerId: 2,
        contactId: 3,
        name: 'Startup XYZ Starter Plan',
        value: 10000.00,
        expectedCloseDate: futureDate3,
        notes: 'Small but fast-moving deal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        stageId: 1,
        ownerId: 2,
        leadId: 3,
        name: 'Small Business Co Deal',
        value: 15000.00,
        expectedCloseDate: futureDate1,
        notes: 'Converted from lead',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create tasks
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    await queryInterface.bulkInsert('tasks', [
      {
        organizationId: organizationId,
        assignedToId: 2,
        leadId: 1,
        title: 'Follow up with David Brown',
        description: 'Send product information and schedule demo',
        status: 'todo',
        priority: 'high',
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        assignedToId: 2,
        dealId: 1,
        title: 'Prepare TechCorp proposal',
        description: 'Create detailed proposal with pricing',
        status: 'in_progress',
        priority: 'high',
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        organizationId: organizationId,
        assignedToId: 2,
        dealId: 2,
        title: 'Schedule follow-up call',
        description: 'Discuss implementation timeline',
        status: 'todo',
        priority: 'medium',
        dueDate: nextWeek,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
    await queryInterface.bulkDelete('deals', null, {});
    await queryInterface.bulkDelete('leads', null, {});
    await queryInterface.bulkDelete('contacts', null, {});
    await queryInterface.bulkDelete('deal_stages', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('organizations', null, {});
  },
};
