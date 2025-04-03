
import React from 'react'
import { RotateCw } from 'lucide-react'
import { PurchaseTable } from '@/components/PurchaseTable'
import Link from 'next/link'

const PurchaseList = () => {

  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Purchase Requisitions</h1>
        <div className='flex items-center'>
          <Link href="/purchase-cart" className='bg-brand-secondary text-white font-medium py-2 px-4 text-sm rounded-md hover:bg-orange-600 active:bg-orange-700 colorTransition'>
            Create New Order
          </Link>
        </div>
      </div>
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <PurchaseTable />
      </section>
    </main>
  )
}

export default PurchaseList