"use client";

import React, { useState, useEffect } from 'react';
import ProductSearch from '@/components/ProductSearch';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import SearchLoading from '@/components/SearchLoading';
import { useRouter, useParams } from 'next/navigation';

const ProductSearchResults = () => {
  const router = useRouter(); // Get the router object
  const params = useParams(); // Get the params promise
  const [workflow, setWorkflow] = useState(null); // Initialize the workflow state for determining the workflow of the user
  const [products, setProducts] = useState([]); // Initialize products state to store the fetched products
  const [query, setQuery] = useState(''); // Initialize query state for storing the search query
  const [noResult, setNoResult] = useState(false); // noResult state to be used for displaying text when no results are found
  const { cartItems } = useCart();

  const totalCartQty = cartItems.reduce((sum, cartItem) => {
    return sum + parseFloat(cartItem.quantity);
  }, 0);cartItems
  
  // Resolve the params Promise
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = params; // Await the params promise
      setWorkflow(resolvedParams.workflow); // Set the workflow value
    }
    resolveParams();
  }, [params]);

  // Fetch products data
  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get('query') || '';
    setQuery(searchQuery);
    fetch(`http://localhost:3002/products/search-products?search=${query}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.product) {
          setProducts(result.product);
          setNoResult(false); // Set noResult to false if there are results to display to ensure that the no results text is not displayed
        } else {
          setNoResult(true); // Set noResult to true if no results are found to display appropriate text in the UI
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const backToCart = () => {
    const targetCartRoute = workflow === 'new' ? '/purchase-cart' : `/edit-purchase-request/${workflow}`; //Determine target route based on the workflow
    router.push(targetCartRoute); // Redirect dynamically to the correct cart
  };

  if (workflow === null) {
    return <SearchLoading />; //Render loading component while component is unresolved.
  }

  return (
    <div>
      <section className="flex flex-col px-6 py-4 gap-4">
        <h1>Search Results</h1>
        <div className="flex justify-between items-center">
          <ProductSearch workflow={workflow} width="[500px]" />
          <button onClick={backToCart}>
            <ShoppingCart size={30} className='relative' />
            <p className='absolute top-[155px] right-3 rounded-full bg-brand-primary text-white min-w-6 max-w-8'>{totalCartQty}</p>
          </button>
        </div>
      </section>
      <hr />
      <section className="px-6 py-4">
        <h2>{query}</h2>
        <p>
          {query
            ? `${products.length} items found for "${query}"`
            : `No search query entered. Showing all available items.`}
        </p>
      </section>
      <hr />
      <section className="py-4 px-6 grid grid-flow-row grid-cols-3 gap-6 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {noResult && <h2>No results found.</h2>}
      </section>
    </div>
  )
}

export default ProductSearchResults