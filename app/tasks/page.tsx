'use client';

import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  assignedTo?: { firstName: string; lastName: string };
  lead?: { firstName: string; lastName: string };
  deal?: { name: string };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors: Record<string, string> = {
    low: 'text-gray-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-12">Loading...</div>
      </AppLayout>
    );
  }

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              To Do ({todoTasks.length})
            </h2>
            <div className="space-y-3">
              {todoTasks.map((task) => (
                <div key={task.id} className="card">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <span className={`text-xs font-bold ${priorityColors[task.priority]}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <p className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  {task.assignedTo && (
                    <p className="text-xs text-gray-500 mt-1">
                      Assigned to: {task.assignedTo.firstName} {task.assignedTo.lastName}
                    </p>
                  )}
                  {(task.lead || task.deal) && (
                    <p className="text-xs text-gray-500 mt-1">
                      Related to: {task.lead ? `${task.lead.firstName} ${task.lead.lastName}` : task.deal?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              In Progress ({inProgressTasks.length})
            </h2>
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <div key={task.id} className="card border-l-4 border-blue-500">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <span className={`text-xs font-bold ${priorityColors[task.priority]}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <p className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  {task.assignedTo && (
                    <p className="text-xs text-gray-500 mt-1">
                      Assigned to: {task.assignedTo.firstName} {task.assignedTo.lastName}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Completed ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="card opacity-75">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 line-through">{task.title}</h3>
                    <span className="text-xs font-medium text-green-600">DONE</span>
                  </div>
                  {task.assignedTo && (
                    <p className="text-xs text-gray-500">
                      {task.assignedTo.firstName} {task.assignedTo.lastName}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
