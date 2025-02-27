import React from 'react';
import { EllipsisVertical } from 'lucide-react';
import { InventoryTable } from '@/components/InventoryTable';

const Inventory = () => {
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Inventory</h1>
        <div className='flex items-center'>
          <button className='bg-buttonBG border border-borderLine rounded-md py-1 px-1 hover:bg-neutral-200 transition-colors duration-200'>
            <EllipsisVertical />
          </button>
        </div>
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