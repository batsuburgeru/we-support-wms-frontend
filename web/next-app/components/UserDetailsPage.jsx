"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, ChevronLeft, Phone, Copy } from 'lucide-react';
import EditUserModal from '@/components/EditUserModal';
import { PurchaseTable } from '@/components/DataTable';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const UserDetailsPage = ({ params }) => {
  toastConfig({
    theme: 'dark',
  });

  const router = useRouter();
  const resolvedParams = React.use(params); // Unwrapping the Promise
  const { id } = resolvedParams;
  const [data, setData] = React.useState(''); // State to hold the transformed data
  const [showEditModal, setShowEditModal] = React.useState(false); // State to control the modal visibility

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
  }, [id]);

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
      <div className='flex'>
        <div className='p-6'>
          <h2 className='font-medium text-lg'>Personal Information</h2>
          <h3 className='text-ellipsis overflow-hidden txtOverflowPopover'>
            {data.role === "Client" ? data.org_name : data.role}
          </h3>
          <hr className='my-4' />
          <div className='flex gap-4'>
            <img src="/profile.png" className='w-20 h-20'/>
            <div className='space-y-1'>
              <p>{data.name}</p>
              <p>{data.email}</p>
              <p className='flex gap-1 items-center'><Phone size={18}/>{data.contact_num}</p>
            </div>
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
          <h2 className='font-medium mt-6'>ADDRESS</h2>
          <hr className='my-4' />
          <h3>Billing Address</h3>
          <p className='text-wrap'>{data.comp_add}</p>
        </div>
        <hr />
        <div className='p-6'>
          <h2 className='font-medium text-lg'>History</h2>
          <PurchaseTable />
        </div>
      </div>
      {showEditModal && 
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <EditUserModal setShowEditModal={setShowEditModal} />
      </div>}
    </main>
  )
}

export default UserDetailsPage