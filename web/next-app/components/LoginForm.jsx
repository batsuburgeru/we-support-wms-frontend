"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCreds, setInvalidCreds] = useState(false);
  const [noCreds, setNoCreds] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setNoCreds(true);
    }
    else {
      setNoCreds(false);
      fetch("http://localhost:3002/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.token) {
          setInvalidCreds(false);
          setLoginError(false);
          setSuccess(true);
          router.push('/dashboard');
        } else if (result.error === "Account not verified. Please verify your email before logging in.") {
          router.push('/verify-email');
        }
        else {
          setInvalidCreds(true);
          setLoginError(false);
        }
      })
      .catch(error => {
        console.log('Error during login:', error);
        setLoginError(true);
      });
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col justify-center px-20'>
        <div>
          <h1 className='text-4xl font-bold'>Welcome Back</h1>
          <p className='text-base text-brand-secondary mt-2'>Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col my-4'>
            <label htmlFor="email" className='text-1xl font-semibold'>Email Address</label>
            <input 
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-borderLine rounded-md p-2 mt-2 focus:outline-none focus:border-brand-secondary'
            />

            <label htmlFor="password" className='text-1xl font-semibold mt-5'>Password</label>
            <input 
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-borderLine rounded-md p-2 mt-2 focus:outline-none focus:border-brand-secondary'
            />
          </div>

          <div className='flex justify-end'>
            <Link href="/forgot-password" className='text-sm font-medium cursor-pointer underline text-brand-primary'>Forgot Password?</Link>
          </div>
          
          <button type="submit" className='w-full bg-brand-secondary text-white py-2 mt-4 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>Sign in</button>
          <div className='absolute'>
            {invalidCreds && <p className='text-left text-sm text-red-600 font-medium pt-2'>Invalid username or password.</p>}
            {loginError && <p className='text-left text-sm text-red-600 font-medium pt-2'>Sorry, we could not log you in at this time. Please try again later.</p>}
            {noCreds && <p className='text-left text-sm text-red-600 font-medium pt-2'>Please fill in all required fields.</p>}
            {success && <p className='text-left text-sm text-orange-600 font-medium pt-2'>Logging you in. Please wait...</p>}
          </div>
          <div className='flex justify-center font-medium mt-12'>
            <span>Don't have an account yet?</span> <Link href="/register" className='ml-1 text-brand-primary'>Create Account</Link>
          </div>
        </form>
      </div>

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </div>
  );
};

export default LoginForm;
