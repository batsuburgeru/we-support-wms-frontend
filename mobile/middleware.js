import { jwtVerify } from 'jose'; // JWT verification
import AsyncStorage from '@react-native-async-storage/async-storage'; // Local storage
import { Alert } from 'react-native'; // User notifications
import { navigate } from './navigationService'; // Custom navigation handling

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'fallback_secret'); // Ensure fallback for safety

const protectedRoutes = ['history', 'index', 'profile', 'requestdetails'];
const publicRoutes = ['Login', 'Register'];

// Helper function to parse JWT using jose
async function parseJwt(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload; // Return decoded token payload
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return null;
    }
}

export async function middleware(routeName) {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            console.warn("No token found, treating as unauthenticated user.");
        }

        const session = token ? await parseJwt(token) : null;
        const userRole = session?.role || null;

        console.log("Middleware Debug:", { token, session, userRole, routeName });

        const isProtectedRoute = protectedRoutes.includes(routeName);
        const isPublicRoute = publicRoutes.includes(routeName);

        if (isProtectedRoute && !userRole) {
            Alert.alert("Access Denied", "You need to log in to access this page.");
            navigate('signIn'); // Redirect only if not already on signIn
            return false;
        }

        if (isPublicRoute && userRole) {
            Alert.alert("Redirecting", "You're already logged in.");
            navigate('profile'); // Redirect only if not already on profile
            return false;
        }

        return true; // Allow navigation
    } catch (error) {
        console.error("Middleware error:", error);
        return false;
    }
}
