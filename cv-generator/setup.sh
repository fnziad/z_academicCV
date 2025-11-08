#!/bin/bash

cd "$(dirname "$0")"

echo "🚀 Setting up CV Generator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or later."
    exit 1
fi

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "⚠️  pdflatex is not installed. Installing LaTeX packages..."
    
    # Check OS and install accordingly
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install --cask mactex-no-gui
        else
            echo "❌ Please install Homebrew first, then run: brew install --cask mactex-no-gui"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y texlive-latex-base texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra
    else
        echo "❌ Please install LaTeX manually for your OS"
        exit 1
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

cd backend
npm install
cd ..

cd frontend  
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "🎯 Quick start:"
echo "   Development: npm run dev"
echo "   Production:  docker-compose up --build"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
