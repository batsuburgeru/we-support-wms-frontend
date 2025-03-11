import { Calendar } from 'lucide-react';
import DashboardCards from '@/components/DashboardCards';

export default function Dashboard() {
  return (
      <main className="bg-dashboard h-screen">
        <div className='px-6 flex items-center py-4'>
          <h1>Dashboard</h1>
        </div>
        <hr className='border-borderLine'/>
        <div className='px-6 flex items-center py-6'>
          <h2 className='font-medium text-sm'>Time Range</h2>
          <button className='flex items-center bg-white border border-borderLine px-5 py-2 rounded-md ml-2 gap-1 text-sm'>
            <Calendar color="#282828" size={20} />
            Today
          </button>
        </div>
        <section>
          <DashboardCards />
        </section>
      </main>
  );
}
