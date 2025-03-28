'use client'; 

import React, { useState, useEffect } from 'react';
import ProductSearch from '@/components/ProductSearch';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; 

const SearchResults = () => {
  const searchParams = useSearchParams(); 
  const query = searchParams?.get('query') || '';
  const [products, setProducts] = useState([]);
  const router = useRouter(); // Use this hook to navigate

  useEffect(() => {
    fetch(`http://localhost:3002/products/search-products?search=${query}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.product) {
          setProducts(result.product);
        } else {
          console.error('Retrieve failed:', result.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [query]); 

  return (
    <main>
      <section className="flex flex-col px-6 py-4 gap-4">
        <h1>Search Results</h1>
        <div className="flex justify-between items-center">
          <ProductSearch width="[500px]" />
          <button onClick={() => router.back()}> {/* Use router.back() here */}
            <ShoppingCart size={30} />
          </button>
        </div>
      </section>
      <hr />
      <section className="px-6 py-4">
          <h2>{query}</h2>
          <p>{products.length} items found for "{query}"</p>
      </section>
      <hr />
      <section className="py-4 px-6 grid grid-flow-row grid-cols-3 gap-6 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </main>
  );
};

export default SearchResults;
