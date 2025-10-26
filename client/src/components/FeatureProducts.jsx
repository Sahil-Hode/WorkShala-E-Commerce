import React from "react";
import { FiShoppingCart, FiStar } from "react-icons/fi";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: "₹2,499",
    originalPrice: "₹3,999",
    img: "https://images.unsplash.com/photo-1632200004922-bc18602c79fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=400",
    badge: "Best Seller",
    rating: 4.8,
    discount: 38
  },
  {
    id: 2,
    name: "Smart LED Bulb",
    price: "₹599",
    originalPrice: "₹899",
    img: "https://images.unsplash.com/photo-1532007271951-c487760934ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwbGFtcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=400",
    badge: "Hot Deal",
    rating: 4.5,
    discount: 33
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: "₹3,299",
    originalPrice: "₹4,499",
    img: "https://images.unsplash.com/photo-1662408018125-d6322cfdc23b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2V5Ym9hcmQlMjBtZWNoYW5pY2FsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=400",
    badge: "Best Seller",
    rating: 4.9,
    discount: 27
  },
  {
    id: 4,
    name: "Portable Charger",
    price: "₹899",
    originalPrice: "₹1,299",
    img: "https://images.unsplash.com/photo-1596877445530-ad74838754c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNoYXJnZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=400",
    badge: "Hot Deal",
    rating: 4.3,
    discount: 31
  },
];

export default function FeaturedProductsDark() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of best-selling products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gray-900">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                    {product.discount}% OFF
                  </div>
                  <div className={`${
                    product.badge === "Best Seller" ? "bg-blue-500" : "bg-red-500"
                  } text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                    {product.badge}
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  <FiStar className="text-yellow-500" size={12} />
                  <span className="text-xs">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-yellow-500">{product.price}</span>
                  <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                </div>

                {/* Add to Cart */}
                <button className="w-full bg-yellow-500 text-gray-900 py-2.5 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                  <FiShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors">
            View All Featured
          </button>
        </div>
      </div>
    </section>
  );
}