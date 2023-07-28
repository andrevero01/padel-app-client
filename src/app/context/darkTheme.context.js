"use client";

import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProviderWrapper({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
