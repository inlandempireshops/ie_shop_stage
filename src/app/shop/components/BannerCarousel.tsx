"use client";
import { useEffect, useState, JSX, useRef } from "react";
import { bannerImages } from "@/data/banner-images";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";

export default function BannerCarousel({ autoSlide = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const isMoving = useRef<boolean>(false);

  // Array of cloned banner images
  const extendSlides = [
    bannerImages[bannerImages.length - 1],
    ...bannerImages,
    bannerImages[0]
  ]

  function handleTransitionEnd() {
    isMoving.current = false;

    if(currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(bannerImages.length);
    } else if(currentIndex === extendSlides.length - 1){
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  }
  
  // Turn tranisition back on
  useEffect(() => {
    if(!isTransitioning) {
      const carouselTimeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 20);
      return () => clearTimeout(carouselTimeout);
    }
  }, [isTransitioning])

  // Slider functions
  function prevSlide() {
    if (isMoving.current) return;
    isMoving.current = true;
    setCurrentIndex((prevIndex) => prevIndex - 1)
  }

  function nextSlide() {
    if (isMoving.current) return;
    isMoving.current = true;
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  
  // Auto slide function
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      nextSlide()
    }, autoSlide);

    return () => clearInterval(carouselInterval)
  }, [autoSlide])

  // Model images
  const bannerImgs = extendSlides.map((image, index) => {
    return(
      <div className="images-container" key={index}>
        <Image
          src={image.src}
          alt={image.alt}
          id={`banner-image-${image.id}`}
          className="banner-image"
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  });

  return(
    <>
      <div 
        className="carousel-track"
        onTransitionEnd={handleTransitionEnd}
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`, 
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none"
        }}
      >
        {bannerImgs}
      </div>

      <div className="carousel-btn-container">
        <button 
          className="banner-prev-slide"
          onClick={prevSlide}
          >
          <GoChevronLeft />
        </button>
        <button 
          className="banner-next-slide"
          onClick={nextSlide}
          >
          <GoChevronRight />
        </button>
      </div>
    </>
  )
}