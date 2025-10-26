import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const categories = [
  {
    name: "Books",
    img: "https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=400",
    link: "/products?cat=books",
    count: "1.2K+ Products",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=400",
    link: "/products?cat=electronics",
    count: "800+ Products",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Furniture",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=400",
    link: "/products?cat=furniture",
    count: "500+ Products",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "Stationery",
    img: "https://plus.unsplash.com/premium_photo-1670958553886-d41ba40061df?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=400",
    link: "/products?cat=stationery",
    count: "300+ Products",
    color: "from-green-500 to-emerald-500"
  },
];

export default function CategoriesModernSafe() {
  return (
    <section id="categories" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our carefully curated collections across different categories. 
            Find exactly what you're looking for with ease.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{cat.count}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <FiArrowRight className="text-gray-900" size={20} />
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${cat.color} bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                <div className="w-full h-full rounded-2xl bg-gray-800 m-0.5"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>View All Products</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}