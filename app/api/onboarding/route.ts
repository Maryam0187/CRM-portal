import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { Business, Service, Staff, WorkingHours } from '@/models';
import { generateSlug, CATEGORY_SERVICES } from '@/lib/helpers';

export const dynamic = 'force-dynamic';

async function handler(req: AuthenticatedRequest) {
  try {
    const body = await req.json();
    const { businessName, category, services, workingHours, staff, location } = body;

    if (!businessName || !category || !location) {
      return NextResponse.json(
        { error: 'Business name, category, and location are required' },
        { status: 400 }
      );
    }

    // Update business
    const business = await Business.findByPk(req.user!.businessId);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const slug = generateSlug(businessName);
    await business.update({
      name: businessName,
      slug: `${slug}-${business.id}`,
      category,
      location,
    });

    // Create services
    const serviceRecords = [];
    if (services && services.length > 0) {
      for (const svc of services) {
        const created = await Service.create({
          businessId: business.id,
          name: svc.name,
          description: svc.description || null,
          duration: svc.duration,
          price: svc.price,
          currency: 'AED',
          active: true,
        });
        serviceRecords.push(created);
      }
    } else {
      // Use default services for category
      const defaultServices = CATEGORY_SERVICES[category] || [];
      for (const svc of defaultServices.slice(0, 3)) {
        const created = await Service.create({
          businessId: business.id,
          name: svc.name,
          duration: svc.duration,
          price: svc.price,
          currency: 'AED',
          active: true,
        });
        serviceRecords.push(created);
      }
    }

    // Create staff
    if (staff && staff.length > 0) {
      for (const member of staff) {
        await Staff.create({
          businessId: business.id,
          name: member.name,
          email: member.email || null,
          phone: member.phone || null,
          active: true,
        });
      }
    } else {
      // Create default staff
      await Staff.create({
        businessId: business.id,
        name: 'Main Team',
        active: true,
      });
    }

    // Create working hours
    if (workingHours && workingHours.length > 0) {
      for (const hours of workingHours) {
        await WorkingHours.create({
          businessId: business.id,
          dayOfWeek: hours.dayOfWeek,
          openTime: hours.openTime,
          closeTime: hours.closeTime,
          isClosed: hours.isClosed || false,
        });
      }
    } else {
      // Default: Mon-Sat 9-18, closed Sunday
      const defaultHours = [
        { day: 0, open: '09:00', close: '18:00', closed: true },
        { day: 1, open: '09:00', close: '18:00', closed: false },
        { day: 2, open: '09:00', close: '18:00', closed: false },
        { day: 3, open: '09:00', close: '18:00', closed: false },
        { day: 4, open: '09:00', close: '18:00', closed: false },
        { day: 5, open: '09:00', close: '18:00', closed: false },
        { day: 6, open: '09:00', close: '18:00', closed: false },
      ];
      for (const hours of defaultHours) {
        await WorkingHours.create({
          businessId: business.id,
          dayOfWeek: hours.day,
          openTime: hours.open,
          closeTime: hours.close,
          isClosed: hours.closed,
        });
      }
    }

    return NextResponse.json({
      message: 'Onboarding complete',
      business: {
        id: business.id,
        name: business.name,
        slug: business.slug,
        category: business.category,
        location: business.location,
      },
      servicesCreated: serviceRecords.length,
    });
  } catch (error: any) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding', details: error.message },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
