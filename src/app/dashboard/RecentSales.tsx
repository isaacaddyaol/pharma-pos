'use client';

export default function RecentSales() {
  const recentSales = [
    {
      id: 'TXN-2024-001',
      customer: 'John Smith',
      items: 3,
      total: 45.80,
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN-2024-002',
      customer: 'Maria Garcia',
      items: 1,
      total: 128.50,
      time: '8 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN-2024-003',
      customer: 'David Johnson',
      items: 5,
      total: 89.25,
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN-2024-004',
      customer: 'Sarah Wilson',
      items: 2,
      total: 67.40,
      time: '22 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN-2024-005',
      customer: 'Robert Brown',
      items: 4,
      total: 156.90,
      time: '28 minutes ago',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentSales.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{sale.customer}</h3>
                <span className="text-sm text-gray-500">{sale.time}</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">{sale.id}</span>
                <span className="text-sm text-gray-400 mx-2">•</span>
                <span className="text-sm text-gray-600">{sale.items} items</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-semibold text-gray-900">${sale.total}</div>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600 capitalize">{sale.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total sales today</span>
          <span className="text-sm font-medium text-gray-900">$2,847.50</span>
        </div>
      </div>
    </div>
  );
}