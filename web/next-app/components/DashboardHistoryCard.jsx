import React from 'react';
import { PurchaseTable } from '@/components/DataTable';

const DashboardHistoryCard = () => {
  return (
    <div>
        <h2 className='font-medium text-lg mb-3'>Transaction History</h2>
        <PurchaseTable
          tableFor="dashboard"
        />
    </div>
  )
}

export default DashboardHistoryCard