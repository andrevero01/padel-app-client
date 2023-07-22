"use client";
import React, { useState } from "react";
const LeagueModal = ({ league, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-30">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-lg font-bold mb-4">{league.name}</h2>
        <p>Location: {league.location}</p>
        <p>Teams: {league.teams}</p>
        <p>Schedule: {league.schedule}</p>
        <p>Open for registration?: {league.registrationOpen}</p>
        <p>Registration deadline: {league.registrationDeadline}</p>
        <p>Registration fee: {league.registrationFee}</p>

        <img src={league.leagueLogo} alt="League logo" className="w-20" />

        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-primary text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LeagueModal;
