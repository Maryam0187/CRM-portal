'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      slug: 'free',
      tagline: 'Start in one minute',
      price: { monthly: 0, annual: 0 },
      features: [
        '1 business website',
        'Up to 5 services',
        'Up to 50 bookings/month',
        'Basic My Business module',
        'Public booking page',
        'Email notifications',
        '1 team member',
        'Community support',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Growth',
      slug: 'growth',
      tagline: 'For growing businesses',
      price: { monthly: 29, annual: 290 },
      features: [
        'Everything in Free, plus:',
        'Unlimited services & bookings',
        'Up to 5 staff members',
        'Full Sales CRM included',
        'Lead & pipeline management',
        'Custom booking slug',
        'Currency selection',
        'Up to 5 team seats',
        'Priority email support',
        'Remove branding (optional)',
      ],
      cta: 'Start Growth Plan',
      highlighted: true,
    },
    {
      name: 'Business',
      slug: 'business',
      tagline: 'For teams & scale',
      price: { monthly: 99, annual: 990 },
      features: [
        'Everything in Growth, plus:',
        'Unlimited staff & team seats',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Priority phone & chat support',
        'Custom onboarding',
        'SLA guarantee',
        'White-label options',
      ],
      cta: 'Start Business Plan',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src="/technonaire-logo.svg" alt="Technonaire" className="h-9" />
              <img src="/businessos-wordmark-light.svg" alt="Business OS" className="h-10" />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-sm font-medium text-gray-900">
                Pricing
              </Link>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Start free. Upgrade as you grow. Cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              billingCycle === 'annual'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.slug}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.highlighted
                  ? 'border-blue-600 shadow-2xl shadow-blue-600/20'
                  : 'border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                  </span>
                  <span className="text-gray-600">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'annual' && plan.price.annual > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    ${(plan.price.annual / 12).toFixed(0)}/month billed annually
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">USD · All prices exclude taxes</p>
              </div>

              <Link
                href={`/signup?plan=${plan.slug}`}
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all mb-8 ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={feature.startsWith('Everything') ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sales CRM only? We've got you covered.
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            If you only need our Sales Management tools (no booking site),
            the <strong>Growth</strong> and <strong>Business</strong> plans include full CRM access.
            Select "Sales Management Only" during signup.
          </p>
          <Link
            href="/signup?plan=growth"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Start with Sales CRM
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <img src="/favicon.svg" alt="" className="w-6 h-6" />
                <span>
                  © 2026{' '}
                  <a
                    href="https://technonaire.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-blue-600 transition-colors"
                  >
                    Technonaire
                  </a>
                </span>
              </div>
              <span className="hidden md:inline">·</span>
              <span className="font-medium">Business OS</span>
              <span className="hidden md:inline">·</span>
              <a
                href="https://technonaire.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Visit Technonaire.com
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/pricing" className="hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/login" className="hover:text-gray-900">
                Login
              </Link>
              <Link href="/signup" className="hover:text-gray-900">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
