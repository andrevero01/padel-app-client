"use client";
import React, { useState } from "react";
import axios from "axios";

const TeamsMainPage = () => {
  const [teams, setTeams] = useState([]);
  const [numTeamsDisplayed, setNumTeamsDisplayed] = useState(5);

  const getTeams = async () => {
    const response = await axios.get("http://localhost:5005/api/teams");
    setTeams(response.data);
  };

  const handleGetTeams = () => {
    getTeams();
  };

  const handleShowMoreTeams = () => {
    setNumTeamsDisplayed((prevNumTeams) => prevNumTeams + 5);
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
        {teams.slice(0, numTeamsDisplayed).map((team) => (
          <div
            key={team.id}
            className="max-w-xs p-4 mx-2 my-2 bg-white rounded shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <img
                src={team.logo}
                alt={team.name}
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="font-bold text-xl mb-2">{team.name}</div>
            <p>
              Wins this season: {team.wins}
            </p>
          </div>
        ))}
      </div>
      {teams.length > numTeamsDisplayed && (
        <button
          onClick={handleShowMoreTeams}
          className="my-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default TeamsMainPage;
