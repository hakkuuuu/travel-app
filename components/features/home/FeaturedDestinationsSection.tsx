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

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface FeaturedDestinationsSectionProps {
  searchData?: SearchData;
}

export default function FeaturedDestinationsSection({ searchData }: FeaturedDestinationsSectionProps) {
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

  useEffect(() => {
    if (searchData) {
      // Filter destinations based on search data
      const filtered = featuredDestinations.filter((dest) => {
        const query = searchData.destination.trim().toLowerCase();
        const matchesDestination =
          !query ||
          dest.name.toLowerCase().includes(query) ||
          dest.location.toLowerCase().includes(query);
        return matchesDestination;
      });
      setFilteredDestinations(filtered);
      
      // Scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchData, featuredDestinations]);

  return (
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
  );
} 