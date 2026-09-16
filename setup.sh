#!/bin/bash

# Atlas Trader - Local Development Setup Script

echo "🚀 Atlas Trader - Setting up local development environment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 To start the development server, run:"
echo ""
echo "   npm run dev"
echo ""
echo "🌐 The application will be available at:"
echo "   http://localhost:5173"
echo ""
echo "💡 Features to try:"
echo "   • Click '➕ New paper trade' to simulate buying/selling stocks"
echo "   • Click '🔔 Set Alert' to create price alerts"
echo "   • Go to the 'Alerts' tab to manage your alerts"
echo "   • Click 'Models' to train ML models in real-time"
echo "   • Toggle dark mode with the moon icon (☾)"
echo ""
