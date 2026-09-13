'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const PLANS = {
  free: { name: 'Free', monthly: 0, annual: 0 },
  growth: { name: 'Growth', monthly: 29, annual: 290 },
  business: { name: 'Business', monthly: 99, annual: 990 },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const planParam = searchParams.get('plan') || 'growth';
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'growth' | 'business'>(
    planParam as 'free' | 'growth' | 'business'
  );
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const cycle = searchParams.get('cycle');
    if (cycle === 'annual') {
      setBillingCycle('annual');
    }
    
    // Check if user cancelled
    if (searchParams.get('cancelled') === 'true') {
      setError('Checkout was cancelled. You can try again when ready.');
    }
  }, [searchParams]);

  const plan = PLANS[selectedPlan];
  const price = billingCycle === 'monthly' ? plan.monthly : plan.annual;

  const handleCheckout = async () => {
    if (selectedPlan === 'free') {
      router.push('/signup?plan=free');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Call Stripe Checkout API
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          billingCycle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create checkout session');
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('No checkout URL received');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to start checkout');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <img src="/technonaire-logo.svg" alt="Technonaire" className="h-9" />
            <img src="/businessos-wordmark-light.svg" alt="Business OS" className="h-10" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Choose Your Plan</h1>
          <p className="text-gray-600 mt-2">Select a plan and proceed to secure Stripe checkout</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Plan Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Plan</h2>
              
              {/* Billing Toggle */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      billingCycle === 'annual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Annual
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Save 17%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plan Cards */}
              <div className="space-y-4">
                {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => {
                  const p = PLANS[key];
                  const isSelected = selectedPlan === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                            <p className="text-sm text-gray-600">
                              {key === 'free' && 'Perfect for getting started'}
                              {key === 'growth' && 'For growing businesses'}
                              {key === 'business' && 'For teams and scale'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">
                            ${billingCycle === 'monthly' ? p.monthly : p.annual}
                          </div>
                          <div className="text-sm text-gray-600">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="mt-6 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-4">
                  {error}
                </div>
              )}

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-blue-800 text-sm">Secure Stripe Checkout</div>
                    <div className="text-sm text-blue-700 mt-1">
                      {selectedPlan === 'free' 
                        ? 'Free plan requires no payment. Click below to get started.' 
                        : 'You\'ll be redirected to Stripe\'s secure checkout page to complete your purchase with test card 4242 4242 4242 4242.'}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : selectedPlan === 'free' ? (
                  'Get Started Free'
                ) : (
                  'Continue to Stripe Checkout'
                )}
              </button>

              <Link href="/pricing" className="block text-center mt-4 text-sm text-gray-600 hover:text-gray-900">
                ← Back to Pricing
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-gray-900">{plan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Billing</span>
                  <span className="font-medium text-gray-900 capitalize">{billingCycle}</span>
                </div>
                {billingCycle === 'annual' && price > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Annual Savings</span>
                    <span className="font-medium">-${(plan.monthly * 12 - price).toFixed(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${price}</div>
                  <div className="text-xs text-gray-600">USD</div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Stripe payments</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Upgrade/downgrade anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
