"use client"
import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { House, PackagePlus, ShoppingBasket, Archive, UserRound, Building } from 'lucide-react';
import { useCart } from "@/context/CartContext";

const Navbar = ({ userRole }) => {
    const pathname = usePathname();
    const { clearCart } = useCart();

    return (
        <nav className='fixed bg-navBG border-r border-borderLine md:w-64 w-fit h-full px-2 py-4 z-50'>
            <div className='md:flex justify-center hidden'>
                <img src="/logo.png" className='md:w-80'/>
            </div>
            <div className='px-2 py-8 mt-20 md:mt-0'>
                {(userRole === "Admin" || userRole === "Supervisor" || userRole === "WarehouseMan") && <Link href="/dashboard" className={`w-fit md:w-full flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-0 ease-out ${pathname === "/dashboard" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <House color={pathname === "/dashboard" ? '#FFF' : '#282828'} className='md:pr-3 pr-0 md:pl-1 w-max'/>
                    <span className='hidden md:block'>Home</span>
                </Link>}
                {(userRole === "WarehouseMan" || userRole === "Admin") && <Link onClick={() => clearCart()} href="/purchase-cart" className={`flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-0 ${pathname === "/purchase-cart" || pathname === "/purchase-cart" || pathname === "/search-results" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <PackagePlus color={pathname === "/purchase-cart" ? '#FFF' : '#282828'} className='md:pr-3 pr-0 md:pl-1 w-max'/>
                    <span className='hidden md:block'>New Purchase</span>
                </Link>}
                <Link href="/purchase-list" className={`w-fit md:w-full flex items-center py-2 my-1 rounded-md px-2 transition-colors duration-0 ${pathname === "/purchase-list" || pathname.startsWith("/purchase-details") || pathname.startsWith("/edit-purchase-request") ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <ShoppingBasket color={pathname === "/purchase-list" || pathname.startsWith("/purchase-details") || pathname.startsWith("/edit-purchase-request") ? '#FFF' : '#282828'} className='md:pr-3 pr-0 md:pl-1 w-max'/>
                    <span className='hidden md:block'>Purchase List</span>
                </Link>
                {(userRole === "Admin" || userRole === "Supervisor" || userRole === "WarehouseMan") && <Link href="/inventory" className={`w-fit md:w-full flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-0 ${pathname === "/inventory" || pathname === "/inventory-add" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <Archive color={pathname === "/inventory" || pathname === "/inventory-add" ? '#FFF' : '#282828'} className='md:pr-3 pr-0 md:pl-1 w-max'/>
                    <span className='hidden md:block'>Inventory</span>
                </Link>}
                {(userRole === "Admin" || userRole === "Supervisor" || userRole === "WarehouseMan") && <Link href="/client-list" className={`w-fit md:w-full flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-0 ${pathname === "/client-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <Building color={pathname === "/client-list" ? '#FFF' : '#282828'} className='md:pr-3 pr-0 md:pl-1 w-max'/>
                    <span className='hidden md:block'>Clients</span>
                </Link>}
                {userRole === "Admin" && <Link href="/user-list" className={`w-fit md:w-full flex items-center py-2 my-1  rounded-md px-2 transition-colors duration-0 ${pathname === "/user-list" ? 'bg-brand-secondary text-white' : 'bg-none hover:bg-neutral-200'}`}>
                    <UserRound color={pathname === "/user-list" ? '#FFF' : '#282828'} className='md:pr-3 pr-0 md:pl-1 w-max'/>
                    <span className='hidden md:block'>Users</span>
                </Link>}
            </div>
        </nav>
    )
}

export default Navbar