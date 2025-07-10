#!/bin/bash

# Railway Build Script for Travelis App
# This script handles the build and deployment process

set -e

echo "🚀 Starting Railway deployment for Travelis..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production --legacy-peer-deps

# Build the application
echo "🔨 Building the application..."
npm run build

# Verify build output
if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed - .next directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "🚀 Application is ready for deployment on Railway"

# Optional: Run tests if they exist
if [ -f "package.json" ] && grep -q "\"test\":" package.json; then
    echo "🧪 Running tests..."
    npm test --if-present
fi

echo "🎉 Deployment script completed!" 