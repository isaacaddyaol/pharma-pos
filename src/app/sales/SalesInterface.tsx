'use client';

import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function SalesInterface() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Aspirin 500mg',
      price: 15.99,
      quantity: 2,
      barcode: '123456789012'
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      price: 12.50,
      quantity: 1,
      barcode: '123456789013'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const products = [
    { id: 1, name: 'Aspirin 500mg', price: 15.99, stock: 12, barcode: '123456789012' },
    { id: 2, name: 'Vitamin C 1000mg', price: 12.50, stock: 85, barcode: '123456789013' },
    { id: 3, name: 'Paracetamol 500mg', price: 8.99, stock: 156, barcode: '123456789014' },
    { id: 4, name: 'Insulin Pen', price: 80.00, stock: 8, barcode: '123456789015' },
    { id: 5, name: 'Blood Pressure Monitor', price: 120.00, stock: 15, barcode: '123456789016' }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Process checkout
    console.log('Processing checkout...', { cart, customerInfo, paymentMethod, total });
    // Reset cart and customer info
    setCart([]);
    setCustomerInfo({ name: '', phone: '', email: '' });
    alert('Transaction completed successfully!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Product Search & Selection */}
      <div className="lg:col-span-2 order-2 lg:order-1">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Product Selection</h2>
            <Button 
              size="sm"
              icon="ri-barcode-line"
              onClick={() => console.log('Open barcode scanner')}
            >
              <span className="hidden sm:inline">Scan Barcode</span>
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search products by name or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="ri-search-line"
            />
          </div>

          {/* Product List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => addToCart(product)}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Stock: {product.stock} • ${product.price}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  icon="ri-add-circle-line"
                  className="!p-2 text-indigo-600 hover:text-indigo-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
        {/* Cart */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Cart</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <i className="ri-shopping-cart-line text-3xl sm:text-4xl text-gray-300 mb-2"></i>
              <p className="text-gray-500 text-sm sm:text-base">Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      icon="ri-subtract-line"
                      className="!p-1 w-6 h-6 text-gray-600 hover:text-red-600"
                    />
                    <span className="w-6 sm:w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      icon="ri-add-line"
                      className="!p-1 w-6 h-6 text-gray-600 hover:text-green-600"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                      icon="ri-delete-bin-line"
                      className="!p-1 w-6 h-6 text-gray-600 hover:text-red-600 ml-1 sm:ml-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          {cart.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
          <div className="space-y-3">
            <Input
              placeholder="Customer name (optional)"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            />
            <Input
              type="tel"
              placeholder="Phone number (optional)"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            />
            <Input
              type="email"
              placeholder="Email (optional)"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Cash</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Credit/Debit Card</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="insurance"
                checked={paymentMethod === 'insurance'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Insurance</span>
            </label>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="w-full py-3 text-base font-semibold"
          size="lg"
        >
          Complete Sale (${total.toFixed(2)})
        </Button>
      </div>
    </div>
  );
}