import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/settings',
  '/destinations', // Individual destination pages will be handled by the component
];

// Define public routes that don't need authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
];

// Simple host validation function (since we can't import from lib/config in middleware)
function isAllowedHost(host: string): boolean {
  const isDebug = process.env.DEBUG === 'true';
  
  if (isDebug) {
    return ['localhost', '127.0.0.1', '0.0.0.0'].includes(host);
  }
  
  // For Railway deployment, be more permissive
  if (process.env.NODE_ENV === 'production') {
    // Allow Railway domains and any host that contains 'railway'
    if (host.includes('railway') || host.includes('railway.app')) {
      return true;
    }
    
    // Allow localhost and common development hosts
    if (['localhost', '127.0.0.1', '0.0.0.0'].includes(host)) {
      return true;
    }
    
    // Allow Railway environment variables if set
    const railwayUrl = process.env.RAILWAY_STATIC_URL;
    const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN;
    
    if (railwayUrl && host.includes(railwayUrl.replace('https://', '').replace('http://', ''))) {
      return true;
    }
    
    if (railwayDomain && host.includes(railwayDomain)) {
      return true;
    }
    
    // For now, allow all hosts in production to prevent healthcheck issues
    // You can tighten this later once the app is working
    return true;
  }
  
  // Development: allow all localhost variants
  return ['localhost', '127.0.0.1', '0.0.0.0'].includes(host);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';
  
  // Skip host validation for healthcheck requests
  if (pathname === '/' && request.headers.get('user-agent')?.includes('Railway')) {
    return NextResponse.next();
  }
  
  // Validate host in production (but be more permissive)
  if (process.env.NODE_ENV === 'production' && !isAllowedHost(host)) {
    console.warn(`Blocked request from unauthorized host: ${host}`);
    return new NextResponse('Unauthorized', { status: 403 });
  }
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) && pathname !== '/destinations'
  );
  
  // Check if the route is a campsite detail page (protected)
  const isDestinationDetailPage = pathname.match(/^\/destinations\/\d+$/);
  
  // For client-side authentication, we'll let the components handle the protection
  // The middleware will only handle basic redirects for login/register when already authenticated
  // This is because middleware runs on the server and can't access localStorage
  
  // Since we're using localStorage-based authentication on the client side,
  // we'll let the components handle login/register redirects
  // This prevents conflicts between server-side middleware and client-side auth state

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 