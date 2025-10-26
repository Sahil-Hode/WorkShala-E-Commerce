import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Verified Buyer",
    text: "Amazing service and fast delivery! The products are top quality. Highly recommend WorkShala.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ananya Singh",
    role: "Happy Customer",
    text: "I found everything I needed in one place. The deals section is a game-changer!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Vikram Patel",
    role: "Frequent Shopper",
    text: "Customer support is excellent, and the checkout process is smooth. Love this site!",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-900 text-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-yellow-500 mb-2">{t.role}</p>
                <p className="text-gray-300 italic">"{t.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
