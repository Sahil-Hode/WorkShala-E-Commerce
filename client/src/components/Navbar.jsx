import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";

export default function NavbarModern() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useApp();
  const navigate = useNavigate();

  const categories = ["Books", "Electronics", "Furniture", "Stationery"];
  
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = state.wishlist.length;

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMobileSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleWishlistClick = (e) => {
    if (!state.isAuthenticated) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <header className="bg-gray-900 text-gray-200 sticky top-0 z-50 font-montserrat shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-yellow-400">
          WorkShala
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 mx-6 relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full rounded-full px-5 py-2 text-white bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none focus:ring-2 focus:ring-yellow-400 font-semibold"
          />
          <button 
            onClick={handleSearch}
            className="absolute right-4 top-3 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="text-gray-200 hover:text-yellow-400 font-medium transition"
            >
              Categories
            </button>

            {categoryOpen && (
              <div className="absolute top-10 bg-gray-800 shadow-lg rounded-lg p-3 w-44">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?cat=${cat.toLowerCase()}`}
                    className="block py-2 px-3 hover:bg-gray-700 rounded-md transition"
                    onClick={() => setCategoryOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link 
            to="/wishlist" 
            className="p-2 text-gray-300 hover:text-yellow-400 transition-all duration-200 relative group"
            onClick={handleWishlistClick}
          >
            <FiHeart size={22} />
            {wishlistItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-gray-900 text-xs rounded-full flex items-center justify-center font-bold">
                {wishlistItemsCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="p-2 text-gray-300 hover:text-yellow-400 transition-all duration-200 relative group"
          >
            <FiShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-gray-900 text-xs rounded-full flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {state.isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              <FiUser size={18} />
              <span>Profile</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2">
                <FiUser size={22} className="hover:text-yellow-400 transition" />
                <span className="hidden lg:block hover:text-yellow-400 transition">
                  Login
                </span>
              </Link>

              <Link to="/register">
                <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-sm">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 shadow-lg space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleMobileSearch}
              className="w-full rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-3 top-3 text-gray-500 hover:text-yellow-500 transition-colors"
            >
              <FiSearch size={20} />
            </button>
          </div>

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?cat=${cat.toLowerCase()}`}
              className="block hover:text-yellow-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}

          {/* Mobile Wishlist */}
          <Link 
            to="/wishlist" 
            className="flex items-center gap-2 hover:text-yellow-400 transition"
            onClick={(e) => {
              handleWishlistClick(e);
              setMenuOpen(false);
            }}
          >
            <FiHeart size={20} />
            <span>Wishlist {wishlistItemsCount > 0 && `(${wishlistItemsCount})`}</span>
          </Link>

          {/* Mobile Login Buttons */}
          {!state.isAuthenticated && (
            <div className="flex gap-3">
              <Link to="/login" className="w-1/2" onClick={() => setMenuOpen(false)}>
                <button className="w-full border border-yellow-400 text-yellow-400 py-2 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition">
                  Login
                </button>
              </Link>

              <Link to="/register" className="w-1/2" onClick={() => setMenuOpen(false)}>
                <button className="w-full bg-yellow-400 text-gray-900 py-2 rounded-full hover:bg-yellow-300 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}