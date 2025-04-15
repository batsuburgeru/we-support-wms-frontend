"use client"

import DataPopover from "@/components/DataPopover";
import ProductSearch from "@/components/ProductSearch";
import { PurchaseCartTable } from "@/components/PurchaseCartTable";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const NewPurchase = () => {
  toastConfig({
    theme: 'dark',
  });

  const [note, setNote] = useState('');
  const [client_id, setClient_Id] = useState('');
  const { cartItems, clearCart } = useCart();

  const items = cartItems.map(({id, quantity, unit_price}) => ({
    product_id: id,
    quantity,
    unit_price: parseFloat(unit_price)
  }));

  useEffect(() => {
    const savedClient = localStorage.getItem("client");
    const parsedClient = savedClient ? JSON.parse(savedClient) : []; 
    setClient_Id(parsedClient); 
    const savedNote = localStorage.getItem("note");
    const parsedNote = savedNote ? JSON.parse(savedNote) : [];
    setNote(parsedNote)
  }, []);
  
  useEffect(() => {
    if (client_id || note) {
      localStorage.setItem("client", JSON.stringify(client_id));
      localStorage.setItem("note", JSON.stringify(note));
    }
  }, [client_id, note]);

  const totalCartCost = cartItems.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.total_price);
  }, 0);

  const totalCartQty = cartItems.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.quantity);
  }, 0);cartItems

  function handleCancel() {
    setNote('');
    clearCart();
    setClient_Id('');
    localStorage.setItem("client", JSON.stringify(""));
    localStorage.setItem("note", JSON.stringify(""));
  };
  
  function handleSubmit(event) {
    event.preventDefault(); 
  
    const action = event.nativeEvent.submitter.value;

    const payload = {
      //status: action === 'save-draft' ? "Draft" : "Pending",
      client_id: client_id,
      note: note,
      items: items
    };

    fetch("http://localhost:3002/purchaseRequests/create-purchase-request", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: "include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save purchase request");
      }
      return response.json();
    })
    .then(() => {
      localStorage.setItem("client", JSON.stringify(""));
      localStorage.setItem("note", JSON.stringify(""));
      setNote(""); 
      clearCart(); 
      setClient_Id('');
      toast(
        action === "save-draft"
          ? "Purchase request saved as draft."
          : "Purchase request submitted for approval."
      );
    })
    .catch((error) => {
      console.log("Error:", error);
      toast("⚠️ Purchase request error! Please ensure that there are items in your cart and that all required fields are filled.", { maxVisibleToasts: 3 });
    });
  };

  const [clients, setClients] = useState([]);
        
  useEffect(() => {
    fetch("http://localhost:3002/users/view-users", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.users) {
        setClients(result.users.filter(user => user.role === "Client"));
        } else {
        console.log('Retrieve failed:', result.message);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
  }, []);

  return (
    <main>
      <div className='flex justify-center px-6 py-4 flex-col gap-4'>
        <h1>New Purchase Requisition</h1>
        <div className="flex items-center">
          <h2 className="mr-20">Client Name*</h2>
          <DataPopover 
            popoverFor="client"
            value={client_id} 
            setValue={setClient_Id} 
            data={clients}
            commandEmpty="No client found."
            placeholder="Select a client"
          />
        </div>
      </div>
      <hr className='border-borderLine'/>
      <section className="px-6 pt-4">
        <ProductSearch width={'[500px]'} workflow="new" />
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
          value="get-approval"
          className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700 colorTransition"
        >
          Get Approval
        </button>
        <button
          type="submit"
          name="action"
          value="save-draft"
          className="ml-4 bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 active:bg-neutral-300 colorTransition"
        >
          Save as Draft
        </button>
        <button
          onClick={handleCancel}
          type="button" 
          className="ml-4 bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 active:bg-neutral-300 colorTransition"
        >
          Clear
        </button>
      </form>
    </main>
  )
}

export default NewPurchase