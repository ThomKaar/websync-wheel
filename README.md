# 🎡 Wheel Spinner

A Matrix-themed React application that spins a wheel to randomly choose from a list of editable names, with MongoDB backend for persistent storage.

## Features

- 🎨 Matrix-inspired UI with green terminal aesthetics and glitch effects
- 🎡 Interactive spinning wheel with realistic physics
- ✏️ Editable list of names with password protection
- 🔒 Password-protected editing (default password: `lgtm`)
- 💾 MongoDB database for persistent storage
- ⌨️ Keyboard shortcuts (Enter/Space to spin, Escape to close winner)
- 📱 Fully responsive design
- 🎉 Animated winner announcement
- 🔄 Real-time data synchronization with backend

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally: https://www.mongodb.com/docs/manual/installation/
- Make sure MongoDB is running on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update the connection string in `server/.env.example`

### 3. Configure Environment Variables

**Backend Configuration:**
```bash
# Copy the example env file
cp server/.env.example server/.env

# Edit server/.env and update if needed:
# PORT=3001
# MONGODB_URI=mongodb://localhost:27017/wheel-spinner
# Or use your MongoDB Atlas connection string
```

**Frontend Configuration:**
Create a `.env.local` file in the root directory:
```bash
VITE_API_URL=http://localhost:3001/api
```

## Running the Application

### Development Mode

You need to run both the frontend and backend:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

### Production Build

```bash
# Build frontend
npm run build

# Start backend in production
cd server
npm start
```

## Usage

1. **Spinning the Wheel**: 
   - Click the "SPIN!" button
   - Or press Enter/Space key

2. **Editing Names**: 
   - Click the "Edit Names" button
   - Enter the password (default: `admin123`)
   - Add new names or remove existing ones
   - Click "Save Changes" to sync with database

3. **Keyboard Shortcuts**:
   - `Enter` or `Space`: Spin the wheel
   - `Escape`: Close winner modal

4. **Changing Password**: 
   - Edit the `EDIT_PASSWORD` constant in `src/App.jsx`

## Project Structure

```
wheel/
├── src/                    # Frontend React app
│   ├── components/
│   │   ├── WheelSpinner.jsx
│   │   ├── WheelSpinner.css
│   │   ├── NameManager.jsx
│   │   └── NameManager.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── server/                 # Backend Express server
│   ├── models/
│   │   └── WheelData.js   # MongoDB schema
│   ├── server.js          # Express API
│   ├── package.json
│   └── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## API Endpoints

- `GET /api/names` - Fetch all names
- `PUT /api/names` - Update names list
- `GET /api/health` - Server health check

## Technologies Used

### Frontend
- React 18
- Vite
- CSS3 with Matrix-themed animations
- Fetch API for backend communication

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS enabled

## Troubleshooting

### Connection Issues
- Make sure MongoDB is running
- Check that backend server is running on port 3001
- Verify `.env.local` and `server/.env` are configured correctly

### Port Conflicts
- If port 3001 or 5173 is in use, update the port in respective config files

### Database Issues
- Check MongoDB connection string in `server/.env`
- Verify MongoDB service is running
- Check server logs for connection errors

## License

MIT
