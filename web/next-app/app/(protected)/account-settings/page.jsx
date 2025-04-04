"use client"

import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import LanguageSelect from '@/components/LanguageSelect';
import TimezoneSelect from '@/components/TimezoneSelect';
import { redirect } from 'next/navigation';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const AccountSettings = () => {
  toastConfig({
      theme: 'dark',
    });

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

  const handleLogout = (event) => {
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

  function handleCopy() {
    navigator.clipboard.writeText(userProfile.email);
    toast('Email copied to clipboard', { maxVisibleToasts: 3 });
  }

  return (
    <main className="bg-dashboard h-screen">
      <div className='px-6 flex items-center py-4'>
        <h1>Account Settings</h1>
      </div>
      <hr className='border-borderLine'/>
      <div className='flex px-6 py-4 xl:flex-row gap-6'>
        <section className='bg-white rounded-xl p-6 w-[500px]'>
          <div className='flex pb-4 gap-2 items-center'>
            <img src="./profile.png" />
            <div>
              <h2 className='font-semibold text-lg'>{userProfile.name}</h2>
              <div className='flex gap-2'>
                <p className='font-light text-sm'>{userProfile.email}</p>
                <button onClick={handleCopy}><Copy size={15} /></button>
              </div>
            </div>
          </div>
          <hr />
          <div className='pt-4 flex flex-col'>
            <h2 className='font-semibold pb-4'>Languages & Timezone</h2>
            <p className='pb-2'>
              Language:
            </p>
            <LanguageSelect />
            <p className='pt-4 pb-2'>
              Timezone:
            </p>
            <TimezoneSelect />
            <button className='bg-brand-secondary text-white rounded-md py-1 mt-4 hover:bg-orange-600 active:bg-orange-700 colorTransition' onClick={handleLogout}>Log out</button>
          </div>
        </section>
        <section className='flex bg-white p-6 rounded-xl gap-10'>
          <div>
            <h2 className='font-medium'>Basic Information</h2>
            <p className='text-sm'>Information used to log into the system</p>
          </div>
          <form className='w-3/5 flex flex-col gap-2'>
            <label htmlFor="Username">Name:</label>
            <input type="text" id="Username" name="Username" required className='border border-borderLine rounded-sm py-1 px-2' />
            <label htmlFor="Email">Email:</label>
            <input type="text" id="Email" name="Email" required className='border border-borderLine rounded-sm py-1 px-2' />
            <label htmlFor="phoneNumber">Password:</label>
            <input type="number" id="phoneNumber" name="phoneNumber" required className='border border-borderLine rounded-sm py-1 px-2' />
            <label htmlFor="phoneNumber">Confirm Password:</label>
            <input type="number" id="phoneNumber" name="phoneNumber" required className='border border-borderLine rounded-sm py-1 px-2' />
            <div className='flex justify-end mt-2'>
              <button type="submit" className='bg-brand-secondary text-white rounded-md px-6 py-1 hover:bg-orange-600 active:bg-orange-700 colorTransition'>Save Changes</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default AccountSettings