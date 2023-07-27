"use client";

import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { FileUploadContext } from "../context/fileUpload.context";

const FileUpload = () => {
  const { uploadedFile, setUploadedFile, setUploadedFileURL } =
    useContext(FileUploadContext);
  const [message, setMessage] = useState();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setUploadedFile(selectedFile);
  };

  const handleSendClick = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/s3/url");
      const awsURL = response.data.uploadURL;
      console.log(awsURL);

      const formData = new FormData();
      formData.append("file", file);

      await axios.put(awsURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("File uploaded successfully!");
      return awsURL;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setMessage("Failed to upload file.");
    }
  };

  return (
    <>
      <p>Upload file:</p>
      <input type="file" onChange={handleFileChange} />
      <input type="button" value={"Send"} onClick={handleSendClick} />
      {message && <p>{message}</p>}
    </>
  );
};

export default FileUpload;
