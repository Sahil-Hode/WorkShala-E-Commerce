import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaCreditCard
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function FooterAmazonDark() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Features */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <FaTruck className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders over ₹499</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-400">100% protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <FaHeadset className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h4 className="text-white font-semibold">24/7 Support</h4>
                <p className="text-sm text-gray-400">Dedicated help</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <FaCreditCard className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Easy Returns</h4>
                <p className="text-sm text-gray-400">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                WorkShala
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your one-stop destination for books, electronics, furniture, and stationery. 
              We're committed to providing quality products with exceptional service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Shop Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Books & Novels</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Electronics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Home Furniture</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Office Stationery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Gaming Accessories</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">FAQs & Help</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">About WorkShala</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-500" />
                <span className="text-gray-400 text-sm">123 Business Street, Mumbai, India</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-yellow-500" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500" />
                <span className="text-gray-400 text-sm">support@workshala.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800/50 border-y border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-white font-bold text-xl mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest deals and product updates</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} WorkShala. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}