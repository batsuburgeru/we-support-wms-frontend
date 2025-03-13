'use client'; 

import React, { useState, useEffect } from 'react';
import ProductSearch from '@/components/ProductSearch';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 

const SearchResults = () => {
  const searchParams = useSearchParams(); 
  const query = searchParams?.get('query') || '';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3002/products/search-products?search=${query}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data) {
          setUsers(result.data);
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
          <Link href="/purchase-cart">
            <ShoppingCart size={30} />
          </Link>
        </div>
      </section>
      <hr />
      <section className="px-6 flex items-end justify-between py-4">
        <div>
          <h2>{query}</h2>
          <p>{users.length} items found for "{query}"</p>
        </div>
        <div>
          <p>Sort by:</p>
        </div>
      </section>
      <hr />
      <section className="py-4 px-6 grid grid-flow-row grid-cols-3 gap-6 xl:grid-cols-4 2xl:grid-cols-5">
        {users.map((user) => (
          <ProductCard key={user.id} {...user} />
        ))}
      </section>
    </main>
  );
};

export default SearchResults;
