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
            Run Your Business<br />in One Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            <strong>Bookings</strong> for service businesses + <strong>Sales CRM</strong> for pipeline management.
            Dubai-ready with AED pricing. One signup, two powerful modules.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-4">
            Start Free →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <div className="text-4xl mb-4">📅 Bookings Module</div>
            <h3 className="text-2xl font-semibold mb-3">For Service Businesses</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Public booking page in 5 minutes</li>
              <li>✓ Services, staff, working hours</li>
              <li>✓ Customer appointments with time slots</li>
              <li>✓ AED pricing for Dubai market</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">Perfect for: Salons, Cleaners, Photographers, Tutors</p>
          </div>
          <div className="card">
            <div className="text-4xl mb-4">💼 Sales CRM Module</div>
            <h3 className="text-2xl font-semibold mb-3">For Sales Teams</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Leads and contacts management</li>
              <li>✓ Pipeline with deal stages (kanban)</li>
              <li>✓ Tasks and follow-ups</li>
              <li>✓ Sales dashboard with metrics</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">Perfect for: B2B sales, agencies, consultants</p>
          </div>
        </div>

        <div className="card max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">One Platform, Two Modules, Endless Possibilities</h2>
          <p className="text-gray-700 mb-6">
            Use <strong>Bookings</strong> for your Dubai salon, <strong>Sales CRM</strong> for B2B deals, or <strong>both</strong> to run your entire business. Multi-tenant, secure, AED-ready.
          </p>
          <Link href="/signup" className="btn-primary text-lg">
            Start Free - Both Modules Included →
          </Link>
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
