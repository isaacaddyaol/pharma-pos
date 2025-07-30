'use client';

export default function TopProducts() {
  const topProducts = [
    {
      id: 1,
      name: 'Aspirin 500mg',
      category: 'Pain Relief',
      sold: 45,
      revenue: 675.00,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      sold: 38,
      revenue: 456.00,
      trend: 'up'
    },
    {
      id: 3,
      name: 'Blood Pressure Monitor',
      category: 'Medical Devices',
      sold: 12,
      revenue: 1440.00,
      trend: 'up'
    },
    {
      id: 4,
      name: 'Insulin Pen',
      category: 'Diabetes Care',
      sold: 8,
      revenue: 640.00,
      trend: 'down'
    },
    {
      id: 5,
      name: 'Thermometer Digital',
      category: 'Medical Devices',
      sold: 25,
      revenue: 375.00,
      trend: 'up'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Top Products</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">{product.sold} sold</span>
                <div className={`w-4 h-4 flex items-center justify-center ${
                  product.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <i className={`ri-arrow-${product.trend === 'up' ? 'up' : 'down'}-line text-xs`}></i>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-1">${product.revenue.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total products sold</span>
          <span className="text-sm font-medium text-gray-900">128 items</span>
        </div>
      </div>
    </div>
  );
}