"use client";
import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../../../components/ScrollToTop";
import axios from "axios";
import { useContext } from "react";
import { LeaguesContext } from "@/app/context/leagues.context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LeagueDetailsPage() {
  const [leagueDetails, setLeagueDetails] = useState(null);
  const { leagueId } = useParams();
  const router = useRouter();

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

  const sortedPlayers = leagueDetails.players

    .slice()
    .sort((a, b) => b.wins - a.wins);

  return (
    <div className="flex justify-center w-full items-center text-neutral h-screen">
      <div className="h-screen bg-gray-100 rounded-lg w-full mt-10 mb-10 box-border md:w-5/6 m-5 ">
        <div className="text-center mt-4">
          <h1 className="text-2xl font-semibold">{leagueDetails.name}</h1>
          <p className="mt-2 text-gray-600">City: {leagueDetails.location}</p>
          <img
            className="mx-auto my-4 max-w-xs"
            src={leagueDetails.leagueLogo}
            alt={leagueDetails.name + " Logo"}
          />
        </div>
        <table className="min-w-full mx-10 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Players</th>
              <th className="px-4 py-2">Wins</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr key={player._id}>
                <td className="border px-2 py-2 text-left border-none">
                  {player.firstName} {player.lastName}
                </td>
                <td className="border px-4 py-2 border-none">
                  {player.wins || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            className="m-10 text-secondary-focus"
            onClick={() => {
              router.push("/leagues");
            }}
          >
            Back to leagues
          </button>
        </div>
      </div>
    </div>
  );
}
