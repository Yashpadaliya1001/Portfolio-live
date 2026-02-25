#!/bin/bash

# Render Frontend Build Script
echo "🚀 Building React Frontend for Production..."

# Install dependencies
echo "📦 Installing dependencies..."
yarn install --frozen-lockfile

# Build React app
echo "🔨 Building React app..."
yarn build

echo "✅ Build complete! Static files ready in /build"
