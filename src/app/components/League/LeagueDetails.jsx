import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "@/app/context/leagues.context";
import Link from "next/link";
import { useRouter } from "next/router";

const LeagueDetails = ({ leagueId }) => {
  const router = useRouter();
  const { getLeagueDetails, selectedLeague } = useContext(LeaguesContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/leagues/${leagueId}`)
      .then((response) => {
        const league = response.data;
        setLeagueDetails(league);
      })
      .catch((error) => {
        console.error("Failed to fetch league details", error);
      });
  }, [leagueId]);

  const handleClick = () => {
    console.log(selectedLeague);
  };

  return (
    <>
      <button
        className="btn btn-primary mt-2 ml-2 w-1/2"
        onClick={() => {
          // getLeagueDetails(leagueId);
          // router.push(`/leagues/details/${leagueId}`);
        }}
      >
        View details
      </button>
    </>
  );
};

export default LeagueDetails;
