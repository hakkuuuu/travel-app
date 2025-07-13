'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  reviews: Review[];
}

export default function Home() {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => {
        setFeaturedDestinations(data.slice(0, 6));
        setFilteredDestinations(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load featured destinations.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Improved filter: case-insensitive, partial match, and guests filter
    const filtered = featuredDestinations.filter((dest) => {
      const query = searchData.destination.trim().toLowerCase();
      const matchesDestination =
        !query ||
        dest.name.toLowerCase().includes(query) ||
        dest.location.toLowerCase().includes(query);
      // Optionally filter by guests (if you want to match min/max guests, add logic here)
      return matchesDestination;
    });
    setFilteredDestinations(filtered);
    // Scroll to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 lg:py-16">
          <div className="animate-fade-in">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 sm:mb-4 leading-tight">
              Plan Your Next
              <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
              Discover amazing destinations, book unforgettable experiences, and create memories that last a lifetime
            </p>

            {/* Search Form */}
            <div className="max-w-4xl mx-auto px-2 mb-12">
              <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                {/* Main Search Bar */}
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Icon name="map-pin" size="sm" className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Where do you want to go?"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                        className="w-full px-4 py-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 text-lg flex items-center gap-2"
                    >
                      <Icon name="search" size="sm" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Expandable Advanced Options */}
                <div className="border-t border-gray-100 bg-gray-50/50">
                  <details className="group">
                    <summary className="px-6 py-3 cursor-pointer text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-between">
                      <span>Advanced search options</span>
                      <Icon name="arrow-right" size="sm" className="transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Check-in Date */}
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-in
                          </label>
                          <input
                            type="date"
                            value={searchData.checkIn}
                            onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                            className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        {/* Check-out Date */}
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-out
                          </label>
                          <input
                            type="date"
                            value={searchData.checkOut}
                            onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                            className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        {/* Guests */}
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Guests
                          </label>
                          <select
                            value={searchData.guests}
                            onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                            className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none"
                          >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5">5+ Guests</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section ref={resultsRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle max-w-xl mx-auto text-center mt-4">
              Discover handpicked destinations that offer unforgettable experiences and breathtaking views
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading featured destinations...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : (
            filteredDestinations.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No destinations found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination) => (
                  <div key={destination.id} className="card group overflow-hidden animate-fade-in">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
                          {destination.price}
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                          <div className="text-gray-600 text-sm flex items-center">
                            <Icon name="map-pin" size="sm" className="mr-1" />
                            {destination.location}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="star" size="sm" />
                          <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                          <span className="text-sm text-gray-500">({destination.reviews.length})</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                      <Link
                        href={`/destinations/${destination.id}`}
                        className="btn-secondary w-full text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/destinations" className="btn-outline text-lg px-8 py-4">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Travelis?</h2>
            <p className="section-subtitle max-w-xl mx-auto text-center mt-4">
              We make travel planning effortless with our comprehensive platform and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'check-circle',
                title: 'Secure Booking',
                description: 'Your payments and personal information are protected with bank-level security.'
              },
              {
                icon: 'clock',
                title: '24/7 Support',
                description: 'Our customer support team is available around the clock to help you.'
              },
              {
                icon: 'map-pin',
                title: 'Verified Locations',
                description: 'All our destinations are personally verified to ensure quality and safety.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-soft mb-6">
                  <Icon name={feature.icon} size="xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

