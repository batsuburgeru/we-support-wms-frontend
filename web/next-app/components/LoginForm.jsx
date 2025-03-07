"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3002/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include"
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.data) {
        const user = result.data;
        console.log('User logged in successfully:', user);
        // Redirect to dashboard or perform any other actions
      } else {
        console.log('Login failed:', result.message);
      }
    })
    .catch(error => {
      console.log('Error during login:', error);
    });
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col justify-center p-20'>
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

          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center'>
              <input type="checkbox" name="rememberMe" className='w-4 h-4 mr-2 cursor-pointer'/>
              <p className='text-sm'>Remember Me</p>
            </div>

            <Link href="" className='text-sm font-medium cursor-pointer underline text-brand-primary'>Forgot Password?</Link>
          </div>

          <button type="submit" className='w-full bg-brand-secondary text-white py-2 mt-8 rounded-md text-center'>Sign in</button>
        </form>
      </div>

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </div>
  );
};

export default LoginForm;
