'use client';

import Link from 'next/link';

export default function InventoryAlerts() {
  const alerts = [
    {
      id: 1,
      name: 'Aspirin 500mg',
      currentStock: 12,
      minStock: 50,
      status: 'critical'
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      currentStock: 25,
      minStock: 100,
      status: 'low'
    },
    {
      id: 3,
      name: 'Insulin Pen',
      currentStock: 8,
      minStock: 30,
      status: 'critical'
    },
    {
      id: 4,
      name: 'Blood Pressure Monitor',
      currentStock: 15,
      minStock: 25,
      status: 'low'
    },
    {
      id: 5,
      name: 'Paracetamol 500mg',
      currentStock: 45,
      minStock: 200,
      status: 'low'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Inventory Alerts</h2>
        <Link href="/inventory" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  alert.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <h3 className="font-medium text-gray-900">{alert.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {alert.currentStock} units left (Min: {alert.minStock})
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer whitespace-nowrap">
                Reorder
              </button>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-arrow-right-line text-gray-400"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total alerts</span>
          <span className="text-sm font-medium text-red-600">7 items need attention</span>
        </div>
      </div>
    </div>
  );
}