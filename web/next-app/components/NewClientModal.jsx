"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';
  
export function NewClientModal({ setChangeIndicator }) {
  toastConfig({
    theme: 'dark',
  });
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password || !phone || !company || !companyAddress) {
      toast('Registration failed. Please fill in all fields.');
    }
    else {
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
        if (result && result.user) {
          toast('Client successfully registered! Please inform the client to check their email for the verification link.');
          setChangeIndicator(prevState => !prevState);
          setName('');
          setEmail('');
          setPassword(''); 
          setPhone('');
          setCompany('');
          setCompanyAddress('');
        } else {
          toast(`Cannot register user. ${result.error}`);
        }
      })
      .catch(error => {
        console.log('Error during registration:', error);
      });
    };
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-brand-secondary hover:bg-orange-600 active:bg-orange-700 colorTransition">New Client</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
      <AlertDialogDescription className='sr-only'>Add Client Modal</AlertDialogDescription>
        <AlertDialogHeader>
          <AlertDialogTitle>New Client</AlertDialogTitle>
          <div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="grid grid-flow-row grid-cols-5 py-4 px-2 gap-3 w-[700px]">
                <label htmlFor="name" className="py-3 text-black font-medium col-span-2">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  id="name" 
                  className="col-span-3 border border-borderLine rounded-md px-4 py-2 text-black" 
                />
                <label htmlFor="email" className="py-3 text-black font-medium col-span-2">Email address</label>
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  id="email" 
                  className="col-span-3 border border-borderLine rounded-md px-4 py-2 text-black" 
                />
                <label htmlFor="password" className="py-3 text-black font-medium col-span-2">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  id="password" 
                  className="col-span-3 border border-borderLine rounded-md px-4 py-2 text-black" 
                />
                <label htmlFor="phone" className="py-3 text-black font-medium col-span-2">Phone</label>
                <input 
                  type="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone" 
                  className="col-span-3 border border-borderLine rounded-md px-4 py-2 text-black" 
                />
                <label htmlFor="company" className="py-3 text-black font-medium col-span-2">Company/Organization Name</label>
                <input 
                  type="company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)}
                  id="company" 
                  className="col-span-3 border border-borderLine rounded-md px-4 py-2 text-black" 
                />
                <label htmlFor="companyAddress" className="py-3 text-black font-medium col-span-2">Company/Organization Address</label>
                <input 
                  type="companyAddress" 
                  value={companyAddress} 
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  id="companyAddress" 
                  className="col-span-3 border border-borderLine rounded-md px-4 py-2 text-black" 
                />
              </div>
              <div className="flex justify-end gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-brand-secondary hover:bg-orange-600 active:bg-orange-700 colorTransition" type="submit">
                  Add
                </AlertDialogAction>
              </div>
            </form>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  