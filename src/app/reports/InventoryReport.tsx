'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function InventoryReport() {
  const [dateRange, setDateRange] = useState('month');

  const categoryData = [
    { name: 'Pain Relief', value: 285, color: '#3b82f6' },
    { name: 'Vitamins', value: 220, color: '#10b981' },
    { name: 'Antibiotics', value: 165, color: '#f59e0b' },
    { name: 'Diabetes Care', value: 95, color: '#ef4444' },
    { name: 'Medical Devices', value: 75, color: '#8b5cf6' },
    { name: 'First Aid', value: 145, color: '#06b6d4' },
    { name: 'Skincare', value: 125, color: '#f97316' },
    { name: 'Cold & Flu', value: 185, color: '#84cc16' }
  ];

  const stockLevels = [
    { category: 'Pain Relief', inStock: 45, lowStock: 8, outOfStock: 2 },
    { category: 'Vitamins', inStock: 38, lowStock: 5, outOfStock: 1 },
    { category: 'Antibiotics', inStock: 28, lowStock: 12, outOfStock: 3 },
    { category: 'Diabetes Care', inStock: 15, lowStock: 6, outOfStock: 4 },
    { category: 'Medical Devices', inStock: 22, lowStock: 4, outOfStock: 1 },
    { category: 'First Aid', inStock: 35, lowStock: 7, outOfStock: 2 },
    { category: 'Skincare', inStock: 29, lowStock: 9, outOfStock: 2 },
    { category: 'Cold & Flu', inStock: 32, lowStock: 8, outOfStock: 3 }
  ];

  const expiryData = [
    { period: 'Expired', count: 12, color: '#ef4444' },
    { period: 'Expires in 30 days', count: 28, color: '#f59e0b' },
    { period: 'Expires in 90 days', count: 85, color: '#3b82f6' },
    { period: 'Expires > 90 days', count: 1142, color: '#10b981' }
  ];

  const lowStockItems = [
    { name: 'Aspirin 500mg', currentStock: 12, minStock: 50, daysLeft: 3 },
    { name: 'Insulin Pen', currentStock: 8, minStock: 30, daysLeft: 2 },
    { name: 'Vitamin C 1000mg', currentStock: 25, minStock: 100, daysLeft: 5 },
    { name: 'Blood Pressure Monitor', currentStock: 15, minStock: 25, daysLeft: 7 },
    { name: 'Paracetamol 500mg', currentStock: 45, minStock: 200, daysLeft: 8 }
  ];

  const totalProducts = categoryData.reduce((sum, cat) => sum + cat.value, 0);
  const totalValue = 84562;
  const lowStockCount = 15;
  const outOfStockCount = 5;

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Inventory Overview</h2>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm cursor-pointer w-full sm:w-auto"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Products</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalProducts.toLocaleString()}</p>
              <p className="text-sm text-blue-600 mt-1">+5.2% vs last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-medicine-bottle-line text-blue-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Value</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+8.1% vs last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-green-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">{lowStockCount}</p>
              <p className="text-sm text-red-600 mt-1">Requires attention</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-red-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{outOfStockCount}</p>
              <p className="text-sm text-yellow-600 mt-1">Needs reorder</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-close-circle-line text-yellow-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Products by Category</h3>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto lg:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6 space-y-2 max-h-48 overflow-y-auto">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-gray-700 flex-1">{category.name}</span>
                  <span className="font-medium text-gray-900">{category.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Stock Status by Category</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockLevels}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#6b7280" fontSize={10} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip />
                <Bar dataKey="inStock" stackId="a" fill="#10b981" name="In Stock" />
                <Bar dataKey="lowStock" stackId="a" fill="#f59e0b" name="Low Stock" />
                <Bar dataKey="outOfStock" stackId="a" fill="#ef4444" name="Out of Stock" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Expiry Analysis & Low Stock Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Expiry Analysis */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Product Expiry Analysis</h3>
          <div className="space-y-4">
            {expiryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{item.period}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">{item.count}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(item.count / 1267) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total tracked products</span>
              <span className="font-medium text-gray-900">1,267</span>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Critical Low Stock Items</h3>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">
                    {item.currentStock} / {item.minStock} units
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-red-600">
                    {item.daysLeft} days left
                  </div>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer">
              Generate Reorder Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}