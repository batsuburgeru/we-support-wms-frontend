"use client"; 

// ReactJS and NextJS Imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Component Import
import { PurchaseTable } from '@/components/DataTable';

const PurchaseList = () => {

  // Fetch data from /display-user-info and store it in userProfile state
  const [userProfile, setUserProfile] = useState([]);
    
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
  }, []);

  // Serves as the page for displaying the purchase request table
  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Purchase Requisitions</h1>
        {userProfile.role === "WarehouseMan" || userProfile.role === "Admin" && <div className='flex items-center'>
          <Link href="/purchase-cart" className='bg-brand-secondary text-white font-medium py-2 px-4 text-sm rounded-md hover:bg-orange-600 active:bg-orange-700 colorTransition'>
            Create New Order
          </Link>
        </div>}
      </div>
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <PurchaseTable
          tableFor = "purchaseList"
        />
      </section>
    </main>
  )
}

export default PurchaseList