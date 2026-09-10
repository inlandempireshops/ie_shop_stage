"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import whiteLogo from "~/public/images/white-ie-logo.png";
import { FaInstagram } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import { useCart } from "./CartContext";

export default function Header(): React.JSX.Element {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartId, cartData} = useCart();

  const cartQuantityCount = cartData?.lines?.edges?.reduce((acc, edge) => acc + edge.node.quantity, 0) || 0;

  return(
    <header id="product-header-container" className="header-container">
      <div id="product-header-wrapper" className="header-wrapper">
        <div 
          className="shopping-bag-container"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          {cartQuantityCount > 0 && 
            <div className="show-cart-total">{cartQuantityCount}</div>
          }
          <FiShoppingBag id="contact-cart-icon" className="header-cart-icon"/>
        </div>

        <Link href="/">
          <Image 
            id="header-logo"
            src={whiteLogo}
            alt="IE logo"
          />
        </Link>

        <a href="https://www.instagram.com/theie.shop" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-media-icon" />
        </a>
      </div>

      <Cart liveCartId={cartId} isOpen={isCartOpen} setIsOpen={setIsCartOpen}/>
    </header>
  )
}