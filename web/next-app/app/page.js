import { Calendar } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

export default function Home() {
  const cardData = [
    {
      id: 1,
      title: 'Purchase Orders',
      icon: 'AllOrders',
      value: 106,
      weeklyIncrease: 6.53
    },
    {
      id: 2,
      title: 'Approved Requests',
      icon: 'ApprovedRequests',
      value: 50,
      weeklyIncrease: null
    },
    {
      id: 3,
      title: 'Denied Requests',
      icon: 'DeniedRequests',
      value: 25,
      weeklyIncrease: null
    },
    {
      id: 4,
      title: 'Pending Requests',
      icon: 'PendingRequests',
      value: 14,
      weeklyIncrease: null
    },
    {
      id: 5,
      title: 'Returned Requests',
      icon: 'ReturnedRequests',
      value: 20,
      weeklyIncrease: null
    }
  ]

  const requestCards = cardData.map(card => (
    <DashboardCard 
      key={card.id}
      {...card}
    />
  ))

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
        <section className='grid gap-4 grid-flow-col px-6'>
          {requestCards}
        </section>
      </main>
  );
}
