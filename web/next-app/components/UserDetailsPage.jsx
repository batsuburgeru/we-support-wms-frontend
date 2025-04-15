"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, X } from 'lucide-react';
import EditUserModal from '@/components/EditUserModal';

const UserDetailsPage = ({ params }) => {
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
    <div>
      <p>User ID: {data.id}</p>
      <p>Name{data.role === "Client" && " of Contact"}: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Role: {data.role}</p>
      {data.role === "Client" && (
        <div>
          <p>Phone: {data.contact_num}</p>
          <p>Company/Organization: {data.org_name}</p>
          <p>Address: {data.comp_add}</p>
        </div>
      )}
      <div className='flex'>
        <button onClick={() => setShowEditModal(true)} className="border border-borderLine rounded-sm h-fit p-1 mx-1">
          <Pencil />
        </button>
        <button onClick={() => router.back()} className="border border-borderLine rounded-sm h-fit p-1 mx-1">
          <X />
        </button>
      </div>
      {showEditModal && 
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <EditUserModal setShowEditModal={setShowEditModal} />
      </div>}
    </div>
  )
}

export default UserDetailsPage