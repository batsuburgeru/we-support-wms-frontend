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
  
  export function NewClientModal(props) {
    toastConfig({
      theme: 'dark',
    });
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3002/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
      credentials: "include"
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.user) {
        const user = result.user;
        toast('User successfully registered!');
        props.setChangeIndicator(prevState => !prevState);
      } else {
        console.log('User Registration failed:', result.message);
      }
    })
    .catch(error => {
      console.log('Error during registration:', error);
    });
  };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-brand-primary hover:bg-orange-600">New Client</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogDescription className='sr-only'>Add Client Modal</AlertDialogDescription>
          <AlertDialogHeader>
            <AlertDialogTitle>New Client</AlertDialogTitle>
            <div>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="grid grid-flow-row grid-cols-3 py-4 px-2 gap-3">
                  <label htmlFor="name" className="py-3 text-black font-medium">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    id="name" 
                    className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
                  />
                  <label htmlFor="email" className="py-3 text-black font-medium">Email address</label>
                  <input 
                    type="text" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
                  />
                  <label htmlFor="password" className="py-3 text-black font-medium">Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" 
                    className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
                  />
                  <label htmlFor="organization" className="py-3 text-black font-medium">Role</label>
                  <select
                    name="roles"
                    id="roles"
                    className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
                    defaultValue="placeholder"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="placeholder" disabled>
                      Choose role
                    </option>
                    <option value="WarehouseMan">WarehouseMan</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="PlantOfficer">PlantOfficer</option>
                    <option value="Guard">Guard</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-brand-secondary hover:bg-brand-primary" type="submit">
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
  