"use client";

import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { FileUploadContext } from "../context/fileUpload.context";

const FileUpload = () => {
  const { uploadedFile, setUploadedFile, uploadedFileURL, setUploadedFileURL } =
    useContext(FileUploadContext);
  const [message, setMessage] = useState();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedFile(selectedFile);
  };

  const handleSendClick = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/s3/url");
      const awsURL = response.data.uploadURL;
      console.log("awsURL", awsURL);

      // const formData = new FormData();
      // formData.append("file", file);

      await axios.put(awsURL, uploadedFile);
      //   {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      console.log("uploadedFile", uploadedFile);
      setUploadedFileURL(uploadedFile);
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setMessage("Failed to upload file.");
    }
  };

  return (
    <>
      <p>Upload file:</p>
      <input type="file" onChange={handleFileChange} />
      <input type="button" onClick={handleSendClick} value={"Send"} />
      {message && <p>{message}</p>}
    </>
  );
};

export default FileUpload;
