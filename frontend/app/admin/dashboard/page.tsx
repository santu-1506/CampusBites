"use client"
import React, { useState } from 'react';
import { Users, Store, BarChart3, Settings, Search, Filter, Eye, Check, X, TrendingUp, DollarSign, ShoppingBag, UserCheck, Menu, Bell, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@student.uni.edu', role: 'Student', status: 'active', joinDate: '2024-01-15', orders: 24 },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@student.uni.edu', role: 'Student', status: 'active', joinDate: '2024-02-20', orders: 18 },
    { id: 3, name: 'Mike Johnson', email: 'mike@student.uni.edu', role: 'Student', status: 'inactive', joinDate: '2024-01-10', orders: 5 },
    { id: 4, name: 'Emily Chen', email: 'emily@student.uni.edu', role: 'Student', status: 'active', joinDate: '2024-03-01', orders: 31 },
    { id: 5, name: 'David Brown', email: 'david@student.uni.edu', role: 'Student', status: 'active', joinDate: '2024-02-15', orders: 12 }
  ];

  const vendors = [
    { id: 1, name: 'EI Block Canteen', email: 'eiblock@campus.edu', status: 'pending', rating: 4.5, orders: 156, joinDate: '2024-03-15' },
    { id: 2, name: 'Main Campus Cafe', email: 'maincafe@campus.edu', status: 'approved', rating: 4.2, orders: 203, joinDate: '2024-02-10' },
    { id: 3, name: 'Quick Bites Corner', email: 'quickbites@campus.edu', status: 'approved', rating: 4.7, orders: 89, joinDate: '2024-03-20' },
    { id: 4, name: 'Healthy Eats', email: 'healthy@campus.edu', status: 'pending', rating: 4.3, orders: 67, joinDate: '2024-03-25' },
    { id: 5, name: 'Midnight Snacks', email: 'midnight@campus.edu', status: 'blocked', rating: 3.8, orders: 45, joinDate: '2024-01-30' }
  ];

  const analytics = {
    totalUsers: 1247,
    totalVendors: 23,
    totalOrders: 5632,
    revenue: 89450,
    dailyOrders: [
      { day: 'Mon', orders: 45 },
      { day: 'Tue', orders: 52 },
      { day: 'Wed', orders: 61 },
      { day: 'Thu', orders: 58 },
      { day: 'Fri', orders: 87 },
      { day: 'Sat', orders: 42 },
      { day: 'Sun', orders: 38 }
    ],
    revenueData: [
      { month: 'Jan', revenue: 12000 },
      { month: 'Feb', revenue: 18000 },
      { month: 'Mar', revenue: 25000 },
      { month: 'Apr', revenue: 32000 },
      { month: 'May', revenue: 28000 },
      { month: 'Jun', revenue: 35000 }
    ],
    userGrowth: [
      { month: 'Jan', users: 120 },
      { month: 'Feb', users: 180 },
      { month: 'Mar', users: 250 },
      { month: 'Apr', users: 340 },
      { month: 'May', users: 420 },
      { month: 'Jun', users: 520 }
    ],
    topCategories: [
      { name: 'Burgers', value: 35, color: '#ef4444' },
      { name: 'Pizza', value: 25, color: '#f97316' },
      { name: 'Indian', value: 20, color: '#eab308' },
      { name: 'Chinese', value: 12, color: '#22c55e' },
      { name: 'Beverages', value: 8, color: '#3b82f6' }
    ]
  };

  const handleVendorAction = (vendorId: string, action: string) => {
    console.log(`${action} vendor ${vendorId}`);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vendor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sidebarItems = [
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-red-500' },
    { id: 'users', icon: Users, label: 'Users', color: 'text-red-500' },
    { id: 'vendors', icon: Store, label: 'Vendors', color: 'text-red-500' }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color = "text-red-500" }: { title: string; value: string; icon: any; trend?: string; color?: string }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-red-50`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {trend && (
          <div className="flex items-center text-green-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );

  const UserCard = ({ user }: { user: any }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-semibold text-lg">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {user.status}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Role:</span>
          <span className="ml-2 font-medium">{user.role}</span>
        </div>
        <div>
          <span className="text-gray-500">Orders:</span>
          <span className="ml-2 font-medium">{user.orders}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Joined:</span>
          <span className="ml-2 font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const VendorCard = ({ vendor }: { vendor: any }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <Store className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.email}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          vendor.status === 'approved' ? 'bg-green-100 text-green-600' :
          vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
          'bg-red-100 text-red-600'
        }`}>
          {vendor.status}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-500">Rating:</span>
          <span className="ml-2 font-medium">{vendor.rating}⭐</span>
        </div>
        <div>
          <span className="text-gray-500">Orders:</span>
          <span className="ml-2 font-medium">{vendor.orders}</span>
        </div>
      </div>

      {vendor.status === 'pending' && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleVendorAction(vendor.id, 'approve')}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-2xl font-medium transition-colors flex items-center justify-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleVendorAction(vendor.id, 'reject')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-2xl font-medium transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Reject
          </button>
        </div>
      )}
      
      {vendor.status === 'approved' && (
        <div className="mt-4">
          <button
            onClick={() => handleVendorAction(vendor.id, 'block')}
            className="w-full bg-red-100 hover:bg-red-200 text-red-600 py-2 px-4 rounded-2xl font-medium transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Block Vendor
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 mr-3"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">CB</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">CampusBites Admin</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              VIT Campus, LHR
            </div>
            <button className="p-2 rounded-xl hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-500 font-semibold text-sm">A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-20 lg:pt-6">
            <div className="px-6 pb-6">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-colors font-medium ${
                      activeTab === item.id
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${
                      activeTab === item.id ? 'text-red-500' : 'text-gray-500'
                    }`} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search and Filter Bar */}
          {(activeTab === 'users' || activeTab === 'vendors') && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              {activeTab === 'vendors' && (
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={analytics.totalUsers.toLocaleString()}
                  icon={Users}
                  trend="+12%"
                />
                <StatCard
                  title="Total Vendors"
                  value={analytics.totalVendors.toString()}
                  icon={Store}
                  trend="+8%"
                />
                <StatCard
                  title="Total Orders"
                  value={analytics.totalOrders.toLocaleString()}
                  icon={ShoppingBag}
                  trend="+23%"
                />
                <StatCard
                  title="Revenue"
                  value={`₹${analytics.revenue.toLocaleString()}`}
                  icon={DollarSign}
                  trend="+15%"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Orders</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.dailyOrders}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="orders" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analytics.revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#ef4444" 
                          strokeWidth={3}
                          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">User Growth</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics.userGrowth}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#ef4444" 
                          fill="#fee2e2" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Categories</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics.topCategories}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {analytics.topCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                <div className="text-sm text-gray-500">
                  {filteredUsers.length} of {users.length} users
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}

          {/* Vendors Tab */}
          {activeTab === 'vendors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
                <div className="text-sm text-gray-500">
                  {filteredVendors.length} of {vendors.length} vendors
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <button className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-2xl font-bold text-lg transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
