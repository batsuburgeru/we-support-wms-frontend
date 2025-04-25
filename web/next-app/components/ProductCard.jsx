import React from "react";
import { useCart } from "@/context/CartContext";
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

const ProductCard = (props) => {
  toastConfig({
    theme: 'dark',
  });

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    toast('Item added to cart!', { maxVisibleToasts: 1 });
    addToCart({
      id: props.id,
      name: props.name,
      unit_price: props.unit_price,
      unit: "Pcs"
    });
  };

  return (
    <div className="border border-borderLine rounded-2xl p-4 w-[238px] flex-col flex justify-between">
      <img src={`http://localhost:3002${props.img_url}`} className="w-full h-40 object-contain" />
      <h1 className="text-lg mt-2 text-ellipsis overflow-hidden txtOverflow">{props.name}</h1>
      <p className="text-sm text-neutral-500 text-ellipsis overflow-hidden txtOverflow">{props.description}</p>
      <h2 className="py-2 font-medium">₱{props.unit_price}</h2>
      <hr />
      <button
        className="font-bold bg-brand-primary colorTransition hover:bg-orange-700 active:bg-orange-800 text-white w-full py-2 rounded-full mt-4"
        onClick={handleAddToCart}
      >
        Add
      </button>
    </div>
  );
};

export default ProductCard;
