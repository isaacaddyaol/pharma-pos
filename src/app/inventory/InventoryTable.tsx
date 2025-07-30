'use client';

import { useState } from 'react';
import Button from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';

interface InventoryTableProps {
  searchTerm: string;
  categoryFilter: string;
  stockFilter: string;
  products: any[];
  onViewProduct?: (productId: number) => void;
  onEditProduct?: (productId: number) => void;
  onDeleteProduct?: (productId: number) => void;
  onRestockProduct?: (productId: number) => void;
}

export default function InventoryTable({ 
  searchTerm, 
  categoryFilter, 
  stockFilter,
  products,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  onRestockProduct 
}: InventoryTableProps) {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Remove the hardcoded products array since it's now passed as props
  const allProducts = products.length > 0 ? products : [
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
      status: 'critical'
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
      status: 'low'
    },
    {
      id: 3,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      barcode: '123456789014',
      currentStock: 156,
      minStock: 200,
      price: 8.99,
      supplier: 'MedSupply Co',
      expiryDate: '2025-03-20',
      status: 'in-stock'
    },
    {
      id: 4,
      name: 'Insulin Pen',
      category: 'Diabetes Care',
      barcode: '123456789015',
      currentStock: 8,
      minStock: 30,
      price: 80.00,
      supplier: 'DiabetesCare Ltd',
      expiryDate: '2025-09-10',
      status: 'critical'
    },
    {
      id: 5,
      name: 'Blood Pressure Monitor',
      category: 'Medical Devices',
      barcode: '123456789016',
      currentStock: 15,
      minStock: 25,
      price: 120.00,
      supplier: 'MedTech Solutions',
      expiryDate: '2027-01-01',
      status: 'low'
    },
    {
      id: 6,
      name: 'Thermometer Digital',
      category: 'Medical Devices',
      barcode: '123456789017',
      currentStock: 45,
      minStock: 20,
      price: 15.00,
      supplier: 'MedTech Solutions',
      expiryDate: '2026-08-15',
      status: 'in-stock'
    },
    {
      id: 7,
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      barcode: '123456789018',
      currentStock: 0,
      minStock: 50,
      price: 25.99,
      supplier: 'Pharma Direct',
      expiryDate: '2025-04-30',
      status: 'out-of-stock'
    },
    {
      id: 8,
      name: 'Omega-3 Fish Oil',
      category: 'Vitamins',
      barcode: '123456789019',
      currentStock: 120,
      minStock: 80,
      price: 22.50,
      supplier: 'HealthPlus Inc',
      expiryDate: '2025-10-15',
      status: 'in-stock'
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase().replace(' ', '-') === categoryFilter;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'in-stock' && product.status === 'in-stock') ||
                        (stockFilter === 'low-stock' && product.status === 'low') ||
                        (stockFilter === 'out-of-stock' && product.status === 'out-of-stock');
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'out-of-stock':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Mobile Card View */}
      <div className="block md:hidden">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border-b border-gray-200 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                {product.status === 'in-stock' ? 'In Stock' : 
                 product.status === 'low' ? 'Low Stock' : 
                 product.status === 'critical' ? 'Critical' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500">Stock:</span> {product.currentStock}/{product.minStock}
              </div>
              <div>
                <span className="text-gray-500">Price:</span> ${product.price}
              </div>
              <div>
                <span className="text-gray-500">Barcode:</span> {product.barcode}
              </div>
              <div>
                <span className="text-gray-500">Expires:</span> {product.expiryDate}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{product.supplier}</span>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onViewProduct?.(product.id)}
                  icon="ri-eye-line"
                  className="!p-2 text-blue-600 hover:text-blue-700"
                  title="View Details"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditProduct?.(product.id)}
                  icon="ri-edit-line"
                  className="!p-2 text-indigo-600 hover:text-indigo-700"
                  title="Edit Product"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRestockProduct?.(product.id)}
                  icon="ri-add-line"
                  className="!p-2 text-green-600 hover:text-green-700"
                  title="Restock"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteProduct?.(product.id)}
                  icon="ri-delete-bin-line"
                  className="!p-2 text-red-600 hover:text-red-700"
                  title="Delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header className="cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Product Name
                  <i className="ri-arrow-up-down-line ml-1 text-gray-400"></i>
                </div>
              </TableCell>
              <TableCell header>Category</TableCell>
              <TableCell header>Barcode</TableCell>
              <TableCell header className="cursor-pointer" onClick={() => handleSort('currentStock')}>
                <div className="flex items-center">
                  Stock
                  <i className="ri-arrow-up-down-line ml-1 text-gray-400"></i>
                </div>
              </TableCell>
              <TableCell header className="cursor-pointer" onClick={() => handleSort('price')}>
                <div className="flex items-center">
                  Price
                  <i className="ri-arrow-up-down-line ml-1 text-gray-400"></i>
                </div>
              </TableCell>
              <TableCell header>Supplier</TableCell>
              <TableCell header>Expiry Date</TableCell>
              <TableCell header>Status</TableCell>
              <TableCell header>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{product.name}</div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="font-mono">{product.barcode}</div>
                </TableCell>
                <TableCell>
                  {product.currentStock} / {product.minStock}
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>{product.expiryDate}</TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status === 'in-stock' ? 'In Stock' : 
                     product.status === 'low' ? 'Low Stock' : 
                     product.status === 'critical' ? 'Critical' : 'Out of Stock'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewProduct?.(product.id)}
                      icon="ri-eye-line"
                      className="!p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      title="View Details"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditProduct?.(product.id)}
                      icon="ri-edit-line"
                      className="!p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                      title="Edit Product"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRestockProduct?.(product.id)}
                      icon="ri-add-line"
                      className="!p-2 text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                      title="Restock"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteProduct?.(product.id)}
                      icon="ri-delete-bin-line"
                      className="!p-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No products found</div>
          <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
}