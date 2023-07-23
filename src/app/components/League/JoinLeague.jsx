"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth.context";
import { useRouter } from "next/navigation";

const JoinLeague = ({ leagueId, playerId }) => {
  const { playerData, getPlayerData, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleJoinLeague = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5005/api/leagues/${leagueId}/join`,
        { playerId }
      );
      setMessage("Your are now part of this league");
      console.log("joined league");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("League registration is closed.");
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("You are already a member of this league.");
      } else {
        setErrorMessage("An error occurred while joining the league.");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleJoinLeague}
        className="btn btn-secondary w-2/3 text-white mb-4 ml-2"
      >
        Join
      </button>
      {message ? (
        <p className="text-orange-600 font-semibold text-center mr-2">
          {message}
        </p>
      ) : errorMessage ? (
        <p className="text-orange-600 font-semibold text-center mr-2">
          {errorMessage}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default JoinLeague;
