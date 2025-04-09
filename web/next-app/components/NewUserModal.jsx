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
  
  export function NewUserModal(props) {
    toastConfig({
      theme: 'dark',
    });
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password || !role) {
      toast('Registration failed. Please fill in all fields.');
    }
    else {
      const payload = {
        name: name,
        email: email,
        password: password,
        role: role,
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
        if (result && result.user) {
          toast('User successfully registered! Please inform the user to check their email for the verification link.');
          props.setChangeIndicator(prevState => !prevState);
          setName('');
          setEmail('');
          setPassword('');  
          setRole('');
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
          <Button className="bg-brand-secondary hover:bg-orange-600 active:bg-orange-700 colorTransition">New User</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogDescription className='sr-only'>Add User Modal</AlertDialogDescription>
          <AlertDialogHeader>
            <AlertDialogTitle>New User</AlertDialogTitle>
            <div>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="grid grid-flow-row grid-cols-3 py-4 px-2 gap-3">
                  <label htmlFor="name" className="py-3 text-black font-medium">Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    id="name" 
                    className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
                  />
                  <label htmlFor="email" className="py-3 text-black font-medium">Email address</label>
                  <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black" 
                  />
                  <label htmlFor="password" className="py-3 text-black font-medium">Password</label>
                  <input 
                    type="password" 
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
                    defaultValue={role || "placeholder"}
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
  