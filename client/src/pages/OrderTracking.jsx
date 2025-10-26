import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiPackage, FiTruck, FiCheck, FiClock, FiMapPin, FiHome } from "react-icons/fi";

export default function OrderTracking() {
  const { orderId } = useParams();
  const [trackingId, setTrackingId] = useState(orderId || "");

  // Mock order data
  const order = {
    id: orderId || "WS123456789",
    status: "shipped",
    timeline: [
      { status: "ordered", title: "Order Confirmed", description: "Your order has been confirmed", date: "2024-01-20 10:30 AM", completed: true },
      { status: "processing", title: "Processing", description: "Your order is being processed", date: "2024-01-20 11:45 AM", completed: true },
      { status: "shipped", title: "Shipped", description: "Your order has been shipped", date: "2024-01-21 09:15 AM", completed: true },
      { status: "out_for_delivery", title: "Out for Delivery", description: "Your order is out for delivery", date: "Expected 2024-01-22", completed: false },
      { status: "delivered", title: "Delivered", description: "Your order has been delivered", date: "Expected 2024-01-22", completed: false }
    ],
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 2499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000"
      }
    ],
    shipping: {
      name: "Rohit Sharma",
      address: "123 Business Street, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400069"
    },
    delivery: {
      estimated: "2024-01-22",
      carrier: "WorkShala Express",
      trackingNumber: "WSX123456789"
    }
  };

  const getStatusIcon = (status, completed) => {
    if (completed) return <FiCheck className="text-green-500" size={20} />;
    if (status === "shipped") return <FiTruck className="text-yellow-500" size={20} />;
    return <FiClock className="text-gray-500" size={20} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Track Your Order</h1>
              <p className="text-gray-400">Monitor your order in real-time</p>
            </div>
            
            {/* Order ID Search */}
            <div className="mt-4 lg:mt-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Order ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Track
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <FiPackage className="text-yellow-500" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Order #{order.id}</h2>
                    <p className="text-gray-400">Placed on {order.timeline[0].date}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Ordered</span>
                    <span className="text-sm text-gray-400">Delivered</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: '60%' }} // This would be dynamic based on status
                    ></div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  {order.timeline.map((step, index) => (
                    <div key={step.status} className="flex gap-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-700'
                        }`}>
                          {getStatusIcon(step.status, step.completed)}
                        </div>
                        {index < order.timeline.length - 1 && (
                          <div className={`flex-1 w-0.5 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-700'
                          }`}></div>
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 pb-6">
                        <div className={`p-4 rounded-xl ${
                          step.completed ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-700/50'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-semibold ${
                              step.completed ? 'text-green-500' : 'text-white'
                            }`}>
                              {step.title}
                            </h3>
                            <span className="text-gray-400 text-sm">{step.date}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Order Details</h2>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-500 font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Info */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FiMapPin className="text-yellow-500" />
                  Shipping Address
                </h3>
                <div className="text-gray-400 space-y-2">
                  <p className="text-white font-medium">{order.shipping.name}</p>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.state}</p>
                  <p>PIN: {order.shipping.pincode}</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Delivery Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Delivery:</span>
                    <span className="text-yellow-500 font-semibold">{order.delivery.estimated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Carrier:</span>
                    <span className="text-white">{order.delivery.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracking Number:</span>
                    <span className="text-white font-mono">{order.delivery.trackingNumber}</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-3">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Contact our support team for any delivery-related queries.
                </p>
                <div className="space-y-2 text-sm">
                  <button className="w-full text-yellow-500 hover:text-yellow-400 text-left">
                    📞 Call Support
                  </button>
                  <button className="w-full text-yellow-500 hover:text-yellow-400 text-left">
                    ✉️ Email Support
                  </button>
                  <button className="w-full text-yellow-500 hover:text-yellow-400 text-left">
                    💬 Live Chat
                  </button>
                </div>
              </div>

              {/* Back to Shopping */}
              <Link
                to="/products"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiHome />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}