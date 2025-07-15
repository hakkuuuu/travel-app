'use client';

import { useState } from 'react';
import HeroSection from '@/components/features/home/HeroSection';
import FeaturedDestinationsSection from '@/components/features/home/FeaturedDestinationsSection';
import FeaturesSection from '@/components/features/home/FeaturesSection';

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export default function Home() {
  const [searchData, setSearchData] = useState<SearchData | undefined>(undefined);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <FeaturedDestinationsSection searchData={searchData} />
      <FeaturesSection />
    </>
  );
}

