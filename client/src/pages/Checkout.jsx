import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiArrowLeft, FiCreditCard, FiTruck, FiCheck } from "react-icons/fi";

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: ""
  });

  const cartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 2499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const placeOrder = () => {
    // Order placement logic
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/cart" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= stepNumber 
                    ? 'bg-yellow-500 border-yellow-500 text-gray-900' 
                    : 'border-gray-600 text-gray-400'
                } font-semibold`}>
                  {step > stepNumber ? <FiCheck size={20} /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 ${
                    step > stepNumber ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-between w-80 text-sm text-gray-400 mt-12">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Review</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FiTruck className="text-yellow-500" />
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">PIN Code</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.pincode}
                          onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 mt-6"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FiCreditCard className="text-yellow-500" />
                    Payment Method
                  </h2>
                  
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      { id: "card", name: "Credit/Debit Card", icon: "💳" },
                      { id: "upi", name: "UPI", icon: "📱" },
                      { id: "netbanking", name: "Net Banking", icon: "🏦" },
                      { id: "cod", name: "Cash on Delivery", icon: "💰" }
                    ].map(method => (
                      <label key={method.id} className="relative">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.id 
                            ? 'border-yellow-500 bg-yellow-500/10' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{method.icon}</span>
                            <span className="text-white font-medium">{method.name}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Card Form */}
                  {paymentMethod === "card" && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            required
                            value={paymentInfo.expiry}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            required
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Name on Card</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 mt-6"
                      >
                        Review Order
                      </button>
                    </form>
                  )}

                  {paymentMethod !== "card" && (
                    <button
                      onClick={handlePaymentSubmit}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 mt-6"
                    >
                      Review Order
                    </button>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Review Your Order</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{item.name}</h3>
                          <p className="text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-yellow-500 font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
                    <h3 className="text-white font-semibold mb-2">Shipping Address</h3>
                    <p className="text-gray-300">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}<br />
                      {shippingInfo.country}
                    </p>
                  </div>

                  <button
                    onClick={placeOrder}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FiLock size={20} />
                    Place Order
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-gray-300">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-2 border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg border-t border-gray-700 pt-3">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
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