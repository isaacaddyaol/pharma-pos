'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onNewSale?: () => void;
  onPrintReceipt?: () => void;
  onScanBarcode?: () => void;
  onAddProduct?: () => void;
  onExportReport?: () => void;
}

export default function Header({
  onNewSale,
  onPrintReceipt,
  onScanBarcode,
  onAddProduct,
  onExportReport
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Role-based navigation
  const getNavigationItems = () => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Inventory', href: '/inventory' },
      { name: 'Sales', href: '/sales' }
    ];

    if (user?.role === 'owner') {
      return [
        ...baseNavigation,
        { name: 'Reports', href: '/reports' },
        { name: 'Admin', href: '/admin' }
      ];
    }

    return baseNavigation;
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const navigation = getNavigationItems();

  const isActive = (href: string) => pathname === href;

  const renderActionButtons = () => {
    switch (pathname) {
      case '/dashboard':
        return onNewSale && (
          <Button onClick={onNewSale} size="sm">
            New Sale
          </Button>
        );
      case '/inventory':
        return (
          <div className="flex items-center space-x-2">
            {onScanBarcode && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onScanBarcode}
                icon="ri-barcode-line"
                className="hidden sm:inline-flex"
              >
                Scan Barcode
              </Button>
            )}
            {onAddProduct && (
              <Button onClick={onAddProduct} size="sm">
                Add Product
              </Button>
            )}
          </div>
        );
      case '/sales':
        return onPrintReceipt && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onPrintReceipt}
            icon="ri-printer-line"
          >
            <span className="hidden sm:inline">Print Receipt</span>
          </Button>
        );
      case '/reports':
        return onExportReport && (
          <Button
            onClick={onExportReport}
            size="sm"
            icon="ri-download-line"
          >
            <span className="hidden sm:inline">Export Report</span>
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-indigo-600 mr-8"
                style={{ fontFamily: 'Pacifico, serif' }}
              >
                PharmaPOS
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors ${isActive(item.href)
                      ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                      : 'text-gray-700 hover:text-indigo-600'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Action Buttons */}
              {renderActionButtons()}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 relative z-50"
              >
                <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors relative">
                  <i className="ri-notification-line text-xl"></i>
                  {hasNotifications && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                </button>
              </div>

              {/* Enhanced User Profile */}
              {user && (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <div className="relative">
                      {/* Avatar with status indicator */}
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:shadow-xl transition-shadow">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user?.initials
                        )}
                      </div>

                      {/* Status indicator */}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${user?.onlineStatus === 'online' ? 'bg-green-500' :
                        user?.onlineStatus === 'away' ? 'bg-yellow-500' :
                          user?.onlineStatus === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                    </div>

                    {/* User info (hidden on mobile) */}
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {user?.name.split(' ')[0]}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role === 'owner' ? 'Pharmacy Owner' : 'Sales Person'}</p>
                    </div>

                    {/* Dropdown arrow */}
                    <i className={`ri-arrow-down-s-line text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''
                      }`}></i>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <>
                      {/* Backdrop for mobile */}
                      <div
                        className="fixed inset-0 z-30 md:hidden"
                        onClick={() => setIsProfileOpen(false)}
                      />

                      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-40 transform transition-all duration-200 origin-top-right">
                        {/* User Info Header */}
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {user?.avatar ? (
                                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                  user?.initials
                                )}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user?.onlineStatus === 'online' ? 'bg-green-500' :
                                user?.onlineStatus === 'away' ? 'bg-yellow-500' :
                                  user?.onlineStatus === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                                }`}></div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                              <p className="text-sm text-gray-600 capitalize">{user?.role === 'owner' ? 'Pharmacy Owner' : 'Sales Person'}</p>
                              <p className="text-xs text-gray-500">Active now</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 group">
                            <i className="ri-user-settings-line text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
                            <span className="text-gray-700 group-hover:text-gray-900">Profile Settings</span>
                          </button>

                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 group">
                            <i className="ri-notification-3-line text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
                            <span className="text-gray-700 group-hover:text-gray-900">Notifications</span>
                            {hasNotifications && (
                              <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">3</span>
                            )}
                          </button>

                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 group">
                            <i className="ri-settings-3-line text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
                            <span className="text-gray-700 group-hover:text-gray-900">Preferences</span>
                          </button>

                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 group">
                            <i className="ri-question-line text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
                            <span className="text-gray-700 group-hover:text-gray-900">Help & Support</span>
                          </button>

                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button
                              onClick={() => {
                                logout();
                                setIsProfileOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 group"
                            >
                              <i className="ri-logout-box-line text-gray-400 group-hover:text-red-600 transition-colors"></i>
                              <span className="text-gray-700 group-hover:text-red-600">Sign Out</span>
                            </button>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="border-t border-gray-100 p-4 bg-gray-50">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-lg font-bold text-indigo-600">24</p>
                              <p className="text-xs text-gray-500">Sales Today</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-green-600">$2,847</p>
                              <p className="text-xs text-gray-500">Revenue</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-purple-600">98%</p>
                              <p className="text-xs text-gray-500">Accuracy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="pt-20 pb-6 px-4">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors text-lg ${isActive(item.href)
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}