import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              BusinessOS
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/login" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20"
              >
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 mb-8 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Trusted by growing teams worldwide
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                Start your business
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  in one minute
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Everything you need to go live: a beautiful website to take orders, 
                powerful sales tools to close deals. Choose one or use both.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/signup" 
                  className="group px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-900/25 hover:scale-105 inline-flex items-center justify-center"
                >
                  Get started free
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href="/login" 
                  className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all inline-flex items-center justify-center"
                >
                  View demo
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Setup in 60 seconds
                </div>
              </div>
            </div>

            {/* Hero Visual - Product UI Mock */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Mock Booking Page */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full" />
                    <div>
                      <div className="h-3 w-32 bg-gray-300 rounded" />
                      <div className="h-2 w-24 bg-gray-200 rounded mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="h-3 w-20 bg-gray-300 rounded mb-2" />
                        <div className="h-2 w-16 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mock Sales Board */}
                <div className="p-6 bg-white">
                  <div className="flex gap-3 mb-4">
                    <div className="h-8 w-20 bg-blue-100 rounded" />
                    <div className="h-8 w-20 bg-purple-100 rounded" />
                    <div className="h-8 w-20 bg-green-100 rounded" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="h-3 w-full bg-gray-300 rounded mb-2" />
                        <div className="h-2 w-3/4 bg-gray-200 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Businesses launched</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">150K+</div>
              <div className="text-sm text-gray-600">Bookings processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$5M+</div>
              <div className="text-sm text-gray-600">Revenue tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Product Paths */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Two powerful products.<br />One platform.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use them separately or together. Everything works seamlessly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Website & Orders */}
            <div className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                  🌐
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Website & Orders
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your business online in 60 seconds. Accept bookings, appointments, 
                  or orders from a beautiful custom page.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Live booking page with your branding',
                    'Service catalog with pricing',
                    'Automatic scheduling & calendar sync',
                    'Customer notifications & reminders',
                    'Payment tracking & invoicing'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500 font-medium">
                  PERFECT FOR: Salons • Studios • Consultants • Home Services • Tutors
                </div>
              </div>
            </div>

            {/* Sales Management */}
            <div className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-purple-200 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                  💼
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Sales Management
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Complete CRM to track every deal. Use standalone or connect 
                  with your booking site.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Visual pipeline with drag-and-drop',
                    'Lead capture & qualification',
                    'Contact & company management',
                    'Task automation & reminders',
                    'Revenue forecasting & analytics'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500 font-medium">
                  PERFECT FOR: B2B Sales • Agencies • Consultancies • Professional Services
                </div>
              </div>
            </div>
          </div>

          {/* Combined offer */}
          <div className="mt-8 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="text-2xl font-bold mb-3">Use both together</h4>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Run your customer bookings <strong>and</strong> manage B2B pipeline 
              in one place. Perfect for businesses that do both.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all hover:shadow-xl"
            >
              Start with both modules
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              60 seconds to launch
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Three steps. One minute.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No technical knowledge required. No credit card needed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Sign up',
                description: 'Create your account and tell us what you do. Takes 20 seconds.',
                icon: '✨',
                time: '20s'
              },
              {
                step: '2',
                title: 'Choose modules',
                description: 'Pick Website & Orders, Sales Management, or both. Your choice.',
                icon: '🎯',
                time: '10s'
              },
              {
                step: '3',
                title: "You're live",
                description: 'Start taking orders or managing deals immediately. No setup required.',
                icon: '🚀',
                time: '30s'
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
                )}
                <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Everything you need.<br />Nothing you don't.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for real businesses, not enterprise bureaucracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: 'Instant setup', desc: 'Live in 60 seconds. No developers needed.' },
              { icon: '🔒', title: 'Secure & private', desc: 'Bank-level encryption. Your data stays yours.' },
              { icon: '🌍', title: 'Global ready', desc: 'Multi-currency. Works anywhere.' },
              { icon: '📱', title: 'Mobile first', desc: 'Manage from anywhere. Customers too.' },
              { icon: '👥', title: 'Team collaboration', desc: 'Invite teammates. Assign roles.' },
              { icon: '📊', title: 'Real-time insights', desc: 'See everything at a glance.' },
              { icon: '💳', title: 'Payment tracking', desc: 'Invoices and payment status built-in.' },
              { icon: '🔔', title: 'Smart notifications', desc: 'Stay updated. Never miss a lead.' }
            ].map((feature, i) => (
              <div key={i} className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-gray-300 transition-all">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Ready to start your business?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join thousands of entrepreneurs who launched with BusinessOS.
            No credit card required. Cancel anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/signup" 
              className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:shadow-2xl hover:shadow-white/20 hover:scale-105 inline-flex items-center justify-center"
            >
              Get started free
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all inline-flex items-center justify-center"
            >
              View demo
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2026 BusinessOS. Built for entrepreneurs.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/login" className="hover:text-gray-900 transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-gray-900 transition-colors">Sign up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
