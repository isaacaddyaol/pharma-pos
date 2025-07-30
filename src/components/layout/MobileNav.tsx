'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function MobileNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  // Role-based navigation
  const getNavigationItems = () => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard', icon: 'ri-dashboard-line' },
      { name: 'Inventory', href: '/inventory', icon: 'ri-medicine-bottle-line' },
      { name: 'Sales', href: '/sales', icon: 'ri-shopping-cart-line' }
    ];

    if (user?.role === 'owner') {
      return [
        ...baseNavigation,
        { name: 'Reports', href: '/reports', icon: 'ri-bar-chart-line' },
        { name: 'Admin', href: '/admin', icon: 'ri-settings-line' }
      ];
    }

    return baseNavigation;
  };

  const navigation = getNavigationItems();

  const isActive = (href: string) => pathname === href;

  // Handle scroll to auto-hide/show navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle touch gestures for swipe up from bottom
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStartY(touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchEndY(touch.clientY);
    };

    const handleTouchEnd = () => {
      if (!touchStartY || !touchEndY) return;
      
      const swipeDistance = touchStartY - touchEndY;
      const swipeThreshold = 50;
      const bottomThreshold = window.innerHeight - 100; // Bottom 100px of screen
      
      // Check if swipe started from bottom of screen and was upward
      if (touchStartY > bottomThreshold && swipeDistance > swipeThreshold) {
        setIsVisible(true);
      }
      
      // Reset touch values
      setTouchStartY(0);
      setTouchEndY(0);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStartY, touchEndY]);

  // Auto-hide after 3 seconds of inactivity
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Show nav on page load briefly
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Don't render navigation if user is not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div 
        ref={navRef}
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onMouseEnter={() => setIsVisible(true)}
        onTouchStart={() => setIsVisible(true)}
      >
        <div className="grid grid-cols-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-3 px-1 text-xs transition-colors ${
                isActive(item.href)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
              onClick={() => {
                // Keep nav visible briefly after navigation
                setIsVisible(true);
                setTimeout(() => setIsVisible(false), 1500);
              }}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Swipe indicator */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* Swipe up area - invisible touch target at bottom of screen */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-6 md:hidden z-30"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          setTouchStartY(touch.clientY);
        }}
        onTouchEnd={() => setIsVisible(true)}
      />

      {/* No padding needed since nav is hidden by default */}
    </>
  );
}