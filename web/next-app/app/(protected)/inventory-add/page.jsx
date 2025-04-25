"use client";

// ReactJS and NextJS Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Component Imports
import DataPopover from '@/components/DataPopover';

// Import from react-simple-toasts
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const InventoryAdd = () => {
  // Initialize toast from react-simple-toasts
  toastConfig({
    theme: 'dark',
  });

  // Initialize router
  const router = useRouter();

  // State variables to store the data in the forms before submission
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State for uploaded image
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview

  // Clears form and goes back
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

  // Handles image uploading by taking the uploaded image file and setting it as the image in the image state and the URL for the previewUrl state to display the image after uploading
  function handleImageUpload(event) {
    const file = event.target.files[0]; 
    if (file) {
      setImage(file); 
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // Handles form submission to the /create-product route
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("unit_price", price);
    formData.append("stock_quantity", stock);
    formData.append("image", image); // Append the image file to the form data
    
    fetch("http://localhost:3002/products/create-product", {
      method: 'POST',
      body: formData,
      credentials: "include", 
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

  // Fetches date from the /view-categories route to be used in the category popover component
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

  // This page appears when adding a new product to inventory
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
