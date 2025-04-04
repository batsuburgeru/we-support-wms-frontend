import React from 'react'
import SkeletonLoader from '@/components/SkeletonLoader';
import ProductSearch from '@/components/ProductSearch';
import { ShoppingCart } from 'lucide-react'

const Loading = () => {
  return (
    <div>
      <section className='flex flex-col px-6 py-4 gap-4'>
        <h1>Search Results</h1>
        <div className='flex justify-between items-center'>
          <ProductSearch width={'[500px]'}/>
          <button>
            <ShoppingCart size={30} />
          </button>
        </div>
      </section>
      <hr />
      <section className='px-6 flex items-end justify-between py-4'>
        <div>
          <div className='bg-neutral-400 rounded-2xl w-64 h-4 animate-pulse mt-2'/>
          <div className='bg-neutral-400 rounded-2xl w-80 h-4 animate-pulse mt-2'/>
        </div>
      </section>
      <hr />
      <div className='py-4 px-6 grid grid-flow-row grid-cols-3 gap-6 xl:grid-cols-4 2xl:grid-cols-5'>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    </div>
  )
}

export default Loading