"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCreds, setInvalidCreds] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setInvalidCreds(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [invalidCreds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginError(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [loginError]);


  const handleSubmit = (event) => {
    event.preventDefault();
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
      if (result && result.data) {
        const user = result.data;
        router.push('/dashboard'); 
      } else {
        setInvalidCreds(true);
      }
    })
    .catch(error => {
      console.log('Error during login:', error);
      setLoginError(true);
    });
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col justify-center px-20'>
        <div className='header'>
          <h1 className='text-4xl font-bold'>Welcome Back</h1>
          <p className='text-base text-brand-secondary mt-2'>Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col my-8'>
            <h2 className='text-1xl font-semibold'>Email Address</h2>
            <input 
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className='border border-borderLine rounded-md p-2 my-2 focus:outline-none focus:border-brand-secondary'
            />

            <h2 className='text-1xl font-semibold mt-5'>Password</h2>
            <input 
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className='border border-borderLine rounded-md p-2 my-2 focus:outline-none focus:border-[#F97333]'
            />
          </div>

          <div className='flex justify-end'>
            <Link href="/forgot-password" className='text-sm font-medium cursor-pointer underline text-brand-primary'>Forgot Password?</Link>
          </div>
          
          <button type="submit" className='w-full bg-brand-secondary text-white py-2 mt-8 rounded-md text-center'>Sign in</button>
          {invalidCreds && <p className='text-center text-sm text-red-600 font-medium pt-4'>Invalid username or password.</p>}
          {loginError && <p className='text-center text-sm text-red-600 font-medium pt-4'>Sorry, we could not log you in at this time. Please try again later.</p>}
        </form>
      </div>

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </div>
  );
};

export default LoginForm;
