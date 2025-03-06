import React from 'react'

const LoginForm = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col justify-center p-20'>
        <div className='header'>
          <h1 className='text-4xl text-[#060606] font-bold'>Welcome Back</h1>
          <p className='text-base text-[#F97333] mt-2'>Please enter your details</p>
        </div>

        <div className='w-full flex flex-col my-8'>
          <h2 className='text-1xl text-[#060606] font-semibold'>Email Address</h2>
          <input type="email"
            placeholder="Enter your email"
            className='border border-[#060606] rounded-md p-2 my-2 focus:outline-none focus:border-[#F97333]'
          />

          <h2 className='text-1xl text-[#060606] font-semibold mt-5'>Password</h2>
          <input type="password"
            placeholder="Enter your password"
            className='border border-[#060606] rounded-md p-2 my-2 focus:outline-none focus:border-[#F97333]'
          />
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center'>
            <input type="checkbox" className='w-4 h-4 mr-2 cursor-pointer'/>
            <p className='text-sm'>Remember Me</p>
          </div>

          <p className='text-sm font-medium cursor-pointer underline'>Forgot Password?</p>
        </div>

        <button className='w-full bg-[#F97333] text-white py-2 mt-8 rounded-md'>Sign in</button>
      </div>

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}

export default LoginForm