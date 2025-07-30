'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pharmacyName: '',
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Show loading while checking authentication
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogin = () => {
    setShowLoginModal(true);
    setLoginError('');
  };

  const handleSignup = () => {
    setShowSignupModal(true);
  };

  const handleGetStarted = () => {
    setShowSignupModal(true);
  };

  const handleLearnMore = () => {
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        setShowLoginModal(false);
        router.push('/dashboard');
      } else {
        setLoginError('Invalid email or password. Try: sarah@pharmacy.com or mike@pharmacy.com');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      setSignupLoading(false);
      return;
    }

    if (uploadedFiles.length === 0) {
      setSignupError('Please upload your pharmacy license or certificate');
      setSignupLoading(false);
      return;
    }

    try {
      // Simulate API call for signup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, automatically log in the new user
      const success = await login(signupData.email, signupData.password);
      if (success) {
        setShowSignupModal(false);
        router.push('/dashboard');
      } else {
        setSignupError('Account created but login failed. Please try logging in manually.');
      }
    } catch (error) {
      setSignupError('Signup failed. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    
    if (validFiles.length !== files.length) {
      setSignupError('Please upload only PDF, JPG, or PNG files under 5MB');
      return;
    }
    
    setUploadedFiles([...uploadedFiles, ...validFiles]);
    setSignupError('');
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600" style={{ fontFamily: 'Pacifico, serif' }}>
                PharmaPOS
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg transition-colors hover:bg-gray-50"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-indigo-200 opacity-20">
            <i className="ri-medicine-bottle-line text-6xl"></i>
          </div>
          <div className="absolute top-20 right-20 text-blue-200 opacity-20">
            <i className="ri-stethoscope-line text-5xl"></i>
          </div>
          <div className="absolute bottom-20 left-20 text-purple-200 opacity-20">
            <i className="ri-capsule-line text-4xl"></i>
          </div>
          <div className="absolute bottom-10 right-10 text-indigo-200 opacity-20">
            <i className="ri-heart-pulse-line text-5xl"></i>
          </div>
          <div className="absolute top-1/2 left-1/4 text-blue-200 opacity-15">
            <i className="ri-microscope-line text-7xl"></i>
          </div>
          <div className="absolute top-1/3 right-1/4 text-purple-200 opacity-15">
            <i className="ri-test-tube-line text-6xl"></i>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/3 w-2 h-2 bg-indigo-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-32 right-1/3 w-3 h-3 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-24 left-1/2 w-2 h-2 bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-24 right-1/2 w-1 h-1 bg-indigo-400 rounded-full opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Pharmacy
              <span className="block text-indigo-600">POS System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete inventory management solution with real-time stock tracking, automated reorder alerts, barcode scanning, and comprehensive sales reporting for modern pharmacies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <i className="ri-rocket-line mr-2"></i>
                Get Started
              </button>
              <button
                onClick={handleLearnMore}
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <i className="ri-information-line mr-2"></i>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 text-gray-100 opacity-50">
            <i className="ri-bar-chart-line text-8xl"></i>
          </div>
          <div className="absolute bottom-10 left-10 text-gray-100 opacity-50">
            <i className="ri-pie-chart-line text-7xl"></i>
          </div>
          <div className="absolute top-1/2 right-1/4 text-gray-100 opacity-30">
            <i className="ri-line-chart-line text-9xl"></i>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-20 blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete POS Solution
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your pharmacy efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-bar-chart-line text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Stock Tracking</h3>
              <p className="text-gray-600">
                Monitor inventory levels in real-time with automatic updates after each transaction and comprehensive stock management.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-alarm-warning-line text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Low Inventory Alerts</h3>
              <p className="text-gray-600">
                Get instant notifications when stock levels drop below minimum thresholds to prevent stockouts.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-barcode-line text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Barcode Scanning</h3>
              <p className="text-gray-600">
                Quick and accurate product identification with integrated barcode scanning for faster transactions.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-refresh-line text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Auto Reorder Suggestions</h3>
              <p className="text-gray-600">
                Intelligent reorder recommendations based on sales patterns and stock levels to optimize inventory.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-file-chart-line text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sales Reporting</h3>
              <p className="text-gray-600">
                Comprehensive sales reports with detailed analytics and insights to help grow your business.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-dashboard-line text-indigo-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intuitive Dashboard</h3>
              <p className="text-gray-600">
                User-friendly dashboard with visual charts and key metrics for quick business insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 relative overflow-hidden">
        {/* Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-indigo-400 opacity-20">
            <i className="ri-shopping-cart-line text-6xl"></i>
          </div>
          <div className="absolute top-20 right-20 text-indigo-400 opacity-20">
            <i className="ri-barcode-line text-5xl"></i>
          </div>
          <div className="absolute bottom-20 left-20 text-indigo-400 opacity-20">
            <i className="ri-dashboard-line text-4xl"></i>
          </div>
          <div className="absolute bottom-10 right-10 text-indigo-400 opacity-20">
            <i className="ri-file-chart-line text-5xl"></i>
          </div>
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-20 h-20 border-2 border-indigo-400 opacity-20 rotate-45"></div>
          <div className="absolute bottom-16 right-1/4 w-16 h-16 bg-indigo-400 opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 right-16 w-12 h-12 border-2 border-indigo-400 opacity-20 rotate-12"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Modernize Your Pharmacy?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of pharmacies using our POS system to streamline operations and boost efficiency.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <i className="ri-arrow-right-line mr-2"></i>
            Start Using POS System
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 text-gray-700 opacity-30">
            <i className="ri-hospital-line text-5xl"></i>
          </div>
          <div className="absolute bottom-10 left-10 text-gray-700 opacity-30">
            <i className="ri-first-aid-kit-line text-4xl"></i>
          </div>
          <div className="absolute top-1/2 left-1/4 text-gray-700 opacity-20">
            <i className="ri-health-book-line text-6xl"></i>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4" style={{ fontFamily: 'Pacifico, serif' }}>
                PharmaPOS
              </div>
              <p className="text-gray-400">
                Modern POS system designed specifically for pharmacy inventory management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Inventory Tracking</li>
                <li>Sales Management</li>
                <li>Barcode Scanning</li>
                <li>Reporting</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Training</li>
                <li>Technical Support</li>
                <li>Updates</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@pharmapos.com</li>
                <li>1-800-PHARMA</li>
                <li>24/7 Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PharmaPOS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <p className="text-gray-600 mt-2">Sign in to your PharmaPOS account</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{loginError}</p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm font-medium mb-1">Demo Accounts:</p>
                  <p className="text-blue-700 text-xs">Owner: sarah@pharmacy.com (any password)</p>
                  <p className="text-blue-700 text-xs">Sales: mike@pharmacy.com (any password)</p>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="ri-login-circle-line mr-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowSignupModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
                <button
                  onClick={() => setShowSignupModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <p className="text-gray-600 mt-2">Create your PharmaPOS account</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                      placeholder="First name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                      placeholder="Last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacy Name *
                  </label>
                  <input
                    type="text"
                    value={signupData.pharmacyName}
                    onChange={(e) => setSignupData({...signupData, pharmacyName: e.target.value})}
                    placeholder="Enter your pharmacy name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacy License Number *
                  </label>
                  <input
                    type="text"
                    value={signupData.licenseNumber}
                    onChange={(e) => setSignupData({...signupData, licenseNumber: e.target.value})}
                    placeholder="Enter your license number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>

                {/* Certificate/License Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacy License/Certificate *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="certificate-upload"
                    />
                    <label htmlFor="certificate-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <i className="ri-upload-cloud-2-line text-3xl text-gray-400 mb-2"></i>
                        <p className="text-sm font-medium text-gray-700">Upload License/Certificate</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 5MB each</p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <i className={`${
                              file.type === 'application/pdf' ? 'ri-file-pdf-line text-red-600' :
                              'ri-image-line text-blue-600'
                            } mr-2`}></i>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      placeholder="Create a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {signupError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{signupError}</p>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <i className="ri-information-line text-amber-600 mt-0.5 mr-2"></i>
                    <div>
                      <p className="text-amber-800 text-sm font-medium">License Verification</p>
                      <p className="text-amber-700 text-xs mt-1">
                        Your pharmacy license will be verified within 24-48 hours. You&apos;ll receive an email confirmation once approved.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" required />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <button type="button" className="text-indigo-600 hover:text-indigo-700">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-indigo-600 hover:text-indigo-700">
                      Privacy Policy
                    </button>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {signupLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="ri-user-add-line mr-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setShowSignupModal(false);
                      setShowLoginModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}