'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { formatLocalDate } from '@/lib/helpers';

export default function BookingPage() {
  const params = useParams();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchBusiness();
    }
  }, [params.slug]);

  const fetchBusiness = async () => {
    try {
      const res = await fetch(`/api/business/${params.slug}`);
      if (res.ok) {
        const data = await res.json();
        setBusiness(data.business);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = () => {
    if (!selectedDate || !business) return [];
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const hours = business.workingHours?.find((h: any) => h.dayOfWeek === dayOfWeek);
    
    if (!hours || hours.isClosed) return [];
    
    const slots = [];
    const [startHour, startMin] = hours.openTime.split(':').map(Number);
    const [endHour, endMin] = hours.closeTime.split(':').map(Number);
    
    let current = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;
    const duration = selectedService?.duration || 60;
    
    while (current + duration <= end) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      current += 30;
    }
    
    return slots;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessSlug: params.slug,
          serviceId: selectedService.id,
          staffId: selectedStaff?.id,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          bookingDate: selectedDate,
          startTime: selectedTime,
          notes: customerInfo.notes,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!business) return <div className="min-h-screen flex items-center justify-center">Business not found</div>;

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="card max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            We've sent a confirmation to {customerInfo.email}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <div className="font-medium mb-2">{selectedService.name}</div>
            <div className="text-sm text-gray-600">{new Date(selectedDate).toLocaleDateString()} at {selectedTime}</div>
            <div className="text-sm text-gray-600">{business.location}</div>
            <div className="font-bold text-blue-600 mt-2">AED {selectedService.price}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
          <p className="text-gray-600">{business.location}</p>
        </div>

        <div className="card max-w-2xl mx-auto">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Choose a Service</h2>
              <div className="space-y-3">
                {business.services?.map((service: any) => (
                  <button
                    key={service.id}
                    onClick={() => { setSelectedService(service); setStep(2); }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.duration} minutes</div>
                      </div>
                      <div className="font-bold text-blue-600">AED {service.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    className="input"
                    min={formatLocalDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                {selectedDate && (
                  <div>
                    <label className="label">Available Times</label>
                    <div className="grid grid-cols-4 gap-2">
                      {getAvailableSlots().map((time) => (
                        <button
                          key={time}
                          onClick={() => { setSelectedTime(time); setStep(3); }}
                          className="p-2 border-2 border-gray-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setStep(1)} className="mt-6 btn-secondary">Back</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    className="input"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Notes (optional)</label>
                  <textarea
                    className="input"
                    rows={3}
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={submitting || !customerInfo.name || !customerInfo.email || !customerInfo.phone}
                  className="btn-primary flex-1"
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
