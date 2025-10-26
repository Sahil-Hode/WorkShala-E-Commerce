import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiEdit, FiSave } from "react-icons/fi";

export default function Profile() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.hash.replace('#', '') || 'orders');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [user, setUser] = useState({
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    phone: "+91 98765 43210",
    joined: "January 2024",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  });

  // Mock orders data
  const orders = [
    {
      id: "WS123456789",
      date: "2024-01-20",
      total: 3497,
      status: "delivered",
      items: 3,
      tracking: "WSX123456789"
    },
    {
      id: "WS123456788",
      date: "2024-01-15",
      total: 1899,
      status: "shipped",
      items: 2,
      tracking: "WSX123456788"
    },
    {
      id: "WS123456787",
      date: "2024-01-10",
      total: 899,
      status: "processing",
      items: 1,
      tracking: "WSX123456787"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-500';
      case 'shipped': return 'text-yellow-500';
      case 'processing': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic would go here
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-gray-800 rounded-2xl p-6 sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-yellow-500">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-white font-semibold text-lg">{user.name}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-xs mt-1">Member since {user.joined}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {[
                    { id: 'orders', label: 'My Orders', icon: FiPackage, count: orders.length },
                    { id: 'wishlist', label: 'Wishlist', icon: FiHeart, count: 12 },
                    { id: 'profile', label: 'Profile', icon: FiUser },
                    { id: 'settings', label: 'Settings', icon: FiSettings }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === item.id
                          ? 'bg-yellow-500 text-gray-900'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activeTab === item.id ? 'bg-gray-900 text-white' : 'bg-gray-600 text-white'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
                    <FiLogOut size={20} />
                    <span className="flex-1 text-left">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'orders' && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">My Orders</h1>
                    <p className="text-gray-400">{orders.length} orders</p>
                  </div>

                  {/* Orders List */}
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                              <h3 className="text-white font-semibold">Order #{order.id}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} bg-gray-600`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                              <div>
                                <span className="block text-gray-500 text-xs">Date</span>
                                {order.date}
                              </div>
                              <div>
                                <span className="block text-gray-500 text-xs">Items</span>
                                {order.items} items
                              </div>
                              <div>
                                <span className="block text-gray-500 text-xs">Total</span>
                                ₹{order.total.toLocaleString()}
                              </div>
                              <div>
                                <span className="block text-gray-500 text-xs">Tracking</span>
                                {order.tracking}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link
                              to={`/track-order/${order.id}`}
                              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                            >
                              Track
                            </Link>
                            <Link
                              to={`/order/${order.id}`}
                              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiPackage className="text-gray-500" size={32} />
                      </div>
                      <h3 className="text-white text-lg mb-2">No orders yet</h3>
                      <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Profile Information</h1>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                    >
                      {isEditing ? <FiSave size={16} /> : <FiEdit size={16} />}
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Member Since</label>
                      <input
                        type="text"
                        value={user.joined}
                        disabled
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-yellow-500 mb-1">{orders.length}</div>
                      <div className="text-gray-400 text-sm">Total Orders</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-yellow-500 mb-1">12</div>
                      <div className="text-gray-400 text-sm">Wishlist Items</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-yellow-500 mb-1">4.8</div>
                      <div className="text-gray-400 text-sm">Avg. Rating</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-6">My Wishlist</h1>
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiHeart className="text-gray-500" size={32} />
                    </div>
                    <h3 className="text-white text-lg mb-2">Wishlist feature coming soon!</h3>
                    <p className="text-gray-400">We're working on bringing you the ability to save your favorite products.</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h1 className="text-2xl font-bold text-white mb-6">Account Settings</h1>
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSettings className="text-gray-500" size={32} />
                    </div>
                    <h3 className="text-white text-lg mb-2">Settings feature coming soon!</h3>
                    <p className="text-gray-400">We're working on bringing you comprehensive account settings.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}