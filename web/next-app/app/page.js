import Link from 'next/link';

export default function Home() {
  return (
      <main className="bg-[url(../public/landing-bg.png)] bg-cover bg-center h-screen">
        <div className='w-full h-full bg-black/60 backdrop-blur-md grid grid-flow-row grid-rows-12'>
          <div className='flex flex-col gap-6 justify-center items-center row-span-12'>
            <img src="./logo.png" className='h-20' />
            <p className='text-center text-white'>
              Welcome to Warehouse Management System! <br />
              Manage your inventory, orders, and logistics seamlessly.
            </p>
            <div className='space-x-3'>
              <Link href="/login" className='bg-white px-8 py-2 rounded-md text-black font-semibold hover:bg-neutral-200 active:bg-neutral-300 colorTransition'>
                Login
              </Link>
              <Link href="/register" className='bg-brand-secondary px-8 py-2 rounded-md text-white font-semibold hover:bg-brand-primary active:bg-orange-700 colorTransition'>
                Register
              </Link>
            </div>
          </div>
          <div className='flex justify-between px-10 py-4 text-sm'>
            <p>
              <span className='text-neutral-300'>© 2025 - </span>
              <span className='text-white'>CompanyName. </span>
              <span className='text-neutral-300'> All Rights Reserved.</span>
            </p>
            <div className='flex gap-6'>
              <p className='text-neutral-300'>Privacy Policy</p>
              <p className='text-white'>Terms and Conditions</p>
            </div>
          </div>
        </div>
        
      </main>
  );
}
