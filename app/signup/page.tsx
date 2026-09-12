'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName: '',
    enableBookings: false,
    enableSales: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (!formData.firstName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.enableBookings && !formData.enableSales) {
      setError('Please select at least one module');
      return;
    }

    if (!formData.businessName) {
      setError('Please enter your business name');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      // Redirect based on module selection
      if (formData.enableBookings && !formData.enableSales) {
        router.push('/onboarding');
      } else if (formData.enableSales && !formData.enableBookings) {
        router.push('/sales/dashboard');
      } else {
        // Both enabled - let them choose what to set up first
        router.push('/onboarding?mode=optional');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img src="/businessos-logo.svg" alt="Business OS" className="h-10 mx-auto" />
          </Link>
          <a 
            href="https://technonaire.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            by Technonaire
          </a>
          <h1 className="text-2xl font-bold text-gray-900 mt-6">
            {step === 1 ? 'Create Your Account' : 'Set Up Your Business'}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 1 ? 'Launch your website in one minute' : 'Name your business and get started'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input"
                      required
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input"
                    required
                    placeholder="••••••••"
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-full"
                >
                  Next →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="input"
                    required
                    placeholder="My Business"
                  />
                  <p className="text-xs text-gray-500 mt-1">You can change this later</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">What would you like to set up? *</p>
                  <div className="space-y-4">
                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.enableBookings ? 'border-blue-500 bg-blue-50' : 'border-blue-200 bg-blue-50/30 hover:border-blue-300'
                    }`}>
                      <input
                        type="checkbox"
                        checked={formData.enableBookings}
                        onChange={(e) => setFormData({ ...formData, enableBookings: e.target.checked })}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-900">🌐 My Business</div>
                          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Recommended</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Launch your booking site with built-in sales tools
                        </div>
                      </div>
                    </label>

                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-2">Or if you only need sales tools:</p>
                      <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.enableSales ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formData.enableSales}
                          onChange={(e) => setFormData({ ...formData, enableSales: e.target.checked })}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">💼 Sales Management Only</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Track leads, deals, and pipeline without a booking site
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">You can enable both modules if needed</p>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
