import React from 'react'
import { MailCheck } from 'lucide-react';
import Link from 'next/link';

const EmailVerified = () => {
  return (
    <main className='flex justify-center items-center w-screen h-screen'>
      <div className='shadow-xl shadow-neutral-300 rounded-md p-12 w-96 flex flex-col items-center justify-center gap-6'>
        <MailCheck size={40} strokeWidth={3} color="#EB5E28" />
        <h1 className='text-center text-2xl'>Your email has been successfully verified!</h1>
        <p className='text-sm text-center'>Thank you for verifying your email. You can 
        now log in and access your account.</p>
        <Link href="/login" className='w-full bg-brand-secondary text-white py-2 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>
          Back to login
        </Link>
      </div>
  </main>
  )
}

export default EmailVerified