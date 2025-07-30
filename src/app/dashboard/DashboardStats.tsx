'use client';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Sales Today',
      value: '$2,847.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'ri-money-dollar-circle-line'
    },
    {
      title: 'Items Sold',
      value: '143',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'ri-shopping-cart-line'
    },
    {
      title: 'Low Stock Items',
      value: '7',
      change: '-2',
      changeType: 'negative',
      icon: 'ri-alarm-warning-line'
    },
    {
      title: 'Total Inventory Value',
      value: '$84,562',
      change: '+3.1%',
      changeType: 'positive',
      icon: 'ri-bar-chart-box-line'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <i className={`${stat.icon} text-xl ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">vs yesterday</span>
          </div>
        </div>
      ))}
    </div>
  );
}