# 🎡 Wheel Spinner - Next.js Edition

A retro terminal-style wheel spinner built with Next.js, perfect for random selection and giveaways!

## 🚀 Features

- 🎨 Retro terminal/hacker aesthetic with glowing green effects
- 🎯 Smooth spinning animation with random selection
- 🔒 Password-protected name editing
- 💾 Local storage for persistent data
- 📱 Fully responsive design
- ⌨️ Keyboard shortcuts (Enter/Space to spin, Escape to close winner)
- 🎪 Vertical text along wheel segments
- 🌐 Ready for Vercel deployment with API routes

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Configuration

### Changing the Password

Edit the password in `app/page.jsx`:

```javascript
const EDIT_PASSWORD = 'admin123' // Change this to your desired password
```

### Customizing Default Names

Modify the `DEFAULT_NAMES` array in `app/page.jsx`:

```javascript
const DEFAULT_NAMES = [
  'Name1',
  'Name2',
  'Name3',
  // Add your names here
]
```

## 🎮 Usage

1. Click the **SPIN** button or press **Enter/Space** to spin the wheel
2. Click **Edit Names** to modify the list (requires password)
3. Add or remove names as needed
4. Names are automatically saved to local storage

## 🌐 API Routes

The app includes API routes ready for future server-side functionality:

- `GET /api/health` - Health check endpoint
- `GET /api/names` - Fetch names (ready for database integration)
- `PUT /api/names` - Update names (ready for database integration)

Currently the app uses localStorage, but you can easily add database logic to these routes.

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy!

### Environment Variables (Optional)

If you add a database later, set your environment variables in Vercel:

- `DATABASE_URL` - Your database connection string
- `NEXT_PUBLIC_API_URL` - Your API URL (if different from default)

## 📁 Project Structure

```
wheel/
├── app/
│   ├── api/              # API routes
│   │   ├── health/
│   │   └── names/
│   ├── components/       # React components
│   │   ├── NameManager.jsx
│   │   ├── NameManager.css
│   │   ├── WheelSpinner.jsx
│   │   └── WheelSpinner.css
│   ├── globals.css       # Global styles
│   ├── layout.jsx        # Root layout
│   ├── page.jsx          # Home page
│   └── page.css          # Page styles
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
└── vercel.json          # Vercel configuration
```

## 🎨 Customization

### Colors

The app uses a green terminal theme. To change colors, update the CSS files:

- Primary color: `#00ff00` (bright green)
- Background: `#000000` (black)
- Accents: Various shades of green

### Wheel Segments

Wheel colors are defined in `app/components/WheelSpinner.jsx`:

```javascript
const colors = [
  '#001a00', '#003300', '#004d00', '#006600',
  '#008000', '#009900', '#00b300', '#00cc00',
  '#002600', '#003d00'
]
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **React:** 18.3.1
- **Deployment:** Vercel
- **Styling:** CSS Modules
- **Fonts:** Google Fonts (Courier Prime, Share Tech Mono)

## 📝 License

MIT License - Feel free to use this project however you'd like!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with 💚 and terminal nostalgia
