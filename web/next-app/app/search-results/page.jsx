import React from 'react';
import ProductSearch from '@/components/ProductSearch';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const searchResults = async ({ searchParams }) => {
  const query = searchParams.query || '';
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase()) ||
    user.phone.includes(query)
  );

  const filteredCards = filteredUsers.map((user) => (
    <ProductCard 
      key={user.id} 
      {...user}
    />
  ))

  return (
    <main>
      <section className='flex flex-col px-6 py-4 gap-4'>
        <h1>New Purchase Requisition</h1>
        <div className='flex justify-between items-center'>
          <ProductSearch width={'[500px]'}/>
          <Link href="/purchase-cart">
            <ShoppingCart size={30} />
          </Link>
        </div>
      </section>
      <hr />
      <section className='px-6 flex items-end justify-between py-4'>
        <div>
          <h2>{query}</h2>
          <p>20 items found for "{query}"</p>
        </div>
        <div>
          <p>Sort by:</p>
        </div>
      </section>
      <hr />
      <section className='py-4 px-6 grid grid-flow-row grid-cols-3 gap-6 xl:grid-cols-4 2xl:grid-cols-5'>
        {filteredCards}
      </section>
    </main>
  );
}

export default searchResults;
