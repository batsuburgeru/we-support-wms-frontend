"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const LoginForm = () => {
  toastConfig({
    theme: 'dark',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [clientToggle, setClientToggle] = useState(false);
  const [tosAgree, setTosAgree] = useState(false);
  const [tosAgreePrompt, setTosAgreePrompt] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [incompleteFields, setIncompleteFields] = useState(false);
  
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tosAgree) {
      if (password !== confirmPass) {
        setDifferentPass(true);
        setTosAgreePrompt(false);
        setIncompleteFields(false);
        setRegisterError(false);
        return;
      }
      if (clientToggle) {
        const payload = {
          name: name,
          email: email,
          password: password,
          role: "Client",
          contact_num: phone,
          org_name: company,
          comp_add: companyAddress,
        };
        fetch("http://localhost:3002/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          credentials: "include"
        })
        .then(response => response.json())
        .then(result => {
          if (result) {
            toast('Successfully registered! Please check your email for verification.');
            setIncompleteFields(false);
            setRegisterError(false);
            setDifferentPass(false);
            setTosAgreePrompt(false);
            router.push('/email-unverified');
          } else {
            console.log("Error during registration.");
          }
        })
        .catch(error => {
          console.log('Error during login:', error);
          setRegisterError(true);
          setTosAgreePrompt(false);
        });
      }
      else if (clientToggle === false) {
        const payload = {
          name: name,
          email: email,
          password: password,
          role: "Client",
          contact_num: "NA",
          org_name: "NA",
          comp_add: "NA",
        };
        fetch("http://localhost:3002/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          credentials: "include"
        })
        .then(response => response.json())
        .then(result => {
          if (result.user) {
            toast('Successfully registered! Please check your email for verification.');
            setIncompleteFields(false);
            setRegisterError(false);
            setDifferentPass(false);
            setTosAgreePrompt(false);
            router.push('/email-unverified');
          } else {
            setIncompleteFields(true);
            setTosAgreePrompt(false);
          }
        })
        .catch(error => {
          console.log('Error during login:', error);
          setRegisterError(true);
          setTosAgreePrompt(false);
          setDifferentPass(false);
          setIncompleteFields(false);
        });
      }
      else {
        // setIncompleteFields(true);
        // setTosAgreePrompt(false);
        // setDifferentPass(false);
        // setRegisterError(false);
        console.log("error 1")
      }
    } else {
      setTosAgreePrompt(true);
      setDifferentPass(false);
      setRegisterError(false);  
      setIncompleteFields(false);
    }    
  };

  return (
    <main className={`w-full h-screen flex ${clientToggle ? 'my-28':'my-auto'}`}>
      <div className='w-1/2 h-full flex flex-col justify-center px-20'>
        <div className='header'>
          <h1 className='text-3xl font-bold'>Create your account</h1>
          <p className='text-brand-secondary mt-2'>Let’s get you all set up so you can access your personal account.</p>
        </div>

        <div className='flex justify-center mt-6'>
          <input 
          type="checkbox" 
          id="toggleClient" 
          name="toggleClient" 
          value="toggleClient" 
          checked={clientToggle} 
          onChange={(e) => setClientToggle(e.target.checked)} />
          <label htmlFor="toggleClient" className='font-medium ml-2'>I am registering as a <span className='font-semibold text-brand-primary'>Client</span></label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-col my-6'>
            <label htmlFor="name" className='text-1xl font-semibold'>Name</label>
            <input 
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-brand-secondary text-xs'
            />
            <label htmlFor="email" className='text-1xl font-semibold mt-2'>Email Address</label>
            <input 
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-brand-secondary text-xs'
            />

            <label htmlFor="password" className='text-1xl font-semibold mt-2'>Password</label>
            <input 
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-[#F97333] text-xs'
            />

            <label htmlFor="confirmPassword" className='text-1xl font-semibold mt-2'>Confirm Password</label>
            <input 
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-[#F97333] text-xs'
            />
            {clientToggle && <div className='flex flex-col'><label htmlFor="phone" className='text-1xl font-semibold mt-2'>Phone</label>
            <input 
              type="number"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-[#F97333] text-xs'
            />
            <label htmlFor="company" className='text-1xl font-semibold mt-2'>Company/Organization Name</label>
            <input 
              type="text"
              name="company"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-[#F97333] text-xs'
            />
            <label htmlFor="companyAddress" className='text-1xl font-semibold mt-2'>Company/Organization Address</label>
            <input 
              type="text"
              name="companyAddress"
              id="companyAddress"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className='border border-borderLine rounded-md p-2 my-1 focus:outline-none focus:border-[#F97333] text-xs'
            /></div>}
          </div>

          <div className='flex justify-start'>
            <input 
            type="checkbox" 
            id="tosAgreement" 
            name="tosAgreement" 
            value="tosAgreement" 
            checked={tosAgree} 
            onChange={(e) => setTosAgree(e.target.checked)} />
            <label htmlFor="tosAgreement" className='font-medium ml-2'>I agree to all the <span className='font-semibold text-brand-primary'>Terms</span> and <span className='font-semibold text-brand-primary'>Privacy Policy</span>.</label>
          </div>
          
          <button type="submit" className='w-full bg-brand-secondary text-white py-2 mt-8 rounded-md text-center hover:bg-orange-600 active:bg-orange-700 colorTransition'>Create Account</button>
          <div className='absolute'>
            {differentPass && <p className='text-center text-sm text-red-600 font-medium pt-2'>Passwords do not match.</p>}
            {incompleteFields && <p className='text-center text-sm text-red-600 font-medium pt-2'>Please fill in all required fields.</p>}
            {registerError && <p className='text-center text-sm text-red-600 font-medium pt-2'>Sorry, we could not register you at this time. Please try again later.</p>}
            {tosAgreePrompt && <p className='text-center text-sm text-red-600 font-medium pt-2'>Please read and agree to the Terms and Privacy Policy.</p>}
          </div>
          <div className='flex justify-center font-medium mt-10'>
            <span>Already have an account?</span> <Link href="/login" className='ml-1 text-brand-primary'>Login</Link>
          </div>
        </form>
      </div>

      <div className='w-1/2 h-full'>
        <img src="./login-vector.jpg" alt="Login Vector" className='w-full h-full object-cover'/>
      </div>
    </main>
  );
};

export default LoginForm;
