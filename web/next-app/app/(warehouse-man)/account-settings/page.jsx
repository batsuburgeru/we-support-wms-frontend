import React from 'react';
import { Copy } from 'lucide-react';
import LanguageSelect from '@/components/LanguageSelect';
import TimezoneSelect from '@/components/TimezoneSelect';

const AccountSettings = () => {
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
              <h2 className='font-semibold text-lg'>John Doe</h2>
              <div className='flex gap-2'>
                <p className='font-light text-sm'>johndoe@gmail.com</p>
                <button><Copy size={15} /></button>
              </div>
              <button className='font-light text-sm border border-borderLine rounded-md px-1 mt-1'>Change Avatar</button>
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
            <button className='bg-brand-secondary text-white rounded-md py-1 mt-4'>Log out of all other devices</button>
          </div>
        </section>
        <section className='flex bg-white p-6 rounded-xl gap-10'>
          <div>
            <h2 className='font-medium'>Basic Information</h2>
            <p className='text-sm'>Information used to log into the system</p>
          </div>
          <form className='w-3/5 flex flex-col gap-2'>
            <div className='flex gap-4'>
              <div>
                <label htmlFor="FirstName">First name:</label>
                <input type="text" id="FirstName" name="First Name" required className='border border-borderLine rounded-sm mt-2 py-1 px-2 w-full' />
              </div>
              <div>
                <label htmlFor="LastName">Last name:</label>
                <input type="text" id="LastName" name="Last Name" required className='border border-borderLine rounded-sm mt-2 py-1 px-2 w-full' />
              </div>
            </div>
            <label htmlFor="Username">Username:</label>
            <input type="text" id="Username" name="Username" required className='border border-borderLine rounded-sm py-1 px-2' />
            <label htmlFor="phoneNumber">Phone number:</label>
            <input type="number" id="phoneNumber" name="phoneNumber" required className='border border-borderLine rounded-sm py-1 px-2' />
            <label htmlFor="Email">Email:</label>
            <input type="text" id="Email" name="Email" required className='border border-borderLine rounded-sm py-1 px-2' />
            <div className='flex justify-end mt-2'>
              <button type="submit" className='bg-brand-secondary text-white rounded-md px-6 py-1'>Save Changes</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default AccountSettings