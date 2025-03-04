import React from 'react';
import ProductSearch from '@/components/ProductSearch';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const NewPurchase = () => {
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
    </main>
  );
}

export default NewPurchase;
