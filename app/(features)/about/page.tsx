import React from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
      </svg>
    ),
    title: 'Curated Destinations',
    description: 'Handpicked locations and experiences for every type of traveler.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    title: 'Easy Booking',
    description: 'Book your next adventure in just a few clicks with secure payments.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a4 4 0 10-8 0 4 4 0 008 0z" />
      </svg>
    ),
    title: 'Community Driven',
    description: 'Read reviews, share tips, and connect with fellow travelers.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
      </svg>
    ),
    title: 'Modern Design',
    description: 'A beautiful, mobile-friendly interface for seamless planning.'
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero-style About Section */}
      <section className="relative flex items-center justify-center min-h-[50vh] py-16">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"
            }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-12 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-4">About Travelis</h1>
          <p className="text-lg text-gray-700 mb-4">
            Travelis is your companion for discovering, booking, and sharing the world’s best travel destinations.
          </p>
          <p className="text-gray-600 mb-2">
            Our mission is to make adventure accessible, easy, and memorable for everyone. We believe in the power of exploration, community, and seamless technology to help you create unforgettable journeys.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60" />
      </div>

      {/* Features Grid - Full Width */}
      <section className="relative z-10 w-full px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((card, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-green-200 hover:border-green-400 transition-all animate-fade-in h-full hover:scale-105 hover:shadow-2xl duration-200"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section - Full Width */}
      <section className="w-full px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Our Story</h2>
        <p className="text-gray-700 text-lg mb-2">
          Founded by passionate travelers, Travelis was born from a desire to make adventure accessible to everyone. We believe every journey should be unique, memorable, and easy to plan.
        </p>
        <p className="text-gray-600">
          Whether you’re a solo explorer, a family, or a group of friends, our platform is designed to inspire and empower you to discover the world’s hidden gems.
        </p>
      </section>

      {/* CTA Button */}
      <div className="flex justify-center pb-16">
        <a href="/destinations" className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 text-lg">
          Start Exploring
        </a>
      </div>
    </>
  );
} 