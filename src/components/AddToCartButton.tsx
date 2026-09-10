"use client";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

type AddToCartProps = {
  variantId: string | undefined;
  disabled?: boolean;
};

export default function AddToCartButton({ variantId, disabled }: AddToCartProps) {
  const {addItem, loading} = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [success, setSucces] = useState(false);

  const handleAddToCartClick = async () => {
    if(!variantId) return;

    setIsAdding(true);
    try {
      await addItem(variantId);
      setSucces(true);
      
      setTimeout(() => {
        setSucces(false);
      }, 2000);
    } catch(error) {
      console.error(error);
      alert("Failed to update cart session");
    } finally {
      setIsAdding(false);
    }
  };
  
  return(
    <button 
      className={`add-to-cart ${success ? "bg-green-600" : ""}`}
      onClick={handleAddToCartClick}
      disabled={isAdding || disabled || !variantId}
    >
      {isAdding ? "Adding..." : success ? "✓ Added!" : "Add to Cart"}
    </button>
  )
};