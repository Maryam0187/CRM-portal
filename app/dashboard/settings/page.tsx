'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UnifiedNav from '@/components/layout/UnifiedNav';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [business, setBusiness] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    currency: 'USD',
    location: ''
  });

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const res = await fetch('/api/business/settings');
      if (!res.ok) {
        if (res.status === 401) router.push('/login');
        return;
      }
      const data = await res.json();
      setBusiness(data.business);
      setFormData({
        name: data.business.name,
        currency: data.business.currency || 'USD',
        location: data.business.location || ''
      });
    } catch (err) {
      console.error('Failed to fetch business:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/business/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setBusiness(data.business);
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const selectedCurrency = CURRENCIES.find(c => c.code === formData.currency);

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNav />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Settings</h1>
          <p className="text-gray-600 mt-2">Manage your business information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. New York, Dubai, London"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency *
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.name} ({curr.code})
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                Current: {selectedCurrency?.symbol} ({selectedCurrency?.code}) - 
                This will be used for all prices on your booking page
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Booking Page URL:</dt>
                <dd className="font-mono text-blue-600">
                  /book/{business?.slug}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">My Business Module:</dt>
                <dd className={business?.enableBookings ? 'text-green-600' : 'text-gray-400'}>
                  {business?.enableBookings ? 'Enabled' : 'Disabled'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Sales Module:</dt>
                <dd className={business?.enableSales ? 'text-green-600' : 'text-gray-400'}>
                  {business?.enableSales ? 'Enabled' : 'Disabled'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
