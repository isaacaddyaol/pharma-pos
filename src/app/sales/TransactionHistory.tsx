'use client';

import { useState } from 'react';

export default function TransactionHistory() {
  const [dateFilter, setDateFilter] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const transactions = [
    {
      id: 'TXN-2024-001',
      date: '2024-01-15',
      time: '14:30',
      customer: 'John Smith',
      items: [
        { name: 'Aspirin 500mg', quantity: 2, price: 15.99 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 12.50 }
      ],
      subtotal: 44.48,
      tax: 3.56,
      total: 48.04,
      paymentMethod: 'cash',
      status: 'completed'
    },
    {
      id: 'TXN-2024-002',
      date: '2024-01-15',
      time: '14:22',
      customer: 'Maria Garcia',
      items: [
        { name: 'Insulin Pen', quantity: 1, price: 80.00 },
        { name: 'Blood Glucose Strips', quantity: 1, price: 45.00 }
      ],
      subtotal: 125.00,
      tax: 10.00,
      total: 135.00,
      paymentMethod: 'insurance',
      status: 'completed'
    },
    {
      id: 'TXN-2024-003',
      date: '2024-01-15',
      time: '14:15',
      customer: 'David Johnson',
      items: [
        { name: 'Paracetamol 500mg', quantity: 3, price: 8.99 },
        { name: 'Cough Syrup', quantity: 1, price: 12.50 },
        { name: 'Thermometer Digital', quantity: 1, price: 15.00 }
      ],
      subtotal: 54.47,
      tax: 4.36,
      total: 58.83,
      paymentMethod: 'card',
      status: 'completed'
    },
    {
      id: 'TXN-2024-004',
      date: '2024-01-15',
      time: '14:08',
      customer: 'Sarah Wilson',
      items: [
        { name: 'Vitamin D3', quantity: 1, price: 18.99 },
        { name: 'Omega-3 Fish Oil', quantity: 1, price: 22.50 }
      ],
      subtotal: 41.49,
      tax: 3.32,
      total: 44.81,
      paymentMethod: 'cash',
      status: 'completed'
    },
    {
      id: 'TXN-2024-005',
      date: '2024-01-15',
      time: '13:55',
      customer: 'Robert Brown',
      items: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 120.00 },
        { name: 'Aspirin 500mg', quantity: 1, price: 15.99 }
      ],
      subtotal: 135.99,
      tax: 10.88,
      total: 146.87,
      paymentMethod: 'card',
      status: 'completed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());
    // Add date filtering logic here if needed
    return matchesSearch;
  });

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return 'ri-money-dollar-circle-line';
      case 'card':
        return 'ri-bank-card-line';
      case 'insurance':
        return 'ri-shield-check-line';
      default:
        return 'ri-money-dollar-circle-line';
    }
  };

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handlePrintReceipt = (transaction: any) => {
    // Create a printable receipt
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - ${transaction.id}</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 300px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
              .item { display: flex; justify-content: space-between; margin: 5px 0; }
              .total { border-top: 1px solid #000; padding-top: 10px; margin-top: 10px; font-weight: bold; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>PharmaPOS</h2>
              <p>Transaction: ${transaction.id}</p>
              <p>Date: ${transaction.date} ${transaction.time}</p>
              <p>Customer: ${transaction.customer}</p>
            </div>
            <div class="items">
              ${transaction.items.map((item: any) => `
                <div class="item">
                  <span>${item.name} x${item.quantity}</span>
                  <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
            </div>
            <div class="total">
              <div class="item">
                <span>Subtotal:</span>
                <span>$${transaction.subtotal.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Tax:</span>
                <span>$${transaction.tax.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Total:</span>
                <span>$${transaction.total.toFixed(2)}</span>
              </div>
            </div>
            <div class="footer">
              <p>Payment Method: ${transaction.paymentMethod.toUpperCase()}</p>
              <p>Thank you for your business!</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleRefundTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowRefundModal(true);
  };

  const processRefund = () => {
    if (selectedTransaction) {
      // Process refund logic here
      alert(`Refund processed for transaction ${selectedTransaction.id}`);
      setShowRefundModal(false);
      setSelectedTransaction(null);
    }
  };

  const exportTransactions = () => {
    // Create CSV content
    const csvContent = [
      ['Transaction ID', 'Date', 'Time', 'Customer', 'Items', 'Payment Method', 'Total'],
      ...filteredTransactions.map(t => [
        t.id,
        t.date,
        t.time,
        t.customer,
        t.items.map(item => `${item.name} x${item.quantity}`).join('; '),
        t.paymentMethod,
        t.total.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Sales</p>
              <p className="text-2xl font-bold text-gray-900">$2,847.50</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Items Sold</p>
              <p className="text-2xl font-bold text-gray-900">143</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-cart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Sale</p>
              <p className="text-2xl font-bold text-gray-900">$123.80</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-bar-chart-line text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
          
          <button 
            onClick={exportTransactions}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-line mr-2"></i>
            Export
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.date} {transaction.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {transaction.items.map((item, index) => (
                        <div key={index} className="mb-1">
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <i className={`${getPaymentMethodIcon(transaction.paymentMethod)} text-gray-600 mr-2`}></i>
                      <span className="text-sm text-gray-900 capitalize">{transaction.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${transaction.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewTransaction(transaction)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-1 rounded hover:bg-indigo-50 transition-colors"
                        title="View Details"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button 
                        onClick={() => handlePrintReceipt(transaction)}
                        className="text-green-600 hover:text-green-900 cursor-pointer p-1 rounded hover:bg-green-50 transition-colors"
                        title="Print Receipt"
                      >
                        <i className="ri-printer-line"></i>
                      </button>
                      <button 
                        onClick={() => handleRefundTransaction(transaction)}
                        className="text-red-600 hover:text-red-900 cursor-pointer p-1 rounded hover:bg-red-50 transition-colors"
                        title="Process Refund"
                      >
                        <i className="ri-refund-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Transaction Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="text-lg text-gray-900">{selectedTransaction.date} {selectedTransaction.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Customer</label>
                  <p className="text-lg text-gray-900">{selectedTransaction.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Method</label>
                  <div className="flex items-center">
                    <i className={`${getPaymentMethodIcon(selectedTransaction.paymentMethod)} text-gray-600 mr-2`}></i>
                    <span className="text-lg text-gray-900 capitalize">{selectedTransaction.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <label className="text-sm font-medium text-gray-500 mb-3 block">Items Purchased</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  {selectedTransaction.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${selectedTransaction.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${selectedTransaction.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>${selectedTransaction.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handlePrintReceipt(selectedTransaction)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <i className="ri-printer-line mr-2"></i>
                  Print Receipt
                </button>
                <button
                  onClick={() => {
                    setShowTransactionModal(false);
                    handleRefundTransaction(selectedTransaction);
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  <i className="ri-refund-line mr-2"></i>
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Process Refund</h2>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-refund-line text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Refund</h3>
                <p className="text-gray-600">
                  Are you sure you want to process a refund for transaction {selectedTransaction.id}?
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Refund Amount</span>
                  <span className="text-xl font-bold text-red-600">${selectedTransaction.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processRefund}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}