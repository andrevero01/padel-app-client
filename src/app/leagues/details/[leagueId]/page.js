"use client";

import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../../../components/ScrollToTop";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "@/app/context/leagues.context";
import { useParams } from "next/navigation";

export default function leagueDetailsPage() {
  const [leagueDetails, setLeagueDetails] = useState(null);
  const { leagueId } = useParams();
  console.log("league id", leagueId);

  useEffect(() => {
    if (leagueId) {
      axios
        .get(`http://localhost:5005/api/leagues/${leagueId}`)
        .then((response) => {
          setLeagueDetails(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Failed to delete league:", error);
        });
    }
  }, [leagueId]);

  if (!leagueId) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ScrollToTopButton />
    </div>
  );
}
