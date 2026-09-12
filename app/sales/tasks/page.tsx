'use client';
import UnifiedNav from '@/components/layout/UnifiedNav';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tasks</h1>
        <div className="card">
          <p className="text-gray-600">Tasks & follow-ups - Coming in next iteration</p>
          <p className="text-sm text-gray-500 mt-2">Will include: Task list, due dates, assignment, linked to leads/deals, status tracking</p>
        </div>
      </main>
    </div>
  );
}
