'use client';

import { useState, useRef } from 'react';
import Icon from '@/components/ui/Icon';

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface HeroSectionProps {
  onSearch: (searchData: SearchData) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchData, setSearchData] = useState<SearchData>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
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
                  {/* Full button for md+ screens */}
                  <button
                    type="submit"
                    className="hidden md:flex bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 text-lg items-center gap-2"
                  >
                    <Icon name="search" size="sm" className="text-white" />
                    Search
                  </button>
                  {/* Icon-only button for mobile */}
                  <button
                    type="submit"
                    className="flex md:hidden items-center justify-center p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl focus:ring-4 focus:ring-green-200"
                    aria-label="Search"
                  >
                    <Icon name="search" size="md" className="text-white" />
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
  );
} 