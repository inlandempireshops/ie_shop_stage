import { useState, useEffect } from "react";
import { getLiveCart } from "@/lib/shopifyFetch";
import { useCart } from "./CartContext";
import { LiveCartResponseType } from "@/types/shopifyTypes";
import Image from "next/image";
import Link from "next/link";
import ieBlackLogo from "~/public/images/black-ie-logo.png";
import { BsFillTrash2Fill } from "react-icons/bs";
import { formatPrice } from "@/lib/utils";


export default function Cart({liveCartId, isOpen, setIsOpen}: {liveCartId: string | null; isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;}) {
  const {cartData, loading, removeItem, updateQuantity} = useCart();

  const allCartItems = cartData?.lines?.edges || [];

  const displayItems = allCartItems?.map((item) => {
    const node = item?.node;
    const imageUrl = node?.merchandise?.image?.url || ieBlackLogo;
    const imageAlt = node?.merchandise?.image?.altText || "Product Image";
    return(
      <div className="cart-item-container" key={item.node.id}>
        <div className="remove-item-container">
          <button className="remove-item-btn" onClick={() => removeItem(item.node.id)}>
            <BsFillTrash2Fill className="remove-item-icon"/>
          </button>
        </div>
        <div className="cart-item-image-container">
          <Image 
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="cart-item-image"
          />
        </div>
        <div className="cart-item-info">
          <div className="cart-item-title-container">
            <p className="cart-item-title">{`${node.merchandise.product.title}`} </p>
            <p className="cart-item-variant-title">{`(${node.merchandise.title})`}</p>
          </div>
          <div className="price-container">
            <p className="cart-item-price">
              {formatPrice(node.cost.totalAmount.amount, node.cost.totalAmount.currencyCode)}
            </p>
          </div>
          <div className="cart-item-quantity-container">
            <button 
              className="subtract-item-quantity"
              onClick={() => updateQuantity(item.node.id, node.quantity, "decrease")}
            >
              -
            </button>
            <p className="cart-item-quantity">{node.quantity}</p>
            <button 
              className="add-item-quantity"
              onClick={() => updateQuantity(item.node.id, node.quantity, "increase")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  });

  const subtotal = cartData?.cost.totalAmount;
  return(
    <div className={`cart ${isOpen ? "active" : ""}`}>
      <div className="exit-cart-container">
        <button 
          id="exit-cart"
          onClick={() => setIsOpen(false)}
        >
          x
        </button>
      </div>
      <h3 className="cart-header">Your Cart</h3>

      {!liveCartId || allCartItems.length === 0 ? 
        <div className="empty-cart-container">
          <p className="empty-cart-message">Cart is empty</p>
        </div>
       : 
        <div className="cart-items-container">
          {displayItems}
        </div>
      }

      {liveCartId && cartData?.checkoutUrl && allCartItems.length > 0 &&
        <div className="cart-totals-container">
          <div className="subtotal-container">
            <h4 className="subtotal-header">Subtotal:</h4>
            <p className="subtotal">{subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode): "$0.00"}</p>
          </div>
          <Link 
            href={`${cartData.checkoutUrl}&channel=headless-storefronts`}
            id="checkout-btn"
          >
            Checkout
          </Link>
        </div>
      }
    </div>
  )
}