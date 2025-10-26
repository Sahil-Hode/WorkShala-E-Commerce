import React from "react";
import { FiClock, FiZap, FiArrowRight } from "react-icons/fi";

const deals = [
  {
    id: 1,
    title: "50% Off on Wireless Headphones",
    subtitle: "Limited Time Offer",
    description: "Premium sound quality with noise cancellation",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=1000",
    link: "#",
    timeLeft: "24:59:32",
    discount: "50% OFF"
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free: Stationery Markers",
    subtitle: "Hurry, While Stocks Last",
    description: "High-quality markers for all your creative needs",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=1000",
    link: "#",
    timeLeft: "12:30:15",
    discount: "20% OFF"
  },
];

export default function DealsSection() {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 px-4 py-2 rounded-full mb-4">
            <FiZap className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-300">Flash Deals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Today's Hot Deals
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't miss out on these limited-time offers. Grab them before they're gone!
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="group bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 relative">
                  <div className="h-48 md:h-full bg-gray-100 overflow-hidden">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-2 rounded-xl font-bold text-sm shadow-lg">
                    {deal.discount}
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    {/* Timer */}
                    <div className="flex items-center gap-2 text-sm text-yellow-500 mb-4">
                      <FiClock size={16} />
                      <span className="font-semibold">Ends in: {deal.timeLeft}</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-yellow-500 font-semibold mb-1">{deal.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-4">{deal.description}</p>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <a
                      href={deal.link}
                      className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                    >
                      Grab This Deal
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    {/* Stock Indicator */}
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Only 23 left</div>
                      <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Deals */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 px-8 py-4 rounded-2xl font-semibold transition-all duration-300">
            <span>View All Deals</span>
            <FiZap size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}