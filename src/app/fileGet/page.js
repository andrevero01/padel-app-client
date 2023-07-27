"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch all image keys from the API
    axios
      .get("http://localhost:5005/api/s3/images")
      .then((response) => {
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const getImageURL = (imageName) => {
    return `http://localhost:5005/api/s3/image/${imageName}`;
  };

  return (
    <>
      <h2>All Images from AWS S3</h2>
      <div>
        {images.map((imageName, index) => (
          <img
            key={index}
            src={getImageURL(imageName)}
            alt={`AWS S3 Image ${index}`}
            style={{ maxWidth: "200px", margin: "10px" }}
          />
        ))}
      </div>
    </>
  );
}
