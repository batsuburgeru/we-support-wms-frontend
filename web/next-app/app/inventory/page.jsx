import React from 'react'

const Inventory = () => {
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Inventory</h1>
        <div className='flex items-center'>
          <button className='bg-buttonBG border border-borderLine rounded-md py-1 px-1 hover:bg-neutral-200 transition-colors duration-200'>
            <img src="./meatball-menu.png"/>
          </button>
        </div>
      </div>
      <hr />
      <form className='flex items-center px-6 py-4'>
        <input type="text" placeholder="Search product..." className='border border-borderLine rounded-md px-4 py-1 w-72'/>
        <button className='bg-buttonBG border border-borderLine rounded-md ml-2 px-6 py-1 hover:bg-neutral-200 transition-colors duration-200'>
          <img src="./search.png" className='w-6'/>
        </button>
      </form>
      <hr className='border-borderLine'/>
      <section>
        <table className='w-full'>
          <tbody>
            <tr className='bg-navBG'>
              <th>Product ID</th>
              <th>Name</th>
              <th>Images</th>
              <th>Serial Number</th>
              <th>Stock on Hand</th>
            </tr>
            <tr>
              <td className='text-brand-primary'>PR-00003</td>
              <td>Item 2</td>
              <td><img src="img-box.png" className='h-8'/></td>
              <td>SN-2025-AB123456</td>
              <td>100</td>
            </tr>
            <tr>
              <td className='text-brand-primary'>PR-00002</td>
              <td>Item 1</td>
              <td><img src="img-box.png" className='h-8'/></td>
              <td>SN-2025-AB124680</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Inventory