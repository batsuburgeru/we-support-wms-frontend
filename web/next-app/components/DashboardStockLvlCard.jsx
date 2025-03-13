"use client"

import React from 'react';
import StockList from '@/components/StockList';

const DashboardStockLvlCard = () => {
    const [data, setData] = React.useState([]);
      
    React.useEffect(() => {
    fetch("http://localhost:3002/products/view-products", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.data) {
        setData(result.data);
        } else {
        console.log('Retrieve failed:', result.message);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
    }, []);

    const listedStock = data.map((item) =>(
        <StockList
            key={item.id}
            {...item}
        />
    ))

    const [totalStock, setTotalStock] = React.useState(0);
    
    React.useEffect(() => {
        const calculateTotalStock = () => {
            let total = 0;
            data.forEach(item => {
                total += item.stock_quantity;
            });
            setTotalStock(total);
        };

        calculateTotalStock();
    }, [data]);
    
    return (
        <div>
            <h2 className='font-medium text-lg mb-3'>Stock Level</h2>
            <h3 className='text-sm text-neutral-400'>Total Stock</h3>
            <p className='font-semibold text-xl mb-3'>{totalStock}</p>
            <div>
                {listedStock}
            </div>
        </div>
    )
}

export default DashboardStockLvlCard