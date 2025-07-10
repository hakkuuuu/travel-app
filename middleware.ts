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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
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