import React from 'react';
import { ClientTable } from '@/components/ClientTable';
import { NewClientModal } from '@/components/NewClientModal';
import { EllipsisVertical } from 'lucide-react';

const ClientList = () => {
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>All Clients</h1>
        <div className='flex items-center'>
          <NewClientModal />
          <button className='bg-buttonBG border border-borderLine rounded-md py-1 px-1 ml-4 hover:bg-neutral-200 transition-colors duration-200'>
            <EllipsisVertical />
          </button>
        </div>
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