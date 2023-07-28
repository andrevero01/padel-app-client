"use client";
import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../../../components/ScrollToTop";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "@/app/context/leagues.context";
import { useParams } from "next/navigation";

export default function LeagueDetailsPage() {
  const [leagueDetails, setLeagueDetails] = useState(null);
  const { leagueId } = useParams();

  useEffect(() => {
    if (leagueId) {
      axios
        .get(`http://localhost:5005/api/leagues/${leagueId}`)
        .then((response) => {
          setLeagueDetails(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch league details:", error);
        });
    }
  }, [leagueId]);

  if (!leagueDetails) {
    return <div>Loading...</div>;
  }

  const sortedTeams = leagueDetails.teams
    .slice()
    .sort((a, b) => b.wins - a.wins);

  return (
    <div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-semibold">{leagueDetails.name}</h1>
        <p className="mt-2 text-gray-600">City: {leagueDetails.location}</p>
        <img
          className="mx-auto my-4 max-w-xs"
          src={leagueDetails.leagueLogo}
          alt={leagueDetails.name + " Logo"}
        />
      </div>
      <h2 className="mt-8 text-xl font-semibold">Teams</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Team Name</th>
            <th className="px-4 py-2">Wins</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <tr key={team._id}>
              <td className="border px-4 py-2">{team.name}</td>
              <td className="border px-4 py-2">{team.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ScrollToTopButton />
    </div>
  );
}
