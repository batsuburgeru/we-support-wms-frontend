"use client"

import React from 'react';
import { UserTable } from '@/components/UserTable';
import { NewUserModal } from '@/components/NewUserModal';
import { EllipsisVertical } from 'lucide-react';

const ClientList = () => {
  const [changeIndicator, setChangeIndicator] = React.useState(true);

  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>All Users</h1>
        <div className='flex items-center'>
          <NewUserModal setChangeIndicator={setChangeIndicator} />
        </div>
      </div>
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <UserTable changeIndicator={changeIndicator} />
      </section>
    </main>
  )
}

export default ClientList