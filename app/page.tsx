'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">BookingSaaS</div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Log in
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Booking Page<br />in 5 Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Perfect for salons, cleaners, photographers, and local service businesses in Dubai.
            Accept bookings online, manage your schedule, get paid.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-4">
            Start Free →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Setup in Minutes</h3>
            <p className="text-gray-600">Answer 5 questions about your business and you're live</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Accept Bookings 24/7</h3>
            <p className="text-gray-600">Customers book anytime from your custom page</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
            <p className="text-gray-600">AED pricing, payment tracking built-in</p>
          </div>
        </div>

        <div className="card max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Perfect for:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Salons & Barbers</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Home Cleaning</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Car Detailing</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Massage & Spa</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Photography</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Tutoring & Classes</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-20 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 BookingSaaS. Built for Dubai businesses.</p>
        </div>
      </footer>
    </div>
  );
}
