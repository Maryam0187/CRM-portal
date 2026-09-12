'use client';

import Link from 'next/link';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';
import AnimatedSection from '@/components/AnimatedSection';
import ParallaxHero from '@/components/ParallaxHero';

export const dynamic = 'force-dynamic';

function HomePageContent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">
              BusinessOS
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
              <Link 
                href="/login" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-white/20"
              >
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <ParallaxHero />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <AnimatedSection delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 mb-8 shadow-sm transition-colors duration-300">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Trusted by growing teams worldwide
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1] transition-colors duration-300">
                Start your business
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  in one minute
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl transition-colors duration-300">
                Everything you need to go live: a beautiful website to take orders, 
                powerful sales tools to close deals. Choose one or use both.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/signup" 
                  className="group px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-gray-900/25 dark:hover:shadow-white/25 inline-flex items-center justify-center"
                >
                  Get started free
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href="/login" 
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  View demo
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Setup in 60 seconds
                </div>
              </div>
            </AnimatedSection>

            {/* Hero Visual - Product UI Mock */}
            <AnimatedSection delay={300}>
              <div className="relative group">
                <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
                  {/* Mock Booking Page */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full" />
                      <div>
                        <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 hover:shadow-md">
                          <div className="h-3 w-20 bg-gray-300 dark:bg-gray-500 rounded mb-2" />
                          <div className="h-2 w-16 bg-gray-200 dark:bg-gray-600 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock Sales Board */}
                  <div className="p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
                    <div className="flex gap-3 mb-4">
                      <div className="h-8 w-20 bg-blue-100 dark:bg-blue-900/50 rounded" />
                      <div className="h-8 w-20 bg-purple-100 dark:bg-purple-900/50 rounded" />
                      <div className="h-8 w-20 bg-green-100 dark:bg-green-900/50 rounded" />
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105">
                          <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-600 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 dark:bg-blue-400 rounded-full opacity-20 blur-2xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 dark:bg-purple-400 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <AnimatedSection>
        <section className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10K+', label: 'Businesses launched' },
                { value: '150K+', label: 'Bookings processed' },
                { value: '$5M+', label: 'Revenue tracked' },
                { value: '99.9%', label: 'Uptime SLA' }
              ].map((stat, i) => (
                <div key={i} className="group hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Two Product Paths */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-300">
              Two powerful products.<br />One platform.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Use them separately or together. Everything works seamlessly.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: '🌐',
                title: 'Website & Orders',
                desc: 'Your business online in 60 seconds. Accept bookings, appointments, or orders from a beautiful custom page.',
                features: [
                  'Live booking page with your branding',
                  'Service catalog with pricing',
                  'Automatic scheduling & calendar sync',
                  'Customer notifications & reminders',
                  'Payment tracking & invoicing'
                ],
                tag: 'Salons • Studios • Consultants • Home Services • Tutors',
                gradient: 'from-blue-600 to-blue-400',
                hover: 'group-hover:from-blue-50 group-hover:to-transparent dark:group-hover:from-blue-950/30'
              },
              {
                icon: '💼',
                title: 'Sales Management',
                desc: 'Complete CRM to track every deal. Use standalone or connect with your booking site.',
                features: [
                  'Visual pipeline with drag-and-drop',
                  'Lead capture & qualification',
                  'Contact & company management',
                  'Task automation & reminders',
                  'Revenue forecasting & analytics'
                ],
                tag: 'B2B Sales • Agencies • Consultancies • Professional Services',
                gradient: 'from-purple-600 to-purple-400',
                hover: 'group-hover:from-purple-50 group-hover:to-transparent dark:group-hover:from-purple-950/30'
              }
            ].map((product, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:scale-[1.02]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.hover} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {product.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-colors">
                      {product.desc}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                          <svg className={`w-5 h-5 ${i === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'} mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-medium transition-colors">
                      PERFECT FOR: {product.tag}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Combined offer */}
          <AnimatedSection delay={200}>
            <div className="mt-8 p-8 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl text-white text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="text-3xl mb-3 animate-pulse">⚡</div>
              <h4 className="text-2xl font-bold mb-3">Use both together</h4>
              <p className="text-gray-300 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                Run your customer bookings <strong>and</strong> manage B2B pipeline 
                in one place. Perfect for businesses that do both.
              </p>
              <Link 
                href="/signup" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                Start with both modules
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <AnimatedSection>
        <section className="py-24 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-6 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                60 seconds to launch
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
                Three steps. One minute.
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                No technical knowledge required. No credit card needed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: '1', title: 'Sign up', description: 'Create your account and tell us what you do. Takes 20 seconds.', icon: '✨', time: '20s' },
                { step: '2', title: 'Choose modules', description: 'Pick Website & Orders, Sales Management, or both. Your choice.', icon: '🎯', time: '10s' },
                { step: '3', title: "You're live", description: 'Start taking orders or managing deals immediately. No setup required.', icon: '🚀', time: '30s' }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="relative group">
                    {i < 2 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent transition-colors" />
                    )}
                    <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed transition-colors">{item.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {item.time}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
              Everything you need.<br />Nothing you don't.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              Built for real businesses, not enterprise bureaucracy.
            </p>
          </AnimatedSection>

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
              <AnimatedSection key={i} delay={i * 50}>
                <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <AnimatedSection>
        <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
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
                className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-2xl hover:shadow-white/20 hover:scale-110 inline-flex items-center justify-center"
              >
                Get started free
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/login" 
                className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 inline-flex items-center justify-center hover:scale-105"
              >
                View demo
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              {['Free forever', 'No setup fees', 'Cancel anytime'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              © 2026 BusinessOS. Built for entrepreneurs.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/login" className="hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110">Login</Link>
              <Link href="/signup" className="hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110">Sign up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <ThemeProvider>
      <HomePageContent />
    </ThemeProvider>
  );
}
