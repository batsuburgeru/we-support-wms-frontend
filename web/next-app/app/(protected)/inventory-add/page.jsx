"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataPopover from '@/components/DataPopover';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const InventoryAdd = () => {
  toastConfig({
    theme: 'dark',
  });

  const router = useRouter();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State for uploaded image
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview

  function handleCancel() {
    setName('');
    setSku('');
    setCategory_id('');
    setPrice('');
    setStock('');
    setDescription('');
    setImage(null);
    setPreviewUrl(null);
    router.back();
  };

  function handleImageUpload(event) {
    const file = event.target.files[0]; 
    if (file) {
      setImage(file); 
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
  
    // Construct the JSON payload
    const payload = {
      name: name, // Item name
      sku: sku, // SKU
      description: description, // Item description
      category_id: category_id, // Category ID
      unit_price: parseFloat(price), // Convert price to number
      stock_quantity: parseInt(stock, 10), // Convert stock to integer
    };
  
    console.log("JSON Payload:", payload); // Debugging log for JSON payload
  
    fetch("http://localhost:3002/products/create-product", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure content type is set to JSON
      },
      body: JSON.stringify(payload), // Convert the payload to a JSON string
      credentials: "include", // Include credentials for authentication
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add product to inventory");
        }
        return response.json();
      })
      .then(() => {
        handleCancel(); // Reset form and navigate back
        toast("Item successfully added to inventory"); // Show success notification
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error adding to inventory! Please ensure all fields are filled out correctly.");
      });
  }
  const [data, setData] = useState([]);
      
  useEffect(() => {
    fetch("http://localhost:3002/categories/view-categories", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.categories) {
        setData(result.categories);
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
      <div className="flex justify-between items-center px-6 py-4">
        <h1>New Item</h1>
      </div>
      <hr className="border-borderLine" />
      <section className="px-6 flex">
        <div className='flex flex-col 2xl:mr-[58px]'>
          <div className="flex justify-between items-center 2xl:hidden">
            <h3 className="py-3 text-black">Item Image</h3>
            <div className='flex flex-col mt-4 border border-borderLine rounded-md items-center w-96 px-4 py-1'>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="focus:outline-none"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="h-60 w-60 rounded-lg object-cover my-2" />
              )}
            </div>
          </div>
          <div className="flex my-2 items-center justify-between">
            <label htmlFor="name" className="py-3 text-black">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="border border-borderLine rounded-md px-2 py-1 h-fit text-black w-96 focus:outline-none"
            />
          </div>
          <div className="flex my-2 items-center justify-between">
            <label htmlFor="sku" className="py-3 text-black">
              SKU
            </label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              id="sku"
              className="border border-borderLine rounded-md px-2 py-1 h-fit text-black w-96 focus:outline-none"
            />
          </div>
          <div className="flex my-2 items-center justify-between">
            <h3 className="py-3 text-black mr-[125px]">Category</h3>
            <DataPopover 
              popoverFor="category"
              value={category_id} 
              setValue={setCategory_id} 
              data={data}
              commandEmpty="No category found."
              placeholder="Select a category"
            />
          </div>
        </div>
        <div className="px-6 2xl:flex items-center hidden">
          <h3 className="py-3 text-black mr-[102px]">Item Image</h3>
          <div className='flex flex-col mt-4 border border-borderLine rounded-md items-center'>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="focus:outline-none"
            />
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="h-60 w-60 rounded-lg object-cover my-4" />
            )}
          </div>
        </div>
      </section>
      <section className="flex px-6 flex-col 2xl:flex-row">
        <div className="flex items-center mr-[75px] my-2">
          <label htmlFor="price" className="py-3 text-black mr-[160px]">
            Price
          </label>
          <p className="py-1 px-3 border border-neutral-300 h-fit bg-neutral-300 rounded-l-md">
            PHP
          </p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            className="border border-l-0 border-borderLine rounded-r-md px-2 py-1 h-fit text-black w-[330px] focus:outline-none"
          />
        </div>
        <div className="flex items-center my-2">
          <label htmlFor="stock" className="py-3 text-black mr-[83px]">
            Opening Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            id="stock"
            className="border border-borderLine rounded-md px-2 py-1 h-fit text-black w-96 focus:outline-none"
          />
        </div>
      </section>
      <div className="px-6 mb-24">
        <h3 className="py-3 text-black mr-10">Description</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-borderLine rounded-md px-2 py-1 h-[300px] text-black w-[600px] focus:outline-none"
        />
      </div>
      <form onSubmit={handleSubmit} className="w-full fixed bottom-0 px-6 bg-white py-3 shadow-[0_-5px_10px_rgba(0,0,0,0.10)] z-50">
        <button
          type="submit"
          name="action"
          className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700 colorTransition"
        >
          Create
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
  );
};

export default InventoryAdd;
