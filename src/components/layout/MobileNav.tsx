'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function MobileNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  // Role-based navigation
  const getNavigationItems = () => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard', icon: 'ri-dashboard-line', color: 'bg-blue-500' },
      { name: 'Inventory', href: '/inventory', icon: 'ri-medicine-bottle-line', color: 'bg-green-500' },
      { name: 'Sales', href: '/sales', icon: 'ri-shopping-cart-line', color: 'bg-purple-500' }
    ];

    if (user?.role === 'owner') {
      return [
        ...baseNavigation,
        { name: 'Reports', href: '/reports', icon: 'ri-bar-chart-line', color: 'bg-orange-500' },
        { name: 'Admin', href: '/admin', icon: 'ri-settings-line', color: 'bg-red-500' }
      ];
    }

    return baseNavigation;
  };

  const navigation = getNavigationItems();
  const isActive = (href: string) => pathname === href;

  // Close nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        handleCloseNav();
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isNavOpen]);

  // Close nav on route change
  useEffect(() => {
    handleCloseNav();
  }, [pathname]);

  const handleOpenNav = () => {
    setIsNavOpen(true);
    setIsClosing(false);
  };

  const handleCloseNav = () => {
    if (isNavOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsNavOpen(false);
        setIsClosing(false);
      }, 300);
    }
  };

  // Don&apos;t render navigation if user is not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpenNav}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 md:hidden z-50 flex items-center justify-center group"
        aria-label="Open navigation menu"
      >
        <i className="ri-menu-line text-xl group-hover:scale-110 transition-transform"></i>
      </button>

      {/* Backdrop */}
      {isNavOpen && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 md:hidden z-40 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleCloseNav}
        />
      )}

      {/* Bottom Navigation Panel */}
      {isNavOpen && (
        <div 
          ref={navRef}
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl md:hidden z-50 transform transition-all duration-300 ease-out ${
            isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
              <p className="text-sm text-gray-500">Quick access to all sections</p>
            </div>
            <button
              onClick={handleCloseNav}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close navigation"
            >
              <i className="ri-close-line text-gray-600"></i>
            </button>
          </div>

          {/* Navigation Grid */}
          <div className="px-4 py-6">
            {navigation.length === 3 ? (
              // For 3 items (salesperson): Single centered row
              <div className="flex justify-center items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-200 w-20 ${
                      isActive(item.href)
                        ? 'bg-indigo-50 border-2 border-indigo-200 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full"></div>
                    )}
                    
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                      <i className={`${item.icon} text-white text-xl`}></i>
                    </div>
                    
                    {/* Label */}
                    <span className={`text-xs font-medium text-center leading-tight ${
                      isActive(item.href) ? 'text-indigo-700' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Active page indicator */}
                    {isActive(item.href) && (
                      <span className="text-xs text-indigo-500 mt-1">Current</span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              // For 5 items (owner): 3 on top row, 2 on bottom row, all centered
              <div className="space-y-4">
                {/* Top row - 3 items */}
                <div className="flex justify-center items-center gap-4">
                  {navigation.slice(0, 3).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-200 w-20 ${
                        isActive(item.href)
                          ? 'bg-indigo-50 border-2 border-indigo-200 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive(item.href) && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full"></div>
                      )}
                      
                      {/* Icon container */}
                      <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-2 shadow-sm`}>
                        <i className={`${item.icon} text-white text-lg`}></i>
                      </div>
                      
                      {/* Label */}
                      <span className={`text-xs font-medium text-center leading-tight ${
                        isActive(item.href) ? 'text-indigo-700' : 'text-gray-700'
                      }`}>
                        {item.name}
                      </span>
                      
                      {/* Active page indicator */}
                      {isActive(item.href) && (
                        <span className="text-xs text-indigo-500 mt-1">Current</span>
                      )}
                    </Link>
                  ))}
                </div>
                
                {/* Bottom row - 2 items centered */}
                <div className="flex justify-center items-center gap-4">
                  {navigation.slice(3).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-200 w-20 ${
                        isActive(item.href)
                          ? 'bg-indigo-50 border-2 border-indigo-200 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive(item.href) && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full"></div>
                      )}
                      
                      {/* Icon container */}
                      <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-2 shadow-sm`}>
                        <i className={`${item.icon} text-white text-lg`}></i>
                      </div>
                      
                      {/* Label */}
                      <span className={`text-xs font-medium text-center leading-tight ${
                        isActive(item.href) ? 'text-indigo-700' : 'text-gray-700'
                      }`}>
                        {item.name}
                      </span>
                      
                      {/* Active page indicator */}
                      {isActive(item.href) && (
                        <span className="text-xs text-indigo-500 mt-1">Current</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-t-3xl">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safe area for devices with home indicator */}
          <div className="h-safe-area-inset-bottom"></div>
        </div>
      )}
    </>
  );
}