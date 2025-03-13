import Link from 'next/link';

export default function Home() {
  

  return (
      <main className="bg-dashboard h-screen flex justify-center items-center">
        <Link href="/login" className='bg-brand-primary px-4 py-1 rounded-md text-white'>Proceed to login</Link>
      </main>
  );
}
