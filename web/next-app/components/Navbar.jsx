"use client"
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Navbar = () => {
const pathname = usePathname();

    return (
        <nav className='bg-navBG border-r border-borderLine w-64 h-full px-2 py-2'>
            <div className='flex justify-center'>
                <img src="./logo.png" className='h-24'/>
            </div>
            <div className='px-2 py-8'>
                <Link href="/" className={`flex items-center py-1 my-1 rounded-md px-2 transition-colors duration-100 ease-out ${pathname === "/" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-brand-tertiary'}`}>
                    <img src={`./home${pathname === "/" ? '-active' : ''}.png`} className='pr-3'/>
                    Home
                </Link>
                <Link href="/new-purchase" className={`flex items-center py-1 my-1 rounded-md px-2 transition-colors duration-100 ${pathname === "/new-purchase" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-brand-tertiary'}`}>
                    <img src={`./new${pathname === "/new-purchase" ? '-active' : ''}.png`} className='pr-3'/>
                    New Purchase
                </Link>
                <Link href="/purchase-list" className={`flex items-center py-1 my-1 rounded-md px-2 transition-colors duration-100 ${pathname === "/purchase-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-brand-tertiary'}`}>
                    <img src={`./p-list${pathname === "/purchase-list" ? '-active' : ''}.png`} className='pr-3'/>
                    Purchase List
                </Link>
                <Link href="/inventory" className={`flex items-center py-1 my-1  rounded-md px-2 transition-colors duration-100 ${pathname === "/inventory" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-brand-tertiary'}`}>
                    <img src={`./inventory${pathname === "/inventory" ? '-active' : ''}.png`} className='pr-3'/>
                    Inventory
                </Link>
            </div>
        </nav>
    )
}

export default Navbar