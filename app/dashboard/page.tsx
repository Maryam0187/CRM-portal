'use client';

import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';

interface DashboardData {
  totalPipelineValue: number;
  openDeals: number;
  leadsThisWeek: number;
  tasksDueToday: number;
  dealsByStage: Array<{
    stage: { id: number; name: string; color: string };
    count: number;
    totalValue: number;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-12">Loading...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="text-sm font-medium text-gray-600">Pipeline Value</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              ${data?.totalPipelineValue.toLocaleString()}
            </div>
          </div>

          <div className="card">
            <div className="text-sm font-medium text-gray-600">Open Deals</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {data?.openDeals}
            </div>
          </div>

          <div className="card">
            <div className="text-sm font-medium text-gray-600">Leads This Week</div>
            <div className="mt-2 text-3xl font-bold text-purple-600">
              {data?.leadsThisWeek}
            </div>
          </div>

          <div className="card">
            <div className="text-sm font-medium text-gray-600">Tasks Due Today</div>
            <div className="mt-2 text-3xl font-bold text-orange-600">
              {data?.tasksDueToday}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Deals by Stage</h2>
          <div className="space-y-4">
            {data?.dealsByStage.map((item) => (
              <div key={item.stage.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.stage.color }}
                  />
                  <span className="font-medium text-gray-900">{item.stage.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {item.count} deal{item.count !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-600">
                    ${item.totalValue.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
