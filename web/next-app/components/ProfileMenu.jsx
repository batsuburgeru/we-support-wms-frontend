"use client";

import { redirect } from 'next/navigation';
import { LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

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

  const [userProfile, setUserProfile] = useState([]);
    
  useEffect(() => {
    fetch("http://localhost:3002/users/display-user-info", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.userInfo) {
          setUserProfile(result.userInfo);
      } else {
          console.log("Retrieve failed:", result.message || "No user profile property");
      }
    })  
    .catch(error => {
        console.log('Error:', error);
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center'>
            <img src={`http://localhost:3002${userProfile.img_url}`} className='h-16 w-16 object-cover mr-3 ml-6 rounded-full'/>
            <div className='text-left flex flex-col justify-center'>
                <h1 className='text-xl font-medium'>{userProfile.name}</h1>
                <p className='text-sm font-light'>{userProfile.role}</p>
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
