"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Destination {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const FALLBACK_IMAGE = '/default-destination.jpg';
const ALLOWED_IMAGE_HOSTNAMES = [
  'images.unsplash.com',
  'unsplash.com',
  'plus.unsplash.com',
];

function isAllowedImageUrl(url: string | undefined) {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return ALLOWED_IMAGE_HOSTNAMES.includes(hostname);
  } catch {
    return false;
  }
}

function DestinationDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [id, setId] = useState<string>('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    
    async function fetchDestination() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/destinations?id=${id}`);
        if (!res.ok) throw new Error('Destination not found');
        const data = await res.json();
        setDestination(data);
      } catch (e) {
        setError('Destination not found');
      } finally {
        setLoading(false);
      }
    }
    fetchDestination();
  }, [id]);

  const totalPrice = parseInt(destination?.price.replace('$', '').replace('/night', '') || '0') * nights;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a check-in date');
      return;
    }
    setIsBooking(true);
    try {
      const checkOut = new Date(selectedDate);
      checkOut.setDate(checkOut.getDate() + nights);
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user?.username,
          campsiteId: destination?.id.toString(),
          campsiteName: destination?.name,
          checkIn: selectedDate,
          checkOut: checkOut.toISOString().split('T')[0],
          guests,
          totalPrice: totalPrice + 5
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('Booking confirmed! Check your profile for details.');
        router.push('/profile');
      } else {
        alert(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return <div className="py-32 text-center text-lg text-gray-500">Loading destination...</div>;
  }
  if (error || !destination) {
    return <div className="py-32 text-center text-lg text-red-600">{error || 'Destination not found.'}</div>;
  }

  // Ensure all arrays are defined
  const reviews = destination.reviews ?? [];
  const amenities = destination.amenities ?? [];
  const features = destination.features ?? [];

  return (
    <div className="max-container padding-container py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-700 via-blue-600 to-green-400 bg-clip-text text-transparent">
            {destination?.name}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              {destination?.rating} ({reviews.length} reviews)
            </span>
            <span>•</span>
            <span>{destination?.location}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
              <Image
                src={isAllowedImageUrl(destination?.image) ? destination?.image! : FALLBACK_IMAGE}
                alt={destination?.name || 'Destination'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                About this campsite
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {destination?.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                What this place offers
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity: string) => (
                  <span
                    key={amenity}
                    className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Reviews
              </h2>
              <div className="space-y-6">
                {reviews.map((review: Review) => (
                  <div key={review.id} className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {review.user}
                          </h4>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg sticky top-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {destination?.price}
                </h3>
                <p className="text-gray-600">per night</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Nights
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(n => (
                      <option key={n} value={n}>{n} night{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                  >
                    {[1, 2, 3, 4, 5, 6].map(g => (
                      <option key={g} value={g}>{g} guest{g !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      ${parseInt(destination?.price.replace('$', '').replace('/night', '') || '0')} × {nights} nights
                    </span>
                    <span className="text-gray-900">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">$5</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${totalPrice + 5}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isBooking ? 'Booking...' : 'Book Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <ProtectedRoute>
      <DestinationDetailContent params={params} />
    </ProtectedRoute>
  );
} 