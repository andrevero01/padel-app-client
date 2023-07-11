"use client";

import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10 flex justify-end">
      <button
        className="btn rounded-full"
        onClick={scrollToTop}
        style={{ display: isVisible ? "inline-block" : "none" }}
      >
        <div>⬆️</div>
        <div>Back to top</div>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
