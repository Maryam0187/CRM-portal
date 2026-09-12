'use client';

import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Stage {
  id: number;
  name: string;
  color: string;
  order: number;
}

export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'team' | 'stages'>('team');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, stagesRes] = await Promise.all([
        fetch('/api/settings/users'),
        fetch('/api/settings/stages'),
      ]);
      if (usersRes.ok && stagesRes.ok) {
        const usersData = await usersRes.json();
        const stagesData = await stagesRes.json();
        setUsers(usersData.users);
        setStages(stagesData.stages);
      }
    } catch (err) {
      console.error('Failed to fetch settings');
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
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Team Members
            </button>
            <button
              onClick={() => setActiveTab('stages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pipeline Stages
            </button>
          </nav>
        </div>

        {activeTab === 'team' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Team Members</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stages' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Pipeline Stages</h2>
            <div className="space-y-3">
              {stages.sort((a, b) => a.order - b.order).map((stage) => (
                <div key={stage.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{stage.name}</span>
                    <span className="text-sm text-gray-500 ml-2">Order: {stage.order}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
