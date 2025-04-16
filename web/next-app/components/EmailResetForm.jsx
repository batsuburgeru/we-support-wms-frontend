"use client";

import React from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const EmailResetForm = (props) => {
  toastConfig({
    theme: 'dark',
  });

  const [email, setEmail] = React.useState('');

  const [successMsg, setSuccessMsg] = React.useState(false);
  const [loadingMsg, setLoadingMsg] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [noEmail, setNoEmail] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);
  const [resendDisabled, setResendDisabled] = React.useState(false);
  const [verifiedMsg, setVerifiedMsg] = React.useState(false);

  React.useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setResendDisabled(false); // Enable the button when countdown is over
    }
  }, [resendTimer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setNoEmail(true);
    }
    else {
      setLoadingMsg(true);
      setNoEmail(false);
      setErrorMsg(false);
      fetch(`http://localhost:3002/users/${props.route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: "include"
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.message) {
          setSuccessMsg(true);
          setLoadingMsg(false);
          setErrorMsg(false);
          if (successMsg === true) {
            toast("Email sent! Please check your inbox. You can resend again in 30 seconds.")
          }
        }
        else if (result.error === "Account is already verified") {
          setVerifiedMsg(true);
          setLoadingMsg(false);
          setErrorMsg(false);
        } 
        else {
          setErrorMsg(true);
          setLoadingMsg(false);
          setVerifiedMsg(false);
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
  };

  return (
    <main className='w-full h-screen flex'>
      {/* BEFORE SUCCESSFUL SUBMISSION */}
      {!successMsg && <div className='w-1/2 h-full flex flex-col justify-center px-20'>
        <div>
          <h1 className='text-2xl font-semibold'>Enter your email address</h1>
          <p className='text-sm text-brand-secondary mt-2'>{props.firstDescription}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col mt-8 mb-4'>
            <label htmlFor="email" className='text-1xl font-semibold'>Email Address</label>
            <input 
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-borderLine rounded-md p-2 mt-2 focus:outline-none focus:border-brand-secondary'
            />
          </div>
          
          <button type="submit" className='w-full bg-brand-secondary text-white py-2 mt-6 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>
            {props.buttonText}
          </button>
          <div className='absolute'>
            {loadingMsg && <p className='text-left text-sm text-orange-600 font-medium pt-2'>Sending email. Please wait...</p>}
            {errorMsg && <p className='text-left text-sm text-red-600 font-medium pt-2'>This email address is not associated with an existing account.</p>}
            {noEmail && <p className='text-left text-sm text-red-600 font-medium pt-2'>Please enter your email address.</p>}
            {verifiedMsg && <p className='text-left text-sm text-orange-600 font-medium pt-2'>This account is already verified.</p>}
          </div>
          <div className='flex justify-center mt-6'>
            <Link href="/login" className='text-sm font-semibold cursor-pointer underline text-brand-primary mt-4'>
              Back to Login
            </Link>
          </div>
        </form>
      </div>}
      
      {/* AFTER SUCCESSFUL SUBMISSION */}
      {successMsg && <div className='w-1/2 h-full flex flex-col justify-center px-20'>
        <div className='flex justify-center items-center'>
          <MailCheck size={60} strokeWidth={2.25} color="#EB5E28" />
        </div>
        <div className='my-6'>
          <h1 className='text-2xl font-semibold'>Email sent!</h1>
          <p className='text-sm text-brand-secondary mt-2'>{props.secondDescription}</p>
        </div>

        <Link href="/login" className='w-full bg-brand-secondary text-white py-2 mt-4 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>
          Back to login
        </Link>
        <div className='flex justify-center font-medium mt-12'>
          <span>Didn't receive an email?</span>
          <button 
            onClick={(event) => {
              handleSubmit(event);
              setResendDisabled(true);
              setTimeout(() => {
                setResendDisabled(false);
              }, 30000);
            }} 
            className={`ml-1 text-brand-primary underline ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={resendDisabled}
          >
            Resend it
          </button>
        </div>
      </div>}

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </main>
  )
}

export default EmailResetForm