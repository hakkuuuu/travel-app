import React from 'react';
import HeroSection from '@/components/features/about/HeroSection';
import StatsSection from '@/components/features/about/StatsSection';
import FeaturesSection from '@/components/features/about/FeaturesSection';
import StorySection from '@/components/features/about/StorySection';
import ValuesSection from '@/components/features/about/ValuesSection';
import CTASection from '@/components/features/about/CTASection';

const features = [
  {
    icon: 'map-pin',
    title: 'Curated Destinations',
    description: 'Handpicked locations that guarantee unforgettable experiences.'
  },
  {
    icon: 'check-circle',
    title: 'Secure Booking',
    description: 'Bank-level security for your payments and personal information.'
  },
  {
    icon: 'clock',
    title: '24/7 Support',
    description: 'Our team is always here to help you plan the perfect trip.'
  },
  {
    icon: 'star',
    title: 'Verified Reviews',
    description: 'Real experiences from real travelers you can trust.'
  },
];

const stats = [
  { number: '50K+', label: 'Happy Travelers' },
  { number: '200+', label: 'Destinations' },
  { number: '4.9', label: 'Average Rating' },
  { number: '24/7', label: 'Support' },
];

const values = [
  {
    icon: 'check-circle',
    title: 'Trust',
    description: 'We believe in honest recommendations and secure experiences.'
  },
  {
    icon: 'users',
    title: 'Community',
    description: 'Building connections between travelers worldwide.'
  },
  {
    icon: 'globe',
    title: 'Adventure',
    description: 'Inspiring everyone to explore and discover new places.'
  }
];

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StatsSection stats={stats} />
      <FeaturesSection features={features} />
      <StorySection />
      <ValuesSection values={values} />
      <CTASection />
    </>
  );
} 