"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "../../context/leagues.context.js";

const JoinLeague = ({ leagueId, playerId }) => {
  const { updateLeagues } = useContext(LeaguesContext);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleJoinLeague = async () => {
    try {
      const response = await axios.post(
        `https://misty-stole-lamb.cyclic.app/api/leagues/${leagueId}/join`,
        { playerId }
      );
      setMessage("Your are now part of this league");
      console.log("joined league");
      updateLeagues();
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

  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        setMessage("");
        setErrorMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, errorMessage]);

  return (
    <>
      <button
        onClick={handleJoinLeague}
        className="btn btn-secondary w-2/3 text-white mb-4 ml-2"
      >
        Join
      </button>
      {message ? (
        <p className="text-success font-semibold text-center mr-2 mb-2">
          {message}
        </p>
      ) : errorMessage ? (
        <p className="text-error font-semibold text-center mr-2 mb-2">
          {errorMessage}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default JoinLeague;
