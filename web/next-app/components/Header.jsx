import React from 'react'
import { Bell } from 'lucide-react'

const Header = () => {
  return (
    <header className='bg-navBG/80 backdrop-blur-lg w-auto flex justify-end px-6 py-4 sticky top-0 z-50 '>
        <button><Bell /></button>
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