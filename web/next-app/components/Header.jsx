import React from 'react'

const Header = () => {
  return (
    <header className='bg-navBG w-auto flex justify-end px-6 py-4'>
        <button><img src="./bell.png"/></button>
        <button className='flex items-center'>
            <img src="./profile.png" className='h-16 pr-3 ml-6'/>
            <div className='text-left flex flex-col justify-center'>
                <h1 className='text-xl font-medium'>John Doe</h1>
                <p className='text-sm font-light'>Warehouse Man</p>
            </div>
        </button>
    </header>
  )
}

export default Header