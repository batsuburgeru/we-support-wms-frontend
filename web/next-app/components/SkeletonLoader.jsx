import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className='bg-neutral-200 border border-borderLine rounded-2xl p-4 w-[238px] h-72 animate-pulse flex flex-col' >
        <div className='bg-neutral-400 rounded-2xl p-4 w-full h-40 animate-pulse'/>
        <div className='bg-neutral-400 rounded-2xl w-full h-4 animate-pulse mt-4'/>
        <div className='bg-neutral-400 rounded-2xl w-2/3 h-4 animate-pulse mt-2'/>
        <div className='bg-neutral-400 rounded-2xl w-1/2 h-4 animate-pulse mt-2'/>
        <div className='bg-neutral-400 rounded-2xl w-full h-6 animate-pulse mt-2'/>
    </div>
  )
}

export default SkeletonLoader