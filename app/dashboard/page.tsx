'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const bookingUrl = `${window.location.origin}/book/${data?.business?.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">{data?.business?.name}</h1>
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Booking Page</h2>
          <div className="card flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Share this link with customers:</div>
              <div className="font-mono text-blue-600">{bookingUrl}</div>
            </div>
            <Link href={`/book/${data?.business?.slug}`} target="_blank" className="btn-primary">
              View Page →
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-sm text-gray-600">Bookings Today</div>
            <div className="text-3xl font-bold text-blue-600">{data?.bookingsToday?.length || 0}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Upcoming Bookings</div>
            <div className="text-3xl font-bold text-green-600">{data?.upcomingBookings || 0}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Active Services</div>
            <div className="text-3xl font-bold text-purple-600">{data?.business?.services?.length || 0}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Today's Bookings</h3>
            <div className="space-y-3">
              {data?.bookingsToday?.length > 0 ? (
                data.bookingsToday.map((booking: any) => (
                  <div key={booking.id} className="card">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{booking.customerName}</div>
                        <div className="text-sm text-gray-600">{booking.service?.name}</div>
                        <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{booking.startTime}</div>
                        <div className="text-sm text-gray-600">AED {booking.price}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card text-center text-gray-600">No bookings today</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Your Services</h3>
            <div className="space-y-3">
              {data?.business?.services?.map((service: any) => (
                <div key={service.id} className="card flex justify-between items-center">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-600">{service.duration} minutes</div>
                  </div>
                  <div className="font-bold text-blue-600">AED {service.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
