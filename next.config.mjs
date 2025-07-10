/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Railway deployment
  output: 'standalone',
  
  // Optimize images for production
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  
  // Disable telemetry in production
  telemetry: false,
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
