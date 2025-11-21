# 🚀 Quick Start Guide

Get the Wheel Spinner app running in 3 easy steps!

## Prerequisites

Make sure you have these installed:
- Node.js (v16+)
- MongoDB (local or Atlas account)

## Step 1: Setup

Run the setup script:
```bash
./setup.sh
```

Or manually:
```bash
# Install dependencies
npm install
cd server && npm install && cd ..

# Create .env.local in root
echo "VITE_API_URL=http://localhost:3001/api" > .env.local

# Create server/.env
echo "PORT=3001" > server/.env
echo "MONGODB_URI=mongodb://localhost:27017/wheel-spinner" >> server/.env
```

## Step 2: Start MongoDB

**Local MongoDB:**
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Or use MongoDB Atlas** (cloud):
- Update `server/.env` with your Atlas connection string

## Step 3: Run the App

**Option A: Run both servers at once (recommended)**
```bash
npm run dev:all
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## Access the App

Open your browser to: **http://localhost:5173**

## Usage

- Click **SPIN!** or press **Enter/Space** to spin the wheel
- Click **Edit Names** to modify the list (password: `admin123`)
- Press **Escape** to close the winner modal

## Troubleshooting

### "Failed to load names"
- Check if MongoDB is running
- Verify backend server is running on port 3001
- Check `server/.env` has correct MongoDB connection string

### Port already in use
Update ports in:
- `server/.env` - change `PORT=3001`
- `.env.local` - update API URL

### MongoDB connection error
- Verify MongoDB service is running
- Check connection string in `server/.env`
- View server logs for details

## Default Configuration

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`
- MongoDB: `mongodb://localhost:27017/wheel-spinner`
- Edit Password: `admin123`

Enjoy your Matrix-themed wheel spinner! 🎡💚

