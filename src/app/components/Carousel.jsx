"use client";

import React, { useState } from "react";

const Carousel = ({ images }) => {
  return (
    <div className="carousel rounded-box relative">
      {/* Image items */}
      {images.map((image, index) => (
        <div className={`carousel-item w-1/4 mx-2 `} key={index}>
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
