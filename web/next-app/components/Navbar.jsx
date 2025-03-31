"use client"
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { House, PackagePlus, ShoppingBasket, Archive, UserRound, Building } from 'lucide-react';
import { useCart } from "@/context/CartContext";

const Navbar = () => {
const pathname = usePathname();
const { clearCart } = useCart();

    return (
        <nav className='fixed bg-navBG border-r border-borderLine w-64 h-full px-2 py-4 z-50'>
            <div className='flex justify-center'>
                <img src="/logo.png" className='w-80'/>
            </div>
            <div className='px-2 py-8'>
                <Link href="/dashboard" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-0 ease-out ${pathname === "/dashboard" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <House color={pathname === "/dashboard" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Home
                </Link>
                <Link onClick={() => clearCart()} href="/purchase-cart" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-0 ${pathname === "/purchase-cart" || pathname === "/purchase-cart" || pathname === "/search-results" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <PackagePlus color={pathname === "/purchase-cart" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    New Purchase
                </Link>
                <Link href="/purchase-list" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-0 ${pathname === "/purchase-list" || pathname.startsWith("/purchase-details") || pathname.startsWith("/edit-purchase-request") ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <ShoppingBasket color={pathname === "/purchase-list" || pathname.startsWith("/purchase-details") || pathname.startsWith("/edit-purchase-request") ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Purchase List
                </Link>
                <Link href="/inventory" className={`flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-0 ${pathname === "/inventory" || pathname === "/inventory-add" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <Archive color={pathname === "/inventory" || pathname === "/inventory-add" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Inventory
                </Link>
                <Link href="/client-list" className={`flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-0 ${pathname === "/client-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <Building color={pathname === "/client-list" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Clients
                </Link>
                <Link href="/user-list" className={`flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-0 ${pathname === "/user-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <UserRound color={pathname === "/user-list" ? '#FFF' : '#282828'} className='pr-3 pl-1 w-max'/>
                    Users
                </Link>
            </div>
        </nav>
    )
}

export default Navbar