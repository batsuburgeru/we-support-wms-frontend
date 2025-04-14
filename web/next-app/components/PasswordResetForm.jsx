"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const PasswordResetForm = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const token = queryParams.get("token");

	toastConfig({
		theme: 'dark',
	});

	const router = useRouter();

	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [loadingMsg, setLoadingMsg] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState(false);
	const [differentPass, setDifferentPass] = React.useState(false);
	const [noInput, setNoInput] = React.useState(false);

	const handleSubmit = (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
			setNoInput(true);
			setDifferentPass(false);
			setErrorMsg(false);
    }
		else if (password !== confirmPassword) {
			setDifferentPass(true);
			setNoInput(false);
			setErrorMsg(false);
		}
    else {
      setLoadingMsg(true);
			setDifferentPass(false);
			setNoInput(false);

			const payload = {
				newPassword: password
			}

      fetch(`http://localhost:3002/users/reset-password?token=${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: "include"
      })
      .then(response => response.json())
      .then(result => {
        if (result && result.message) {
          setLoadingMsg(false);
          setErrorMsg(false);
					toast('Password successfully updated! You may now log in with your new password.');
					router.push('/login');
        } else {
          setErrorMsg(true);
          setLoadingMsg(false);
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full flex flex-col justify-center px-20'>
        <div>
          <h1 className='text-2xl font-bold'>Enter new password</h1>
					<p className='text-sm text-brand-secondary mt-2'>To reset your password, enter and confirm your new password below.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col my-8'>
            <label htmlFor="password" className='text-1xl font-semibold mt-5'>New Password</label>
            <input 
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-2 focus:outline-none focus:border-[#F97333]'
            />
            <label htmlFor="confirmPassword" className='text-1xl font-semibold mt-5'>Confirm New Password</label>
            <input 
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-2 focus:outline-none focus:border-[#F97333]'
            />
          </div>
          
          <button type="submit" className='w-full bg-brand-secondary text-white py-2 mt-8 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>Update Password</button>
          <div className='absolute'>
						{loadingMsg && <p className='text-left text-sm text-orange-600 font-medium pt-2'>Updating your password. Please wait...</p>}
						{errorMsg && <p className='text-left text-sm text-red-600 font-medium pt-2'>Sorry, we could not update your password at this time. Please try again later.</p>}
            {differentPass && <p className='text-left text-sm text-red-600 font-medium pt-2'>Passwords do not match.</p>}
            {noInput && <p className='text-left text-sm text-red-600 font-medium pt-2'>Please input your new password.</p>}
          </div>
        </form>
      </div>

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}

export default PasswordResetForm