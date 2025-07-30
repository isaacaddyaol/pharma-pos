'use client';

import { useState } from 'react';
import Header from '../../components/layout/Header';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import InventoryTable from './InventoryTable';
import InventoryFilters from './InventoryFilters';
import BarcodeScanner from './BarcodeScanner';
import AddProductModal from './AddProductModal';
import ConfirmModal from '../../components/ui/ConfirmModal';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [showScanner, setShowScanner] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restockAmount, setRestockAmount] = useState('');

  // Mock products data (in real app, this would come from API/state management)
  const products = [
    {
      id: 1,
      name: 'Aspirin 500mg',
      category: 'Pain Relief',
      barcode: '123456789012',
      currentStock: 12,
      minStock: 50,
      price: 15.99,
      supplier: 'MedSupply Co',
      expiryDate: '2025-06-15',
      status: 'critical',
      description: 'Pain relief medication for headaches and minor aches',
      batchNumber: 'ASP-2024-001',
      location: 'Aisle A, Shelf 2'
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      barcode: '123456789013',
      currentStock: 85,
      minStock: 100,
      price: 12.50,
      supplier: 'HealthPlus Inc',
      expiryDate: '2025-12-01',
      status: 'low',
      description: 'High-potency vitamin C supplement',
      batchNumber: 'VTC-2024-003',
      location: 'Aisle B, Shelf 1'
    }
  ];

  const findProductById = (id: number) => products.find(p => p.id === id);

  const handleViewProduct = (productId: number) => {
    const product = findProductById(productId);
    if (product) {
      setSelectedProduct(product);
      setShowProductDetails(true);
    }
  };

  const handleEditProduct = (productId: number) => {
    const product = findProductById(productId);
    if (product) {
      setSelectedProduct(product);
      setShowEditModal(true);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    
    setDeleteLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleted product:', productToDelete);
      
      setShowDeleteModal(false);
      setProductToDelete(null);
      // In real app, update products state/refetch data
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRestockProduct = (productId: number) => {
    const product = findProductById(productId);
    if (product) {
      setSelectedProduct(product);
      setRestockAmount('');
      setShowRestockModal(true);
    }
  };

  const confirmRestock = async () => {
    if (!selectedProduct || !restockAmount) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Restocked ${selectedProduct.name} with ${restockAmount} units`);
      
      setShowRestockModal(false);
      setSelectedProduct(null);
      setRestockAmount('');
      // In real app, update products state/refetch data
    } catch (error) {
      console.error('Error restocking product:', error);
    }
  };

  const handleAddProduct = (productData: any) => {
    console.log('Adding product:', productData);
    setShowAddModal(false);
    // In real app, add to products state/send to API
  };

  const handleUpdateProduct = (productData: any) => {
    console.log('Updating product:', productData);
    setShowEditModal(false);
    setSelectedProduct(null);
    // In real app, update products state/send to API
  };

  const exportInventory = () => {
    // Create CSV content
    const csvContent = [
      ['Name', 'Category', 'Barcode', 'Current Stock', 'Min Stock', 'Price', 'Supplier', 'Expiry Date', 'Status'],
      ...products.map(p => [
        p.name,
        p.category,
        p.barcode,
        p.currentStock.toString(),
        p.minStock.toString(),
        p.price.toString(),
        p.supplier,
        p.expiryDate,
        p.status
      ])
    ].map(row => row.join(',')).join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <ProtectedRoute requiredPermission="inventory">
      <div className="min-h-screen bg-gray-50">
        <Header 
          onScanBarcode={() => setShowScanner(true)}
          onAddProduct={() => setShowAddModal(true)}
        />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your pharmacy inventory with real-time updates.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-medicine-bottle-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">7</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">$84,562</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-folder-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <InventoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
        />

        {/* Action Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <i className="ri-add-line mr-2"></i>
              Add Product
            </button>
            <button
              onClick={() => setShowScanner(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <i className="ri-barcode-line mr-2"></i>
              Scan Barcode
            </button>
          </div>
          <button
            onClick={exportInventory}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <i className="ri-download-line mr-2"></i>
            Export CSV
          </button>
        </div>

        {/* Inventory Table */}
        <InventoryTable
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          stockFilter={stockFilter}
          products={products}
          onViewProduct={handleViewProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onRestockProduct={handleRestockProduct}
        />
      </main>

      {/* Modals */}
      <BarcodeScanner 
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onProductFound={(barcode) => console.log('Product found:', barcode)}
      />
      
      <AddProductModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <AddProductModal 
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleUpdateProduct}
        product={selectedProduct}
        isEdit={true}
      />
      
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
      />

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
                <button
                  onClick={() => setShowProductDetails(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Product Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedProduct.status === 'critical' ? 'bg-red-100 text-red-800' :
                      selectedProduct.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                      selectedProduct.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedProduct.status === 'in-stock' ? 'In Stock' : 
                       selectedProduct.status === 'low' ? 'Low Stock' : 
                       selectedProduct.status === 'critical' ? 'Critical' : 'Out of Stock'}
                    </span>
                    <span className="text-2xl font-bold text-indigo-600">${selectedProduct.price}</span>
                  </div>
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-lg text-gray-900">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Barcode</label>
                    <p className="text-lg font-mono text-gray-900">{selectedProduct.barcode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Batch Number</label>
                    <p className="text-lg text-gray-900">{selectedProduct.batchNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-lg text-gray-900">{selectedProduct.location}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Stock</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedProduct.currentStock} units</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Minimum Stock</label>
                    <p className="text-lg text-gray-900">{selectedProduct.minStock} units</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Supplier</label>
                    <p className="text-lg text-gray-900">{selectedProduct.supplier}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Expiry Date</label>
                    <p className="text-lg text-gray-900">{selectedProduct.expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* Stock Level Indicator */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Stock Level</span>
                  <span className="text-sm text-gray-600">
                    {selectedProduct.currentStock} / {selectedProduct.minStock} units
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      selectedProduct.currentStock <= selectedProduct.minStock * 0.2 ? 'bg-red-500' :
                      selectedProduct.currentStock <= selectedProduct.minStock * 0.5 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min((selectedProduct.currentStock / selectedProduct.minStock) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowProductDetails(false);
                    handleEditProduct(selectedProduct.id);
                  }}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <i className="ri-edit-line mr-2"></i>
                  Edit Product
                </button>
                <button
                  onClick={() => {
                    setShowProductDetails(false);
                    handleRestockProduct(selectedProduct.id);
                  }}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <i className="ri-add-line mr-2"></i>
                  Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Restock Product</h2>
                <button
                  onClick={() => setShowRestockModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedProduct.name}</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Current Stock:</span>
                      <span className="font-medium ml-2">{selectedProduct.currentStock}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Min Stock:</span>
                      <span className="font-medium ml-2">{selectedProduct.minStock}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restock Amount
                </label>
                <input
                  type="number"
                  min="1"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(e.target.value)}
                  placeholder="Enter quantity to add"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {restockAmount && (
                  <p className="text-sm text-gray-600 mt-2">
                    New stock level: {selectedProduct.currentStock + parseInt(restockAmount || '0')} units
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRestockModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRestock}
                  disabled={!restockAmount || parseInt(restockAmount) <= 0}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-add-line mr-2"></i>
                  Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </ProtectedRoute>
  );
}