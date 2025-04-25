import React from 'react';
import ClientListPage from '@/components/ClientListPage';
import { verifySession } from '@/app/lib/dal';

async function ClientList() {
  const session = await verifySession(); // Store session information to the session variable, to be used as props for the page component

  return (
    <ClientListPage userRole={session.userRole} />
  )
}

export default ClientList