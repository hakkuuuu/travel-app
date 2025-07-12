import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import React from 'react';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  PointElement,
  LineElement,
  Title
);

interface Destination {
  id: number;
  name: string;
  location: string;
  rating?: number;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  reviews?: any[];
}

interface User {
  id: number;
  name?: string;
  username: string;
  email: string;
  role?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
}

interface DashboardStatsProps {
  destinations: Destination[];
  users: User[];
}

const COLORS = [
  '#10B981', // Green
  '#3B82F6', // Blue
  '#F59E42', // Orange
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
];

export default function DashboardStats({ destinations, users }: DashboardStatsProps) {
  // Calculate statistics
  const destinationsCount = destinations.length;
  const usersCount = users.length;
  const totalReviews = destinations.reduce((acc, dest) => acc + (dest.reviews?.length || 0), 0);
  
  // Average rating across all destinations
  const averageRating = destinations.length > 0 
    ? (destinations.reduce((acc, dest) => acc + (dest.rating || 0), 0) / destinations.length).toFixed(1)
    : '0.0';
  
  // Most popular destinations (by number of reviews)
  const popularDestinations = [...destinations]
    .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
    .slice(0, 5);
  
  // Average price (extract numeric value)
  const averagePrice = destinations.length > 0 
    ? (destinations.reduce((acc, dest) => {
        const price = parseInt(dest.price.replace(/[^0-9]/g, ''));
        return acc + (isNaN(price) ? 0 : price);
      }, 0) / destinations.length).toFixed(0)
    : '0';
  
  // Top rated destinations
  const topRatedDestinations = [...destinations]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);
  
  // User engagement (users with reviews)
  const usersWithReviews = new Set(
    destinations.flatMap(dest => dest.reviews?.map(review => review.user) || [])
  ).size;
  
  // Recent activity (destinations added in last 30 days - mock data)
  const recentDestinations = destinations.slice(0, 3); // For demo purposes
  
  // Amenities popularity
  const amenitiesCount: { [key: string]: number } = {};
  destinations.forEach(dest => {
    dest.amenities?.forEach(amenity => {
      amenitiesCount[amenity] = (amenitiesCount[amenity] || 0) + 1;
    });
  });
  const topAmenities = Object.entries(amenitiesCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Main stats cards
  const mainStats = [
    { 
      label: 'Total Destinations', 
      value: destinationsCount, 
      color: COLORS[0],
      icon: '🏕️',
      description: 'Available camping spots'
    },
    { 
      label: 'Registered Users', 
      value: usersCount, 
      color: COLORS[1],
      icon: '👥',
      description: 'Active community members'
    },
    { 
      label: 'Total Reviews', 
      value: totalReviews, 
      color: COLORS[2],
      icon: '⭐',
      description: 'User feedback received'
    },
    { 
      label: 'Avg. Rating', 
      value: averageRating, 
      color: COLORS[3],
      icon: '📊',
      description: 'Overall satisfaction score'
    },
    { 
      label: 'Avg. Price', 
      value: `$${averagePrice}`, 
      color: COLORS[4],
      icon: '💰',
      description: 'Per night average'
    },
    { 
      label: 'Engaged Users', 
      value: usersWithReviews, 
      color: COLORS[5],
      icon: '💬',
      description: 'Users who left reviews'
    },
  ];

  // Chart data
  const popularDestinationsData = {
    labels: popularDestinations.map(d => d.name.substring(0, 15) + '...'),
    datasets: [{
      label: 'Number of Reviews',
      data: popularDestinations.map(d => d.reviews?.length || 0),
      backgroundColor: COLORS[0],
      borderRadius: 8,
    }]
  };

  const topRatedData = {
    labels: topRatedDestinations.map(d => d.name.substring(0, 15) + '...'),
    datasets: [{
      label: 'Rating',
      data: topRatedDestinations.map(d => d.rating || 0),
      backgroundColor: COLORS[2],
      borderRadius: 8,
    }]
  };

  const amenitiesData = {
    labels: topAmenities.map(([amenity]) => amenity),
    datasets: [{
      label: 'Destinations with this amenity',
      data: topAmenities.map(([, count]) => count),
      backgroundColor: COLORS[4],
      borderRadius: 8,
    }]
  };

  return (
    <div className="space-y-8">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainStats.map((stat, index) => (
          <div key={stat.label} className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Destinations */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Popular Destinations</h3>
          <div className="h-64">
            <Bar 
              data={popularDestinationsData} 
              options={{
                plugins: { legend: { display: false } },
                scales: { 
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                  x: { ticks: { maxRotation: 45 } }
                },
                responsive: true,
                maintainAspectRatio: false,
              }} 
            />
          </div>
        </div>

        {/* Top Rated Destinations */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Highest Rated Destinations</h3>
          <div className="h-64">
            <Bar 
              data={topRatedData} 
              options={{
                plugins: { legend: { display: false } },
                scales: { 
                  y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } },
                  x: { ticks: { maxRotation: 45 } }
                },
                responsive: true,
                maintainAspectRatio: false,
              }} 
            />
          </div>
        </div>
      </div>

      {/* Popular Amenities */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Popular Amenities</h3>
        <div className="h-64">
          <Bar 
            data={amenitiesData} 
            options={{
              plugins: { legend: { display: false } },
              scales: { 
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
                x: { ticks: { maxRotation: 45 } }
              },
              responsive: true,
              maintainAspectRatio: false,
            }} 
          />
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">User Engagement Rate</span>
              <span className="font-semibold text-green-600">
                {usersCount > 0 ? ((usersWithReviews / usersCount) * 100).toFixed(1) : '0'}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Destinations with Reviews</span>
              <span className="font-semibold text-blue-600">
                {destinations.filter(d => (d.reviews?.length || 0) > 0).length} / {destinationsCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Reviews per Destination</span>
              <span className="font-semibold text-orange-600">
                {destinationsCount > 0 ? (totalReviews / destinationsCount).toFixed(1) : '0'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentDestinations.map((dest, index) => (
              <div key={dest.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{dest.name}</p>
                  <p className="text-xs text-gray-600">{dest.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{dest.rating || 0} ⭐</p>
                  <p className="text-xs text-gray-600">{dest.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 