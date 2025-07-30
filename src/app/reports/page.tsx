'use client';

import { useState } from 'react';
import Header from '../../components/layout/Header';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import SalesReport from './SalesReport';
import InventoryReport from './InventoryReport';
import FinancialReport from './FinancialReport';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('sales');

  const handleExportReport = () => {
    console.log('Exporting report:', activeTab);
    // Implement export functionality
  };

  return (
    <ProtectedRoute requiredPermission="reports">
      <div className="min-h-screen bg-gray-50">
        <Header onExportReport={handleExportReport} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your pharmacy operations and performance.</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'sales'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-line-chart-line mr-2"></i>
                Sales Report
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'inventory'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-bar-chart-box-line mr-2"></i>
                Inventory Report
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'financial'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-money-dollar-circle-line mr-2"></i>
                Financial Report
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'sales' && <SalesReport />}
        {activeTab === 'inventory' && <InventoryReport />}
        {activeTab === 'financial' && <FinancialReport />}
      </main>
      </div>
    </ProtectedRoute>
  );
}