import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Railway deployment
  output: 'standalone',
  
  // Optimize images for production
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      // Add more as needed
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Turbopack configuration
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
      resolveAlias: {
        '@': path.resolve(__dirname),
      },
    },
  },

  // Environment-specific configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Server configuration for different environments
  serverRuntimeConfig: {
    // Will only be available on the server side
    allowedHosts: process.env.DEBUG === 'true' 
      ? ['localhost', '127.0.0.1'] 
      : [process.env.RAILWAY_STATIC_URL || 'localhost'],
  },

  // Public configuration that will be available on both server and client
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};

export default nextConfig;
