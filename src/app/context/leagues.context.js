"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";

export const LeaguesContext = React.createContext({});

export default function LeaguesProviderWrapper({ children }) {
  const [leagues, setLeagues] = useState([]);
  // const [selectedLeague, setSelectedLeague] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5005/api/leagues").then((response) => {
      console.log("Leagues data", response.data);
      setLeagues(response.data);
    });
  }, []);

  return (
    <LeaguesContext.Provider
      value={{
        leagues,
        // getLeagueDetails,
        // selectedLeague,
      }}
    >
      {children}
    </LeaguesContext.Provider>
  );
}
