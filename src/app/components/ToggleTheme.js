"use client";

import { useContext } from "react";
import { ThemeContext } from "../context/darkTheme.context";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg"
      onClick={toggleTheme}
    >
      {theme === "light" ? "dark " : "light "}
    </button>
  );
};

export default ThemeToggle;
