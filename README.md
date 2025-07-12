# 🌍 Travelis - Modern Travel Booking Platform

**Discover, book, and manage your next adventure with our comprehensive travel booking application built for the modern traveler.**

## ✨ Features

### 🏕️ **Destination Discovery**
- Browse curated camping destinations with stunning imagery
- Advanced search with filters for amenities and locations
- Detailed destination pages with reviews, ratings, and pricing
- Interactive maps and location-based recommendations

### 🔐 **User Authentication & Profiles**
- Secure user registration and login system
- Personalized user profiles with booking history
- Role-based access control (User/Admin)
- Password management and account settings

### 📅 **Booking Management**
- Seamless booking process with date selection
- Guest count management and availability checking
- Booking history and status tracking
- Email confirmations and notifications

### 🛠️ **Admin Dashboard**
- Comprehensive admin panel for platform management
- Destination CRUD operations with rich media support
- User management with role assignments
- Analytics dashboard with booking statistics
- Recent activity monitoring

### 🎨 **Modern UI/UX**
- Responsive design optimized for all devices
- Beautiful gradient backgrounds and smooth animations
- Dark/light theme support
- Intuitive navigation and search functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: MongoDB with optimized queries
- **Authentication**: Custom JWT-based auth system
- **Charts**: Chart.js with React integration
- **Deployment**: Docker containerization with Railway
- **Icons**: React Icons library
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Railway account (for deployment)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/travelis.git
cd travelis

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and other configs

# Run development server
npm run dev
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 🌐 Deployment

### Railway Deployment

This project is configured for easy deployment on Railway using Docker:

1. **Connect to Railway**
   ```bash
   # Install Railway CLI (optional)
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   ```

2. **Deploy from Railway Dashboard**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect the Docker configuration

3. **Environment Variables**
   - Add required environment variables in Railway dashboard:
     - `NODE_ENV=production`
     - `DEBUG=false`
     - `MONGODB_URI=your-mongodb-connection-string`
     - `RAILWAY_STATIC_URL=your-railway-app-url`
     - `RAILWAY_PUBLIC_DOMAIN=your-railway-domain`

## 📁 Project Structure

```
travel-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (features)/        # Feature routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── admin/            # Admin dashboard components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
├── public/                # Static assets
├── scripts/               # Build and seed scripts
├── Dockerfile            # Production Docker build
├── docker-compose.yml    # Local development
└── railway.json          # Railway configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🌟 Key Features in Detail

### Search & Discovery
- **Advanced Search**: Filter by destination, dates, guest count, and amenities
- **Smart Filtering**: Real-time search with amenity-based filtering
- **Featured Destinations**: Curated selection of top destinations

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: WCAG compliant design patterns

### Admin Capabilities
- **Dashboard Analytics**: Booking statistics and user metrics
- **Content Management**: Add/edit destinations with rich media
- **User Management**: Full CRUD operations for user accounts
- **Activity Monitoring**: Track recent platform activity

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from React Icons
- Charts powered by Chart.js

---

**Ready to start your next adventure? Book with Travelis today! 🏖️✈️🏕️**
