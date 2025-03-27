"use client"

import React from 'react'

const DashboardUpcomingRestockCard = () => {
  const [data, setData] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(5);
  
  React.useEffect(() => {
    fetch("http://localhost:3002/purchaseRequests/read-purchase-requests", {
      method: "GET",
      credentials: "include", // Ensures cookies are included
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          // Transform the data to extract product_id and quantity from prItems
          const transformedData = result.flatMap((item) =>
            item.prItems.map((prItem) => ({
              id: prItem.id,
              product_name: prItem.product_name,
              quantity: prItem.quantity,
            }))
          );
          const combinedData = Array.from(
            transformedData.reduce((map, item) => {
              if (!map.has(item.product_name)) {
                map.set(item.product_name, { product_name: item.product_name, quantity: 0 });
              }
              map.get(item.product_name).quantity += item.quantity;
              return map;
            }, new Map()).values()
          );
          
          setData(combinedData);
        } else {
          console.log("Retrieve failed:", result.message);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const listOfRestock = data.map((listItem, index) => (
    <li key={listItem.product_name} className={`${index >= visibleCount ? "hidden" : "block"} py-1 border-b border-gray-200 flex justify-between`}>
      <span>{listItem.product_name}</span>
      <span className='font-semibold'>{listItem.quantity}</span>
    </li>
  ))

  function toggleList() {
    setExpanded(prevState => !prevState);
    setVisibleCount(expanded ? 5 : data.length);
  }
  
  return (
    <div>
      <h2 className='font-medium text-lg mb-3'>Upcoming Restocks</h2>
      <ul className=''>
        {listOfRestock}
      </ul>
      <div className='flex justify-center'>
        {data.length > 5 && <button 
          className='bg-brand-secondary hover:bg-orange-600 active:bg-orange-700 colorTransition px-2 py-1 rounded-md text-white mt-4'
          onClick={toggleList}
        >
          {`Show ${expanded ? 'Less' : 'All'}`}
        </button>}
      </div>
    </div>
  )
}

export default DashboardUpcomingRestockCard