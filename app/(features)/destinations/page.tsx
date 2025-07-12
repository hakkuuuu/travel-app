"use client";

import { useState, useEffect } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DestinationFilters from '@/components/features/destinations/DestinationFilters';
import DestinationsGrid from '@/components/features/destinations/DestinationsGrid';
import Pagination from '@/components/ui/Pagination';
import { Destination } from '@/types/destination';

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 9; // Show 9 destinations per page (3x3 grid)

  useEffect(() => {
    setLoading(true);
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load destinations.');
        setLoading(false);
      });
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedAmenity]);

  // Collect all unique amenities from the fetched data
  const amenities = Array.from(
    new Set(destinations.flatMap((d) => d.amenities))
  ).sort();

  // Filter destinations based on search and amenity
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAmenity =
      !selectedAmenity || (destination.amenities ?? []).includes(selectedAmenity);
    return matchesSearch && matchesAmenity;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);
  const startIndex = (currentPage - 1) * destinationsPerPage;
  const endIndex = startIndex + destinationsPerPage;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of destinations section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleAmenityChange = (value: string) => {
    setSelectedAmenity(value);
  };

  return (
    <>
      <PageHeader 
        title="Discover Destinations"
        subtitle="Explore our curated collection of amazing camping destinations. From mountain peaks to lakeside retreats, find your perfect outdoor adventure."
      />
      
      <DestinationFilters
        searchTerm={searchTerm}
        selectedAmenity={selectedAmenity}
        amenities={amenities}
        onSearchChange={handleSearchChange}
        onAmenityChange={handleAmenityChange}
      />
      
      <DestinationsGrid
        destinations={currentDestinations}
        loading={loading}
        error={error}
        startIndex={startIndex}
        endIndex={endIndex}
        totalCount={filteredDestinations.length}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        variant="default"
      />
    </>
  );
} 