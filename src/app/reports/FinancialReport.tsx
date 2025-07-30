'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function FinancialReport() {
  const [dateRange, setDateRange] = useState('month');

  const revenueData = [
    { date: '2024-01-01', revenue: 12500, profit: 3750, expenses: 8750 },
    { date: '2024-01-05', revenue: 15200, profit: 4560, expenses: 10640 },
    { date: '2024-01-10', revenue: 18900, profit: 5670, expenses: 13230 },
    { date: '2024-01-15', revenue: 22100, profit: 6630, expenses: 15470 },
    { date: '2024-01-20', revenue: 19800, profit: 5940, expenses: 13860 },
    { date: '2024-01-25', revenue: 25400, profit: 7620, expenses: 17780 },
    { date: '2024-01-30', revenue: 28900, profit: 8670, expenses: 20230 }
  ];

  const expenseBreakdown = [
    { category: 'Inventory Purchase', amount: 45000, percentage: 65, color: '#3b82f6' },
    { category: 'Staff Salaries', amount: 12000, percentage: 17, color: '#10b981' },
    { category: 'Rent & Utilities', amount: 4500, percentage: 7, color: '#f59e0b' },
    { category: 'Equipment & Maintenance', amount: 2800, percentage: 4, color: '#ef4444' },
    { category: 'Marketing', amount: 1800, percentage: 3, color: '#8b5cf6' },
    { category: 'Insurance', amount: 1200, percentage: 2, color: '#06b6d4' },
    { category: 'Other', amount: 1700, percentage: 2, color: '#84cc16' }
  ];

  const profitMargins = [
    { category: 'Pain Relief', margin: 35, revenue: 15600 },
    { category: 'Vitamins', margin: 42, revenue: 12800 },
    { category: 'Diabetes Care', margin: 28, revenue: 18900 },
    { category: 'Medical Devices', margin: 25, revenue: 22100 },
    { category: 'Antibiotics', margin: 38, revenue: 9800 },
    { category: 'Skincare', margin: 45, revenue: 7200 }
  ];

  const totalRevenue = 142800;
  const totalProfit = 42840;
  const totalExpenses = 99960;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Financial Performance</h2>
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

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+18.2% vs last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-green-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Profit</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalProfit.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+15.4% vs last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-blue-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-red-600 mt-1">+12.1% vs last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-cart-line text-red-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{profitMargin}%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% vs last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-percent-line text-purple-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue vs Profit Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Revenue vs Profit Trend</h3>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value, name) => [`$${value}`, name]}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Breakdown & Profit Margins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Expense Breakdown */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="w-48 h-48 mx-auto lg:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6 space-y-2 max-h-48 overflow-y-auto">
              {expenseBreakdown.map((expense, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: expense.color }}
                    ></div>
                    <span className="text-gray-700">{expense.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">${expense.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{expense.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profit Margins by Category */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Profit Margins by Category</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitMargins} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="category" type="category" stroke="#6b7280" fontSize={12} width={100} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'margin' ? `${value}%` : `$${value}`,
                    name === 'margin' ? 'Margin' : 'Revenue'
                  ]}
                />
                <Bar dataKey="margin" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Revenue Growth</span>
              <i className="ri-arrow-up-line text-green-600"></i>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-900">+18.2%</p>
            <p className="text-sm text-green-700">vs. previous month</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Profit Growth</span>
              <i className="ri-arrow-up-line text-blue-600"></i>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-900">+15.4%</p>
            <p className="text-sm text-blue-700">vs. previous month</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Best Category</span>
              <i className="ri-star-line text-purple-600"></i>
            </div>
            <p className="text-base sm:text-lg font-bold text-purple-900">Skincare</p>
            <p className="text-sm text-purple-700">45% profit margin</p>
          </div>
        </div>
      </div>
    </div>
  );
}