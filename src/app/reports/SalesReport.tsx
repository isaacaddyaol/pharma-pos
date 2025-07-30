'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function SalesReport() {
  const [dateRange, setDateRange] = useState('week');

  const salesData = [
    { date: '2024-01-09', sales: 1200, transactions: 15 },
    { date: '2024-01-10', sales: 1450, transactions: 18 },
    { date: '2024-01-11', sales: 1800, transactions: 22 },
    { date: '2024-01-12', sales: 2100, transactions: 25 },
    { date: '2024-01-13', sales: 1650, transactions: 20 },
    { date: '2024-01-14', sales: 2200, transactions: 28 },
    { date: '2024-01-15', sales: 2847, transactions: 32 }
  ];

  const hourlyData = [
    { hour: '9:00', sales: 120 },
    { hour: '10:00', sales: 180 },
    { hour: '11:00', sales: 210 },
    { hour: '12:00', sales: 280 },
    { hour: '13:00', sales: 320 },
    { hour: '14:00', sales: 290 },
    { hour: '15:00', sales: 350 },
    { hour: '16:00', sales: 420 },
    { hour: '17:00', sales: 380 },
    { hour: '18:00', sales: 260 }
  ];

  const paymentMethodData = [
    { name: 'Cash', value: 45, color: '#10b981' },
    { name: 'Card', value: 35, color: '#3b82f6' },
    { name: 'Insurance', value: 20, color: '#f59e0b' }
  ];

  const topProducts = [
    { name: 'Aspirin 500mg', sales: 1250, units: 85 },
    { name: 'Vitamin C 1000mg', sales: 980, units: 78 },
    { name: 'Paracetamol 500mg', sales: 756, units: 95 },
    { name: 'Insulin Pen', sales: 1680, units: 21 },
    { name: 'Blood Pressure Monitor', sales: 2400, units: 20 }
  ];

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0);
  const avgSale = totalSales / totalTransactions;

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sales Performance</h2>
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
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% vs last week</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-green-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Transactions</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalTransactions}</p>
              <p className="text-sm text-blue-600 mt-1">+8.3% vs last week</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-line text-blue-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Sale</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">${avgSale.toFixed(2)}</p>
              <p className="text-sm text-purple-600 mt-1">+3.8% vs last week</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-bar-chart-line text-purple-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Items Sold</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-orange-600 mt-1">+15.2% vs last week</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-cart-line text-orange-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Sales']}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Sales */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Hourly Sales Distribution</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Sales']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payment Methods & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Payment Methods */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 space-y-3">
              {paymentMethodData.map((method, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: method.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{method.name}</span>
                  <span className="text-sm font-medium text-gray-900 ml-auto">{method.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.units} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}