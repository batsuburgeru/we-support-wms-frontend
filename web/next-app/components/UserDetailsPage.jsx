"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, ChevronLeft, Phone, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PurchaseTable } from '@/components/DataTable';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const UserDetailsPage = ({ params }) => {
  toastConfig({
    theme: 'dark',
  });

  const router = useRouter();
  const resolvedParams = React.use(params); 
  const { id } = resolvedParams;
  const [data, setData] = React.useState(''); 
  const [showEditModal, setShowEditModal] = React.useState(false); 
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [companyAddress, setCompanyAddress] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [refresh, setRefresh] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3002/users/search-users?search=${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();

        if (result && result.users) {
          setData(result.users[0]); // Save data to state
        } else {
          console.error("Retrieve failed:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, refresh]);

  function handleImageUpload(event) {
    const file = event.target.files[0]; 
    if (file) {
      setImage(file); 
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
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

    fetch(`http://localhost:3002/users/update-user/${data.id}`, {
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

  return (
    <main>
      <div className='flex justify-between items-center py-4 px-4'>
        <div className='flex items-center gap-2 text-lg'>
          <button onClick={() => router.back()} className="border border-borderLine rounded-sm h-fit p-1 mx-1">
            <ChevronLeft color="#F97333" />
          </button>
          <h1>{data.name}</h1>
        </div>
        <button onClick={() => setShowEditModal(true)} className="border border-borderLine rounded-sm h-fit p-1 mx-1">
          <Pencil />
        </button>
      </div>
      <hr />
      <div className='flex flex-col xl:flex-row'>
        <div className='p-6 w-fit'>
          <h2 className='font-medium text-xl mb-2'>Personal Information</h2>
          <h3>
            {data.role === "Client" ? data.org_name : data.role}
          </h3>
          <hr className='my-4' />
          <div className='flex flex-col items-center gap-2'>
            <img src={`http://localhost:3002${data.img_url}`} className='w-20 h-20 mb-2 rounded-full'/>
            <p className='font-semibold'>{data.name}</p>
            <p>{data.email}</p>
            {data.role === "Client" && <p className='flex gap-1 items-center'><Phone size={18}/>{data.contact_num}</p>}
          </div>
          <div className='flex gap-2 my-4'>
            <p>{data.id}</p>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(data.id)
                toast('User ID copied to clipboard', {maxVisibleToasts: 1})
              }}
            >
              <Copy size={17} />
            </button>
          </div>
          {data.role === "Client" && <div>
            <h2 className='font-medium mt-6'>ADDRESS</h2>
            <hr className='my-4' />
            <h3>Billing Address</h3>
            <p className='text-wrap'>{data.comp_add}</p>
          </div>}
        </div>
        <hr className='xl:hidden block' />
        <div className='p-6 xl:border-l xl:border-neutral-200 h-screen'>
          <h2 className='font-medium text-xl'>History</h2>
          <PurchaseTable 
            tableFor="userDetails"
            forUser={data.name}
            forUserRole={data.role}
            refresh={refresh}
          />
        </div>
      </div>


      {showEditModal && 
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className='font-medium text-xl mb-8'>Edit {data.role === "Client" ? "Client" : "User"} Info</h2>
          <div className='flex items-center gap-4'>
            <img src={image ? previewUrl : `http://localhost:3002${data.img_url}`} className='w-20 h-20 rounded-full'/>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="focus:outline-none"
            />
          </div>
          <div className='grid grid-flow-row grid-cols-3 gap-y-3 mt-4'>
            <label htmlFor="name" className="block py-3">Name</label>
            <input
              type="text"
              id="name"
              placeholder={data.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
            />
            <label htmlFor="email" className="block py-3">Email Address</label>
            <input
              type="text"
              id="email"
              placeholder={data.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
            />
            {data.role !== "Client" && <label htmlFor="organization" className="py-3 text-black font-medium">Role</label>}
            {data.role !== "Client" && <select
              name="roles"
              id="roles"
              className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
              defaultValue={data.role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="WarehouseMan">WarehouseMan</option>
              <option value="Supervisor">Supervisor</option>
              <option value="PlantOfficer">PlantOfficer</option>
              <option value="Guard">Guard</option>
              <option value="Admin">Admin</option>
            </select>}
          </div>
          {data.role === "Client" && <div className='grid grid-flow-row grid-cols-3 gap-y-3 mt-3'>
            <label htmlFor="phone" className="block py-3">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder={data.contact_num}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
            />
            <label htmlFor="company" className="block py-3">Company Name</label>
            <input
              type="text"
              id="company"
              placeholder={data.org_name}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
            />
            <label htmlFor="companyAddress" className="block py-3">Billing Address</label>
            <input
              type="text"
              id="companyAddress"
              placeholder={data.comp_add}
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black"
            />
          </div>}
          <hr className='my-5' />
          <div className="space-x-2 flex justify-end">
            <Button
              onClick={cancelEdit}
              className="bg-white border border-borderLine px-4 py-2 rounded-md hover:bg-gray-200 active:bg-gray-300 text-black"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmEdit}
              className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>}
    </main>
  )
}

export default UserDetailsPage