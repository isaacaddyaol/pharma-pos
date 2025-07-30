'use client';

import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import DashboardStats from './DashboardStats';
import RecentSales from './RecentSales';
import InventoryAlerts from './InventoryAlerts';
import SalesChart from './SalesChart';
import TopProducts from './TopProducts';

export default function Dashboard() {
  const router = useRouter();

  const handleNewSale = () => {
    router.push('/sales');
  };

  return (
    <ProtectedRoute requiredPermission="dashboard">
      <div className="min-h-screen bg-gray-50">
        <Header onNewSale={handleNewSale} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your pharmacy today.</p>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Sales Chart */}
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            
            {/* Inventory Alerts */}
            <div>
              <InventoryAlerts />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Sales */}
            <RecentSales />
            
            {/* Top Products */}
            <TopProducts />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}