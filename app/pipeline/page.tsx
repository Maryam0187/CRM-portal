'use client';

import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';

interface Deal {
  id: number;
  name: string;
  value?: number;
  expectedCloseDate?: string;
  stage: { id: number; name: string; color: string; order: number };
  owner?: { firstName: string; lastName: string };
  contact?: { firstName: string; lastName: string; company?: string };
}

interface Stage {
  id: number;
  name: string;
  color: string;
  order: number;
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dealsRes, stagesRes] = await Promise.all([
        fetch('/api/deals'),
        fetch('/api/settings/stages'),
      ]);
      if (dealsRes.ok && stagesRes.ok) {
        const dealsData = await dealsRes.json();
        const stagesData = await stagesRes.json();
        setDeals(dealsData.deals);
        setStages(stagesData.stages);
      }
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const getDealsByStage = (stageId: number) => {
    return deals.filter((deal) => deal.stage.id === stageId);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pipeline</h1>
          <div className="text-sm text-gray-600">
            Total Pipeline Value: ${deals.reduce((sum, d) => sum + (d.value || 0), 0).toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.sort((a, b) => a.order - b.order).map((stage) => {
            const stageDeals = getDealsByStage(stage.id);
            const stageValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);

            return (
              <div key={stage.id} className="flex flex-col">
                <div
                  className="rounded-t-lg p-3 text-white font-medium"
                  style={{ backgroundColor: stage.color }}
                >
                  <div className="flex justify-between items-center">
                    <span>{stage.name}</span>
                    <span className="text-sm">({stageDeals.length})</span>
                  </div>
                  <div className="text-xs mt-1">${stageValue.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-b-lg p-2 space-y-2 min-h-[400px]">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="bg-white rounded-lg shadow p-3 hover:shadow-md transition-shadow">
                      <div className="font-medium text-gray-900 text-sm mb-1">{deal.name}</div>
                      {deal.value && (
                        <div className="text-lg font-bold text-blue-600 mb-1">
                          ${deal.value.toLocaleString()}
                        </div>
                      )}
                      {deal.contact && (
                        <div className="text-xs text-gray-600 mb-1">
                          {deal.contact.firstName} {deal.contact.lastName}
                          {deal.contact.company && ` - ${deal.contact.company}`}
                        </div>
                      )}
                      {deal.owner && (
                        <div className="text-xs text-gray-500">
                          Owner: {deal.owner.firstName} {deal.owner.lastName}
                        </div>
                      )}
                      {deal.expectedCloseDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
