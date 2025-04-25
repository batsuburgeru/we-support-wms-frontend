"use client";

import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import LanguageSelect from '@/components/LanguageSelect';
import TimezoneSelect from '@/components/TimezoneSelect';
import { redirect } from 'next/navigation';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const AccountSettings = () => {
  toastConfig({
      theme: 'dark',
    });

  const [userProfile, setUserProfile] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3002/users/display-user-info", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.userInfo) {
          setUserProfile(result.userInfo);
      } else {
          console.log("Retrieve failed:", result.message || "No user profile property");
      }
    })  
    .catch(error => {
        console.log('Error:', error);
    });
  }, [refresh]);

  const handleLogout = (event) => {
    event.preventDefault();
    fetch("http://localhost:3002/users/logout", {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => response.json())
    redirect('/login')
    .catch(error => {
      console.log('Error during logout:', error);
    });
  };

  function handleCopy() {
    navigator.clipboard.writeText(userProfile.email);
    toast('Email copied to clipboard', { maxVisibleToasts: 3 });
  };

  const cancelEdit = () => {
    setName('');
    setEmail('');
    setRole('');
    setPhone('');
    setCompany('');
    setCompanyAddress('');
    setImage(null);
  }; 

  const confirmEdit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("contact_num", phone);
    formData.append("org_name", company);
    formData.append("comp_add", companyAddress);
    formData.append("image", image);

    fetch(`http://localhost:3002/users/update-user/${userProfile.id}`, {
      method: 'PUT',
      body: formData,
      credentials: "include",
    })
    .then((response) => response.json())
    .then((result) => {
      if (result && result.message === "User updated successfully") {
        toast(`User ${result.updatedUser.name} updated successfully`, {maxVisibleToasts: 1});
        cancelEdit();
        setRefresh(prevData => prevData + 1);
        console.log([...formData.entries()]);
      }
      else {
        toast(`Failed to update user. Please try again later. ${result.error}`, {maxVisibleToasts: 1});
      }
    })
    .catch((error) => console.error("Error during update:", error))
  };

  function handleImageUpload(event) {
    const file = event.target.files[0]; 
    if (file) {
      setImage(file); 
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  return (
    <main className="bg-dashboard h-full">
      <div className='px-6 flex items-center py-4'>
        <h1>Account Settings</h1>
      </div>
      <hr className='border-borderLine'/>
      <div className='flex px-6 py-4 xl:flex-row gap-6'>
        <section className='bg-white rounded-xl p-6 w-[500px]'>
          <div className='flex pb-4 gap-2 items-center'>
            <img src={`http://localhost:3002${userProfile.img_url}`} className='w-20 h-20 rounded-full object-cover' />
            <div>
              <h2 className='font-semibold text-lg'>{userProfile.name}</h2>
              <div className='flex gap-2'>
                <p className='font-light text-sm'>{userProfile.email}</p>
                <button onClick={handleCopy}><Copy size={15} /></button>
              </div>
            </div>
          </div>
          <hr />
          <div className='pt-4 flex flex-col'>
            <h2 className='font-semibold pb-4'>Languages & Timezone</h2>
            <p className='pb-2'>
              Language:
            </p>
            <LanguageSelect />
            <p className='pt-4 pb-2'>
              Timezone:
            </p>
            <TimezoneSelect />
            <button className='bg-brand-secondary text-white rounded-md py-1 mt-4 hover:bg-orange-600 active:bg-orange-700 colorTransition' onClick={handleLogout}>
              Log out
            </button>
          </div>
        </section>
        <section className='bg-white p-6 rounded-xl'>
          <div>
            <h2 className='font-medium'>Basic Information</h2>
            <p className='text-sm'>Information used to log into the system</p>
          </div>
          <div>
            <div className='flex items-center gap-4'>
              <img src={image ? previewUrl : `http://localhost:3002${userProfile.img_url}`} className='w-20 h-20 rounded-full object-cover'/>
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="focus:outline-none"
              />
            </div>
            <div className='mt-4'>
              <label htmlFor="name" className="block pt-3">Name</label>
              <input
                type="text"
                id="name"
                placeholder={userProfile.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-borderLine rounded-md px-4 py-2 text-black w-full"
              />
              <label htmlFor="email" className="block pt-3">Email Address</label>
              <input
                type="text"
                id="email"
                placeholder={userProfile.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-borderLine rounded-md px-4 py-2 text-black mb-3 w-full"
              />
              {userProfile.role !== "Client" && <label htmlFor="organization" className="text-black block">Role</label>}
              {userProfile.role !== "Client" && <select
                name="roles"
                id="roles"
                className="border border-borderLine rounded-md px-4 py-2 text-black w-full"
                defaultValue={userProfile.role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="WarehouseMan">WarehouseMan</option>
                <option value="Supervisor">Supervisor</option>
                <option value="PlantOfficer">PlantOfficer</option>
                <option value="Guard">Guard</option>
                <option value="Admin">Admin</option>
              </select>}
            </div>
            {userProfile.role === "Client" && <div>
              <label htmlFor="phone" className="block">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder={userProfile.contact_num}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-borderLine rounded-md px-4 py-2 mb-3 text-black w-full"
              />
              <label htmlFor="company" className="block">Company Name</label>
              <input
                type="text"
                id="company"
                placeholder={userProfile.org_name}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border border-borderLine rounded-md px-4 py-2 mb-3 text-black w-full"
              />
              <label htmlFor="companyAddress" className="block">Billing Address</label>
              <input
                type="text"
                id="companyAddress"
                placeholder={userProfile.comp_add}
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className="border border-borderLine rounded-md px-4 py-2 mb-3 text-black w-full"
              />
            </div>}
            <hr className='my-2' />
            <div>
              <button 
                className='bg-brand-secondary text-white rounded-md py-1 mt-4 w-full hover:bg-orange-600 active:bg-orange-700 colorTransition' 
                onClick={confirmEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AccountSettings