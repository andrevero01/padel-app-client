"use client";

import React, { createContext, useContext, useState } from "react";

export const FileUploadContext = createContext();

export default function FileUploadProviderWrapper({ children }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(null);

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
