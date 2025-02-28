"use client"

import React from 'react'
import { Search } from 'lucide-react'
import Form from 'next/form'

const ProductSearch = (props) => {
  return (
    <Form action="/search-results" className="flex items-center">
        <input name="query" type="text" placeholder="Search item" className={`bg-white px-2 py-1 rounded-l-md w-${props.width} border border-borderLine border-r-0`} />
        <button type="submit">
            <Search color="#FFF" size={34} className="bg-brand-secondary p-1 rounded-r-md"/>
        </button>
    </Form>
  )
}

export default ProductSearch