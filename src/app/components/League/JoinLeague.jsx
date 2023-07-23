"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth.context";

const JoinLeague = ({ leagueId, playerId }) => {
  const handleJoinLeague = () => {
    axios
      .post(`http://localhost:5005/api/leagues/${leagueId}/join`, { playerId })
      .then(() => {
        // setIsLoading(false);

        console.log("joined league");
      })
      .catch((error) => {
        console.error("Failed to retrieve league:", error.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleJoinLeague}
        className="btn btn-secondary text-white mb-4 ml-2"
      >
        Join
      </button>
    </div>
  );
};

export default JoinLeague;
