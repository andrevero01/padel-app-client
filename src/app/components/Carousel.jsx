"use client";
import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel rounded-box relative overflow-hidden w-full">
      <div className="carousel-wrapper flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {/* Image items */}
        {images.map((image, index) => (
          <div className={`carousel-item w-full`} key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      <div className="carousel-controls absolute top-1/2 left-0 right-0 flex justify-center">
        <button className="carousel-control" onClick={prevSlide}>Previous</button>
        <button className="carousel-control" onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;