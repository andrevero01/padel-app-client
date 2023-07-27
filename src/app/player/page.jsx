"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import racket from "../../../public/racket.png";
import trophy from "../../../public/trophy.png";
import team from "../../../public/team.png";
import cogs from "../../../public/cogs.png";
import Sidebar from "@/app/components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useRouter } from "next/navigation";

const Last5 = lazy(() => import("../components/Player/Last5"));
const Doubles = lazy(() => import("../components/Player/Doubles"));
const MixedDoubles = lazy(() => import("../components/Player/MixedDoubles"));
const Singles = lazy(() => import("../components/Player/Singles"));
const TeamMates = lazy(() => import("../components/Player/TeamMates"));

const Page = () => {
  const { playerData, getPlayerData, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [winningStreak, setWinningStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      getPlayerData();
    }
  }, []);

  useEffect(() => {
    if (playerData && playerData.games) {
      let currentStreak = 0;
      let longestStreak = 0;

      for (const game of playerData.games) {
        const userTeam = game.teams.find((team) =>
          team.players.some((player) => player._id === playerData._id)
        );

        if (userTeam.winner) {
          currentStreak += 1;
          longestStreak = Math.max(currentStreak, longestStreak);
        } else {
          currentStreak = 0;
        }
      }

      setWinningStreak(longestStreak);
      setIsLoading(false); // Set loading to false once the data is fetched
    }
  }, [playerData]);

  console.log(playerData)

  return (
    <div className="flex justify-evenly h-full">
      <Sidebar />

      <div className="md:mb-10 h-full grow">
        {/* Title */}

        <div className="flex justify-between">
          <Link href="/settings">
            <img
              src={cogs.src}
              alt="Cogs Icon"
              className="max-h-7 mr-3 mt-1 md:hidden"
            />
          </Link>
        </div>

        {/* Buttons */}

        <div className="flex justify-between md:justify-center mx-3">
          <Link
            href="/createGame"
            className="bg-primary w-2/5 md:w-40 rounded-lg py-3 my-5 max-w-100 flex flex-col justify-center items-center md:grow-0 mr-3"
          >
            <button className="flex flex-col justify-center items-center">
              <img
                src={racket.src}
                alt="Racket Icon"
                className="max-h-10 my-1"
              />
              Log Game
            </button>
          </Link>
          <Link
            href="/leagues"
            className="bg-primary w-2/5 md:w-40 rounded-lg py-3 my-5 max-w-100 flex flex-col justify-center items-center md:grow-0"
          >
            <button className="flex flex-col justify-center items-center">
              <img
                src={trophy.src}
                alt="Trophy Icon"
                className="max-h-10 my-1"
              />
              Find a League
            </button>
          </Link>
          <Link
            href="/teams"
            className="bg-primary w-2/5 md:w-40 rounded-lg py-3 my-5 max-w-100 flex flex-col justify-center items-center md:grow-0 ml-3"
          >
            <button className="flex flex-col justify-center items-center">
              <img src={team.src} alt="Trophy Icon" className="max-h-10 my-1" />
              Find a Team
            </button>
          </Link>
        </div>

        {/* Profile Picture */}

        <div className="flex flex-col justify-center items-center mx-3 my-5">
          <Link href={`/player/${playerData._id}`}>
            <div>
              {playerData.profilePicture ? (
                <img
                  src={playerData.profilePicture}
                  alt={`${playerData.firstName} ${playerData.lastName}`}
                />
              ) : (
                <img
                  src={defaultProfilePicture}
                  alt="Default Profile"
                  className="rounded-full"
                />
              )}
              <p key={playerData._id}></p>
            </div>
          </Link>
          <h1 className="my-5 font-semibold text-2xl">
            {playerData.firstName} {playerData.lastName}
          </h1>
        </div>

        {/* Basic Stat Logs */}
        {playerData && playerData.games && playerData.leagues && (
          <div className="flex justify-center mx-3 my-5 divide-x divide-green-800">
            <div className="w-2/5 md:max-w-xs py-3 text-center text-slate-500">
              <p>{playerData.games.length || 0}</p>
              <p>Played Games</p>
            </div>
            <div className="w-2/5 md:max-w-xs py-3 text-center text-slate-500">
              <p>{playerData.leagues.length || 0} </p>
              <p>Active Leagues</p>
            </div>
            <div className="w-2/5 md:max-w-xs py-3 text-center text-slate-500">
              <p>
                {(
                  (playerData.gamesWon.length / playerData.games.length) *
                  100
                ).toFixed(2)}
                %
              </p>
              <p>Win Percentage</p>
            </div>
          </div>
        )}

{/*         <Suspense fallback={<div>Loading...</div>}>
          <TeamMates playerData={playerData} />
        </Suspense> */}

        {/* Winning Streak Counter */}
        {!isLoading && winningStreak > 0 && (
          <div className="mt-6">
            <p className="font-bold text-center text-slate-500">
              Current Winning Streak: {winningStreak} games
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-evenly md:items-start">
          <Suspense fallback={<div>Loading...</div>}>
            <Last5 playerData={playerData} />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <Singles playerData={playerData} />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <Doubles playerData={playerData} />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <MixedDoubles playerData={playerData} />
          </Suspense>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Page;
