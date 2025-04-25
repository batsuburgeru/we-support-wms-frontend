import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; // Importing jose's jwtVerify function

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY); // Encoding the secret key

const protectedRoutes = [
    '/dashboard',
    '/inventory',
    '/account-settings',
    '/client-list',
    '/purchase-cart',
    '/purchase-list',
    '/search-results',
    '/edit-purchase-request',
    'inventory-add',
    '/purchase-details',
    '/user-list'
];

const publicRoutes = ['/login', '/', '/register'];

const adminRoutes = [
    '/inventory-add',
    '/user-list',
];

const clientRestrictedRoutes = [
    '/client-list',
    '/inventory',
    '/purchase-cart'
];

// 1. Helper function to parse JWT using jose
async function parseJwt(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
}

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const isAdminRoute = adminRoutes.includes(path);
    const isClientRestrictedRoute = clientRestrictedRoutes.includes(path);

    // 2. Get token from cookies
    const token = cookies().get('token')?.value;
    if (!token) {
        console.log("Token not found, redirecting to login.");
    }

    // 3. Decode the JWT token using jose
    const session = token ? await parseJwt(token) : null;
    const userRole = session?.role || null;

    // console.log("Middleware Debug:", { token, session, userRole, path });

    // 4. Redirect unauthenticated users from protected routes
    if (isProtectedRoute && !userRole && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // 5. Redirect authenticated users away from public routes
    if (isPublicRoute && userRole) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isAdminRoute && userRole !== "Admin") {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isClientRestrictedRoute && userRole === "Client") {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

// Ensure the middleware is compatible with the Edge Runtime
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs', // Use Node.js runtime instead
};

