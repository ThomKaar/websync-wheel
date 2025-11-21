#!/bin/bash

echo "🎡 Wheel Spinner - Setup Script"
echo "================================"
echo ""

# Create frontend .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating frontend .env.local..."
    cat > .env.local << EOF
VITE_API_URL=http://localhost:3001/api
EOF
    echo "✅ Frontend .env.local created"
else
    echo "✓ Frontend .env.local already exists"
fi

# Create server .env if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating backend .env..."
    cat > server/.env << EOF
PORT=3001
MONGODB_URI=mongodb://localhost:27017/wheel-spinner
EOF
    echo "✅ Backend .env created"
else
    echo "✓ Backend .env already exists"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd server && npm install && cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Start the backend:  cd server && npm run dev"
echo "3. Start the frontend: npm run dev"
echo ""
echo "🚀 The app will be available at http://localhost:5173"

