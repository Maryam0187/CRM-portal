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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full text-sm text-green-700 dark:text-green-300 mb-6 shadow-sm transition-colors duration-300">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                10,000+ businesses launched this month
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1] transition-colors duration-300">
                Your business can be
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  live in 60 seconds
                </span>
              </h1>
              
              <p className="text-2xl font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                No developer. No setup. Just describe what you do.
              </p>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-xl transition-colors duration-300">
                <strong className="text-gray-900 dark:text-white">My Business</strong> gives you a beautiful booking page, handles orders, and includes powerful sales tools. Everything you need to start, run, and grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/signup" 
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 inline-flex items-center justify-center"
                >
                  Get started free
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/login" 
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-medium rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  See a demo
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Free to start</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No credit card needed</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Live in 60 seconds</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Hero Visual - Success Chart */}
            <AnimatedSection delay={300}>
              <div className="relative group">
                <div className="relative z-10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] shadow-2xl border border-gray-200 dark:border-gray-700">
                  {/* Light theme chart */}
                  <img 
                    src="/success-chart.svg" 
                    alt="Revenue growth chart - Demo data showing business success" 
                    className="w-full h-auto dark:hidden transition-all duration-300"
                    loading="eager"
                    width={600}
                    height={400}
                  />
                  {/* Dark theme chart */}
                  <img 
                    src="/success-chart-dark.svg" 
                    alt="Revenue growth chart - Demo data showing business success" 
                    className="w-full h-auto hidden dark:block transition-all duration-300"
                    loading="eager"
                    width={600}
                    height={400}
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 dark:bg-green-400 rounded-full opacity-20 blur-2xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 dark:bg-blue-400 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <AnimatedSection>
        <section className="border-y border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-8 transition-colors">
              TRUSTED BY THOUSANDS OF BUSINESSES WORLDWIDE
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10K+', label: 'Businesses launched', color: 'text-blue-600 dark:text-blue-400' },
                { value: '150K+', label: 'Bookings processed', color: 'text-purple-600 dark:text-purple-400' },
                { value: '$5M+', label: 'Revenue tracked', color: 'text-green-600 dark:text-green-400' },
                { value: '99.9%', label: 'Uptime guarantee', color: 'text-pink-600 dark:text-pink-400' }
              ].map((stat, i) => (
                <div key={i} className="group hover:scale-110 transition-transform duration-300">
                  <div className={`text-4xl font-bold mb-1 transition-colors ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Product Overview */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-300">
              Everything you need to run your business
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Accept bookings and orders from your custom page, plus built-in sales tools to manage leads and close deals.
            </p>
          </AnimatedSection>

          {/* Main Product Card */}
          <AnimatedSection delay={100}>
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-10 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 hover:scale-[1.01] mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/30 opacity-50 rounded-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full mb-4">
                      MAIN PLATFORM
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                      My Business
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed transition-colors max-w-2xl">
                      Your business online in 60 seconds. Accept bookings, appointments, or orders from a beautiful custom page—with complete sales management built right in.
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    🌐
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900/50 rounded flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs">✓</span>
                      Customer-Facing
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Live booking page with your branding',
                        'Service catalog with pricing',
                        'Automatic scheduling & calendar sync',
                        'Customer notifications & reminders',
                        'Payment tracking & invoicing'
                      ].map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-purple-100 dark:bg-purple-900/50 rounded flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs">✓</span>
                      Built-In Sales Tools
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Visual sales pipeline & deal tracking',
                        'Lead capture & qualification',
                        'Contact & company management',
                        'Task automation & follow-up reminders',
                        'Revenue forecasting & analytics'
                      ].map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-500 font-medium mb-3">PERFECT FOR</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Salons • Studios • Consultants • Coaches • Home Services • Tutors • Photographers • Wellness • Local Businesses
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Sales-Only Option (Secondary) */}
          <AnimatedSection delay={200}>
            <div className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300">
              <div className="max-w-3xl mx-auto text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Need sales tools only?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you don't need a booking site and only want our sales management tools (pipeline, leads, contacts, tasks), 
                  you can use <span className="font-medium text-gray-900 dark:text-white">Sales Management standalone</span>.
                </p>
                <Link 
                  href="/signup" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Learn about sales-only mode
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
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
                { step: '1', title: 'Sign up', description: 'Create your account in seconds. No credit card required.', icon: '✨', time: '20s' },
                { step: '2', title: 'Set up your site', description: 'Tell us what you do and customize your booking page. Sales tools included automatically.', icon: '🎯', time: '20s' },
                { step: '3', title: "You're live", description: 'Share your link and start taking orders. Manage everything from your dashboard.', icon: '🚀', time: '20s' }
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
