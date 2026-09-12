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
            <Link href="/" className="flex items-center gap-2 transition-colors">
              <img src="/businessos-logo.svg" alt="Business OS" className="h-8 dark:invert" />
            </Link>
            <a 
              href="https://technonaire.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              by Technonaire
            </a>
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

          {/* Sales-Only Option (Secondary but Prominent) */}
          <AnimatedSection delay={200}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl border-2 border-purple-300 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        💼
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        Need sales tools only?
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
                          OPTIONAL
                        </span>
                      </h4>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        If you don't need a booking site and only want our sales management tools 
                        <span className="font-semibold text-gray-900 dark:text-white"> (pipeline, leads, contacts, tasks)</span>, 
                        you can use <span className="font-bold text-purple-600 dark:text-purple-400">Sales Management standalone</span>.
                      </p>
                      <Link 
                        href="/signup" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Learn about sales-only mode
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
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

      {/* Testimonials - Placeholder Examples */}
      <AnimatedSection>
        <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
                Built for people like you
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors">
                Example stories from business owners (placeholder testimonials)
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "I launched my salon booking page in under a minute. Now I'm taking appointments 24/7 without lifting a finger.",
                  role: "Salon owner",
                  icon: "💇‍♀️"
                },
                {
                  quote: "My cleaning business was all phone calls and WhatsApp chaos. Now everything's organized and I've doubled my bookings.",
                  role: "Cleaning service owner",
                  icon: "🧹"
                },
                {
                  quote: "I teach yoga online. Setting this up was easier than creating a social media post, and now students can book directly.",
                  role: "Yoga instructor",
                  icon: "🧘"
                }
              ].map((testimonial, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">{testimonial.icon}</div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      — {testimonial.role}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                Placeholder testimonials for demonstration purposes
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Overcome Objections */}
      <AnimatedSection>
        <section className="py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors">
                You don't need a developer
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors">
                Seriously. If you can describe your business, you can launch it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  concern: "I'm not technical",
                  answer: "Perfect. We built this for you. Just tell us what you do—we handle the rest.",
                  icon: "💪"
                },
                {
                  concern: "I don't have time to set up software",
                  answer: "60 seconds. That's it. Faster than making coffee.",
                  icon: "⚡"
                },
                {
                  concern: "What if I need changes later?",
                  answer: "Change anything, anytime. Your services, prices, hours—it's all flexible.",
                  icon: "🔄"
                },
                {
                  concern: "Is this really free?",
                  answer: "Yes. Free to start. No credit card. No surprise charges. You only pay if you want advanced features later.",
                  icon: "💚"
                }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      "{item.concern}"
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link 
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-xl shadow-blue-600/25 hover:shadow-2xl shadow-blue-600/40"
              >
                Start your business now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Final CTA - Pep Talk */}
      <AnimatedSection>
        <section className="py-32 lg:py-40 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <ParallaxHero />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
              Your business is waiting.
              <br />
              Start it right now.
            </h2>
            <p className="text-2xl text-white/90 mb-6 font-medium">
              Every successful business had a first day.
            </p>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              You've got the idea. You've got the skills. All you need is a way to take orders and get paid. 
              That's exactly what <strong>My Business</strong> gives you—in 60 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/signup"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-lg hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-3xl"
              >
                Get started free
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-5 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-200"
              >
                See demo
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Live in 60 seconds</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <img src="/favicon.svg" alt="" className="w-6 h-6" />
                <span>© 2026 <a href="https://technonaire.com/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-blue-600 transition-colors">Technonaire</a></span>
              </div>
              <span className="hidden md:inline">·</span>
              <span className="font-medium">Business OS</span>
              <span className="hidden md:inline">·</span>
              <a href="https://technonaire.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                Visit Technonaire.com
              </a>
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
