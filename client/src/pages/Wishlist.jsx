import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from "react-icons/fi";

export default function Wishlist() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const wishlistItems = state.wishlist;

  const removeFromWishlist = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemId });
  };

  const addToCartFromWishlist = (product) => {
    const cartItem = {
      id: Date.now(),
      productId: product.productId,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      inStock: true
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(item => {
      const cartItem = {
        id: Date.now(),
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        inStock: true
      };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    });
    
    wishlistItems.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id });
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="text-gray-500" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">Save items you love for later by adding them to your wishlist.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
            >
              <FiShoppingCart size={20} />
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
          {/* Wishlist Items */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">My Wishlist</h1>
                  <p className="text-gray-400 mt-2">{wishlistItems.length} items saved</p>
                </div>
                {wishlistItems.length > 0 && (
                  <button
                    onClick={moveAllToCart}
                    className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2"
                  >
                    <FiShoppingCart size={18} />
                    Move All to Cart
                  </button>
                )}
              </div>

              {/* Wishlist Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="text-white font-semibold hover:text-yellow-500 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-yellow-500 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCartFromWishlist(item)}
                          className="flex-1 bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiShoppingCart size={16} />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                          title="Remove from wishlist"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
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

          {/* Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Wishlist Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Items in Wishlist</span>
                  <span>{wishlistItems.length}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4">
                    Items in your wishlist are saved for later. You can add them to your cart whenever you're ready to purchase.
                  </p>
                  
                  <button
                    onClick={moveAllToCart}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FiShoppingCart size={20} />
                    Move All to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}