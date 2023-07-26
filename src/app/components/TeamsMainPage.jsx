"use client";
import React, { useState } from "react";
import axios from "axios";

const TeamsMainPage = () => {
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const response = await axios.get(
      "https://misty-stole-lamb.cyclic.app/api/teams"
    );
    setTeams(response.data);
  };

  const handleGetTeams = () => {
    getTeams();
  };

  return (
    <div className="flex flex-col items-center">
      {teams.length === 0 ? (
        <button
          onClick={handleGetTeams}
          className="my-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Get Teams
        </button>
      ) : null}
      <div className="flex flex-wrap justify-center">
        {teams.map((team) => (
          <div
            key={team.id}
            className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow"
          >
            <div className="font-bold">
              Team Name: {team.name} <br></br>
              Player: {team.player}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsMainPage;
