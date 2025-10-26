import React from "react";

export default function BannerNewsletter() {
  return (
    <section className="bg-gray-800 text-gray-100 py-16">
      <div className="container mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Limited-Time Offer */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Limited-Time Offer!
          </h2>
          <p className="text-gray-300 mb-4">
            Get up to 30% off on selected electronics and furniture. Hurry, offer ends soon!
          </p>
          <a
            href="#trending-products"
            className="inline-block bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition"
          >
            Shop Now
          </a>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Get updates on latest products, offers, and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full flex-1 focus:outline-none text-gray-900"
            />
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
