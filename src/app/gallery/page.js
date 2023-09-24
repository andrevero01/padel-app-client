"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";
import { FileUploadContext } from "../context/fileUpload.context";
import GalleryLogin from "../components/GalleryLogin";

export default function DisplayImages() {
  const { uploadedFile, setUploadedFile, uploadedFileURL, setUploadedFileURL } =
    useContext(FileUploadContext);
  const { isLoggedIn, player, logOutPlayer } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState();
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedFile(selectedFile);
  };

  const updateGallery = () => {
    axios.get("http://localhost:5005/api/s3/images").then((response) => {
      console.log("responsa data", response.data.images);
      setImages(response.data.images);
    });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSendClick = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/s3/url");
      const awsURL = response.data.uploadURL;
      console.log("awsURL", awsURL);

      await axios.put(awsURL, uploadedFile);

      console.log("uploadedFile", uploadedFile);
      setUploadedFileURL(uploadedFile);
      setMessage("File uploaded successfully!");
      updateGallery();
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setMessage("Failed to upload file.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/s3/images")
      .then((response) => {
        console.log("responsa data", response.data.images);
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const getImageURL = (imageName) => {
    return `http://localhost:5005/api/s3/image/${imageName}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-100 flex justify-center h-full drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className=" bg-white shadow-lg p-10 w-full md:w-3/4 mt-10 drawer-content">
        <h1 className="text-2xl text-primary-focus font-bold mb-10 text-center">
          Check out our gallery
        </h1>
        <Slider {...settings}>
          {images.map((imageName, index) => (
            <div key={index} className="h-96 md:h-80 lg:h-96">
              <div
                className="w-full h-96
             flex items-center justify-center"
              >
                <img
                  src={getImageURL(imageName)}
                  alt={`Image ${index + 1}`}
                  className="h-full object-contain rounded-lg"
                />
              </div>
              <p
                className="text-center mt-2"
                dangerouslySetInnerHTML={{ __html: imageName.text }}
              ></p>
            </div>
          ))}
        </Slider>

        <h3 className="mt-20 text-gray-500 ">Have some nice photos to add?</h3>
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-outline btn-success  w-1/4 text-white mb-4 mt-4 ml-2 "
        >
          Please log in first
        </label>
        {isLoggedIn && (
          <div className="flex flex-col items-center  ">
            <div className=" shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
              <p className="text-gray-600 mb-2">Upload file:</p>
              <input
                type="file"
                className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
                onChange={handleFileChange}
              />
              <input
                type="button"
                className="btn btn-primary 1/2 md:w-1/4 lg:w-1/4 text-white"
                onClick={handleSendClick}
                value={"Send"}
              />
              {message && <p className="text-green-600 mt-2">{message}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* Login sidebar */
}
{
  /* <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-200 h-full bg-neutral bg-opacity-90 text-white">
         
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div> */
}
