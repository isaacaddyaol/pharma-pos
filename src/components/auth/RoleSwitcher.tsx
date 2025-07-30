'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function RoleSwitcher() {
  const { user, switchUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const users = [
    { id: 1, name: 'Dr. Sarah Johnson', role: 'owner', email: 'sarah@pharmacy.com' },
    { id: 2, name: 'Mike Chen', role: 'salesperson', email: 'mike@pharmacy.com' }
  ];

  const handleUserSwitch = (userId: number) => {
    switchUser(userId);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="Switch User (Demo)"
        >
          <i className="ri-user-switch-line text-xl"></i>
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm">Switch User (Demo)</h3>
              <p className="text-xs text-gray-500">Current: {user?.name}</p>
            </div>
            <div className="p-2">
              {users.map((demoUser) => (
                <button
                  key={demoUser.id}
                  onClick={() => handleUserSwitch(demoUser.id)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                    user?.id === demoUser.id ? 'bg-indigo-50 border border-indigo-200' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {demoUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{demoUser.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{demoUser.role}</p>
                    </div>
                    {user?.id === demoUser.id && (
                      <i className="ri-check-line text-indigo-600 ml-auto"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}