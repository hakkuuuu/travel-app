import React from 'react';
import Icon from '@/components/ui/Icon';

const features = [
  {
    icon: 'sun',
    title: 'Curated Destinations',
    description: 'Handpicked locations and experiences for every type of traveler.'
  },
  {
    icon: 'user-plus',
    title: 'Easy Booking',
    description: 'Book your next adventure in just a few clicks with secure payments.'
  },
  {
    icon: 'users',
    title: 'Community Driven',
    description: 'Read reviews, share tips, and connect with fellow travelers.'
  },
  {
    icon: 'globe',
    title: 'Global Reach',
    description: 'Explore destinations worldwide with our comprehensive travel network.'
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero-style About Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] py-20">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
            <h1 className="section-title text-gray-800 mb-6">About Travelis</h1>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Travelis is your companion for discovering, booking, and sharing the world's best travel destinations.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our mission is to make adventure accessible, easy, and memorable for everyone. We believe in the power of exploration, community, and seamless technology to help you create unforgettable journeys that inspire and transform.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center my-12">
        <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-80" />
      </div>

      {/* Features Grid */}
      <section className="w-full px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Why Choose Us?</h2>
            <p className="section-subtitle max-w-2xl mx-auto text-center">
              We make travel planning effortless with our comprehensive platform and exceptional service
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-full">
                  <Icon name={card.icon} size="lg" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">Our Story</h2>
          <p className="section-subtitle mb-8 max-w-3xl mx-auto">
            Founded by passionate travelers, Travelis was born from a desire to make adventure accessible to everyone.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              Whether you're a solo explorer, a family, or a group of friends, our platform is designed to inspire and empower you to discover the world's hidden gems. We believe that every journey should be as unique as the traveler taking it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 py-16 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Discover amazing destinations and create memories that last a lifetime.
          </p>
          <a 
            href="/destinations" 
            className="inline-block bg-white text-green-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-50 focus:ring-4 focus:ring-white/30 transition-all duration-200 text-lg"
          >
            Start Exploring
          </a>
        </div>
      </section>
    </>
  );
} 