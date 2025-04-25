// Mainly used to export the role of the currently logged in user to specific pages

import 'server-only';
 
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { cache } from 'react';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY); // Encoding the secret key

export const verifySession = cache(async () => {
    const token = cookies().get('token')?.value;
    if (!token) {
        console.warn("No token found in cookies");
    }
    const session = token ? await parseJwt(token) : null;
    const userRole = session?.role || null;

    
    if (!userRole) {
        redirect('/login')
    }
    
    return { isAuth: true, userId: session.id, userRole: userRole }
})

async function parseJwt(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
};
  