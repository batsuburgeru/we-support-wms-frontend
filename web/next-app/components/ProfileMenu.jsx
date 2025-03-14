"use client"

import { redirect } from 'next/navigation'
import { LogOut, UserRound, Globe } from "lucide-react"
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfileMenu() {
  const logOut = (event) => {
    event.preventDefault();
    fetch("http://localhost:3002/users/logout", {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => response.json())
    redirect('/login')
    .catch(error => {
      console.log('Error during logout:', error);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center'>
            <img src="./profile.png" className='h-16 pr-3 ml-6'/>
            <div className='text-left flex flex-col justify-center'>
                <h1 className='text-xl font-medium'>John Doe</h1>
                <p className='text-sm font-light'>Warehouse Man</p>
            </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <Link href="/account-settings">
            <DropdownMenuItem>
                <UserRound />
                Account Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Globe />
            Language
          </DropdownMenuItem>
          <Link href="/login">
            <button onClick={logOut} className="w-full">
            <DropdownMenuItem>
                <LogOut />
                Sign Out
            </DropdownMenuItem>
            </button>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
