"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';
import Link from 'next/link';
import { mockDestinations, Destination } from '../mock/destinations';

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('');

  // Collect all unique amenities from the mock data
  const amenities = Array.from(
    new Set(mockDestinations.flatMap((d) => d.amenities))
  ).sort();

  // Filter destinations based on search and amenity
  const filteredDestinations = mockDestinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAmenity =
      !selectedAmenity || destination.amenities.includes(selectedAmenity);
    return matchesSearch && matchesAmenity;
  });

  return (
    <>
      <PageHeader 
        title="Discover Destinations"
        subtitle="Explore our curated collection of amazing camping destinations. From mountain peaks to lakeside retreats, find your perfect outdoor adventure."
      />
      {/* Filter Bar */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-stretch justify-center">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search destinations by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 shadow"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedAmenity}
            onChange={(e) => setSelectedAmenity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 shadow appearance-none"
          >
            <option value="">All Amenities</option>
            {amenities.map((amenity) => (
              <option key={amenity} value={amenity}>{amenity}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-700 text-center">
          Showing {filteredDestinations.length} of {mockDestinations.length} destinations
        </p>
      </div>
      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((destination: Destination) => (
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
                  <p className="text-gray-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {destination.location}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
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
      {/* Empty State */}
      {filteredDestinations.length === 0 && (
        <div className="text-center py-24">
          <p className="text-gray-500 text-lg mb-4">No destinations found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedAmenity('');
            }}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
} 