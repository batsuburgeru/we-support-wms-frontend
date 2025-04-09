import React from 'react'
import Link from 'next/link';

const EmailVerified = () => {
  return (
    <main>
        <h1>Email verified successfully!</h1>
        <p>Your email has been successfully verified. You can now login and access the platform.</p>
        <Link href="/login" className='w-full bg-brand-secondary text-white py-2 px-8 mt-8 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>
            Login
        </Link>
    </main>
  )
}

export default EmailVerified