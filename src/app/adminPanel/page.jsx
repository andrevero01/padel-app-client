"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import TeamsMainPage from "../components/TeamsMainPage";
import AdminPlayers from "../components/adminPanel/AdminPlayersOverview";
import AddLeague from "../components/League/AddLeague";
import AdminPlayersCreate from "../components/adminPanel/AdminPlayersCreate";

function AdminPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const [showLeagues, setShowLeagues] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [createPlayers, setCreatePlayers] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);
  if (!isLoggedIn) {
    return null;
  }

  const handleLeagueToggle = () => {
    setShowLeagues(!showLeagues);
    setShowTeams(false);
    setShowPlayers(false);
    setCreatePlayers(false);
  };

  const handleTeamsToggle = () => {
    setShowTeams(!showTeams);
    setShowLeagues(false);
    setShowPlayers(false);
    setCreatePlayers(false);
  };

  const handlePlayersToggle = () => {
    setShowPlayers(!showPlayers);
    setShowLeagues(false);
    setShowTeams(false);
    setCreatePlayers(false);
  };

  const handlePlayersCreateToggle = () => {
    setCreatePlayers(!createPlayers);
    setShowLeagues(false);
    setShowTeams(false);
    setShowPlayers(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-5">
        <button
          className="px-4 py-2 btn-primary  text-neutral  rounded-md mr-2"
          onClick={handleLeagueToggle}
        >
          {showLeagues ? "Hide League Creation" : "Create League"}
        </button>
        <button
          className="px-4 py-2 btn-primary  text-neutral rounded-md mr-2"
          onClick={handleTeamsToggle}
        >
          {showTeams ? "Hide Teams" : "Show Teams"}
        </button>
        <button
          className="px-4 py-2 btn-primary  text-neutral rounded-md mr-2"
          onClick={handlePlayersToggle}
        >
          {showPlayers ? "Hide Players" : "Show Players"}
        </button>
        <button
          className="px-4 py-2 btn-primary  text-neutral rounded-md"
          onClick={handlePlayersCreateToggle}
        >
          {createPlayers ? "Hide Player Creation" : "Create a Player"}
        </button>
      </div>

      {showLeagues && (
        <div className="mb-4">
          <AddLeague />
        </div>
      )}

      <hr className="w-full my-4" />

      {showTeams && <TeamsMainPage />}

      {showPlayers && <AdminPlayers />}

      {createPlayers && <AdminPlayersCreate />}
    </div>
  );
}

export default AdminPage;
