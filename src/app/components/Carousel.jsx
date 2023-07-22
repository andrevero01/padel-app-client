"use client";

import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel rounded-box relative">
      {/* Previous arrow button  */}
      <button
        className="carousel-arrow left absolute top-1/2 transform -translate-y-1/2 left-2 z-10"
        onClick={goToPreviousImage}
      ></button>
      {/* Image items */}
      {images.map((image, index) => (
        <div
          className={`carousel-item w-1/4 mx-2 ${
            index === currentImageIndex ? "active" : ""
          }`}
          key={index}
        >
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
      {/* Next arrow button */}
      <button
        className="carousel-arrow right absolute top-1/2 transform -translate-y-1/2 right-2 z-10"
        onClick={goToNextImage}
      ></button>
    </div>
  );
};

export default Carousel;
