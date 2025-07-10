# Travelis - Travel Booking App

A modern travel booking application built with Next.js, featuring destination discovery, booking management, and user authentication.

## 🚀 Railway Deployment

This project is configured for easy deployment on Railway using Docker. Follow these steps to deploy:

### Prerequisites
- Railway account
- Git repository with your code

### Deployment Steps

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
     - `DEBUG=false` (for production)
     - `MONGODB_URI=your-mongodb-connection-string`
     - `RAILWAY_STATIC_URL=your-railway-app-url`
     - `RAILWAY_PUBLIC_DOMAIN=your-railway-domain`

4. **Automatic Deployment**
   - Railway will automatically build and deploy your app using Docker
   - Each push to main branch triggers a new deployment

### Build Configuration

The project includes several deployment configurations:

- **`railway.json`** - Railway-specific configuration with Docker
- **`Dockerfile`** - Multi-stage Docker build for production
- **`docker-compose.yml`** - Local development with Docker
- **`.dockerignore`** - Optimized Docker build context

## 🔧 Environment Configuration

### DEBUG Mode

The application supports DEBUG mode for development:

```bash
# Development (DEBUG mode enabled)
DEBUG=true npm run dev

# Production (DEBUG mode disabled)
DEBUG=false npm start
```

**DEBUG Mode Features:**
- Allows localhost and 127.0.0.1 as allowed hosts
- Enables detailed logging
- Relaxed security for local development

**Production Mode Features:**
- Restricts allowed hosts to Railway domains
- Optimized for production performance
- Enhanced security measures

### Docker Development

Run the application locally using Docker:

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

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Authentication**: Custom Auth Context
- **Database**: MongoDB (configured)
- **Deployment**: Railway with Docker
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
travel-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (features)/        # Feature routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
│   └── config.ts         # Environment configuration
├── public/                # Static assets
├── scripts/               # Build scripts
├── Dockerfile            # Production Docker build
├── docker-compose.yml    # Local development
└── .dockerignore         # Docker build optimization
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🌐 Live Demo

Your app will be available at the Railway-provided URL after deployment.

## 📝 License

This project is licensed under the MIT License.
