"use client";
import React, { useState } from "react";
import { createContext } from "react";

export const FileUploadContext = createContext();

export default function FileUploadProviderWrapper({ children }) {
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadedFileURL, setUploadedFileURL] = useState();

  return (
    <FileUploadContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
        uploadedFileURL,
        setUploadedFileURL,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
}
