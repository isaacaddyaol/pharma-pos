'use client';

import { useState } from 'react';
import Header from '../../components/layout/Header';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import SalesInterface from './SalesInterface';
import TransactionHistory from './TransactionHistory';
import ReceiptModal from './ReceiptModal';

export default function Sales() {
  const [activeTab, setActiveTab] = useState('new-sale');
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  return (
    <ProtectedRoute requiredPermission="sales">
      <div className="min-h-screen bg-gray-50">
        <Header onPrintReceipt={() => setShowReceiptModal(true)} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Management</h1>
          <p className="text-gray-600">Process transactions and manage sales efficiently.</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('new-sale')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'new-sale'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-add-circle-line mr-2"></i>
                New Sale
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-history-line mr-2"></i>
                Transaction History
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'new-sale' && <SalesInterface />}
        {activeTab === 'history' && <TransactionHistory />}
      </main>

      {/* Receipt Modal */}
      <ReceiptModal 
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)} 
      />
      </div>
    </ProtectedRoute>
  );
}