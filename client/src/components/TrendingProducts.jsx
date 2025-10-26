import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

export default function TrendingProductsDark() {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const trendingProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-500">
            Trending Products
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the most popular products our customers are loving right now
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container - SIMPLE FIX */}
              <div className="relative h-64 bg-white flex items-center justify-center p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  <FiStar className="text-yellow-500" size={14} />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-yellow-500">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(product.id);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-semibold transition-colors ${
                      liked[product.id] ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <FiHeart size={16} />
                    <span className="hidden sm:inline">Like</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart logic here
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 py-2 px-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    <FiShoppingCart size={16} />
                    <span className="hidden sm:inline">Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}