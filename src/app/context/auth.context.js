"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = React.createContext({});

export default function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [playerData, setPlayerData] = useState("");

  const storedToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticatePlayer = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get("http://localhost:5005/api/auth/verify", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const player = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setPlayer(player);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          setIsLoggedIn(false);
          setIsLoading(false);
          setPlayer(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setPlayer(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const logOutPlayer = () => {
    removeToken();
    authenticatePlayer();
  };

  const getPlayerData = () => {
    if (player) {
      const playerId = player._id;
      axios
        .get(`http://localhost:5005/api/players/${playerId}`)
        .then((response) => {
          console.log("Player data", response.data);
          setPlayerData(response.data);
        })
        .catch((error) => {
          console.log("Error fetching player data", error);
        });
    }
  };

  useEffect(() => {
    authenticatePlayer();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        player,
        storedToken,
        authenticatePlayer,
        logOutPlayer,
        getPlayerData,
        playerData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
