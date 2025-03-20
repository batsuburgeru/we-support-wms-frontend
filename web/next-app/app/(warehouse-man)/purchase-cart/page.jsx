"use client"

import ClientPopover from "@/components/ClientPopover";
import ProductSearch from "@/components/ProductSearch";
import { PurchaseCartTable } from "@/components/PurchaseCartTable";
import { useCart } from "@/context/CartContext";
import { useState } from 'react';

const NewPurchase = () => {
  const [note, setNote] = useState('')
  const [approved_by, setApproved_By] = useState('')
  const { items, clearCart } = useCart();
  console.log(items)

  const totalCartCost = items.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.total_price);
  }, 0);

  const totalCartQty = items.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.quantity);
  }, 0);

  // const data = {
  //   created_by: "017ca71c-03c2-11f0-9421-d8bbc10b61c5",
  //   status: "Pending",
  //   approved_by: "017ca71c-03c2-11f0-9421-d8bbc10b61c5",
  //   sap_sync_status: 1,
  //   note: "Items are needed for upcoming project.",
  //   items: [
  //     {
  //       product_id: "232d0c38-3f3b-4186-a883-dded965b9bb3",
  //       quantity: 30,
  //       unit_price: 20.5,
  //     },
  //     {
  //       product_id: "581b9d48-c866-412e-aa7b-c491d87d60be",
  //       quantity: 5,
  //       unit_price: 15.0,
  //     },
  //   ],
  // };
  
  const jsonString = JSON.stringify(data);
  
  console.log(jsonString);
  
  function handleSubmit(event) {
    event.preventDefault(); 
  
    // const action = event.nativeEvent.submitter.value;
  
    // if (action === "save-draft") {
    //   console.log("Saving as draft...");
    // } else if (action === "get-approval") {
    //   fetch("http://localhost:3002/purchaseRequests/create-purchase-request", {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //     credentials: "include"
    //   })
    //   .then(response => response.json())
    //   .then(result => {
    //     if (result && result.data) {
    //       const user = result.data;
    //       router.push('/dashboard'); 
    //     } else {
    //       setInvalidCreds(true);
    //     }
    //   })
    //   .catch(error => {
    //     console.log('Error during login:', error);
    //     setLoginError(true);
    //   });
    // }
  }

  function handleCancel() {
    setNote('');
    clearCart();
    setApproved_By('')
  }

  return (
    <main>
      <div className='flex justify-center px-6 py-4 flex-col gap-4'>
        <h1>New Purchase Requisition</h1>
        <ProductSearch width={'[500px]'} />
      </div>
      <hr className='border-borderLine'/>
      <section className="px-6 pt-4">
        <div className="flex items-center">
          <h2 className="mr-20">Client Name*</h2>
          <ClientPopover value={approved_by} setValue={setApproved_By} />
        </div>
      </section>

      <section className="px-6 mt-8">
        <PurchaseCartTable />
      </section>
      <section className="px-6 mt-8 flex justify-between mb-24">
        <div>
          <h2 className="font-medium">Notes</h2>
          <textarea className="border border-borderLine rounded-md px-4 py-2 h-40 w-96 resize-none" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="bg-navBG flex flex-col justify-between p-6 rounded-md ml-8 w-[500px] min-w-96">
          <div className="flex justify-between">
            <div>
              <p className="font-medium mb-2">Sub Total</p>
              <p className="font-medium text-sm">Total Quantity: {totalCartQty}</p>
            </div>
            <p className="font-medium">
              ₱{totalCartCost}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h2 className="font-semibold">Total</h2>
            <h2 className="font-semibold">₱{totalCartCost}</h2>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="w-full fixed bottom-0 px-6 bg-white py-3 shadow-[0_-5px_10px_rgba(0,0,0,0.10)] z-50">
        <button
          type="submit"
          name="action"
          value="save-draft"
          className="bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 colorTransition"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          name="action"
          value="get-approval"
          className="ml-4 bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 colorTransition"
        >
          Get Approval
        </button>
        <button
          onClick={handleCancel}
          type="button" 
          className="ml-4 bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 colorTransition"
        >
          Cancel
        </button>
      </form>
    </main>
  )
}

export default NewPurchase