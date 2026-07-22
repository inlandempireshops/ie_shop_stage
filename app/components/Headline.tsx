"use client";
import React from "react";
import {useState} from "react";
import Image from "next/image";
import {headlineImgs} from "../data/headline-images";


export default function Headline(): React.JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = currentImageIndex === 0 ? headlineImgs.length - 1 : currentImageIndex - 1;
  const nextImage = currentImageIndex === headlineImgs.length - 1 ? 0 : currentImageIndex + 1;

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (
      prev === 0 ? headlineImgs.length - 1 : prev - 1
    ));
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (
      prev === headlineImgs.length - 1 ? 0 : prev + 1
    ));
  }
  return(
    <section id="headline">
      <div id="headline-wrapper" className="wrapper">
        <h1 
          className="headlines"
          id="headline-title"
        >
          HEADLINE MESSAGE HERE
        </h1>
        <div id="headline-image-carousel">
          <div id="prev-side-image" className="headline-image-container">
            <Image
              src={headlineImgs[prevImage].src}
              alt="group of people wearing green ie shop hats"
              className="headline-images"
              placeholder="blur"
            />
          </div>
          <div id="middle-image" className="headline-image-container">
            <Image
              src={headlineImgs[currentImageIndex].src}
              alt="group of people wearing green ie shop hats"
              className="headline-images"
              placeholder="blur"
            />
          </div>
          <div id="next-side-image" className="headline-image-container">
            <Image
              src={headlineImgs[nextImage].src}
              alt="group of people wearing green ie shop hats"
              className="headline-images"
              placeholder="blur"
            />
          </div>
          <button 
            className="headline-carousel-button" 
            id="prev-image-button" 
            onClick={handlePrevImage}
          >
            Prev
          </button>
          <button 
            className="headline-carousel-button"
            id="next-image-button" 
            onClick={handleNextImage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}