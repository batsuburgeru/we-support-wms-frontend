import React from 'react';
import { InventoryTable } from '@/components/InventoryTable';
import Link from 'next/link';
import { verifySession } from '@/app/lib/dal';

async function Inventory() {
  const session = await verifySession();
  
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Inventory</h1>
        {session.userRole === "Admin" && <div className='flex items-center'>
          <Link href="/inventory-add" className='bg-brand-secondary text-white font-medium py-2 px-4 text-sm rounded-md hover:bg-orange-600 active:bg-orange-700 colorTransition'>
            Add New Item
          </Link>
        </div>}
      </div>
      <hr />
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <InventoryTable />
      </section>
    </main>
  )
}

export default Inventory