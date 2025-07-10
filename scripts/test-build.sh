#!/bin/bash

# Test build script for local verification
echo "🧪 Testing build process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run lint
echo "🔍 Running lint..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build test completed successfully!"
echo "🚀 Ready for deployment!" 