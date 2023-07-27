"use client";

import axios from "axios";
import React, { useState } from "react";

export default function SendAWS() {
  const [message, setMessage] = useState();
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSendClick = async () => {
    try {
      // Make a request to your API to get the AWS URL
      const response = await axios.get("http://localhost:5005/api/s3/url");
      const awsURL = response.data.uploadURL; // Assuming the response contains the uploadURL
      console.log(awsURL);

      // Upload the selected file to AWS using the obtained URL
      await axios.put(awsURL, file);
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
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
}
