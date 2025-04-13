"use client";

import React from 'react';
import { Pencil, X } from 'lucide-react';
import Link from 'next/link';

const UserDetails = ({ params }) => {
  const resolvedParams = React.use(params); // Unwrapping the Promise
  const { id } = resolvedParams;
  const [data, setData] = React.useState(''); // State to hold the transformed data

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

  console.log(data)
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
        <Link href={`/edit-user/${data.id}`} className="border border-borderLine rounded-sm h-fit p-1 mx-1">
          <Pencil />
        </Link>
        <Link href="/purchase-list" className="border border-borderLine rounded-sm h-fit p-1 mx-1">
          <X />
        </Link>
      </div>
      
    </div>
  )
}

export default UserDetails