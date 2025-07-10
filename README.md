# Travelis - Travel Booking App

A modern travel booking application built with Next.js, featuring destination discovery, booking management, and user authentication.

## 🚀 Railway Deployment

This project is configured for easy deployment on Railway. Follow these steps to deploy:

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
   - Railway will automatically detect the configuration

3. **Environment Variables** (if needed)
   - Add any required environment variables in Railway dashboard
   - Common variables:
     - `NODE_ENV=production`
     - `NEXT_PUBLIC_API_URL=your-api-url`

4. **Automatic Deployment**
   - Railway will automatically build and deploy your app
   - Each push to main branch triggers a new deployment

### Build Configuration

The project includes several deployment configurations:

- **`railway.json`** - Railway-specific configuration
- **`.nixpacks.toml`** - Nixpacks build configuration
- **`Dockerfile`** - Alternative Docker deployment
- **`scripts/build.sh`** - Custom build script

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
- **Deployment**: Railway

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
├── public/                # Static assets
└── scripts/               # Build scripts
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
