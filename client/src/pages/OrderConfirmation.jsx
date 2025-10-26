import React from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiPackage, FiTruck, FiHome, FiDownload, FiShare2 } from "react-icons/fi";

export default function OrderConfirmation() {
  // Mock order data
  const order = {
    id: "WS" + Date.now(),
    date: new Date().toLocaleDateString(),
    total: 3497,
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 2499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000"
      },
      {
        id: 2,
        name: "JavaScript Programming Book",
        price: 899,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000"
      }
    ],
    shipping: {
      name: "Rohit Sharma",
      address: "123 Business Street, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400069",
      phone: "+91 98765 43210"
    },
    status: "confirmed",
    estimatedDelivery: "3-5 business days"
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-white" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-gray-400 text-lg mb-2">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <p className="text-gray-400">
              Order ID: <span className="text-yellow-500 font-semibold">{order.id}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiPackage className="text-yellow-500" />
                  Order Summary
                </h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
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

                {/* Order Total */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FiTruck className="text-yellow-500" />
                  Delivery Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-300 font-semibold mb-2">Shipping Address</h3>
                    <div className="text-gray-400 space-y-1">
                      <p>{order.shipping.name}</p>
                      <p>{order.shipping.address}</p>
                      <p>{order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</p>
                      <p>Phone: {order.shipping.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-300 font-semibold mb-2">Delivery Timeline</h3>
                    <div className="text-gray-400 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Order Confirmed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Processing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <span>Shipped</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <span>Out for Delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <span>Delivered</span>
                      </div>
                    </div>
                    <p className="text-yellow-500 font-semibold mt-3">
                      Estimated Delivery: {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Order Actions */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Order Actions</h3>
                <div className="space-y-3">
                  <Link
                    to={`/track-order/${order.id}`}
                    className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-colors"
                  >
                    <FiTruck className="text-yellow-500" />
                    Track Order
                  </Link>
                  
                  <button className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-colors">
                    <FiDownload className="text-yellow-500" />
                    Download Invoice
                  </button>
                  
                  <button className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-colors">
                    <FiShare2 className="text-yellow-500" />
                    Share Order
                  </button>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">What's Next?</h3>
                <div className="space-y-4">
                  <Link
                    to="/products"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiHome />
                    Continue Shopping
                  </Link>
                  
                  <Link
                    to="/profile/orders"
                    className="w-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View All Orders
                  </Link>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-3">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Our customer support team is here to help with any questions.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>📞 Call: +91 98765 43210</p>
                  <p>✉️ Email: support@workshala.com</p>
                  <p>🕒 Hours: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}