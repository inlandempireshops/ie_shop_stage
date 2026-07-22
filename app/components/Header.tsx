import React from "react";
import Image from "next/image";
import Link from "next/link";
import whiteLogo from "@/public/images/white-ie-logo.png";
import { FaShoppingBag } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
export default function Header(): React.JSX.Element {
  return(
    <header id="header-container">
      <div id="header-wrapper" className="wrapper">
        <div id="nav-burger">
          <span className="burger-lines"></span>
          <span className="burger-lines"></span>
          <span className="burger-lines"></span>
        </div>
        <Link href="/">
          <Image 
          id="header-logo"
          src={whiteLogo}
          alt="IE logo"
          width="200"
          height="200"
          loading="eager"
          />
        </Link>
        <FiShoppingBag id="header-cart-icon"/>
      </div>
    </header>
  )
}