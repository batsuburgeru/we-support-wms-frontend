import React from 'react';
import ClientListPage from '@/components/ClientListPage';
import { verifySession } from '@/app/lib/dal';

async function ClientList() {
  const session = await verifySession();

  return (
    <ClientListPage userRole={session.userRole} />
  )
}

export default ClientList