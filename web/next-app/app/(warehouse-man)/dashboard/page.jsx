import DashboardCards from '@/components/DashboardCards';
import DashboardStockLvlCard from '@/components/DashboardStockLvlCard';
import DashboardUpcomingRestockCard from '@/components/DashboardUpcomingRestockCard';
import DashboardHistoryCard from '@/components/DashboardHistoryCard';

export default function Dashboard() {
  return (
      <main className="bg-dashboard h-fit">
        <div className='px-6 flex items-center py-4'>
          <h1>Dashboard</h1>
        </div>
        <hr className='border-borderLine'/>
        <section className='py-6'>
          <DashboardCards />
          <div className='grid grid-flow-row grid-cols-5 mt-4 px-6 gap-4'>
            <div className='bg-white rounded-2xl p-4 2xl:p-6 col-span-2'>
              <DashboardStockLvlCard />
            </div>
            <div className='bg-white rounded-2xl p-4 2xl:p-6 col-span-3'>
              <DashboardUpcomingRestockCard />
            </div>
            <div className='bg-white rounded-2xl p-4 2xl:p-6 col-span-5'>
              <DashboardHistoryCard />
            </div>
          </div>
        </section>
      </main>
  );
}
