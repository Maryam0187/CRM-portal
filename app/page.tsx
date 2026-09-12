import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-blue-600">BusinessOS</div>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
              Log in
            </Link>
            <Link href="/signup" className="btn-primary">
              Start Free
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Start Your Business<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              in One Minute
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Everything you need to launch and grow: a beautiful website to take orders,
            plus powerful sales tools to manage your pipeline. Choose one or use both.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-4 inline-block">
            Get Started Free →
          </Link>
          <p className="text-sm text-gray-500 mt-4">No credit card required • Set up in 60 seconds</p>
        </div>

        {/* Two Paths */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100 hover:border-blue-300 transition-all">
            <div className="text-5xl mb-4">🌐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Website & Orders
            </h2>
            <p className="text-gray-600 mb-6">
              Launch your business online instantly. Perfect for services, appointments,
              bookings, or simple product orders.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Your own business page live in 60 seconds</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Customers book appointments or place orders 24/7</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Manage services, schedules, and team members</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Accept payments and track revenue</span>
              </li>
            </ul>
            <div className="text-sm text-gray-500 italic">
              Great for: Salons, Consultants, Photographers, Home Services, Tutors, Studios, Repair Services
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100 hover:border-purple-300 transition-all">
            <div className="text-5xl mb-4">💼</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sales Management
            </h2>
            <p className="text-gray-600 mb-6">
              Manage your entire sales operation. Track leads, close deals, and hit your targets.
              No website required.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Capture and qualify leads automatically</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Visual pipeline to track every deal</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Tasks and follow-ups so nothing slips</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Dashboard with pipeline value and metrics</span>
              </li>
            </ul>
            <div className="text-sm text-gray-500 italic">
              Great for: B2B Sales, Agencies, Consultancies, Freelancers, Professional Services
            </div>
          </div>
        </div>

        {/* Or Use Both */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-12 text-center text-white mb-20">
          <div className="text-5xl mb-4">⚡</div>
          <h2 className="text-3xl font-bold mb-4">Or Use Both Together</h2>
          <p className="text-xl mb-6 text-blue-50">
            Accept orders from your website <strong>and</strong> manage B2B sales pipelines in one place.
            Perfect for businesses that do both direct-to-consumer and enterprise deals.
          </p>
          <p className="text-blue-100">
            Bookings automatically feed into your sales dashboard when both modules are enabled.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            From Zero to Live in Three Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up (20 seconds)</h3>
              <p className="text-gray-600">Create your account and tell us what you do</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Modules (10 seconds)</h3>
              <p className="text-gray-600">Website & Orders, Sales Management, or both</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You're Live (30 seconds)</h3>
              <p className="text-gray-600">Start taking orders or managing leads immediately</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Everything You Need. Nothing You Don't.
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Built for real businesses, not enterprise bureaucracy
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Setup</h4>
              <p className="text-sm text-gray-600">No technical knowledge required. Live in one minute.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-600">Your data is isolated and encrypted. Multi-tenant architecture.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-semibold text-gray-900 mb-2">Global Ready</h4>
              <p className="text-sm text-gray-600">Multi-currency support. Works anywhere in the world.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h4>
              <p className="text-sm text-gray-600">Manage everything from your phone. Customers too.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
              <p className="text-sm text-gray-600">Invite team members. Assign roles and permissions.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Dashboard</h4>
              <p className="text-sm text-gray-600">See bookings, sales, revenue at a glance.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">💳</div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Tracking</h4>
              <p className="text-sm text-gray-600">Track payments and invoices. Integrate with Stripe.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🔔</div>
              <h4 className="font-semibold text-gray-900 mb-2">Notifications</h4>
              <p className="text-sm text-gray-600">Get notified about new orders, leads, and updates.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using BusinessOS
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-4 inline-block">
            Get Started Free →
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Free forever for solo founders • No credit card • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2026 BusinessOS. Built for entrepreneurs, by entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
