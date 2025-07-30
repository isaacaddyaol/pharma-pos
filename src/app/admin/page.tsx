'use client';

import { useState } from 'react';
import Header from '../../components/layout/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import ConfirmModal from '../../components/ui/ConfirmModal';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@pharmacy.com',
      role: 'owner',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['dashboard', 'inventory', 'sales', 'reports', 'admin']
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@pharmacy.com',
      role: 'salesperson',
      status: 'active',
      lastLogin: '2024-01-15 13:45',
      permissions: ['sales', 'inventory']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@pharmacy.com',
      role: 'salesperson',
      status: 'inactive',
      lastLogin: '2024-01-14 16:20',
      permissions: ['sales', 'inventory']
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'salesperson',
    password: '',
    confirmPassword: ''
  });

  const roleOptions = [
    { value: 'owner', label: 'Pharmacy Owner' },
    { value: 'salesperson', label: 'Sales Person' }
  ];

  const permissionsByRole = {
    owner: ['dashboard', 'inventory', 'sales', 'reports', 'admin'],
    salesperson: ['sales', 'inventory']
  };

  const handleAddUser = () => {
    const newUserData = {
      id: users.length + 1,
      ...newUser,
      status: 'active',
      lastLogin: 'Never',
      permissions: permissionsByRole[newUser.role as keyof typeof permissionsByRole]
    };
    setUsers([...users, newUserData]);
    setNewUser({ name: '', email: '', role: 'salesperson', password: '', confirmPassword: '' });
    setShowAddUserModal(false);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: string) => {
    return role === 'owner' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, roles, and system permissions.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-check-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sales Staff</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'salesperson').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-team-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Owners</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'owner').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-vip-crown-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-user-settings-line mr-2"></i>
                User Management
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'permissions'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <i className="ri-shield-user-line mr-2"></i>
                Role Permissions
              </button>
            </div>
          </div>
        </div>

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                <Button onClick={() => setShowAddUserModal(true)}>
                  <i className="ri-user-add-line mr-2"></i>
                  Add User
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          {user.role === 'owner' ? 'Pharmacy Owner' : 'Sales Person'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                            title="Edit User"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`p-1 rounded transition-colors ${
                              user.status === 'active' 
                                ? 'text-red-600 hover:text-red-900 hover:bg-red-50' 
                                : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                            }`}
                            title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            <i className={user.status === 'active' ? 'ri-user-forbid-line' : 'ri-user-check-line'}></i>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete User"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Role Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Role Permissions</h2>
            
            <div className="space-y-8">
              <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-vip-crown-line text-purple-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Pharmacy Owner</h3>
                </div>
                <p className="text-gray-600 mb-4">Full access to all system features and administrative functions.</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {permissionsByRole.owner.map((permission) => (
                    <div key={permission} className="flex items-center bg-white p-3 rounded-lg">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      <span className="text-sm font-medium capitalize">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-team-line text-blue-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Person</h3>
                </div>
                <p className="text-gray-600 mb-4">Limited access to sales and inventory management functions.</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {permissionsByRole.salesperson.map((permission) => (
                    <div key={permission} className="flex items-center bg-white p-3 rounded-lg">
                      <i className="ri-check-line text-green-600 mr-2"></i>
                      <span className="text-sm font-medium capitalize">{permission}</span>
                    </div>
                  ))}
                  {permissionsByRole.owner.filter(p => !permissionsByRole.salesperson.includes(p)).map((permission) => (
                    <div key={permission} className="flex items-center bg-gray-100 p-3 rounded-lg opacity-50">
                      <i className="ri-close-line text-red-600 mr-2"></i>
                      <span className="text-sm font-medium capitalize">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add User Modal */}
      <Modal 
        isOpen={showAddUserModal} 
        onClose={() => setShowAddUserModal(false)} 
        title="Add New User"
        size="lg"
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              placeholder="Enter full name"
            />
            <Input
              label="Email Address"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          
          <Select
            label="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            options={roleOptions}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              placeholder="Enter password"
            />
            <Input
              label="Confirm Password"
              type="password"
              value={newUser.confirmPassword}
              onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
              placeholder="Confirm password"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Permissions for {newUser.role === 'owner' ? 'Pharmacy Owner' : 'Sales Person'}:</h4>
            <div className="flex flex-wrap gap-2">
              {permissionsByRole[newUser.role as keyof typeof permissionsByRole].map((permission) => (
                <span key={permission} className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                  <i className="ri-check-line mr-1"></i>
                  {permission}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}