import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { Star, ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { FiHeart } from "react-icons/fi";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const product = products.find(p => p.id === parseInt(id));

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 5, comment: "Amazing product! Exceeded my expectations in every way.", date: "2024-01-15" },
    { name: "Bob", rating: 4, comment: "Good quality, fast delivery. Would recommend to others.", date: "2024-01-10" },
    { name: "Charlie", rating: 5, comment: "Absolutely love this product! The quality is outstanding.", date: "2024-01-05" },
  ]);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [toast, setToast] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-yellow-500 text-center py-20">
      <div className="text-6xl mb-4">😞</div>
      <h2 className="text-2xl font-semibold">Product not found</h2>
      <Link to="/" className="inline-block mt-4 text-yellow-400 hover:text-yellow-300 transition-colors">
        Return to homepage
      </Link>
    </div>
  </div>;

  const images = product.images || [product.img];
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const isInWishlist = state.wishlist.some(item => item.productId === product.id);

  const prevImage = () => setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleReviewSubmit = e => {
    e.preventDefault();
    const newReview = {
      ...reviewForm,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  const addToCart = () => {
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/[^0-9]/g, '')),
      quantity: quantity,
      image: product.images?.[0] || product.img,
      inStock: true
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }
    
    addToCart();
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  const toggleWishlist = () => {
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }

    const wishlistItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/[^0-9]/g, '')),
      image: product.images?.[0] || product.img,
      inStock: true
    };

    dispatch({ type: 'TOGGLE_WISHLIST', payload: wishlistItem });
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 bg-yellow-600 text-gray-900 px-6 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-out flex items-center gap-2">
          <ShoppingCart size={20} />
          <span className="font-semibold">Added to cart!</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="text-sm text-gray-400">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-yellow-500 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-500">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden bg-gray-800 shadow-2xl">
              {product.discount && (
                <span className="absolute top-4 left-4 bg-yellow-600 text-gray-900 px-3 py-1.5 font-bold rounded-full shadow-lg z-10 text-sm">
                  {product.discount}% OFF
                </span>
              )}
              <div className="aspect-square flex items-center justify-center p-8">
                <img
                  src={images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500"
                />
              </div>
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 p-3 rounded-full text-yellow-500 transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 p-3 rounded-full text-yellow-500 transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImage ? "bg-yellow-500 w-6" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 transition-all overflow-hidden ${
                    idx === currentImage ? "border-yellow-500 shadow-lg" : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name}-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 max-w-2xl">
            <div className="sticky top-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {renderStars(averageRating)}
                    <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
                  </div>
                  <span className="text-sm text-green-500 font-medium">In Stock</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

              {/* Price Section */}
              <div className="flex items-center gap-4 py-4">
                <p className="text-3xl font-bold text-yellow-500">{product.price}</p>
                {product.oldPrice && (
                  <p className="text-xl line-through text-gray-500">{product.oldPrice}</p>
                )}
                {product.discount && (
                  <span className="bg-yellow-600 text-gray-900 px-3 py-1 rounded-full font-semibold text-sm">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <span className="font-semibold text-white">Quantity:</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden">
                    <button 
                      onClick={decreaseQty}
                      className="p-3 hover:bg-gray-700 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-6 py-3 bg-gray-800 min-w-12 text-center font-semibold">{quantity}</span>
                    <button 
                      onClick={increaseQty}
                      className="p-3 hover:bg-gray-700 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">Only 12 items left</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={addToCart}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-gray-900 py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Zap size={20} />
                  Buy Now
                </button>
                <button 
                  onClick={toggleWishlist}
                  className={`p-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
                    isInWishlist 
                      ? "bg-red-600 hover:bg-red-500 text-white" 
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                >
                  <FiHeart size={20} className={isInWishlist ? "fill-current" : ""} />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-500">✓</span>
                  </div>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-500">✓</span>
                  </div>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-500">✓</span>
                  </div>
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-500">✓</span>
                  </div>
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="border-b border-gray-800">
            <nav className="flex gap-8">
              {["description", "specifications", "reviews"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 font-semibold capitalize transition-colors border-b-2 ${
                    activeTab === tab
                      ? "text-yellow-500 border-yellow-500"
                      : "text-gray-400 border-transparent hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {product.description} This premium product is designed with cutting-edge technology 
                  and meticulous attention to detail. Crafted from the finest materials, it offers 
                  exceptional performance and durability that exceeds industry standards.
                </p>
                <ul className="mt-6 space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-500">•</span>
                    Premium quality materials for long-lasting performance
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-500">•</span>
                    Advanced technology for superior results
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-500">•</span>
                    Eco-friendly manufacturing process
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-500">•</span>
                    Backed by our 2-year comprehensive warranty
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Reviews Summary */}
                <div className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-500 mb-2">{averageRating.toFixed(1)}</div>
                      {renderStars(averageRating)}
                      <div className="text-sm text-gray-400 mt-2">{reviews.length} reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5,4,3,2,1].map(rating => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = (count / reviews.length) * 100;
                        return (
                          <div key={rating} className="flex items-center gap-3 text-sm">
                            <span className="w-16 text-gray-400">{rating} star</span>
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-12 text-gray-400 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center gap-4 mb-2 sm:mb-0">
                          <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center font-semibold text-gray-900">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{review.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Review Form */}
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Add Your Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter your name"
                          value={reviewForm.name}
                          onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                          className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating</label>
                        <select 
                          value={reviewForm.rating}
                          onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                          className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                        >
                          {[5,4,3,2,1].map(r => (
                            <option key={r} value={r}>
                              {r} - {r===5?"Excellent":r===4?"Good":r===3?"Average":r===2?"Poor":"Terrible"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                      <textarea 
                        placeholder="Share your experience with this product..."
                        value={reviewForm.comment}
                        onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                        rows={4}
                        className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 py-3 px-8 rounded-xl font-semibold transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Related Products</h2>
            <Link to="/products" className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link 
                key={p.id} 
                to={`/product/${p.id}`}
                className="group bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative aspect-square bg-gray-900 overflow-hidden">
                  <img
                    src={p.images?.[0] || p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.discount && (
                    <span className="absolute top-3 left-3 bg-yellow-600 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                      {p.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-yellow-500 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 font-bold">{p.price}</span>
                    {p.oldPrice && (
                      <span className="text-gray-500 line-through text-sm">{p.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}