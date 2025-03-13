import React from 'react'

const ProductCard = (props) => {
  return (
    <div className='border border-borderLine rounded-2xl p-4 w-[238px] flex-col flex justify-between'>
        <img src="./img.png" className='ml-auto mr-auto rounded-xl'/>
        <h1 className='text-lg mt-2 text-ellipsis overflow-hidden txtOverflow'>{props.name}</h1>
        <p className='text-sm text-neutral-500'>{props.email}</p>
        <h2 className='py-2 font-medium'>₱50,000</h2>
        <hr />
        <button className='font-bold bg-brand-primary text-white w-full py-2 rounded-full mt-4'>
            Add
        </button>
    </div>
  )
}

export default ProductCard