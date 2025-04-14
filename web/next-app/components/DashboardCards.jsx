"use client"

import DashboardCard from '@/components/DashboardCard';
import { useState, useEffect } from 'react'

const DashboardCards = () => {
    const [allArrayNum, setAllArrayNum] = useState(0);
    const [approvedArrayNum, setApprovedArrayNum] = useState(0);
    const [deniedArrayNum, setDeniedArrayNum] = useState(0);
    const [pendingArrayNum, setPendingArrayNum] = useState(0);
    const [returnedArrayNum, setReturnedArrayNum] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3002/purchaseRequests/read-purchase-requests", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
            if (result) {
            setAllArrayNum(result.length || 0);
            } else {
            console.log('Retrieve failed:', result.message);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
        }, []);

    useEffect(() => {
        fetch("http://localhost:3002/purchaseRequests/filter-purchase-requests?search=Approved", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
            if (result && result.data) {
            setApprovedArrayNum(result.data.length);
            } else {
            console.log('Retrieve failed:', result.message);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3002/purchaseRequests/filter-purchase-requests?search=Rejected", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
            if (result && result.data) {
            setDeniedArrayNum(result.data.length);
            } else {
            console.log('Retrieve failed:', result.message);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3002/purchaseRequests/filter-purchase-requests?search=Pending", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
            if (result && result.data) {
            setPendingArrayNum(result.data.length);
            } else {
            console.log('Retrieve failed:', result.message);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3002/purchaseRequests/filter-purchase-requests?search=Returned", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
            if (result && result.data) {
            setReturnedArrayNum(result.data.length);
            } else {
            console.log('Retrieve failed:', result.message);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }, []);

    const cardData = [
        {
          id: 1,
          title: 'Purchase Orders',
          icon: 'AllOrders',
          value: allArrayNum,
        },
        {
          id: 2,
          title: 'Approved Requests',
          icon: 'ApprovedRequests',
          value: approvedArrayNum,
        },
        {
          id: 3,
          title: 'Rejected Requests',
          icon: 'DeniedRequests',
          value: deniedArrayNum,
        },
        {
          id: 4,
          title: 'Pending Requests',
          icon: 'PendingRequests',
          value: pendingArrayNum,
        },
        {
          id: 5,
          title: 'Returned Requests',
          icon: 'ReturnedRequests',
          value: returnedArrayNum,
        }
    ]

    const requestCards = cardData.map(card => (
    <DashboardCard 
        key={card.id}
        {...card}
    />
    ))

    return (
        <div className='grid gap-4 grid-flow-col px-6'>
            {requestCards}
        </div>
    )
}

export default DashboardCards