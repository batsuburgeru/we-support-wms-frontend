"use client"

import React from 'react';
import { ClientTable } from '@/components/ClientTable';
import { NewClientModal } from '@/components/NewClientModal';

function ClientList({ userRole}) {
  const [changeIndicator, setChangeIndicator] = React.useState(true);

  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Clients</h1>
        {userRole === "Admin" && <div className='flex items-center'>
          <NewClientModal setChangeIndicator={setChangeIndicator} />
        </div>}
      </div>
      <hr />
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <ClientTable changeIndicator={changeIndicator} />
      </section>
    </main>
  )
}

export default ClientList