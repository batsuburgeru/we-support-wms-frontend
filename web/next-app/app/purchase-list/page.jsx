import React from 'react'
import { EllipsisVertical } from 'lucide-react'
import { PurchaseTable } from '@/components/PurchaseTable'
import Link from 'next/link'

const PurchaseList = () => {
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Purchase Requisitions</h1>
        <div className='flex items-center'>
          <Link href="/new-purchase" className='bg-brand-primary text-white font-medium mr-4 py-2 px-4 text-sm rounded-md hover:bg-orange-600 colorTransition'>
            Create New Order
          </Link>
          <button className='bg-buttonBG border border-borderLine rounded-md py-1 px-1 hover:bg-neutral-200 transition-colors duration-200'>
            <EllipsisVertical />
          </button>
        </div>
      </div>
      <hr />
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <PurchaseTable />
      </section>
    </main>
  )
}

export default PurchaseList