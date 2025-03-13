import React from 'react'

const StockList = (props) => {
  return (
    <div className='flex justify-between'>
        <p className='font-medium'>{props.name}</p>
        <p className='text-brand-primary font-semibold'>{props.stock_quantity}</p>
    </div>
  )
}

export default StockList