'use client';

import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (productData: any) => void;
  product?: any;
  isEdit?: boolean;
}

export default function AddProductModal({ isOpen, onClose, onSubmit, product, isEdit = false }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    barcode: '',
    currentStock: '',
    minStock: '',
    price: '',
    supplier: '',
    expiryDate: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        barcode: product.barcode || '',
        currentStock: product.currentStock?.toString() || '',
        minStock: product.minStock?.toString() || '',
        price: product.price?.toString() || '',
        supplier: product.supplier || '',
        expiryDate: product.expiryDate || '',
        description: product.description || ''
      });
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        category: '',
        barcode: '',
        currentStock: '',
        minStock: '',
        price: '',
        supplier: '',
        expiryDate: '',
        description: ''
      });
    }
    setErrors({});
  }, [isEdit, product, isOpen]);

  const categoryOptions = [
    { value: '', label: 'Select category' },
    { value: 'Pain Relief', label: 'Pain Relief' },
    { value: 'Vitamins', label: 'Vitamins' },
    { value: 'Antibiotics', label: 'Antibiotics' },
    { value: 'Diabetes Care', label: 'Diabetes Care' },
    { value: 'Medical Devices', label: 'Medical Devices' },
    { value: 'First Aid', label: 'First Aid' },
    { value: 'Skincare', label: 'Skincare' },
    { value: 'Cold & Flu', label: 'Cold & Flu' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.barcode.trim()) newErrors.barcode = 'Barcode is required';
    if (!formData.currentStock || parseInt(formData.currentStock) < 0) newErrors.currentStock = 'Valid current stock is required';
    if (!formData.minStock || parseInt(formData.minStock) < 0) newErrors.minStock = 'Valid minimum stock is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.supplier.trim()) newErrors.supplier = 'Supplier is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const submitData = isEdit ? { ...formData, id: product?.id } : formData;
      onSubmit?.(submitData);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Product" : "Add New Product"} size="lg">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            error={errors.name}
          />

          <Select
            label="Category *"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={categoryOptions}
            error={errors.category}
          />

          <Input
            label="Barcode *"
            name="barcode"
            value={formData.barcode}
            onChange={handleInputChange}
            placeholder="Enter barcode"
            error={errors.barcode}
          />

          <Input
            label="Current Stock *"
            type="number"
            name="currentStock"
            value={formData.currentStock}
            onChange={handleInputChange}
            placeholder="Enter current stock"
            min="0"
            error={errors.currentStock}
          />

          <Input
            label="Minimum Stock *"
            type="number"
            name="minStock"
            value={formData.minStock}
            onChange={handleInputChange}
            placeholder="Enter minimum stock level"
            min="0"
            error={errors.minStock}
          />

          <Input
            label="Price *"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            error={errors.price}
          />

          <Input
            label="Supplier *"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            placeholder="Enter supplier name"
            error={errors.supplier}
          />

          <Input
            label="Expiry Date *"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            error={errors.expiryDate}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="Enter product description (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {isEdit ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}