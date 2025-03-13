import React from 'react';
import { PurchaseTable } from '@/components/PurchaseTable';

const DashboardHistoryCard = () => {
  return (
    <div>
        <h2 className='font-medium text-lg mb-3'>Transaction History</h2>
        <PurchaseTable />
    </div>
  )
}

export default DashboardHistoryCard