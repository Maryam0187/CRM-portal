'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_SERVICES } from '@/lib/helpers';

const CATEGORIES = [
  { id: 'salon', label: 'Salon', icon: '💇' },
  { id: 'barber', label: 'Barber', icon: '✂️' },
  { id: 'nails', label: 'Nails', icon: '💅' },
  { id: 'massage', label: 'Massage', icon: '💆' },
  { id: 'spa', label: 'Spa', icon: '🧖' },
  { id: 'cleaning', label: 'Cleaning', icon: '🧹' },
  { id: 'car_detailing', label: 'Car Detailing', icon: '🚗' },
  { id: 'ac_cleaning', label: 'AC Cleaning', icon: '❄️' },
  { id: 'pest_control', label: 'Pest Control', icon: '🐛' },
  { id: 'handyman', label: 'Handyman', icon: '🔧' },
  { id: 'photographer', label: 'Photographer', icon: '📷' },
  { id: 'tutor', label: 'Tutor', icon: '📚' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
  { id: 'cooking_class', label: 'Cooking Class', icon: '👨‍🍳' },
  { id: 'food_tour', label: 'Food Tour', icon: '🍽️' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    businessName: '',
    category: '',
    services: [],
    location: 'Dubai',
    staff: [{ name: 'Main Team' }],
  });

  const handleCategorySelect = (category: string) => {
    const defaultServices = (CATEGORY_SERVICES as any)[category] || [];
    setFormData({ 
      ...formData, 
      category,
      services: defaultServices.slice(0, 3),
    });
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert('Failed to complete onboarding');
        setLoading(false);
      }
    } catch (err) {
      alert('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Set up your business</h1>
          <p className="text-gray-600">Step {step} of 5</p>
        </div>

        <div className="card max-w-2xl mx-auto">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">What do you do?</h2>
              <div className="grid grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="font-medium">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">What's your business name?</h2>
              <input
                type="text"
                className="input text-lg"
                placeholder="e.g. Elite Beauty Salon"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
              <div className="mt-6 flex space-x-4">
                <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.businessName}
                  className="btn-primary flex-1"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your services</h2>
              <p className="text-gray-600 mb-6">We've added popular services. You can edit anytime.</p>
              <div className="space-y-3">
                {formData.services.map((svc: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{svc.name}</div>
                      <div className="text-sm text-gray-600">{svc.duration} min</div>
                    </div>
                    <div className="font-bold text-blue-600">AED {svc.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex space-x-4">
                <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                <button onClick={() => setStep(4)} className="btn-primary flex-1">Next</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Where are you located?</h2>
              <select
                className="input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                <option value="Dubai">Dubai</option>
                <option value="Dubai Marina">Dubai Marina</option>
                <option value="Downtown Dubai">Downtown Dubai</option>
                <option value="JBR">JBR</option>
                <option value="Business Bay">Business Bay</option>
                <option value="Deira">Deira</option>
                <option value="Bur Dubai">Bur Dubai</option>
              </select>
              <div className="mt-6 flex space-x-4">
                <button onClick={() => setStep(3)} className="btn-secondary">Back</button>
                <button onClick={() => setStep(5)} className="btn-primary flex-1">Next</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">All set!</h2>
              <p className="text-gray-600 mb-6">
                We'll create your booking page with default working hours (Mon-Sat, 9AM-6PM).
                You can customize everything in your dashboard.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="font-medium mb-2">Your booking page will be at:</div>
                <div className="text-blue-600 font-mono">
                  bookingsaas.com/{formData.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => setStep(4)} className="btn-secondary">Back</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? 'Creating...' : 'Create My Business →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
