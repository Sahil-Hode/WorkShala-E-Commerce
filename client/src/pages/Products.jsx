import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { FiHeart, FiShoppingCart, FiFilter, FiGrid, FiList } from "react-icons/fi";

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["Books", "Electronics", "Furniture", "Stationery"];

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Price filter
    result = result.filter(product => {
      const price = parseInt(product.price.replace(/[^0-9]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
        break;
      case "price-high":
        result.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [sortBy, priceRange, selectedCategories]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const addToCart = (productId) => {
    // Cart functionality will be handled by context
    console.log("Added to cart:", productId);
  };

  const toggleWishlist = (productId) => {
    // Wishlist functionality will be handled by context
    console.log("Toggled wishlist:", productId);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">All Products</h1>
            <p className="text-gray-400">{filteredProducts.length} products found</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            {/* View Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-700 text-yellow-500" : "text-gray-400"}`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gray-700 text-yellow-500" : "text-gray-400"}`}
              >
                <FiList size={20} />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <FiFilter size={20} />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 bg-gray-800 rounded-2xl p-6 h-fit sticky top-24`}>
            <h3 className="text-white font-semibold text-lg mb-4">Filters</h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-3 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-gray-300 font-medium mb-3">Price Range</h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>₹0</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange([0, 10000]);
              }}
              className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} view="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} view="list" />
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😞</div>
                <h3 className="text-xl text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
const ProductCard = ({ product, view }) => {
  const isGrid = view === "grid";
  
  return (
    <div className={`bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
      isGrid ? "flex flex-col" : "flex flex-col md:flex-row"
    }`}>
      {/* Image */}
      <div className={`${isGrid ? "h-48" : "md:w-48 md:h-48"} bg-gray-100 overflow-hidden flex items-center justify-center`}>
        <img
          src={product.images?.[0] || product.img}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Content */}
      <div className={`p-4 flex flex-col ${isGrid ? "flex-1" : "flex-1"}`}>
        <div className="flex-1">
          <Link to={`/product/${product.id}`}>
            <h3 className={`font-semibold text-white mb-2 hover:text-yellow-500 transition-colors ${
              isGrid ? "text-lg" : "text-xl"
            }`}>
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {!isGrid && (
            <div className="flex items-center gap-4 mb-3">
              {product.discount && (
                <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </span>
              )}
              {product.oldPrice && (
                <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-yellow-500 font-bold text-lg">{product.price}</p>
            {isGrid && product.oldPrice && (
              <p className="text-gray-500 line-through text-sm">{product.oldPrice}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => console.log("Add to wishlist")}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FiHeart className="text-gray-300" size={18} />
            </button>
            <button
              onClick={() => console.log("Add to cart")}
              className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <FiShoppingCart className="text-gray-900" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};