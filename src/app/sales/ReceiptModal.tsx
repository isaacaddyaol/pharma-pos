'use client';

import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiptModal({ isOpen, onClose }: ReceiptModalProps) {
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [printType, setPrintType] = useState('last-transaction');

  const recentTransactions = [
    {
      id: 'TXN-2024-001',
      customer: 'John Smith',
      date: '2024-01-15',
      time: '14:30',
      total: 45.80,
      items: [
        { name: 'Aspirin 500mg', quantity: 2, price: 15.99 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 12.50 }
      ],
      paymentMethod: 'cash',
      tax: 3.32
    },
    {
      id: 'TXN-2024-002',
      customer: 'Maria Garcia',
      date: '2024-01-15',
      time: '13:45',
      total: 128.50,
      items: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 120.00 }
      ],
      paymentMethod: 'card',
      tax: 9.60
    },
    {
      id: 'TXN-2024-003',
      customer: 'David Johnson',
      date: '2024-01-15',
      time: '12:20',
      total: 89.25,
      items: [
        { name: 'Paracetamol 500mg', quantity: 3, price: 8.99 },
        { name: 'Thermometer Digital', quantity: 2, price: 15.00 }
      ],
      paymentMethod: 'insurance',
      tax: 6.42
    }
  ];

  const transactionOptions = [
    { value: '', label: 'Choose a transaction...' },
    ...recentTransactions.map(t => ({
      value: t.id,
      label: `${t.id} - ${t.customer} - $${t.total.toFixed(2)}`
    }))
  ];

  const currentTransaction = recentTransactions[0];

  const handlePrint = () => {
    let transactionToPrint;

    if (printType === 'last-transaction') {
      transactionToPrint = currentTransaction;
    } else {
      transactionToPrint = recentTransactions.find(t => t.id === selectedTransaction);
    }

    if (!transactionToPrint) {
      alert('Please select a transaction to print');
      return;
    }

    printReceipt(transactionToPrint);
  };

  const printReceipt = (transaction: any) => {
    const receiptWindow = window.open('', '_blank', 'width=400,height=600');
    if (!receiptWindow) return;

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${transaction.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            margin: 20px;
            font-size: 12px;
            line-height: 1.4;
          }
          .receipt {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .store-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .store-info {
            font-size: 11px;
            margin-bottom: 2px;
          }
          .transaction-info {
            margin-bottom: 15px;
          }
          .items {
            margin-bottom: 15px;
          }
          .item {
            margin-bottom: 8px;
          }
          .item-name {
            font-weight: bold;
          }
          .item-details {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
          }
          .totals {
            border-top: 1px solid #000;
            padding-top: 10px;
            margin-bottom: 15px;
          }
          .total-line {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .total-final {
            font-weight: bold;
            font-size: 14px;
            border-top: 1px solid #000;
            padding-top: 5px;
          }
          .footer {
            text-align: center;
            border-top: 2px solid #000;
            padding-top: 10px;
            font-size: 11px;
          }
          .dashed-line {
            border-bottom: 1px dashed #000;
            margin: 10px 0;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="store-name">PharmaPOS</div>
            <div class="store-info">123 Health Street</div>
            <div class="store-info">Medical City, MC 12345</div>
            <div class="store-info">Phone: (555) 123-4567</div>
          </div>

          <div class="transaction-info">
            <div><strong>Transaction ID:</strong> ${transaction.id}</div>
            <div><strong>Date:</strong> ${transaction.date}</div>
            <div><strong>Time:</strong> ${transaction.time}</div>
            <div><strong>Customer:</strong> ${transaction.customer || 'Walk-in Customer'}</div>
            <div><strong>Payment:</strong> ${transaction.paymentMethod.toUpperCase()}</div>
          </div>

          <div class="dashed-line"></div>

          <div class="items">
            <div style="font-weight: bold; margin-bottom: 10px;">ITEMS PURCHASED:</div>
            ${transaction.items.map((item: any) => `
              <div class="item">
                <div class="item-name">${item.name}</div>
                <div class="item-details">
                  <span>${item.quantity} x $${item.price.toFixed(2)}</span>
                  <span>$${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="totals">
            <div class="total-line">
              <span>Subtotal:</span>
              <span>$${(transaction.total - transaction.tax).toFixed(2)}</span>
            </div>
            <div class="total-line">
              <span>Tax (8%):</span>
              <span>$${transaction.tax.toFixed(2)}</span>
            </div>
            <div class="total-line total-final">
              <span>TOTAL:</span>
              <span>$${transaction.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="dashed-line"></div>

          <div class="footer">
            <div>Thank you for your business!</div>
            <div>Return Policy: 30 days with receipt</div>
            <div>For questions: support@pharmapos.com</div>
            <div style="margin-top: 10px;">
              ${new Date().toLocaleString()}
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Print Receipt" size="md">
      <div className="p-6">
        <div className="space-y-6">
          {/* Print Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Receipt Type
            </label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="printType"
                  value="last-transaction"
                  checked={printType === 'last-transaction'}
                  onChange={(e) => setPrintType(e.target.value)}
                  className="mr-3 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Last Transaction</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="printType"
                  value="specific-transaction"
                  checked={printType === 'specific-transaction'}
                  onChange={(e) => setPrintType(e.target.value)}
                  className="mr-3 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Specific Transaction</span>
              </label>
            </div>
          </div>

          {/* Transaction Selection */}
          {printType === 'specific-transaction' && (
            <Select
              label="Select Transaction"
              value={selectedTransaction}
              onChange={(e) => setSelectedTransaction(e.target.value)}
              options={transactionOptions}
            />
          )}

          {/* Transaction Preview */}
          {(printType === 'last-transaction' || selectedTransaction) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Receipt Preview</h3>
              {(() => {
                const transaction = printType === 'last-transaction'
                  ? currentTransaction
                  : recentTransactions.find(t => t.id === selectedTransaction);

                if (!transaction) return null;

                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium">{transaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium">{transaction.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{transaction.date} {transaction.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">${transaction.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium">{transaction.paymentMethod}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-gray-600 text-xs">Items:</div>
                      {transaction.items.map((item: any, index: number) => (
                        <div key={index} className="text-xs text-gray-500 ml-2">
                          {item.quantity}x {item.name} - ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePrint}
            icon="ri-printer-line"
          >
            Print Receipt
          </Button>
        </div>
      </div>
    </Modal>
  );
}