import React from 'react';
import Navbar from '@/components/Navbar';
import { verifySession } from '@/app/lib/dal';

async function NavContainer() {
    const session = await verifySession();

    return (
        <Navbar userRole={session.userRole} />
    )
}

export default NavContainer