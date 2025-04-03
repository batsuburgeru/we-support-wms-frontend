import React from 'react';
import { ClientTable } from '@/components/ClientTable';
import { NewClientModal } from '@/components/NewClientModal';
import { verifySession } from '@/app/lib/dal';

async function ClientList() {
  const session = await verifySession();

  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>All Clients</h1>
        {session.userRole === "Admin" && <div className='flex items-center'>
          <NewClientModal />
        </div>}
      </div>
      <hr />
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <ClientTable />
      </section>
    </main>
  )
}

export default ClientList