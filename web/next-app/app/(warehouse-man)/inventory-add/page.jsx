import React from 'react'

const InventoryAdd = () => {
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>New Item</h1>
      </div>
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <label htmlFor='name' className='py-3 text-black font-medium'>
          Item Name
        </label>
        <input 
          type="text" 
          placeholder="Enter full name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          id="name" 
          className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
        />
        <label htmlFor='sku' className='py-3 text-black font-medium'>
          SKU
        </label>
        <input 
          type="text" 
          placeholder="Enter full name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          id="sku" 
          className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
        />
      </section>
    </main>
  )
}

export default InventoryAdd