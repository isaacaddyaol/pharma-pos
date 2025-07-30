'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { time: '09:00', sales: 1200 },
  { time: '10:00', sales: 1800 },
  { time: '11:00', sales: 2100 },
  { time: '12:00', sales: 2800 },
  { time: '13:00', sales: 3200 },
  { time: '14:00', sales: 2900 },
  { time: '15:00', sales: 3500 },
  { time: '16:00', sales: 4200 },
  { time: '17:00', sales: 3800 },
  { time: '18:00', sales: 2600 }
];

export default function SalesChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Sales Today</h2>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">Today</button>
          <button className="text-sm text-indigo-600 font-medium cursor-pointer">Week</button>
          <button className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">Month</button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Sales']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}