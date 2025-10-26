import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default function Cart() {
  // Mock cart data - in real app, this would come from context
  const cartItems = [
    {
      id: 1,
      productId: 1,
      name: "Wireless Bluetooth Headphones",
      price: 2499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
      inStock: true
    },
    {
      id: 2,
      productId: 4,
      name: "JavaScript Programming Book",
      price: 899,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000",
      inStock: true
    }
  ];

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    // Update quantity logic
    console.log(`Update item ${itemId} quantity to ${newQuantity}`);
  };

  const removeItem = (itemId) => {
    // Remove item logic
    console.log(`Remove item ${itemId}`);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="text-gray-500" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
            >
              <FiShoppingBag size={20} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Shopping Cart</h1>
                <span className="text-gray-400">{cartItems.length} items</span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="text-white font-semibold hover:text-yellow-500 transition-colors truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-yellow-500 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                      {!item.inStock && (
                        <p className="text-red-500 text-sm">Out of Stock</p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-500 transition-colors"
                      >
                        <FiMinus size={16} className="text-white" />
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-500 transition-colors"
                      >
                        <FiPlus size={16} className="text-white" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-20">
                      <p className="text-white font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <FiArrowRight className="rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Proceed to Checkout
                <FiArrowRight size={20} />
              </Link>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-xs">Secure Payment</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-xs">SSL Encrypted</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-xs">Money Back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}