'use client';
import UnifiedNav from '@/components/layout/UnifiedNav';

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pipeline</h1>
        <div className="card">
          <p className="text-gray-600">Kanban pipeline board - Coming in next iteration</p>
          <p className="text-sm text-gray-500 mt-2">Will include: Drag-and-drop deals between stages, deal cards with value/owner, quick actions</p>
        </div>
      </main>
    </div>
  );
}
