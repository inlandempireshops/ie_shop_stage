"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import whiteLogo from "~/public/images/white-ie-logo.png";
import splashImage from "~/public/images/splash-image.png";

export default function Home() {
  const [isSplashActive, setIsSplashActive] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashActive(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <main className={`main-hero-content ${isSplashActive ? "splash-mode" : "hero-mode" }`}>
      <section id="hero">
        <div id="hero-content-container">
          <div id="hero-logo-container">
            <Image
              src={whiteLogo}
              alt="white ie shops logo"
              id="hero-logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
            />
          </div>
          <p id="hero-headline">
            The Official Mark
            of the
            Inland Empire
          </p>
        </div>
        <div className="bottom-container">
          { isSplashActive ? <div className="splash-image-container">
            <Image 
              src={splashImage}
              alt="image of splash model"
              priority
              className="splash-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div> : 
          <div className="home-buttons">
            <Link 
              href={`/shop`}
              id="shop-btn" 
              className="link-btn"
            >
              Shop
            </Link>
            <Link 
              href={`/contact`}
              id="contact-btn" 
              className="link-btn"
            >
              Contact
            </Link>
          </div>}
        </div>
      </section>
    </main>
  );
}