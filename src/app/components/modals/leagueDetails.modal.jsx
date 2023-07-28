"use client";
import React from "react";
import Link from "next/link";

const LeagueDetailsModal = ({ league, onClose }) => {
  console.log(league);

  // Function to handle button click and redirect to league ID's link
  const handleRedirectToLeague = () => {
    const leagueId = league._id;
    window.location.href = `http://localhost:3000/leagues/details/${leagueId}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-30 text-neutral">
      <div className="relative bg-gray-100 p-10 rounded shadow w-4/5 md:w-1/2 lg:w-1/2">
        <div className="w-20 mx-auto mb-4">
          <img
            src={league.leagueLogo}
            alt="League logo"
            className="w-full h-auto"
          />
        </div>
        <h2 className="text-2xl font-bold text-neutral mb-4">{league.name}</h2>
        <p className=" font-medium text mb-2">
          <span className="">📍</span> {league.location}
        </p>
        <p className="zinc-700 font-medium mb-1">Schedule: {league.schedule}</p>
        <p className=" font-medium  mb-1">
          Open for registration?: {league.registrationOpen ? "Yes" : "No"}
        </p>
        <p className=" font-medium  mb-1">
          Registration deadline:{" "}
          {new Date(league.registrationDeadline).toISOString().split("T")[0]}
        </p>

        <p className=" font-medium  mb-1">Players:</p>
        <div className="flex flex-wrap mb-4">
          {league.players.map((player) => (
            <span
              key={player._id}
              className="px-2 py-1 bg-info rounded mx-1 mt-1"
            >
              {player.firstName}
            </span>
          ))}
        </div>

        <p className=" font-medium  mb-1">
          Registration fee: {league.registrationFee} €
        </p>
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <br></br>
        <button
          onClick={handleRedirectToLeague}
          className="btn btn-sm btn-success "
        >
          Take me to the Standings
        </button>
      </div>
    </div>
  );
};

export default LeagueDetailsModal;
