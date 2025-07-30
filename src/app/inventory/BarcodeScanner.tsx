'use client';

import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound?: (barcode: string) => void;
}

export default function BarcodeScanner({ isOpen, onClose, onProductFound }: BarcodeScannerProps) {
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundProduct, setFoundProduct] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate barcode scanning
    setTimeout(() => {
      const code = '123456789012';
      setScannedCode(code);
      setFoundProduct({
        name: 'Aspirin 500mg',
        currentStock: 12,
        price: 15.99
      });
      setIsScanning(false);
      onProductFound?.(code);
    }, 2000);
  };

  const handleManualEntry = (code: string) => {
    setScannedCode(code);
    if (code.length >= 12) {
      // Simulate product lookup
      setFoundProduct({
        name: 'Aspirin 500mg',
        currentStock: 12,
        price: 15.99
      });
      onProductFound?.(code);
    } else {
      setFoundProduct(null);
    }
  };

  const handleAddToSale = () => {
    console.log('Adding to sale:', scannedCode);
    onClose();
  };

  const handleUpdateStock = () => {
    console.log('Updating stock:', scannedCode);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Barcode Scanner" size="sm">
      <div className="p-6">
        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
            {isScanning ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Scanning...</p>
              </div>
            ) : scannedCode && foundProduct ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-check-line text-green-600 text-xl"></i>
                </div>
                <p className="text-gray-900 font-semibold">{scannedCode}</p>
                <p className="text-sm text-gray-600 mt-1">{foundProduct.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-barcode-line text-gray-400 text-2xl"></i>
                </div>
                <p className="text-gray-600">Point camera at barcode</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleScan}
            disabled={isScanning}
            loading={isScanning}
            className="w-full"
          >
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Button>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">Or enter barcode manually:</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter barcode"
              value={scannedCode}
              onChange={(e) => handleManualEntry(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="secondary"
              onClick={() => {
                if (scannedCode && foundProduct) {
                  console.log('Processing barcode:', scannedCode);
                }
              }}
              disabled={!scannedCode}
            >
              Search
            </Button>
          </div>
        </div>

        {foundProduct && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Product Found</span>
              <span className="text-sm text-blue-700">In Stock: {foundProduct.currentStock}</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              Would you like to add this product to a sale or update inventory?
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAddToSale}
              >
                Add to Sale
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleUpdateStock}
              >
                Update Stock
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}