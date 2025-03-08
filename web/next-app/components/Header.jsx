import React from 'react'
import ProfileMenu from '@/components/ProfileMenu';
import { Bell } from 'lucide-react'

const Header = () => {
  return (
    <header className='bg-navBG/80 backdrop-blur-lg w-auto flex justify-end px-6 py-4 sticky top-0'>
        <button><Bell /></button>
        <ProfileMenu />
    </header>
  )
}

export default Header