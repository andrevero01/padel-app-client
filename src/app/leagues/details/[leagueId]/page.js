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

  console.log(leagueDetails);

  // Compare player IDs
  const comparePlayerIDs = (leagueDetails) => {
    const allPlayers = leagueDetails.players.map((player) => player._id);
    const commonPlayers = new Set(allPlayers);
    return commonPlayers;
  };

  const checkGamesWonBetweenPlayers = (leagueDetails, commonPlayers) => {
    leagueDetails.players.forEach((player) => {
      player.wins = 0;
    });

    leagueDetails.players.forEach((player) => {
      if (player.gamesWon && Array.isArray(player.gamesWon)) {
        player.wins = player.gamesWon.length;
      }
    });
  };

  if (!leagueDetails) {
    return <div>Loading...</div>;
  }

  const commonPlayers = comparePlayerIDs(leagueDetails);
  checkGamesWonBetweenPlayers(leagueDetails, commonPlayers);

  const sortedPlayers = leagueDetails.players.slice().sort((a, b) => b.wins - a.wins);

  return (
    <div>
      {/* ... (existing JSX code) */}
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Players</th>
            <th className="px-4 py-2">Wins</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player) => (
            <tr key={player._id}>
              <td className="border px-4 py-2">
                {player.firstName} {player.lastName}
              </td>
              <td className="border px-4 py-2">{player.wins || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ... (existing JSX code) */}
    </div>
  );
}