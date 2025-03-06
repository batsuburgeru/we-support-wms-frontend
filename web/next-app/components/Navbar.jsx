"use client"
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { House, PackagePlus, ShoppingBasket, Archive, UserRound } from 'lucide-react';

const Navbar = () => {
const pathname = usePathname();

    return (
        <nav className='fixed bg-navBG border-r border-borderLine w-64 h-full px-2 py-4'>
            <div className='flex justify-center'>
                <img src="./logo.png" className='w-80'/>
            </div>
            <div className='px-2 py-8'>
                <Link href="/" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-100 ease-out ${pathname === "/" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <House color={pathname === "/" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Home
                </Link>
                <Link href="/purchase-cart" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-100 ${pathname === "/purchase-cart" || pathname === "/purchase-cart" || pathname === "/search-results" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <PackagePlus color={pathname === "/purchase-cart" || pathname === "/purchase-cart" || pathname === "/search-results" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    New Purchase
                </Link>
                <Link href="/purchase-list" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-100 ${pathname === "/purchase-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <ShoppingBasket color={pathname === "/purchase-list" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Purchase List
                </Link>
                <Link href="/inventory" className={`flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-100 ${pathname === "/inventory" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <Archive color={pathname === "/inventory" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Inventory
                </Link>
                <Link href="/client-list" className={`flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-100 ${pathname === "/client-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <UserRound color={pathname === "/client-list" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Client
                </Link>
            </div>
        </nav>
    )
}

export default Navbar