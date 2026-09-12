'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import UnifiedNav from '@/components/layout/UnifiedNav';

interface BusinessBilling {
  id: number;
  name: string;
  plan: string;
  planStatus: string;
  planBillingCycle?: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
  plan: string;
}

const PLAN_DETAILS = {
  free: { name: 'Free', price: 0, features: ['1 business site', 'Up to 5 services', 'Up to 50 bookings/month', '1 team member'] },
  growth: { name: 'Growth', monthlyPrice: 29, annualPrice: 290, features: ['Unlimited services & bookings', 'Up to 5 staff', 'Full Sales CRM', 'Custom slug', 'Priority support'] },
  business: { name: 'Business', monthlyPrice: 99, annualPrice: 990, features: ['Unlimited everything', 'Advanced analytics', 'API access', 'Dedicated manager', 'SLA guarantee'] },
};

export default function BillingPage() {
  const [business, setBusiness] = useState<BusinessBilling | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock invoice history
  const invoices: Invoice[] = [
    { id: 'INV-2026-09-001', date: '2026-09-01', amount: 29, status: 'paid', plan: 'Growth' },
    { id: 'INV-2026-08-001', date: '2026-08-01', amount: 29, status: 'paid', plan: 'Growth' },
    { id: 'INV-2026-07-001', date: '2026-07-01', amount: 29, status: 'paid', plan: 'Growth' },
  ];

  useEffect(() => {
    fetchBillingInfo();
  }, []);

  const fetchBillingInfo = async () => {
    try {
      const res = await fetch('/api/business/settings');
      if (res.ok) {
        const data = await res.json();
        setBusiness(data.business);
      }
    } catch (err) {
      console.error('Failed to fetch billing info:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentPlan = business?.plan || 'free';
  const planDetails = PLAN_DETAILS[currentPlan as keyof typeof PLAN_DETAILS];

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">Manage your plan, payment method, and invoices</p>

        {loading ? (
          <div className="mt-8 text-center text-gray-600">Loading billing information...</div>
        ) : (
          <>
            {/* Current Plan */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Plan</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">{planDetails.name}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      business?.planStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {business?.planStatus || 'active'}
                    </span>
                  </div>
                  {currentPlan !== 'free' && (
                    <p className="text-gray-600 mt-2">
                      ${business?.planBillingCycle === 'annual' 
                        ? (planDetails as any).annualPrice + '/year'
                        : (planDetails as any).monthlyPrice + '/month'
                      }
                      {' '} · Billed {business?.planBillingCycle || 'monthly'}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  {currentPlan === 'free' && (
                    <Link
                      href="/checkout?plan=growth"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Upgrade Plan
                    </Link>
                  )}
                  {currentPlan === 'growth' && (
                    <>
                      <Link
                        href="/checkout?plan=business"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Upgrade to Business
                      </Link>
                    </>
                  )}
                  {currentPlan === 'business' && (
                    <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Manage Plan
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Plan Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {planDetails.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compare Plans */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Compare All Plans</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Plan</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Monthly</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Annual</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Best For</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className={currentPlan === 'free' ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 font-medium text-gray-900">Free</td>
                      <td className="px-6 py-4 text-gray-700">$0</td>
                      <td className="px-6 py-4 text-gray-700">$0</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Getting started</td>
                      <td className="px-6 py-4 text-right">
                        {currentPlan === 'free' ? (
                          <span className="text-blue-600 font-medium">Current</span>
                        ) : (
                          <button className="text-gray-600 font-medium hover:text-gray-900">Downgrade</button>
                        )}
                      </td>
                    </tr>
                    <tr className={currentPlan === 'growth' ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 font-medium text-gray-900">Growth</td>
                      <td className="px-6 py-4 text-gray-700">$29</td>
                      <td className="px-6 py-4 text-gray-700">$290 <span className="text-green-600 text-sm">(save 17%)</span></td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Growing businesses</td>
                      <td className="px-6 py-4 text-right">
                        {currentPlan === 'growth' ? (
                          <span className="text-blue-600 font-medium">Current</span>
                        ) : currentPlan === 'free' ? (
                          <Link href="/checkout?plan=growth" className="text-blue-600 font-medium hover:text-blue-700">
                            Upgrade
                          </Link>
                        ) : (
                          <button className="text-gray-600 font-medium hover:text-gray-900">Downgrade</button>
                        )}
                      </td>
                    </tr>
                    <tr className={currentPlan === 'business' ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 font-medium text-gray-900">Business</td>
                      <td className="px-6 py-4 text-gray-700">$99</td>
                      <td className="px-6 py-4 text-gray-700">$990 <span className="text-green-600 text-sm">(save 17%)</span></td>
                      <td className="px-6 py-4 text-gray-700 text-sm">Teams & scale</td>
                      <td className="px-6 py-4 text-right">
                        {currentPlan === 'business' ? (
                          <span className="text-blue-600 font-medium">Current</span>
                        ) : (
                          <Link href="/checkout?plan=business" className="text-blue-600 font-medium hover:text-blue-700">
                            Upgrade
                          </Link>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                💡 All prices in USD. Changes take effect immediately. Downgrades are prorated.
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Method</h2>
                  {currentPlan === 'free' ? (
                    <p className="text-gray-600">No payment method required for Free plan</p>
                  ) : (
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                        VISA
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                        <div className="text-sm text-gray-600">Expires 12/26 · Test card (demo)</div>
                      </div>
                    </div>
                  )}
                </div>
                {currentPlan !== 'free' && (
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-sm transition-colors">
                    Update Card
                  </button>
                )}
              </div>
            </div>

            {/* Invoice History */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice History</h2>
              {currentPlan === 'free' ? (
                <p className="text-gray-600">No invoices yet. Upgrade to a paid plan to see invoice history.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {new Date(invoice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{invoice.plan}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">${invoice.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Demo Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-yellow-800 text-sm">Demo Mode - Test Environment</div>
                  <div className="text-sm text-yellow-700 mt-1">
                    This is a payment flow mockup. No real charges occur. Ready for Stripe integration (STRIPE_SECRET_KEY).
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
