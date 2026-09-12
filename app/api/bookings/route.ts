import { NextRequest, NextResponse } from 'next/server';
import { Booking, Service, Business } from '@/models';
import { BookingStatus, PaymentStatus } from '@/models/Booking';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessSlug,
      serviceId,
      staffId,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      startTime,
      notes,
    } = body;

    if (!businessSlug || !serviceId || !customerName || !customerEmail || !customerPhone || !bookingDate || !startTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const business = await Business.findOne({ where: { slug: businessSlug } });
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const service = await Service.findByPk(serviceId);
    if (!service || service.businessId !== business.id) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Calculate end time
    const [hours, mins] = startTime.split(':').map(Number);
    const endMinutes = hours * 60 + mins + service.duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;

    const booking = await Booking.create({
      businessId: business.id,
      serviceId,
      staffId: staffId || null,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      startTime,
      endTime,
      status: BookingStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      price: service.price,
      currency: service.currency,
      notes: notes || null,
    });

    return NextResponse.json({
      message: 'Booking created successfully',
      booking,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}
