'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UnifiedNav from '@/components/layout/UnifiedNav';

export default function SalesDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/sales/dashboard');
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sales Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-sm text-gray-600">Pipeline Value</div>
            <div className="text-3xl font-bold text-blue-600">AED {data?.totalPipelineValue?.toLocaleString()}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Open Deals</div>
            <div className="text-3xl font-bold text-green-600">{data?.openDeals}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Leads This Week</div>
            <div className="text-3xl font-bold text-purple-600">{data?.leadsThisWeek}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Tasks Due</div>
            <div className="text-3xl font-bold text-orange-600">{data?.tasksDueToday}</div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Pipeline by Stage</h2>
          <div className="space-y-3">
            {data?.dealsByStage?.map((item: any) => (
              <div key={item.stage.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.stage.color }}
                  />
                  <span className="font-medium">{item.stage.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{item.count} deals</div>
                  <div className="text-sm text-gray-600">AED {item.totalValue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
