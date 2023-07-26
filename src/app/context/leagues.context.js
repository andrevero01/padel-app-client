"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";

// export const LeaguesContext = React.createContext({});

export const LeaguesContext = createContext({
  leagues: [],
  updateLeagues: () => {},
});

export default function LeaguesProviderWrapper({ children }) {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    updateLeagues(); // Initial data fetch
  }, []);

  const updateLeagues = () => {
    axios
      .get("https://misty-stole-lamb.cyclic.app/api/leagues")
      .then((response) => {
        console.log("Leagues data", response.data);
        setLeagues(response.data);
      });
  };
  // useEffect(() => {
  //   axios.get("https://misty-stole-lamb.cyclic.app/api/leagues").then((response) => {
  //     console.log("Leagues data", response.data);
  //     setLeagues(response.data);
  //   });
  // }, []);

  return (
    <LeaguesContext.Provider
      value={{
        leagues,
        updateLeagues,
      }}
    >
      {children}
    </LeaguesContext.Provider>
  );
}
