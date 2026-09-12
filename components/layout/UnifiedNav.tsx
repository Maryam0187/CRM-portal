'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UnifiedNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<'bookings' | 'sales'>('bookings');

  useEffect(() => {
    fetchUser();
    if (pathname?.startsWith('/sales')) {
      setActiveModule('sales');
    } else {
      setActiveModule('bookings');
    }
  }, [pathname]);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Failed to fetch user');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
              {user?.business?.name || 'Platform'}
            </Link>
            
            <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeModule === 'bookings'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📅 Bookings
              </Link>
              <Link
                href="/sales/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeModule === 'sales'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                💼 Sales CRM
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm text-gray-700">
                {user.firstName} {user.lastName}
              </div>
            )}
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {activeModule === 'bookings' && (
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-6 py-2">
              <Link href="/dashboard" className={`text-sm ${pathname === '/dashboard' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Dashboard
              </Link>
              <Link href="/book-settings" className={`text-sm ${pathname === '/book-settings' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Services & Hours
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {activeModule === 'sales' && (
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-6 py-2">
              <Link href="/sales/dashboard" className={`text-sm ${pathname === '/sales/dashboard' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Dashboard
              </Link>
              <Link href="/sales/leads" className={`text-sm ${pathname === '/sales/leads' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Leads
              </Link>
              <Link href="/sales/pipeline" className={`text-sm ${pathname === '/sales/pipeline' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Pipeline
              </Link>
              <Link href="/sales/contacts" className={`text-sm ${pathname === '/sales/contacts' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Contacts
              </Link>
              <Link href="/sales/tasks" className={`text-sm ${pathname === '/sales/tasks' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
                Tasks
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
