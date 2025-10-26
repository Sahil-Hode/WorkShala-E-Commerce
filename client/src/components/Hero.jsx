import React, { useState } from "react";
import { FiSearch, FiShoppingBag, FiBook, FiMonitor, FiPackage, FiTruck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function HeroModernDark() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { icon: <FiBook size={24} />, name: "Books", count: "1.2K+", color: "from-blue-500 to-cyan-500" },
    { icon: <FiMonitor size={24} />, name: "Electronics", count: "800+", color: "from-purple-500 to-pink-500" },
    { icon: <FiPackage size={24} />, name: "Furniture", count: "500+", color: "from-orange-500 to-red-500" },
    { icon: <FiShoppingBag size={24} />, name: "Stationery", count: "300+", color: "from-green-500 to-emerald-500" },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products" },
    { number: "24/7", label: "Support" },
    { number: "Free", label: "Shipping" },
  ];

  return (
    <section className="bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 px-4 py-2 rounded-full">
              <FiTruck className="text-yellow-500" />
              <span className="text-sm font-medium">Free shipping on orders over $50</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Everything You
                </span>
                <br />
                <span className="text-white">Need, All in One Place</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                Discover books, electronics, furniture, and stationery — carefully curated 
                for quality and delivered to your doorstep with exceptional service.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-500">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search books, electronics, furniture..."
                  className="w-full rounded-2xl py-4 px-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 pr-16"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 p-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25"
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/products")}
                className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <FiShoppingBag className="group-hover:scale-110 transition-transform" />
                Start Shopping
              </button>
              <button
                onClick={() => navigate("/categories")}
                className="group border-2 border-gray-700 text-white px-8 py-4 rounded-2xl font-semibold hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Explore Categories
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 relative">
            {/* Main Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-lg opacity-20"></div>
              <img
                src="https://plus.unsplash.com/premium_photo-1663956066898-282c7609afc9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000"
                alt="Modern shopping experience"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <FiTruck className="text-green-500" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Free Delivery</div>
                    <div className="text-sm text-gray-400">On orders over $50</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FiShoppingBag className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">10K+ Products</div>
                    <div className="text-sm text-gray-400">Carefully curated</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 rounded-2xl hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{category.name}</div>
                      <div className="text-sm text-gray-400">{category.count} items</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}