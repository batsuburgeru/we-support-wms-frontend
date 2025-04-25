"use client"

import ProductSearch from "@/components/ProductSearch";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, use } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const columns = [
  {
    accessorKey: "name",
    header: "Item Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "unit_price",
    header: "Unit Price",
    cell: ({ row }) => <div>{row.getValue("unit_price")}</div>,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => <div>{row.getValue("total_price")}</div>,
  },
];

const EditPurchase = ({ params }) => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, addToCart } = useCart();
  const resolvedParams = use(params); 
  const { id } = resolvedParams; 
  const [data, setData] = useState([]); 
  const [hasAddedToCart, setHasAddedToCart] = useState(false);
  const router = useRouter();

  const items = cartItems.map(({id, quantity, unit_price}) => ({
    product_id: id,
    quantity,
    unit_price: parseFloat(unit_price)
  }));

  const totalCartCost = cartItems.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.total_price);
  }, 0);

  const totalCartQty = cartItems.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.quantity);
  }, 0);cartItems

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3002/purchaseRequests/search-purchase-request?search=${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();

        if (result && result.data) {
          // Transform data
          const transformedData = (result) => {
            if (result && result) {
              const { purchaseRequest, deliveryNote, prItems } = result.data;      
          
              // Transform data
              return {
                id: purchaseRequest.id,
                approved_by_name: purchaseRequest.approved_by_name,
                client_name: purchaseRequest.client_name,
                note: deliveryNote.note,
                status: purchaseRequest.status,
                pr_items: prItems.map((item) => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                  unit_price: parseFloat(item.unit_price),
                  total_price: parseFloat(item.total_price),
                  product_name: item.product_name
                })),
              };
            }
            return null; // Return null if the data format doesn't match
          };
          setData(transformedData(result)); // Save data to state
        } else {
          console.error("Retrieve failed:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]); 

  useEffect(() => {
    if (data && data.pr_items && !hasAddedToCart) {
      data.pr_items.forEach((item) => {
        addToCart({
          id: item.product_id,
          name: item.product_name,
          unit_price: item.unit_price,
          unit: "Pcs",
          quantity: item.quantity, 
        });
      });
      setHasAddedToCart(true); 
    }
  }, [data, addToCart, hasAddedToCart]);  


  toastConfig({
    theme: 'dark',
  });

  function handleCancel() {
    localStorage.setItem("client", JSON.stringify(""));
    localStorage.setItem("note", JSON.stringify(""));
    router.back();
  };
  
  function handleSubmit(event) {
    event.preventDefault(); 
  
    const payloadOne = {
      note: data.note,
      items: items
    };

    const payloadTwo = {
      status: "Pending"
    }

    fetch(`http://localhost:3002/purchaseRequests/update-purchase-request/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadOne),
      credentials: "include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save purchase request");
      }
      return response.json();
    })
    .then(() => {
      if (data.status === "Returned") {
        toast("Request resubmitted successfully.");
        router.back();
      }
      else {
        toast("Changes saved successfully.");
        router.back();
      }
      router.back();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Purchase request error! Please ensure that there are items in your cart and that all required fields are filled.");
    });

    if (data.status === "Returned") {
      fetch(`http://localhost:3002/purchaseRequests/update-purchase-request-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadTwo),
        credentials: "include",
      })
      .then((response) => response.json())
      .catch((error) => console.error("Error during submission:", error));
    };
  };

  return (
    <main>
      <div className='flex justify-center px-6 py-4 flex-col gap-4'>
        <h1>Edit Purchase Requisition</h1>
        <ProductSearch width={'[500px]'} workflow={id} />
      </div>
      <hr className='border-borderLine'/>
      <section className="px-6 pt-4">
        <div className="flex items-center">
          <h2 className="mr-20">Client Name*</h2>
          <h2 className="bg-neutral-200 px-4 py-1 rounded-md font-medium">{data.client_name}</h2>
        </div>
      </section>
      <section className="px-6 mt-8">
      <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length ? (
              cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 border border-gray-300 rounded-l"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span> {/* Make sure this is updated */}
                      <button
                        className="px-2 py-1 border border-gray-300 rounded-r"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>{`₱${item.unit_price}`}</TableCell>
                  <TableCell>{`₱${item.total_price}`}</TableCell>
                  <TableCell>
                    <button
                      className="px-2 py-1 text-white rounded"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 color="#343434" strokeWidth={1.25} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No Items in cart. Add an item by searching.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
      </section>
      <section className="px-6 mt-8 flex justify-between mb-24">
        <div>
          <h2 className="font-medium">Notes</h2>
          <textarea 
            className="border border-borderLine rounded-md px-4 py-2 h-40 w-96 resize-none" 
            value={data.note || ""} 
            onChange={(e) => 
              setData((prevData) => ({
                ...prevData, // Spread all existing properties of the object
                note: e.target.value, // Update the note property
              }))
            } 
          />
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
          className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700 colorTransition"
        >
          {data.status === "Returned" ? "Resubmit Request" : "Save Changes"}
        </button>
        <button
          onClick={handleCancel}
          type="button" 
          className="ml-4 bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 active:bg-neutral-300 colorTransition"
        >
          Cancel
        </button>
      </form>
    </main>
  )
}

export default EditPurchase