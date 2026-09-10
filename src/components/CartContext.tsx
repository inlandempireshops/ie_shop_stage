"use client";
import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import { createShopifyCart, addToShopifyCart, 
  getLiveCart, removeFromShopifyCart, updateCartQuantity
} from "@/lib/shopifyFetch";
import { LiveCartResponseType } from "@/types/shopifyTypes";

type CartContextType = {
  cartId: string | null;
  cartData: LiveCartResponseType | null;
  loading: boolean;
  addItem: (variantId: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, currentQuantity: number, action: "increase" | "decrease") => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: {children: ReactNode}) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartData, setCartData] = useState<LiveCartResponseType | null>(null)
  const [loading, setLoading] = useState(false);

  // Check localStorage for active session
  useEffect(() => {
    const currentCartId = localStorage.getItem("cart_id");
    if(currentCartId) {
      setCartId(currentCartId)
    };
  }, [])

  // Fetch active cart
  useEffect(() => {
    if(cartId) {
      const fetchInitialCartData = async () => {
        try {
          const data = await getLiveCart(cartId);
          setCartData(data);
        } catch(err) {
          console.error("Failed loading initial cart data:", err);
        }
      };
      fetchInitialCartData();
    }
  }, [cartId])

  // Add new item
  const addItem = async (variantId: string) => {
    setLoading(true);
    try {
      const activeCartId = cartId || localStorage.getItem("cart_id");

      if(!activeCartId) {
        const newCart = await createShopifyCart(variantId);
        setCartId(newCart.id);
        localStorage.setItem("cart_id", newCart.id);

        // Get new cart line items
        const newCartData = await getLiveCart(newCart.id);
        setCartData(newCartData);
        return;
      } else {
        //Add item to existing cart
        await addToShopifyCart(activeCartId, variantId);

        // Fetch updated existing cart
        const updatedCartData = await getLiveCart(activeCartId);
        setCartData(updatedCartData);
      }

      
    } catch(error) {
      console.error("Failed processing item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove Item from cart
  const removeItem = async (lineId: string) => {
    if(!cartId) return;
    setLoading(true);

    try {
      await removeFromShopifyCart(cartId, lineId);

      const updatedRemovedData = await getLiveCart(cartId);
      setCartData(updatedRemovedData);
    } catch(err) {
      console.error("Failed to remove item from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Cart Quantity
  const updateQuantity = async (lineId: string, currentQuantity: number, action: "increase" | "decrease") => {
    if(!cartId) return;

    const newQuantity = action === "increase" ? currentQuantity + 1 : currentQuantity - 1;

    if(newQuantity <= 0) {
      removeItem(lineId);
      return;
    };

    setLoading(true);
    try {
      await updateCartQuantity(cartId, lineId, newQuantity);
      const updatedQuantityData = await getLiveCart(cartId);
      setCartData(updatedQuantityData);
    } catch(err) {
      console.error("Failed to update item quantity:", err);
    } finally {
      setLoading(false);
    }
  }

  return(
    <CartContext.Provider value={{ cartId, cartData, loading, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);
  if(!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}