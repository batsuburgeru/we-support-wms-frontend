import React from 'react';
import { Search } from 'lucide-react';

const ProductSearch = (props) => {
  return (
    <form action={`/search-results/${props.workflow}`} method="get" className="flex items-center">
      <input
        name="query"
        type="text"
        placeholder="Search item or leave blank to show all items..."
        className={`bg-white px-2 py-1 rounded-l-md w-${props.width} border border-borderLine border-r-0`}
      />
      <button type="submit">
        <Search color="#FFF" size={34} className="bg-brand-secondary hover:bg-orange-600 active:bg-orange-700 colorTransition p-1 rounded-r-md" />
      </button>
    </form>
  );
};

export default ProductSearch;
