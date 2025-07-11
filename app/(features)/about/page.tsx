import React from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

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

const stats = [
  { number: '50K+', label: 'Happy Travelers' },
  { number: '200+', label: 'Destinations' },
  { number: '24/7', label: 'Support' },
  { number: '4.9', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              About Travelis
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed font-medium">
              Your companion for discovering, booking, and sharing the world's best travel destinations.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto text-lg">
              Our mission is to make adventure accessible, easy, and memorable for everyone. We believe in the power of exploration, community, and seamless technology to help you create unforgettable journeys that inspire and transform.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-green-600">Travelis</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We make travel planning effortless with our comprehensive platform and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Icon name={feature.icon} size="lg" className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our <span className="text-green-600">Story</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Founded by passionate travelers, Travelis was born from a desire to make adventure accessible to everyone.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Whether you're a solo explorer, a family, or a group of friends, our platform is designed to inspire and empower you to discover the world's hidden gems. We believe that every journey should be as unique as the traveler taking it.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">🌍</div>
                  <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-green-100 mb-6">
                    Connect with fellow travelers, share experiences, and discover new destinations together.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 bg-white/20 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold">
                          {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-green-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'check-circle',
                title: 'Authenticity',
                description: 'We believe in genuine experiences and honest recommendations.'
              },
              {
                icon: 'users',
                title: 'Community',
                description: 'Building connections between travelers worldwide.'
              },
              {
                icon: 'globe',
                title: 'Sustainability',
                description: 'Promoting responsible travel and environmental consciousness.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <Icon name={value.icon} size="lg" className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-green-200">Adventure</span>?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Discover amazing destinations and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/destinations" 
              className="inline-block bg-white text-green-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-50 focus:ring-4 focus:ring-white/30 transition-all duration-200 text-lg"
            >
              Start Exploring
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-green-600 focus:ring-4 focus:ring-white/30 transition-all duration-200 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 